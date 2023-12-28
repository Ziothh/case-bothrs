import { APIRouter } from "@acme/api/client";
import { Stack } from "expo-router";
import { api, theme } from "~/features"
import { Image, ScrollView, Text, View } from "~/features/nativewind";
import { TipCard } from "~/features/tips";
import utils, { react } from "~/utils"

const TIMESPAN_OPTIONS = (['day', 'week', 'month', 'year'] as const) satisfies utils.types.Tuple<
  4,
  APIRouter.Inputs['tip']['search']['timeSpan']
>;

export default () => {
  const search = react.useStateObject('');
  const timeSpan = react.useStateObject<typeof TIMESPAN_OPTIONS[number]>('week');

  const tips = api.tip.search.useQuery({
    search: search.value,
    timeSpan: timeSpan.value,
  });

  console.log({
    uri: require('../../assets/icons/arrow-left.svg')
  });

  return (
    <View className="flex-1 flex justify-center items-center">
      <Stack.Screen options={{
        title: 'Tips/FAQ',
        headerLargeTitle: true,
        headerStyle: { backgroundColor: theme.CONFIG.colors.blue[400] },
        headerSearchBarOptions: {
          inputType: 'text',
          // onChangeText: (e) => search.set(e.eventPhase)
          hideNavigationBar: false,
          hideWhenScrolling: true,
          barTintColor: 'rgba(255, 255, 255, 0.5)',
          tintColor: 'white',
          textColor: 'white',

          placeholder: 'Search topics'
        },
        // headerBackImageSource: {
        //   uri: require('../../assets/icons/arrow-left.svg')
        // },
        // headerTitle(props) {
        //   return null;
        //
        // },
      }} />



      <ScrollView horizontal={false} bounces contentInsetAdjustmentBehavior='automatic'>
        <Text>{JSON.stringify({
    uri: require('~/assets/icons/arrow-left.svg'),
    eue: require('~/assets/icons/eye.svg'),
    other: require('~/assets/images/spaghet.jpg'),
  })}</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          {tips.data && tips.data.map(x => <TipCard key={x.id} tip={x} />)}
        </View>
      </ScrollView>
    </View>
  );
}

// {false && (
//   <View className="relative px-6 py-5">
//     <View>
//       <theme.h1 className="text-[40px]" style={{ letterSpacing: -0.41 }}>
//         Tips/FAQ
//       </theme.h1>
//       <View>
//         <Text className="border border-blue-600 w-full">Input here</Text>
//       </View>
//       <View className="flex justify-between">
//         <View>
//           <Text>Tips of the {timeSpan.value}</Text>
//           <Text>{tips.data?.length ?? 0} total</Text>
//         </View>
//
//         <View className="border border-blue-600"><Text>{timeSpan.value}</Text></View>
//       </View>
//     </View>
//   </View>
// )}
