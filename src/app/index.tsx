import { StyleSheet } from 'react-native';

// components
import { ThemedText, ThemedView } from '@/components/themed-native';
// styles
import { Fonts } from '@/styles';

// ----------------------------------------------------------------------

export default function HomeScreen() {
  const fontWeights = Object.keys(Fonts) as unknown as (keyof typeof Fonts)[];

  return (
    <ThemedView style={styles.container}>
      {fontWeights.map((weight) => (
        <ThemedText key={weight} font={weight} style={styles.title}>
          {weight}
        </ThemedText>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    lineHeight: 52,
    textAlign: 'center',
  },
});
