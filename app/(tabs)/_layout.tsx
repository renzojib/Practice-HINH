import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// icons needed for tab bar
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const handshakeSolid = <MaterialCommunityIcons name="handshake" size={24} color="black" />

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
        <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
        />
        <Tabs.Screen
          name="helpMe/index"
          options={{
            title: 'Help Me',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="helpOthers/index"
          options={{
            title: 'Help Others',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? "handshake" : "handshake-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="emergencyContacts/index"
          options={{
            title: 'E-Contacts',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        />
    </Tabs>
  );
}
