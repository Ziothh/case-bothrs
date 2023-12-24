import utils, { clsx } from "~/utils";
import { SafeAreaView, ScrollView, View } from "../nativewind";

const CurriedScollableView = utils.component.curryProps(
  ScrollView,
  {
    horizontal: false,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: true,
  }
);

export const PageContainer: React.FC<React.ComponentProps<typeof View> & {
  /** @default true */
  scrollable?: boolean
}> = ({
  className,
  scrollable = true,
  ...props
}) => {
    const V = scrollable ? CurriedScollableView : View
    return (
      <SafeAreaView>
        <V {...props} className={clsx(
          'p-3 pt-2 h-full w-full',
          className,
        )} />
      </SafeAreaView>
    )
  };

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
