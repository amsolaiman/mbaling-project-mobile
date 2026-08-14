import { Pressable, StyleSheet, View } from 'react-native';

// assets
import { IconQuestionMark } from '@/assets/icons';
// components
import { ThemedText } from '@/components/themed-native';
// constants
import { COMMON_COLORS, GREY_COLORS } from '@/constants/theme';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// constants
import { Fonts, Spacing } from '@/styles';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  caption: string;
  instruction?: string;
  onPress?: VoidFunction;
};

export default function InfoBanner({
  title,
  caption,
  instruction,
  onPress,
}: Props) {
  const scheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <ThemedText
          style={[
            styles.title,
            {
              color:
                scheme === 'light'
                  ? GREY_COLORS[700]
                  : COMMON_COLORS.white.main,
            },
          ]}
        >
          {title}
        </ThemedText>

        <ThemedText style={[styles.caption]}>{caption}</ThemedText>

        {instruction && (
          <ThemedText style={styles.caption}>{instruction}</ThemedText>
        )}
      </View>

      <Pressable onPress={onPress}>
        <IconQuestionMark
          variant="outline"
          size={42}
          color={GREY_COLORS[500]}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.four,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    ...Fonts[600],
    marginBottom: Spacing.oneHalf,
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
    lineHeight: 12 * 1.2,
    color: GREY_COLORS[600],
  },
});
