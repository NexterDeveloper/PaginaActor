import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FilmographySection from '@/components/sections/FilmographySection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';
import { defaultProfile, defaultProjects, defaultGallery } from '@/lib/default-content';

export default async function HomePage() {
  // In production, fetch from Supabase here.
  // We use defaults so the site works immediately out-of-the-box.
  const profile = defaultProfile;
  const projects = defaultProjects;
  const gallery = defaultGallery;

  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          name={profile.name}
          tagline={profile.tagline}
          headshotUrl={profile.headshot_url}
        />
        <AboutSection
          bio={profile.bio}
          bioExtended={profile.bio_extended}
          height={profile.height}
          hair={profile.hair}
          eyes={profile.eyes}
          ageRange={profile.age_range}
          reelUrl={profile.reel_url}
        />
        <FilmographySection projects={projects} />
        <GallerySection images={gallery} />
        <ContactSection email={profile.email} />
      </main>
      <Footer />
    </>
  );
}
