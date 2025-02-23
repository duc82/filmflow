import en from "./locales/en.json";
import vi from "./locales/vi.json";

type Messages = typeof en & typeof vi;

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages;
}
