import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

// components
import { ThemedText, ThemedView } from '@/components/themed-native';
// styles
import { Spacing } from '@/styles';

// ----------------------------------------------------------------------

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />

      <ThemedView style={styles.container}>
        <ThemedText>This screen does not exist.</ThemedText>

        <Link href="/" style={styles.link}>
          <ThemedText>Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.five,
  },
  link: {
    marginTop: Spacing.four,
    paddingVertical: Spacing.four,
  },
});
