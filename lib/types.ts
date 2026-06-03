export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  year: number;
  type: 'film' | 'tv' | 'theater' | 'short';
  description: string;
  image_url?: string;
  trailer_url?: string;
  order_index: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  order_index: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface ActorProfile {
  name: string;
  tagline: string;
  bio: string;
  bio_extended: string;
  headshot_url: string;
  reel_url: string;
  email: string;
  instagram: string;
  imdb: string;
  height: string;
  hair: string;
  eyes: string;
  age_range: string;
}
