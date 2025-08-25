import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
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

      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me!
      </Button>
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
    marginBottom: 24,
  },
});
