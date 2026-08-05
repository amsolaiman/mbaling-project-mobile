import { useFonts } from 'expo-font';
import {
  DarkTheme as NativeDarkTheme,
  DefaultTheme as NativeDefaultTheme,
  SplashScreen,
  ThemeProvider,
} from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper';

// components
import AppTabs from '@/components/app-tabs';
// constants
import { COLOR_PRIMARY } from '@/constants/theme';
// styles
import { Colors } from '@/styles';
import fontConfig from '@/styles/font-config';

// ----------------------------------------------------------------------

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    'Metropolis-Thin': require('../../assets/fonts/Metropolis-100.ttf'),
    'Metropolis-ExtraLight': require('../../assets/fonts/Metropolis-200.ttf'),
    'Metropolis-Light': require('../../assets/fonts/Metropolis-300.ttf'),
    'Metropolis-Regular': require('../../assets/fonts/Metropolis-400.ttf'),
    'Metropolis-Medium': require('../../assets/fonts/Metropolis-500.ttf'),
    'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-600.ttf'),
    'Metropolis-Bold': require('../../assets/fonts/Metropolis-700.ttf'),
    'Metropolis-ExtraBold': require('../../assets/fonts/Metropolis-800.ttf'),
    'Metropolis-Black': require('../../assets/fonts/Metropolis-900.ttf'),
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

  const NativePaperTheme =
    colorScheme === 'light' ? MD3LightTheme : MD3DarkTheme;

  const paperTheme = {
    ...NativePaperTheme,
    colors: {
      ...NativePaperTheme.colors,
      primary: COLOR_PRIMARY,
    },
    fonts: configureFonts({
      config: fontConfig,
    }),
  };

  const DefaultTheme = {
    ...NativeDefaultTheme,
    colors: {
      ...NativeDefaultTheme.colors,
      background: Colors.light.background,
    },
  };

  const DarkTheme = {
    ...NativeDarkTheme,
    colors: {
      ...NativeDarkTheme.colors,
      background: Colors.dark.background,
    },
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={paperTheme}>
        <AppTabs />
      </PaperProvider>
    </ThemeProvider>
  );
}
