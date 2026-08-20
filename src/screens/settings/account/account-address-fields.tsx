/* eslint-disable no-console */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import {
  TextInput as DefaultTextInput,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  HelperText,
  Menu,
  TextInput,
  TextInputProps,
} from 'react-native-paper';

// assets
import { IconArrowAlt } from '@/assets/icons';
// components
import { RHFTextField } from '@/components/hook-form';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useTheme } from '@/hooks/use-theme';
// styles
import { Spacing } from '@/styles';
// types
import { IUserAddress } from '@/types/users';
// utils
import psgc, { PSGC_ENDPOINTS } from '@/utils/psgc';

// ----------------------------------------------------------------------

const sortList = (list: IUserAddress[]) =>
  [...list].sort((a, b) => a.name.localeCompare(b.name));

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
};

export default function SettingsAccountAddressFields({ isEdit }: Props) {
  const { control } = useFormContext();

  const addressLine4 = useWatch({ control, name: 'addressLine4' });
  const addressLine3 = useWatch({ control, name: 'addressLine3' });

  const [provinces, setProvinces] = useState<IUserAddress[]>([]);

  const [citiesMunicipalities, setCitiesMunicipalities] = useState<
    IUserAddress[]
  >([]);

  const [barangays, setBarangays] = useState<IUserAddress[]>([]);

  //#region FETCH PROVINCES
  useEffect(() => {
    psgc
      .get(PSGC_ENDPOINTS.province.list)
      .then((response) => {
        setProvinces(sortList(response.data));
      })
      .catch((error) => {
        const message =
          typeof error === 'string' ? error : (error as Error).message;
        console.error(message);
      });
  }, []);
  //#endregion

  //#region FETCH CITIES/MUNICIPALITIES
  const fetchMunicipality = useCallback(() => {
    const selected = provinces.find((f) => f.name === addressLine4)?.code;

    if (selected)
      psgc
        .get(PSGC_ENDPOINTS.province.getSub(selected))
        .then((response) => {
          setCitiesMunicipalities(sortList(response.data));
        })
        .catch((error) => {
          const message =
            typeof error === 'string' ? error : (error as Error).message;
          console.error(message);
        });
  }, [provinces, addressLine4]);

  useEffect(() => {
    fetchMunicipality();
  }, [fetchMunicipality]);
  //#endregion

  //#region FETCH BARANGAYS
  const fetchBarangay = useCallback(() => {
    const selected = citiesMunicipalities.find(
      (f) => f.name === addressLine3
    )?.code;

    if (selected)
      psgc
        .get(PSGC_ENDPOINTS.cityMunicipality.getSub(selected))
        .then((response) => {
          setBarangays(response.data);
        })
        .catch((error) => {
          const message =
            typeof error === 'string' ? error : (error as Error).message;
          console.error(message);
        });
  }, [citiesMunicipalities, addressLine3]);

  useEffect(() => {
    fetchBarangay();
  }, [fetchBarangay]);
  //#endregion

  return (
    <View style={styles.container}>
      <SelectField
        name="addressLine4"
        label="Province"
        options={provinces}
        //
        mode="flat"
        disabled={!isEdit}
      />

      <SelectField
        name="addressLine3"
        label="City / municipality"
        options={citiesMunicipalities}
        //
        mode="flat"
        disabled={!isEdit || !addressLine4}
      />

      <SelectField
        name="addressLine2"
        label="Barangay"
        options={barangays}
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
        helperText="E.g. House no., Street name, etc."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.four,
    flexDirection: 'column',
    gap: Spacing.four,
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

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  mode,
  disabled,
  options,
  ...rest
}) => {
  const { control, setValue } = useFormContext();

  const addressLine4 = useWatch({ control, name: 'addressLine4' });
  const addressLine3 = useWatch({ control, name: 'addressLine3' });

  const ref = useRef<DefaultTextInput>(null);

  const color = useTheme();

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
        const handleSelect = (select: string) => {
          field.onChange(select);
          onClose();
          if (name === 'addressLine4' && select !== addressLine4) {
            setValue('addressLine3', null);
            setValue('addressLine2', null);
          }

          if (name === 'addressLine3' && select !== addressLine3) {
            setValue('addressLine2', null);
          }
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
                          color={color.grey[500]}
                        />
                      )}
                    />
                  }
                  {...rest}
                />
              }
              anchorPosition="bottom"
              contentStyle={{ width, backgroundColor: color.backgroundCard }}
            >
              {!!options.length ? (
                options.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelect(item.name)}
                  >
                    <Menu.Item
                      dense
                      rippleColor="transparent"
                      title={item.name}
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <Menu.Item disabled title="No data.." />
              )}
            </Menu>

            {!!error && (
              <HelperText
                type="error"
                visible={!!error}
                style={fieldStyles.helperText}
              >
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
