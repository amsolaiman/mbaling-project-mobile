import { NavigationBar } from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// constants
import { MAIN_ROUTES } from '@/constants/routes';

//
import { ThemedView } from '../themed-native';

// ----------------------------------------------------------------------

export default function AppMain() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <ThemedView style={{ flex: 1 }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <NavigationBar style={isDarkMode ? 'light' : 'dark'} />

      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          {MAIN_ROUTES.map(({ name, options }) => (
            <Stack.Screen key={name} name={name} options={options} />
          ))}
        </Stack>
      </SafeAreaView>
    </ThemedView>
  );
}
