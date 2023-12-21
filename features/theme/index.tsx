import { DarkTheme, Theme } from "@react-navigation/native";
import TW_CONFIG from '../../tailwind.config';
import type { ComponentProps, FC, } from "react";
import { Text } from "react-native";
import { clsx } from "~/utils";

// TODO: validate these TW_CONFIG properties
/** React Navigation `ThemeProvider` config */
export const CONFIG = {
  dark: true,
  colors: {
    // @ts-ignore
    text: TW_CONFIG.theme.colors.white,
    // @ts-ignore
    background: TW_CONFIG.theme.colors.background[900],
    // @ts-ignore
    primary: TW_CONFIG.theme.colors.cyan[400],
    // @ts-ignore
    card: TW_CONFIG.theme.colors.background[900],
    // @ts-ignore
    border: TW_CONFIG.theme.colors.background[900],
    notification: DarkTheme.colors.notification,
  },
} satisfies Theme;

const createTextWithClassName = (...baseClassNames: string[]): FC<ComponentProps<typeof Text>> => ({
  className,
  ...props
}) => (
  <Text {...props} className={clsx(...baseClassNames, className)} />
)

const TEXT_STYLES = {
  LIGHT: 'font-normal opacity-[70%]',
  BOLD: 'font-bold',
} as const;
export const h1 = createTextWithClassName('text-2xl font-bold');
export const h2 = {
  /** Default */
  bold: createTextWithClassName('text-xl font-black'),
  /** Used in subtitles, etc. */
  light: createTextWithClassName('text-xl', TEXT_STYLES.LIGHT),
} as const;
export const p = {
  bold: createTextWithClassName('text-base', TEXT_STYLES.BOLD),
  light: createTextWithClassName('text-base', TEXT_STYLES.LIGHT),
  sm: createTextWithClassName('text-sm', TEXT_STYLES.LIGHT),
  xs: createTextWithClassName('text-sm', TEXT_STYLES.LIGHT),
} as const;
