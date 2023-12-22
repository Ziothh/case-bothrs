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

export const View = styled(_View);
export const ScrollView = styled(_ScrollView);
export const Text = styled(_Text);
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

