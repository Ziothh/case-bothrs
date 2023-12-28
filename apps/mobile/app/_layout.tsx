import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { NativeWindStyleSheet } from "nativewind";
import { Image, Pressable, Text, View } from '~/features/nativewind';
import { theme } from '~/features';
import { _APIProvider as APIProvider, api } from '~/features/api';
import { component, loadImages, parseImageUrl } from '~/utils';
import TipPage from './tips/[id]';
import Icon from '~/components/icons/Icon';


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
  initialRouteName: '(main)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default component.withWrapper(
  () => {
    const [showApp, setShowApp] = useState(false);
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
      if (!showApp && (!loaded || tipOfDay.isLoading || topics.isLoading)) return;

      loadImages(
        [
          tipOfDay.data!.imageUrl,
        ].filter(x => typeof x === 'string' && x !== '')
      )
        .then(() => SplashScreen.hideAsync())
        .then(() => setShowApp(true));
    }, [showApp, loaded, tipOfDay.isLoading, topics.isLoading]);


    return showApp
      ? <RootLayoutNav />
      : <View className='bg-background-900 h-full' />;
  },
  APIProvider
);

function RootLayoutNav() {
  return (
    <ThemeProvider value={theme.CONFIG}>
      <View className='bg-background-900 h-full w-full'>
        <Stack screenOptions={{
          headerLeft(props) {
            const router = useRouter()

            return props.canGoBack
              ? (
                <Pressable onPress={router.back}>
                  <Icon name='ArrowLeft' className="w-[22px] h-6" />
                </Pressable>
              )
              : null;
          }
        }} >
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
