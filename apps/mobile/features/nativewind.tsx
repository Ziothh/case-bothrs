import { styled } from "nativewind";
import { LinkProps, Link as _Link } from 'expo-router'
import {
  View as _View,
  ScrollView as _ScrollView,
  Text as _Text,
  SafeAreaView as _SafeAreaView,
  Pressable as _Pressable,
  Image as _Image
} from "react-native";
import { clsx } from "~/utils";

export const View = styled(_View);
export const ScrollView = styled(_ScrollView);
const _T = styled(_Text);
// @ts-ignore
export const Text: typeof _T = ({ className, style, ...props }) => {
  const fontSizes = {
    normal: className?.lastIndexOf('font-normal'),
    bold: className?.lastIndexOf('font-bold'),
    black: className?.lastIndexOf('font-black'),
  };

  const family = Object
    .entries(fontSizes)
    .filter(([_, index]) => (index ?? -1) >= 0)
    .sort((a, b) => a[1]! - b[1]!)
    .pop()?.[0]


  return (
    <_T {...props} className={clsx('text-white tracking-[-0.45em]', className)} style={{
      fontFamily: family
        ? `Lato-${family}`
        : 'Lato'
    }} />
  )
};
export const SafeAreaView = styled(_SafeAreaView);
export const Pressable = styled(_Pressable);
export const Image = styled(_Image);


// Fix for broken href type
interface LinkComponent {
  <T>(props: React.PropsWithChildren<LinkProps<T> & {
    className?: string
  }>): JSX.Element;
  /** Helper method to resolve an Href object into a string. */
  // resolveHref: <T>(href: Href<T>) => string;
}
export const Link: LinkComponent = styled(_Link) as any;

