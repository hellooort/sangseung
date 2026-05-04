import ContactClient from "./ContactClient";
import { getLocale } from "@/lib/locale.server";

export default async function ContactPage() {
  const locale = await getLocale();
  return <ContactClient locale={locale} />;
}
