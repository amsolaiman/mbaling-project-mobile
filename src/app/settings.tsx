import { StyleSheet } from 'react-native';

// components
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Settings
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
    textAlign: 'center',
  },
});
