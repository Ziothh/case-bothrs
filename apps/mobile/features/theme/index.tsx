import { DarkTheme, Theme } from "@react-navigation/native";
import TW_CONFIG from '../../tailwind.config';
import type { ComponentProps, FC, } from "react";
import { Text } from "~/features/nativewind";
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
    // @ts-ignore
    blue: TW_CONFIG.theme.colors.blue as { 400: string, 600: string },
  },
} satisfies Theme;

const createTextWithClassName = (...baseClassNames: string[]): FC<ComponentProps<typeof Text>> => ({
  className,
  ...props
}) => (
  <Text {...props} className={clsx(...baseClassNames, className)} />
)

const TEXT_STYLES = {
  SHARED: 'text-white',
  LIGHT: 'font-normal opacity-[0.7]',
  BOLD: 'font-bold',
  BLACK: 'font-black',
} as const;

export const h1 = createTextWithClassName(TEXT_STYLES.SHARED, 'text-2xl leading-[40px] font-bold');
export const h2 = {
  /** Default */
  bold: createTextWithClassName(TEXT_STYLES.SHARED, 'text-xl font-black'),
  /** Used in subtitles, etc. */
  light: createTextWithClassName(TEXT_STYLES.SHARED, 'text-xl leading-[24px]', TEXT_STYLES.LIGHT),
} as const;
export const h3 = createTextWithClassName(TEXT_STYLES.SHARED, 'text-lg leading-[26px]', TEXT_STYLES.BLACK);
export const p = {
  bold: createTextWithClassName(TEXT_STYLES.SHARED, 'text-base leading-[20px]', TEXT_STYLES.BOLD),
  light: createTextWithClassName(TEXT_STYLES.SHARED, 'text-base', TEXT_STYLES.LIGHT),
  sm: createTextWithClassName(TEXT_STYLES.SHARED, 'text-sm', TEXT_STYLES.LIGHT),
  xs: createTextWithClassName(TEXT_STYLES.SHARED, 'text-sm', TEXT_STYLES.LIGHT),
} as const;
