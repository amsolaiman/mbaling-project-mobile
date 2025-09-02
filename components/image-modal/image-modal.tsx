import { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
// @expo
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
// styles
import Colors from '@/styles/constants/Colors';
// component
import useCustomAlert from '../custom-alert';
// assets
import { IconActionShare, IconCloseCircle, IconDownload } from '@/assets/icons';

// ----------------------------------------------------------------------

type Props = {
  src: string;
  open: boolean;
  onClose: VoidFunction;
};

export default function ImageModal({ src, open, onClose }: Props) {
  const { alert } = useCustomAlert();

  const handleDownload = useCallback(async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        alert({
          title: 'Permission denied',
          message: 'Cannot download image without permission.',
        });
        return;
      }

      const fileName = src.split('/').pop() || `image-${Date.now()}.jpg`;
      const fileUri = FileSystem.cacheDirectory + fileName;

      const { uri } = await FileSystem.downloadAsync(src, fileUri);
      const asset = await MediaLibrary.createAssetAsync(uri);

      await MediaLibrary.createAlbumAsync('Download', asset, false);

      alert({ message: 'Image saved to gallery.' });
    } catch (error) {
      console.error(error);
      alert({ message: 'Something went wrong while downloading image.' });
    }
  }, [src, alert]);

  const handleShare = useCallback(async () => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        alert({ message: 'Sharing is not available on this device.' });
        return;
      }

      const fileName = src.split('/').pop() || `image-${Date.now()}.jpg`;
      const fileUri = FileSystem.cacheDirectory + fileName;

      const { uri } = await FileSystem.downloadAsync(src, fileUri);

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
      alert({ message: 'Something went wrong while sharing image.' });
    }
  }, [src, alert]);

  return (
    <Portal>
      <Modal visible={open} contentContainerStyle={styles.container}>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleDownload}>
            <IconDownload variant="outline" size={32} color={Colors.common.white[40]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare}>
            <IconActionShare variant="outline" size={32} color={Colors.common.white[40]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <IconCloseCircle variant="outline" size={32} color={Colors.common.white[40]} />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: src }} style={styles.image} />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttons: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    zIndex: 999,
  },
});
