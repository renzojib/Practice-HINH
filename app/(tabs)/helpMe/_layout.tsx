import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '@/components/Header';
import { ImageBackground, SafeAreaView } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  return (

        <Stack >
          <Stack.Screen name="index" options={{headerShown: false}}/>
          <Stack.Screen name="additionalPages/addContacts" 
                        options={{headerTitle: "Personal Support Network", 
                                  headerStyle: {backgroundColor: "#009999",}, 
                                  headerTitleStyle: {color: "white", fontFamily: "GothicA1-Regular"}, 
                                  headerTintColor: "white",  }} />
          <Stack.Screen name="additionalPages/getHelpNow" 
                        options={{headerTitle: "Get Help Now", 
                          headerStyle: {backgroundColor: "#009999",}, 
                          headerTitleStyle: {color: "white", fontFamily: "GothicA1-Regular"},  
                          headerTintColor: "white",
                          headerTitleAlign: "center",  }}/>
        </Stack>

  );
}