import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextInput as DefaultTextInput,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { HelperText, Menu, TextInput, TextInputProps } from 'react-native-paper';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useColorScheme } from '@/hooks/use-color-scheme';
// utils
import psgc, { API_ENDPOINTS } from '@/utils/psgc';
// styles
import Colors from '@/styles/constants/Colors';
// types
import { IUserAddress } from '@/types/users';
// components
import { RHFTextField } from '@/components/hook-form';
// assets
import { IconArrowAlt } from '@/assets/icons';

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
};

export default function SettingsAccountAddressFields({ isEdit }: Props) {
  const { watch } = useFormContext();

  const addressLine3 = watch('addressLine3');

  const addressLine4 = watch('addressLine4');

  const [province, setProvince] = useState<IUserAddress[]>([]);

  const [municipality, setMunicipality] = useState<IUserAddress[]>([]);

  const [barangay, setBarangay] = useState<IUserAddress[]>([]);

  //#region FETCH PROVINCES
  useEffect(() => {
    psgc
      .get(API_ENDPOINTS.province.list)
      .then((response) => {
        setProvince(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //#endregion

  //#region FETCH CITIES/MUNICIPALITIES
  const fetchMunicipality = useCallback(() => {
    const select = province.find((_) => _.name === addressLine4)?.code;

    if (select)
      psgc
        .get(API_ENDPOINTS.province.getSub(select))
        .then((response) => {
          setMunicipality(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [province, addressLine4]);

  useEffect(() => {
    fetchMunicipality();
  }, [fetchMunicipality]);
  //#endregion

  //#region FETCH BARANGAYS
  const fetchBarangay = useCallback(() => {
    const select = municipality.find((_) => _.name === addressLine3)?.code;

    if (select)
      psgc
        .get(API_ENDPOINTS.cityMunicipality.getSub(select))
        .then((response) => {
          setBarangay(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [municipality, addressLine3]);

  useEffect(() => {
    fetchBarangay();
  }, [fetchBarangay]);
  //#endregion

  //#region SORTING ARRAYS
  const sortedProvince = useMemo(() => {
    return province.sort((a, b) => a.name.localeCompare(b.name));
  }, [province]);

  const sortedMunicipality = useMemo(() => {
    return municipality.sort((a, b) => a.name.localeCompare(b.name));
  }, [municipality]);

  const sortedBarangay = useMemo(() => {
    return barangay.sort((a, b) => a.name.localeCompare(b.name));
  }, [barangay]);
  //#endregion

  return (
    <View style={styles.container}>
      <SelectField
        name="addressLine4"
        label="Province"
        options={sortedProvince}
        //
        mode="flat"
        disabled={!isEdit}
      />

      <SelectField
        name="addressLine3"
        label="City / municipality"
        options={sortedMunicipality}
        //
        mode="flat"
        disabled={!isEdit || !addressLine4}
      />

      <SelectField
        name="addressLine2"
        label="Barangay"
        options={sortedBarangay}
        //
        mode="flat"
        disabled={!isEdit || !addressLine3}
      />

      <RHFTextField
        name="addressLine1"
        label="Address line"
        //
        mode="flat"
        disabled={!isEdit}
        helperText="E.g. Lot/House no., Street name, etc."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column',
    gap: 16,
  },
});

// ----------------------------------------------------------------------

type SelectFieldProps = TextInputProps & {
  name: string;
  options: {
    code: string;
    name: string;
  }[];
};

const SelectField: React.FC<SelectFieldProps> = ({ name, mode, disabled, options, ...rest }) => {
  const { watch, control, setValue } = useFormContext();

  const ref = useRef<DefaultTextInput>(null);

  const colorScheme = useColorScheme() ?? 'light';

  const addressLine3 = watch('addressLine3');

  const addressLine4 = watch('addressLine4');

  const open = useBoolean();

  const [width, setWidth] = useState<number>(0);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  }, []);

  const onClose = useCallback(() => {
    open.onFalse();
    ref.current?.blur();
  }, [open]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleSelect = (value: string) => {
          field.onChange(value);

          if (name === 'addressLine4' && value !== addressLine4) {
            setValue('addressLine3', null);
            setValue('addressLine2', null);
          }

          if (name === 'addressLine3' && value !== addressLine3) {
            setValue('addressLine2', null);
          }

          onClose();
        };

        return (
          <View onLayout={handleLayout}>
            <Menu
              visible={open.value}
              onDismiss={onClose}
              anchor={
                <TextInput
                  {...field}
                  ref={ref}
                  value={field.value}
                  style={fieldStyles.field}
                  onFocus={open.onTrue}
                  onBlur={open.onFalse}
                  showSoftInputOnFocus={false}
                  //
                  mode={mode}
                  error={!!error}
                  disabled={disabled}
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <IconArrowAlt
                          direction={open.value ? 'up' : 'down'}
                          size={18}
                          color={Colors.grey[500]}
                        />
                      )}
                    />
                  }
                  {...rest}
                />
              }
              anchorPosition="bottom"
              contentStyle={{ width, backgroundColor: Colors[colorScheme].card }}
            >
              {!!options.length ? (
                options.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => handleSelect(item.name)}>
                    <Menu.Item dense rippleColor="transparent" title={item.name} />
                  </TouchableOpacity>
                ))
              ) : (
                <Menu.Item disabled title="No data.." />
              )}
            </Menu>

            {!!error && (
              <HelperText type="error" visible={!!error} style={fieldStyles.helperText}>
                {error.message}
              </HelperText>
            )}
          </View>
        );
      }}
    />
  );
};

const fieldStyles = StyleSheet.create({
  field: {
    backgroundColor: 'transparent',
  },
  helperText: {
    paddingBottom: 0,
    lineHeight: 14,
  },
});
