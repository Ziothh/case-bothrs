import { clsx } from "~/utils";
import { SafeAreaView, View } from "../nativewind";

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
