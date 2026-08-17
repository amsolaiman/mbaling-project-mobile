import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

// assets
import {
  IconAddSquare,
  IconCloseCircle,
  IconGallerySend,
} from '@/assets/icons';
// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText, ThemedView } from '@/components/themed-native';
// constants
import { COLOR_PRIMARY, COMMON_COLORS, GREY_COLORS } from '@/constants/theme';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import { Spacing } from '@/styles';
// types
import { UploadFormValue } from '@/types/posts';

// ----------------------------------------------------------------------

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PLACEHOLDER_WIDTH = (SCREEN_WIDTH - Spacing.nine) / 5;

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
            const permissionResult =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
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
                  <Image
                    source={{ uri: files[selectedIndex].uri }}
                    style={styles.lightboxImage}
                  />
                ) : (
                  <View
                    style={[
                      styles.lightboxEmpty,
                      {
                        backgroundColor:
                          colorScheme === 'light'
                            ? GREY_COLORS[50]
                            : COMMON_COLORS.white[10],
                      },
                    ]}
                  >
                    <IconGallerySend
                      variant="duotone"
                      size={82}
                      color={!error ? GREY_COLORS[500] : theme.colors.error}
                    />
                    <ThemedText
                      style={[
                        styles.lightboxText,
                        !!error && { color: theme.colors.error },
                      ]}
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
                          <TouchableOpacity
                            onPress={() => setSelectedIndex(index)}
                          >
                            <Image
                              source={{ uri: file.uri }}
                              style={styles.thumbnail}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleRemove(index)}
                          >
                            <IconCloseCircle
                              size={24}
                              color={
                                colorScheme === 'light'
                                  ? COMMON_COLORS.black[70]
                                  : COMMON_COLORS.white.main
                              }
                            />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity onPress={handleUpload}>
                          <IconAddSquare
                            variant="outline"
                            size={PLACEHOLDER_WIDTH}
                            color={COLOR_PRIMARY}
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
    borderRadius: Spacing.six,
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
    gap: Spacing.two,
  },
  lightboxText: {
    color: GREY_COLORS[500],
  },
  row: {
    padding: Spacing.four,
    flexDirection: 'row',
    gap: Spacing.two,
  },
  thumbWrapper: {
    width: PLACEHOLDER_WIDTH,
    height: PLACEHOLDER_WIDTH,
  },
  thumbnail: {
    width: PLACEHOLDER_WIDTH,
    height: PLACEHOLDER_WIDTH,
    borderRadius: Spacing.three,
    resizeMode: 'cover',
  },
  button: {
    position: 'absolute',
    top: -Spacing.two,
    right: -Spacing.two,
    width: Spacing.five,
    height: Spacing.five,
  },
});
