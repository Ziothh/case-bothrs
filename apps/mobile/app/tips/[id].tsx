import { useLocalSearchParams } from "expo-router";
import { api } from "~/features";
import { Text } from "~/features/nativewind";

export default () => {
  const search = useLocalSearchParams<{
    id: string
  }>()
  const tip = api.tip.getOne.useQuery({ id: search.id });

  return (
    <Text className="p-4 text-white text-lg">{JSON.stringify(tip, null, 4)}</Text>

  );
}
