import { Tabs } from 'expo-router';
import { Dimensions, StyleSheet, useColorScheme } from 'react-native';

// auth
import { useAuthContext } from '@/auth/hooks';
// constants
import { TAB_ROUTES } from '@/constants/routes';
// styles
import { Colors, Spacing, TAB_BAR_HEIGHT } from '@/styles';

// ----------------------------------------------------------------------

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  const { user } = useAuthContext();
  const currentRole = user?.role;

  return (
    <Tabs
      screenOptions={({ route }) => {
        const isShown =
          TAB_ROUTES.find((r) => r.name === route.name)?.hideFor ===
          currentRole;

        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.primary,
          tabBarStyle: [
            styles.tabBar,
            styles.tabShadow,
            {
              height: TAB_BAR_HEIGHT,
              paddingBottom: 0,
              backgroundColor: colors.backgroundCard,
            },
          ],
          tabBarItemStyle: [
            styles.tabItem,
            { display: isShown ? 'none' : 'flex' },
          ],
          tabBarHideOnKeyboard: true,
        };
      }}
    >
      {TAB_ROUTES.map(({ name, title, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                variant={focused ? 'solid' : 'outline'}
                size={24}
                color={color as string}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    padding: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.four,
    marginHorizontal: Dimensions.get('window').width * 0.05,
    position: 'absolute',
    marginBottom: Spacing.four,
    borderRadius: 50,
    borderTopWidth: 0,
  },
  tabShadow: {
    shadowColor: Colors.light.common.black.main,
    shadowOffset: {
      width: 0,
      height: Spacing.one,
    },
    shadowOpacity: 0.4,
    shadowRadius: Spacing.oneHalf,
    elevation: Spacing.oneHalf,
  },
});
