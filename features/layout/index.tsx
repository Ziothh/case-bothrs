import { View, SafeAreaView, SafeAreaViewComponent } from "react-native";
import utils, { clsx } from "~/utils";

export const PageContainer: React.FC<React.ComponentProps<typeof View>> = ({
  className,
  ...props
}) => (
  <SafeAreaView>
    <View {...props} className={clsx(
      'p-3 pt-2 h-full w-full',
      className,
    )} />
  </SafeAreaView>
);
// export const PageContainer: React.FC<React.ComponentProps<typeof View>> = ({
//   className,
//   children,
//   ...props
// }) => {
//   return (
//     <SafeAreaViewComponent
//   )
//
// }