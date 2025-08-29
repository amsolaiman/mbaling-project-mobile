import { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import Button from '@/components/button';
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';
// assets
import { IconTrashBin } from '@/assets/icons';

// ----------------------------------------------------------------------

export type ManageCardProps = {
  id: string;
  title: string;
  imageUrl: string;
};

type Props = {
  item: ManageCardProps;
};

// ----------------------------------------------------------------------

export default function ManageCard({ item }: Props) {
  const { alert } = useCustomAlert();

  const { id, title, imageUrl } = item;

  const handleEdit = useCallback(() => {
    console.log('Post: ', id);
  }, [id]);

  const handleDelete = () => {
    alert({
      message: 'Are you sure you want to delete this post?',
      buttons: [{ text: 'CANCEL' }, { text: 'YES', variant: 'contained' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <ThemedText numberOfLines={2} style={styles.title}>
          {title}
        </ThemedText>
      </View>

      <View style={styles.actionWrapper}>
        <Button
          onPress={handleEdit}
          dense
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Edit
        </Button>

        <TouchableOpacity onPress={handleDelete}>
          <IconTrashBin size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  imageWrapper: {
    width: '100%',
    height: 240,
    position: 'relative',
    backgroundColor: Colors.accent,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    ...Fonts[500],
    padding: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 16,
    color: Colors.common.white.main,
    lineHeight: 16 * 1.2,
    backgroundColor: Colors.common.black[60],
  },
  actionWrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    backgroundColor: Colors.common.white.main,
  },
  buttonLabel: {
    color: Colors.primary,
  },
});
