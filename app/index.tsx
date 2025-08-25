import { StyleSheet } from 'react-native';
// components
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// ----------------------------------------------------------------------

export default function HomeScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText font="600" style={styles.title}>
        Welcome!
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
});
