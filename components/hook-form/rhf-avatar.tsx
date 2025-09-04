import { Controller, useFormContext } from 'react-hook-form';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
// @expo
import * as ImagePicker from 'expo-image-picker';
// styles
import Colors from '@/styles/constants/Colors';
// types
import { UploadFormValue } from '@/types/posts';
// components
import Avatar from '../avatar';
import useCustomAlert from '../custom-alert';
// assets
import { IconUpload } from '@/assets/icons';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  size: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const RHFAvatar: React.FC<Props> = ({ name, size, disabled = false, style }) => {
  const { control } = useFormContext();

  const theme = useTheme();

  const { alert } = useCustomAlert();

  const handlePickImage = async (onChange: (file: UploadFormValue) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert({
        title: 'Permission required',
        message: 'We need access to your media to upload an image.',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      const file: UploadFormValue = {
        uri: asset.uri,
        name: asset.fileName || `image-${Date.now()}.jpg`,
        type: asset.type || 'image/jpeg',
      };

      onChange(file);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TouchableOpacity
          onPress={() => handlePickImage(field.onChange)}
          disabled={!disabled}
          style={[{ width: size }, styles.container]}
        >
          {!!disabled && (
            <View style={[{ width: size }, styles.overlay]}>
              <IconUpload size={size / 2} color={Colors.common.white[80]} />
            </View>
          )}

          <Avatar
            src={field.value?.uri}
            size={size}
            style={[
              style,
              !!error && {
                outlineWidth: 2,
                outlineColor: theme.colors.error,
              },
            ]}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default RHFAvatar;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: '50%',
  },
  overlay: {
    position: 'absolute',
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: Colors.common.black[40],
    zIndex: 99,
  },
});
