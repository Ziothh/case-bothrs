import { APIRouter } from "@acme/api/client";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import Icon from "~/components/icons/Icon";
import { api, theme } from "~/features"
import { Image, ScrollView, Text, View } from "~/features/nativewind";
import { TipCard } from "~/features/tips";
import utils, { react } from "~/utils"

const TIMESPAN_OPTIONS = (['day', 'week', 'month', 'year'] as const) satisfies utils.types.Tuple<
  4,
  APIRouter.Inputs['tip']['search']['timeSpan']
>;

const [usePageCtx, PageCtxProvider] = utils.react.contextFactory(() => {
  const search = react.useStateObject('');
  const timeSpan = react.useStateObject<typeof TIMESPAN_OPTIONS[number]>('week');

  const tips = api.tip.search.useQuery({
    search: search.value,
    timeSpan: timeSpan.value,
  }, {
    keepPreviousData: true,
  });

  return {
    search,
    timeSpan: {
      ...timeSpan,
      options: TIMESPAN_OPTIONS,
    },
    tips,
  } as const;
});

export default utils.component.withWrapper(() => {
  const { tips, search } = usePageCtx()

  return (
    <View className="flex-1 flex justify-center items-center">
      <Stack.Screen options={{
        title: 'Tips/FAQ',
        headerLargeTitle: true,
        headerStyle: { backgroundColor: theme.CONFIG.colors.blue[400] },
        headerBackground: () => null,
        headerSearchBarOptions: {
          inputType: 'text',
          onChangeText: (e) => search.set(e.nativeEvent.text),
          hideNavigationBar: false,
          hideWhenScrolling: false,
          barTintColor: 'rgba(255, 255, 255, 0.5)',
          tintColor: 'white',
          textColor: 'white',
          placeholder: 'Search topics'
        },
      }} />

      <ScrollView horizontal={false} bounces={false} contentInsetAdjustmentBehavior='automatic'
        className="w-full"
      >
        <Header.Component />
        <Header.Decoration />

        <View className="relative -z-10 flex flex-col px-[10px] py-5 w-full" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          {tips.data && tips.data.map(x => <TipCard key={x.id} tip={x} />)}
        </View>
      </ScrollView>
    </View>
  );
}, PageCtxProvider)


namespace Header {
  export const Component: React.FC<{}> = () => {
    const { tips, timeSpan } = usePageCtx();

    return (
      <View className="
      relative z-10 w-full
      flex flex-col justify-center
      ">
        <View className="flex flex-row justify-between bg-blue-400 px-6 pt-5 ">
          <View>
            <Text className="text-white text-base leading-none">
              Tips of the {timeSpan.value}
            </Text>
            <Text className="text-white text-sm leading-none opacity-70">{tips.data?.length ?? 0} total</Text>
          </View>

          <Select
            value={timeSpan.value}
            onChange={timeSpan.set}
            options={timeSpan.options}
          />

        </View>
      </View>
    );
  }

  export const Decoration: React.FC = () => (
    <View className="relative w-full h-[80px] overflow-hidden flex items-center -mb-[80px] -z-50">
      <Icon name="HeaderDecoration"
        width={580}
        className="text-blue-400 absolute bottom-0 -z-50"
      />
    </View>
  )

  const Select = <T extends string>(props: {
    value: T,
    options: T[]
    onChange: (newValue: T) => void
  }) => {
    const isOpen = react.useStateObject(false);

    const asTitle = (str: string) => `${str[0]?.toUpperCase()}${str.slice(1)}`;

    return (
      <View className="relative">
        <Pressable onPress={(e) => {
          e.stopPropagation();
          isOpen.set(prev => !prev);
        }}
        >
          <View className="px-[14px] w-[100px] rounded-[10px] bg-white/50 flex flex-row justify-between items-center">
            <Text className="text-white text-base leading-10 font-bold">
              {asTitle(props.value)}
            </Text>
            <Icon name="ChevronDown" />
          </View>
        </Pressable>

        {isOpen.value && (
          <View className="
          absolute top-full mt-2 z-50
          w-full overflow-hidden 
          bg-blue-400 rounded-[10px]
          ">
            {props.options.filter(x => x !== props.value).map((x, i) => (
              <Pressable key={x} onPress={(e) => {
                e.stopPropagation()
                props.onChange(x);
                isOpen.set(false);
              }}>
                {i !== 0 && (
                  <View className="w-full h-[1px] bg-white/75" />
                )}
                <View className="px-[14px] bg-white/50">
                  <Text className="text-white text-base leading-10 font-bold">
                    {asTitle(x)}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    )
  }
}
