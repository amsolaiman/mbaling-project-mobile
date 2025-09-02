import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
// types
import { UploadFormValue } from '@/types/posts';
// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText, ThemedView } from '@/components/themed-native';
// assets
import { IconAddSquare, IconCloseCircle, IconGallerySend } from '@/assets/icons';

// ----------------------------------------------------------------------

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PLACEHOLDER_WIDTH = (SCREEN_WIDTH - 64) / 5;

export default function PostFormUpload() {
  const { control } = useFormContext();

  const theme = useTheme();

  const colorScheme = useColorScheme() ?? 'light';

  const { alert } = useCustomAlert();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <ThemedView style={styles.container}>
      <Controller
        control={control}
        name="uploads"
        render={({ field, fieldState: { error } }) => {
          const files: UploadFormValue[] = field.value;

          const handleUpload = async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
              alert({
                title: 'Permission required',
                message: 'Please allow access to media library.',
              });
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              quality: 0.7,
            });

            if (!result.canceled) {
              const asset = result.assets[0];

              const file: UploadFormValue = {
                uri: asset.uri,
                name: asset.fileName || `image-${Date.now()}.jpg`,
                type: asset.type || 'image/jpeg',
              };

              const updatedFiles = [...files, file].slice(0, 5);

              field.onChange(updatedFiles);

              setSelectedIndex(updatedFiles.length - 1);
            }
          };

          const handleRemove = (index: number) => {
            const updatedFiles = files.filter((_, i) => i !== index);

            field.onChange(updatedFiles);

            if (selectedIndex === index) setSelectedIndex(0);
            else if (selectedIndex > index) setSelectedIndex((i) => i - 1);
          };

          return (
            <>
              <View style={styles.lightbox}>
                {files[selectedIndex] ? (
                  <Image source={{ uri: files[selectedIndex].uri }} style={styles.lightboxImage} />
                ) : (
                  <View
                    style={[
                      styles.lightboxEmpty,
                      {
                        backgroundColor:
                          colorScheme === 'light' ? Colors.grey[50] : Colors.common.white[10],
                      },
                    ]}
                  >
                    <IconGallerySend
                      variant="duotone"
                      size={82}
                      color={!error ? Colors.grey[500] : theme.colors.error}
                    />
                    <ThemedText
                      style={[styles.lightboxText, !!error && { color: theme.colors.error }]}
                    >
                      {!!error ? error.message : 'No image uploaded.'}
                    </ThemedText>
                  </View>
                )}
              </View>

              <View style={styles.row}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const file = files[index];

                  const isFirstEmpty = !file && index === files.length;

                  if (!file && !isFirstEmpty) return null;

                  return (
                    <View key={index} style={styles.thumbWrapper}>
                      {file ? (
                        <>
                          <TouchableOpacity onPress={() => setSelectedIndex(index)}>
                            <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleRemove(index)}
                          >
                            <IconCloseCircle
                              size={24}
                              color={
                                colorScheme === 'light'
                                  ? Colors.common.black[70]
                                  : Colors.common.white.main
                              }
                            />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity onPress={handleUpload}>
                          <IconAddSquare
                            variant="outline"
                            size={PLACEHOLDER_WIDTH}
                            color={Colors.primary}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            </>
          );
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 32,
    marginBottom: 1,
  },
  lightbox: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  lightboxImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    resizeMode: 'cover',
  },
  lightboxEmpty: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  lightboxText: {
    color: Colors.grey[500],
  },
  row: {
    padding: 16,
    flexDirection: 'row',
    gap: 8,
  },
  thumbWrapper: {
    width: PLACEHOLDER_WIDTH,
    height: PLACEHOLDER_WIDTH,
  },
  thumbnail: {
    width: PLACEHOLDER_WIDTH,
    height: PLACEHOLDER_WIDTH,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  button: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
  },
});
