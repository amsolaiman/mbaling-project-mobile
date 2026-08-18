import { SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';

// assets
import { IconArrow } from '@/assets/icons';
// components
import { ThemedText } from '@/components/themed-native';
// constants
import { GREY_COLORS } from '@/constants/theme';
// hooks
import { useTheme } from '@/hooks/use-theme';
// styles
import { Fonts, Spacing } from '@/styles';

//
import { SettingsConfig } from './config-route';
import SettingsLogout from './settings-logout';

// ----------------------------------------------------------------------

export default function SettingsList() {
  const color = useTheme();

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
            style={[styles.item, isLast && { marginBottom: Spacing.six }]}
          >
            <ThemedText numberOfLines={1} style={styles.title}>
              {item.label}
            </ThemedText>

            <IconArrow
              variant="outline"
              direction={item.isExternal ? 'right-up' : 'right'}
              size={24}
              color={color.text}
            />
          </TouchableOpacity>
        );
      }}
      renderSectionHeader={({ section }) => (
        <ThemedText style={styles.header}>{section.title}</ThemedText>
      )}
      //
      ListFooterComponent={<SettingsLogout />}
      ItemSeparatorComponent={() => <View style={{ height: Spacing.four }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.five,
    paddingHorizontal: Spacing.four,
  },
  header: {
    marginBottom: Spacing.four,
    fontSize: 14,
    color: GREY_COLORS[600],
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
