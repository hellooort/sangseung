import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
