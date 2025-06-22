import { getDepartmentsCount, getFunctionariesCount } from "@/lib/api";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import NumberTicker from "@/components/magicui/number-ticker";
import HeroSection from "@/components/page/hero-section";
import { Globe, GraduationCap, Users } from "lucide-react";

const features = [
  {
    Icon: Users,
    name: "Struktur Organisasi",
    description: "Kenali lebih dekat para pengurus HIMAFORTIC.",
    href: "/organization",
    cta: "Lihat Struktur",
    className: "col-span-3 lg:col-span-1",
    img: "https://himafortic.unesa.ac.id/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-05-at-13.06.35.jpeg",
    background: <></>
  },
  {
    Icon: Globe,
    name: "Program Kerja",
    description: "Jelajahi berbagai program kerja inovatif kami.",
    href: "/programs",
    cta: "Lihat Program",
    className: "col-span-3 lg:col-span-2",
    img: "https://himafortic.unesa.ac.id/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-23-at-15.00.49.jpeg",
    background: <></>
  },
  {
    Icon: GraduationCap,
    name: "Galeri Kegiatan",
    description: "Lihat kembali momen-momen berharga kami.",
    href: "/gallery",
    cta: "Lihat Galeri",
    className: "col-span-3 lg:col-span-2",
    img: "https://himafortic.unesa.ac.id/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-05-at-13.06.35-1.jpeg",
    background: <></>
  },
  {
    Icon: Users,
    name: "Tentang Kami",
    description: "Informasi lebih lanjut tentang HIMAFORTIC.",
    href: "/about",
    cta: "Selengkapnya",
    className: "col-span-3 lg:col-span-1",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    background: <></>
  },
];

export default async function Home() {
  const [functionariesCount, departmentsCount] = await Promise.all([
    getFunctionariesCount(),
    getDepartmentsCount(),
  ]);

  return (
    <main>
      <HeroSection />

      <section className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 font-tomorrow">Tentang Komunitas Kami</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            HIMAFORTIC adalah wadah bagi mahasiswa Teknik Informatika UNESA untuk berkembang, berkolaborasi, dan berinovasi bersama.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
            <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg">
              <h3 className="text-5xl font-bold text-primary mb-2"><NumberTicker value={functionariesCount} /></h3>
              <p className="text-muted-foreground">Anggota & Pengurus</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg">
              <h3 className="text-5xl font-bold text-primary"><NumberTicker value={departmentsCount} /></h3>
              <p className="text-muted-foreground">Departemen</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg">
              <h3 className="text-5xl font-bold text-primary"><NumberTicker value={20} />+</h3>
              <p className="text-muted-foreground">Program Kerja Tahunan</p>
            </div>
          </div>

          <BentoGrid className="lg:grid-rows-2">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>
    </main>
  );
}
