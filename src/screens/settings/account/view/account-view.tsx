import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

// assets
import { IconArrowAlt } from '@/assets/icons';
// hooks
import { useTheme } from '@/hooks/use-theme';

//
import { SettingsHeader } from '../../../_components';
import SettingsAccountList from '../account-list';

// ----------------------------------------------------------------------

export default function SettingsAccountView() {
  const color = useTheme();

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
              color={color.text}
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
