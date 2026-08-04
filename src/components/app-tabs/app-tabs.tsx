import { Tabs } from 'expo-router';
import { Dimensions, StyleSheet, useColorScheme } from 'react-native';

// constants
import { TAB_ROUTES } from '@/constants/routes';
// styles
import { Colors, Spacing } from '@/styles';

// ----------------------------------------------------------------------

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  // TODO: replace with actual logic when authentication is implemented
  const userRole: 'student' | 'landlord' = 'student';

  return (
    <Tabs
      screenOptions={({ route }) => {
        const isHidden =
          TAB_ROUTES.find((r) => r.name === route.name)?.hideFor === userRole;

        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.primary,
          tabBarStyle: [
            styles.tabBar,
            styles.tabShadow,
            {
              height: 60,
              paddingBottom: 0,
              backgroundColor: colors.backgroundElement,
            },
          ],
          tabBarItemStyle: [
            styles.tabItem,
            { display: isHidden ? 'none' : 'flex' },
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
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    marginHorizontal: Dimensions.get('window').width * 0.05,
    position: 'absolute',
    marginBottom: Spacing.three,
    borderRadius: 50,
    borderTopWidth: 0,
  },
  tabShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
});
