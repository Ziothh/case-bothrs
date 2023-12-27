import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

import { NativeWindStyleSheet } from "nativewind";
import { View } from '~/features/nativewind';
import { theme } from '~/features';
import { _APIProvider as APIProvider, api } from '~/features/api';
import { component } from '~/utils';
import { useQuery } from '@tanstack/react-query';


// This fixes nativewind styles not working on web
NativeWindStyleSheet.setOutput({
  default: "native",
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default component.withWrapper(
  () => {
    const [loaded, error] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
      ...FontAwesome.font,
    });
    const tipOfDay = api.tip.tipOfDay.get.useQuery();
    const topics = api.topic.getLatest.useQuery()

    const allLoaded = loaded
      && !tipOfDay.isLoading 
      && !topics.isLoading

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
      if (error) throw error;
    }, [error]);

    useEffect(() => {
      if (allLoaded) {
        SplashScreen.hideAsync();
      }
    }, [allLoaded]);

    if (!allLoaded) return null;

    return <RootLayoutNav />;

  },
  APIProvider
);

function RootLayoutNav() {
  return (
    <ThemeProvider value={theme.CONFIG}>
      <View className='bg h-full w-full'>
        <Stack screenOptions={{}}>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="tips" options={{}} />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
