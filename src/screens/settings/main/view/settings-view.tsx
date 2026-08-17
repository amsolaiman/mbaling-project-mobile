import { View } from 'react-native';

// components
import { SettingsHeader } from '@/screens/_components';

//
import SettingsList from '../settings-list';

// ----------------------------------------------------------------------

export default function SettingsView() {
  return (
    <View style={{ flex: 1 }}>
      <SettingsHeader title="Settings" />

      <SettingsList />
    </View>
  );
}
