import { useGlobalSearchParams } from "expo-router";
import { api } from "~/features";
import { ScrollView, Text } from "~/features/nativewind";


const TipPage: React.FC<{}> & {
  usePageData: typeof usePageData
} = () => {
  const { tip } = TipPage.usePageData();

  return (
    <ScrollView className="px-6 py-8">
      <Text className="text-white text-[18px] font-normal leading-6" style={{
        letterSpacing: -0.53,
      }}>
        {tip.text}
      </Text>
    </ScrollView>
  );
}

const usePageData = () => {
  const search = useGlobalSearchParams<{
    id: string
  }>()
  const tip = api.tip.getOne.useQuery({ id: search.id }, {
    suspense: true,
  });

  if (tip.data === undefined) throw new Error('Could not fetch tip data');
  if (tip.data === null) throw new Error('Tip data is null');

  return {
    tip: tip.data
  }
}
TipPage.usePageData = usePageData;

export default TipPage;
