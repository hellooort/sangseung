import MaintenanceClient from "./MaintenanceClient";
import { getLocale } from "@/lib/locale.server";

export default async function MaintenancePage() {
  const locale = await getLocale();
  return <MaintenanceClient locale={locale} />;
}
