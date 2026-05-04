import IBSClient from "./IBSClient";
import { getLocale } from "@/lib/locale.server";

export default async function IBSPage() {
  const locale = await getLocale();
  return <IBSClient locale={locale} />;
}
