import { SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';
// auth
import { useAuthContext } from '@/auth/hooks';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import Avatar from '@/components/avatar';
import { ThemedText } from '@/components/themed-native';
// assets
import { IconArrow } from '@/assets/icons';
//
import SettingsAccountFooter from './account-footer';
import { SettingAccountConfig } from './config-route';

// ----------------------------------------------------------------------

export default function SettingsAccountList() {
  const { user } = useAuthContext();

  const routes = SettingAccountConfig();

  return (
    <SectionList
      sections={routes}
      keyExtractor={(item) => item.label}
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

            <IconArrow variant="outline" direction="right" size={24} color={Colors.grey[400]} />
          </TouchableOpacity>
        );
      }}
      renderSectionHeader={({ section }) =>
        section.showHeader ? (
          <ThemedText style={styles.sectionHeader}>{section.title}</ThemedText>
        ) : null
      }
      //
      ListHeaderComponent={
        <>
          <Avatar src={user?.avatarUrl} size={120} style={styles.avatar} />

          <ThemedText style={{ ...Fonts[600], fontSize: 18 }}>{'@' + user?.username}</ThemedText>
        </>
      }
      ListHeaderComponentStyle={styles.header}
      ListFooterComponent={<SettingsAccountFooter />}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 24,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  avatar: {
    outlineWidth: 1,
    outlineColor: Colors.primary,
  },
  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.grey[600],
  },
  item: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Fonts[600],
    flex: 1,
    fontSize: 18,
  },
});
