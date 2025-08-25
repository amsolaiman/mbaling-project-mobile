import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, configureFonts } from 'react-native-paper';
import 'react-native-reanimated';
import '../styles/global.css';
// @expo
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';

// ----------------------------------------------------------------------

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    Metropolis100: require('../assets/fonts/Metropolis-100.ttf'),
    Metropolis200: require('../assets/fonts/Metropolis-200.ttf'),
    Metropolis300: require('../assets/fonts/Metropolis-300.ttf'),
    Metropolis400: require('../assets/fonts/Metropolis-400.ttf'),
    Metropolis500: require('../assets/fonts/Metropolis-500.ttf'),
    Metropolis600: require('../assets/fonts/Metropolis-600.ttf'),
    Metropolis700: require('../assets/fonts/Metropolis-700.ttf'),
    Metropolis800: require('../assets/fonts/Metropolis-800.ttf'),
    Metropolis900: require('../assets/fonts/Metropolis-900.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    // Async font loading only occurs in development.
    return null;
  }

  const NativePaperTheme = colorScheme === 'light' ? MD3LightTheme : MD3DarkTheme;

  const paperTheme = {
    ...NativePaperTheme,
    colors: {
      ...NativePaperTheme.colors,
    },
    fonts: configureFonts({
      config: {
        fontFamily: 'Metropolis400',
      },
    }),
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={paperTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </ThemeProvider>
  );
}
