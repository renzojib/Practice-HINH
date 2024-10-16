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
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "SpaceMono": require('../assets/fonts/SpaceMono-Regular.ttf'),
    "GothicA1-Black": require('../assets/fonts/Gothic_A1/GothicA1-Black.ttf'),
    "GothicA1-ExtraBold": require('../assets/fonts/Gothic_A1/GothicA1-ExtraBold.ttf'),
    "GothicA1-Bold": require('../assets/fonts/Gothic_A1/GothicA1-Bold.ttf'),
    "GothicA1-Regular": require('../assets/fonts/Gothic_A1/GothicA1-Regular.ttf'),
    "CrimsonText-Bold": require('../assets/fonts/Crimson_Text/CrimsonText-Bold.ttf'),
    "CrimsonText-Regular": require('../assets/fonts/Crimson_Text/CrimsonText-Regular.ttf'),
    "CrimsonText-Italic": require('../assets/fonts/Crimson_Text/CrimsonText-Italic.ttf')
});

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView>
      <Header></Header>
      </SafeAreaView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
    </ThemeProvider>
  );
}
