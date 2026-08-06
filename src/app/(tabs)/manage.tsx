import { StyleSheet } from 'react-native';

// components
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function ManageScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText font={600} style={styles.title}>
        Manage
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    lineHeight: 52,
    textAlign: 'center',
  },
});
