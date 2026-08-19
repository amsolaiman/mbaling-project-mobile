import { Link } from 'expo-router';
import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from 'expo-web-browser';
import { useMemo } from 'react';
import { SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';

// assets
import { IconArrow } from '@/assets/icons';
// auth
import { useAuthContext } from '@/auth/hooks';
// components
import Avatar from '@/components/_ui/avatar';
import { ThemedText } from '@/components/themed-native';
// constants
import { ACCOUNT_SETTINGS_CONFIG } from '@/constants/settings';
import { COLOR_PRIMARY, GREY_COLORS } from '@/constants/theme';
// styles
import { Fonts, Spacing } from '@/styles';
// types
import { IUserItem } from '@/types/users';
// utils
import { isExternalUrl } from '@/utils/url';

//
import SettingsAccountFooter from './account-footer';

// ----------------------------------------------------------------------

export default function SettingsAccountList() {
  const { user } = useAuthContext();
  const userDetails = user as IUserItem;

  const sections = useMemo(
    () =>
      ACCOUNT_SETTINGS_CONFIG.filter(
        (section) => section.hideFor !== userDetails?.role
      ),
    [userDetails?.role]
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => `${item.label}-${index}`}
      //
      renderItem={({ item, index, section }) => {
        const isLast = index === section.data.length - 1;
        const isExternal = isExternalUrl(item.href as string);

        const renderContent = (
          <View style={[styles.item, isLast && { marginBottom: Spacing.six }]}>
            <ThemedText numberOfLines={1} style={styles.title}>
              {item.label}
            </ThemedText>

            <IconArrow
              variant="outline"
              direction={isExternal ? 'right-up' : 'right'}
              size={24}
              color={GREY_COLORS[400]}
            />
          </View>
        );

        if (item.isNotLive) {
          return (
            <TouchableOpacity
              onPress={() =>
                alert({
                  title: 'Oops!',
                  message: 'This page is not yet live.',
                })
              }
            >
              {renderContent}
            </TouchableOpacity>
          );
        }

        return (
          <Link
            asChild
            target={isExternal ? '_blank' : undefined}
            href={item.href}
            onPress={
              isExternal
                ? async (event) => {
                    event.preventDefault();
                    await openBrowserAsync(item.href as string, {
                      presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
                    });
                  }
                : undefined
            }
          >
            <TouchableOpacity>{renderContent}</TouchableOpacity>
          </Link>
        );
      }}
      renderSectionHeader={({ section }) =>
        !section.hideHeader ? (
          <ThemedText style={styles.sectionHeader}>{section.title}</ThemedText>
        ) : null
      }
      //
      ListHeaderComponent={
        <>
          <Avatar
            src={userDetails?.avatarUrl}
            size={120}
            style={styles.avatar}
          />

          <ThemedText style={{ ...Fonts[600], fontSize: 18 }}>
            {'@' + userDetails?.username}
          </ThemedText>
        </>
      }
      ListHeaderComponentStyle={styles.header}
      ListFooterComponent={<SettingsAccountFooter />}
      ItemSeparatorComponent={() => <View style={{ height: Spacing.four }} />}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: Spacing.five,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.five,
  },
  avatar: {
    outlineWidth: 1,
    outlineColor: COLOR_PRIMARY,
  },
  sectionHeader: {
    marginBottom: Spacing.four,
    paddingHorizontal: Spacing.four,
    fontSize: 14,
    color: GREY_COLORS[600],
  },
  item: {
    paddingHorizontal: Spacing.four,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Fonts[600],
    flex: 1,
    fontSize: 18,
  },
});
