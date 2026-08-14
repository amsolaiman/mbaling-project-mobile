import { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

// assets
import { IconTrashBin } from '@/assets/icons';
// components
import Button from '@/components/_ui/button';
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';
// constants
import { COLOR_ACCENT, COLOR_PRIMARY, COMMON_COLORS } from '@/constants/theme';
// styles
import { Fonts, Spacing } from '@/styles';

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
    // eslint-disable-next-line no-console
    console.log('Post:', id);
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
          <IconTrashBin size={24} color={COLOR_PRIMARY} />
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
    backgroundColor: COLOR_ACCENT,
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    ...Fonts[500],
    padding: Spacing.three,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 16,
    lineHeight: 16 * 1.2,
    color: COMMON_COLORS.white.main,
    backgroundColor: COMMON_COLORS.black[60],
  },
  actionWrapper: {
    position: 'absolute',
    top: Spacing.three,
    right: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  button: {
    backgroundColor: COMMON_COLORS.white.main,
  },
  buttonLabel: {
    color: COLOR_PRIMARY,
  },
});
