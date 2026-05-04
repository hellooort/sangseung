import OverseasClient from "./OverseasClient";
import { getLocale } from "@/lib/locale.server";

export default async function OverseasPage() {
  const locale = await getLocale();
  return <OverseasClient locale={locale} />;
}
