import { Pressable, StyleSheet, View } from 'react-native';
// @expo
import { router } from 'expo-router';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
// components
import { SettingsHeader } from '@/screens/_components';
// assets
import { IconArrowAlt } from '@/assets/icons';
//
import SettingsAccountList from '../account-list';

// ----------------------------------------------------------------------

export default function SettingsAccountView() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <SettingsHeader
        title="Account settings"
        actionLeft={
          <Pressable onPress={router.back}>
            <IconArrowAlt
              direction="left"
              variant="outline"
              size={24}
              color={Colors[colorScheme].text}
            />
          </Pressable>
        }
      />

      <SettingsAccountList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
