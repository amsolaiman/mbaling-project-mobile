import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

// components
import Logo from '@/components/logo';
import { ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function LoginScreen() {
  return (
    <ThemedView style={styles.container}>
      <Link href="/">
        <Logo />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
