import { View } from "react-native";
import { Text } from "react-native";
import { Link } from "expo-router";

const UnderConstruction: React.FC<{}> = () => {
  return (
    <View>
      <Text>
        This page is under construction
      </Text>
      <Link href={{ pathname: '/' }}>
        Go back to home page
      </Link>
    </View >
  );
}

export default UnderConstruction;
