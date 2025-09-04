import { SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import { ThemedText } from '@/components/themed-native';
// assets
import { IconArrow } from '@/assets/icons';
//
import { SettingsConfig } from './config-route';
import SettingsLogout from './settings-logout';

// ----------------------------------------------------------------------

export default function SettingsList() {
  const colorScheme = useColorScheme() ?? 'light';

  const data = SettingsConfig();

  return (
    <SectionList
      sections={data}
      keyExtractor={(item) => item.label}
      contentContainerStyle={styles.container}
      //
      renderItem={({ item, index, section }) => {
        const isLast = index === section.data.length - 1;

        return (
          <TouchableOpacity
            onPress={item.onClick}
            style={[styles.item, isLast && { marginBottom: 32 }]}
          >
            <ThemedText numberOfLines={1} style={styles.title}>
              {item.label}
            </ThemedText>

            <IconArrow
              variant="outline"
              direction={item.isExternal ? 'right-up' : 'right'}
              size={24}
              color={Colors[colorScheme].text}
            />
          </TouchableOpacity>
        );
      }}
      renderSectionHeader={({ section }) => (
        <ThemedText style={styles.header}>{section.title}</ThemedText>
      )}
      //
      ListFooterComponent={<SettingsLogout />}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
    fontSize: 14,
    color: Colors.grey[600],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Fonts[600],
    flex: 1,
    fontSize: 18,
  },
});
