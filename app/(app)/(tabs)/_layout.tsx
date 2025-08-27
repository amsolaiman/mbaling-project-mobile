import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
// @expo
import { Tabs } from 'expo-router';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
// assets
import { IconHome, IconManage, IconSearch, IconSettings, IconUser } from '@/assets/icons';

// ----------------------------------------------------------------------

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.primary,
        tabBarStyle: [
          styles.tabBar,
          styles.tabShadow,
          {
            height: 60,
            paddingBottom: 0,
            backgroundColor: Colors[colorScheme].card,
          },
        ],
        tabBarItemStyle: styles.tabItem,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconHome variant={focused ? 'solid' : 'outline'} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <IconSearch variant={focused ? 'solid' : 'outline'} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="manage"
        options={{
          title: 'Manage',
          tabBarIcon: ({ color, focused }) => (
            <IconManage variant={focused ? 'solid' : 'outline'} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <IconUser variant={focused ? 'solid' : 'outline'} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <IconSettings variant={focused ? 'solid' : 'outline'} size={24} color={color} />
          ),
        }}
      />
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
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginHorizontal: Dimensions.get('window').width * 0.05,
    position: 'absolute',
    marginBottom: 16,
    borderRadius: 50,
    borderTopWidth: 0,
  },
  tabShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
});
