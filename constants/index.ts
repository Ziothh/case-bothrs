import { DarkTheme, Theme } from "@react-navigation/native";
import TW_CONFIG from '../tailwind.config';

// TODO: validate these TW_CONFIG properties
export const THEME = {
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
