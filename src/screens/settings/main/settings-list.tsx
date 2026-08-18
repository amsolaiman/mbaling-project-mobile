import { Link } from 'expo-router';
import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from 'expo-web-browser';
import { SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';

// assets
import { IconArrow } from '@/assets/icons';
// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';
// constants
import { SETTINGS_CONFIG } from '@/constants/settings';
import { GREY_COLORS } from '@/constants/theme';
// hooks
import { useTheme } from '@/hooks/use-theme';
// styles
import { Fonts, Spacing } from '@/styles';
// utils
import { isExternalUrl } from '@/utils/url';

//
import SettingsLogout from './settings-logout';

// ----------------------------------------------------------------------

export default function SettingsList() {
  const color = useTheme();

  const { alert } = useCustomAlert();

  return (
    <SectionList
      sections={SETTINGS_CONFIG}
      keyExtractor={(item) => item.label}
      contentContainerStyle={styles.container}
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
              color={color.text}
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
