import { Pressable, StyleSheet, View } from 'react-native';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// constants
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import { ThemedText } from '@/components/themed-native';
// assets
import { IconQuestionMark } from '@/assets/icons';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  caption: string;
  instruction?: string;
  onPress?: VoidFunction;
};

export default function InfoBanner({ title, caption, instruction, onPress }: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <ThemedText
          style={[
            styles.title,
            {
              color: colorScheme === 'light' ? Colors.grey[700] : Colors.common.white.main,
            },
          ]}
        >
          {title}
        </ThemedText>

        <ThemedText style={[styles.caption]}>{caption}</ThemedText>

        {instruction && <ThemedText style={styles.caption}>{instruction}</ThemedText>}
      </View>

      <Pressable onPress={onPress}>
        <IconQuestionMark variant="outline" size={42} color={Colors.grey[500]} />
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
    gap: 16,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    ...Fonts[600],
    marginBottom: 6,
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
    lineHeight: 12 * 1.2,
    color: Colors.grey[600],
  },
});
