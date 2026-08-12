import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Avatar as PaperAvatar } from 'react-native-paper';

// assets
import { IconUser } from '@/assets/icons';
// constants
import { COLOR_ACCENT, COMMON_COLORS } from '@/constants/theme';

// ----------------------------------------------------------------------

type Props = {
  size: number;
  src: string | null;
  style?: StyleProp<ViewStyle>;
};

export default function Avatar({ size, src, style }: Props) {
  return (
    <View style={[{ width: size }, styles.container]}>
      {src ? (
        <PaperAvatar.Image
          source={{ uri: src }}
          size={size}
          style={[styles.avatar, style]}
        />
      ) : (
        <PaperAvatar.Icon
          size={size}
          icon={() => (
            <IconUser
              variant="duotone"
              size={size / 1.5}
              color={COMMON_COLORS.white.main}
            />
          )}
          style={styles.avatar}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1 / 1,
    borderRadius: '50%',
    backgroundColor: COLOR_ACCENT,
  },
  avatar: {
    backgroundColor: COLOR_ACCENT,
  },
});
