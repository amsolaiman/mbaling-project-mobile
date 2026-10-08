import * as Updates from 'expo-updates';
import { useCallback, useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// assets
import { IconCheck, IconRefresh } from '@/assets/icons';
// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';
// hooks
import { useTheme } from '@/hooks/use-theme';

// ----------------------------------------------------------------------

const ICON_SIZE = 24;
const MIN_SPIN_MS = 2000;

type Status = 'idle' | 'checking' | 'downloading';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function SettingsUpdate() {
  const color = useTheme();

  const { alert } = useCustomAlert();

  const [status, setStatus] = useState<Status>('idle');

  const [spin] = useState(() => new Animated.Value(0));

  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  const isBusy = status !== 'idle';

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  useEffect(() => {
    if (!isBusy) {
      spin.stopAnimation();
      spin.setValue(0);
      return;
    }

    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();

    return () => loop.stop();
  }, [isBusy, spin]);

  const handleUpdate = useCallback(async () => {
    if (isBusy) return;

    try {
      if (isUpdateAvailable) {
        setStatus('downloading');
        await Updates.fetchUpdateAsync();
      } else {
        setStatus('checking');
        await Promise.all([Updates.checkForUpdateAsync(), wait(MIN_SPIN_MS)]);
      }
    } catch {
      alert({
        message:
          'Something went wrong while checking for updates. Please try again later.',
      });
    } finally {
      setStatus('idle');
    }
  }, [alert, isBusy, isUpdateAvailable]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  const renderIcon = () => {
    if (isBusy) {
      return (
        <Animated.View style={{ transform: [{ rotate }] }}>
          <IconRefresh variant="outline" size={ICON_SIZE} color={color.text} />
        </Animated.View>
      );
    }

    if (isUpdateAvailable) {
      return (
        <IconCheck variant="outline" size={ICON_SIZE} color={color.text} />
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={isUpdateAvailable ? 'Get updates' : 'Check updates'}
      accessibilityState={{ busy: isBusy, disabled: isBusy }}
      disabled={isBusy}
      onPress={handleUpdate}
      style={styles.item}
    >
      <ThemedText font={600} numberOfLines={1} style={styles.title}>
        {isUpdateAvailable ? 'Get updates' : 'Check for updates'}
      </ThemedText>

      <View style={styles.icon}>{renderIcon()}</View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
