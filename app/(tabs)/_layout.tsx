import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// icons needed for tab bar
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from '@/components/Header';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName='/helpMe/index'
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
        {/* <Tabs.Screen
          name="helpMe/additionalPages/addContacts"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="helpMe/additionalPages/getHelpNow"
          options={{
            href: null,
          }}
        /> */}
        <Tabs.Screen
          name="helpMe"
          options={{
            title: 'Help Me',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'hand-left' : 'hand-left-outline'} color={color} size={24} />
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
              <MaterialCommunityIcons name={focused ? "plus-thick" : "plus-outline"} size={24} color={color} />
            ),
          }}
        />
    </Tabs>
  );
}
