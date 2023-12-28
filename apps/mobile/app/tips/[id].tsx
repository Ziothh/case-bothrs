import { Stack, useGlobalSearchParams } from "expo-router";
import Icon from "~/components/icons/Icon";
import { api } from "~/features";
import { Image, Pressable, ScrollView, Text, View } from "~/features/nativewind";
import { parseImageUrl } from "~/utils";

export default () => {
  const search = useGlobalSearchParams<{
    id: string
  }>()
  const tip = api.tip.getOne.useQuery({ id: search.id }, {
    suspense: true,
  });

  if (tip.data === undefined) throw new Error('Could not fetch tip data');
  if (tip.data === null) throw new Error('Tip data is null');

  return (
    <View className="flex-1 flex justify-center items-center">
      <Stack.Screen options={{
        headerShown: true,
        header(props) {
          return (
            <View className='relative h-[220px] w-full bg-blue-400'>
              <Image
                className='absolute top-0 left-0 h-full w-full'
                source={{ uri: parseImageUrl(tip.data!.imageUrl) }}
              />

              <View className='
                  relative z-10 h-full 
                  px-6 py-7 
                  flex flex-col justify-end 
                  '>
                <Pressable onPress={props.navigation.goBack}>
                  <Icon name='ArrowLeft' />
                </Pressable>
                <Text className='mt-[33.5px] text-[26px] leading-[30px] font-black text-white'>
                  {tip.data!.title}
                </Text>
              </View>
            </View>
          );
        },
      }} />
      <ScrollView className="px-6 py-8">
        <Text className="text-white text-[18px] font-normal leading-6" style={{
          letterSpacing: -0.53,
        }}>
          {tip.data.text}
        </Text>
      </ScrollView>
    </View>
  );
}
