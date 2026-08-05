import { StyleSheet } from 'react-native';

// components
import Logo from '@/components/logo';
import { ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Logo color="primary" variant="base" />
      <Logo color="primary" variant="vertical" />
      <Logo color="primary" variant="horizontal" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
