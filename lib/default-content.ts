import type { ActorProfile, Project, GalleryImage } from './types';

export const defaultProfile: ActorProfile = {
  name: 'Aythami Hernandez',
  tagline: 'Actor · Voz · Teatro',
  bio: 'Actor versátil con formación en teatro clásico y cinematografía contemporánea. Apasionado por explorar la profundidad humana a través del arte.',
  bio_extended: 'Con más de diez años de experiencia en escena, he desarrollado un lenguaje propio que combina la técnica stanislavskiana con la improvisación contemporánea. Mi trabajo abarca teatro, cine y series de televisión, siempre buscando roles que desafíen los límites.',
  headshot_url: '',
  reel_url: '',
  email: 'contacto@aythamihernandez.com',
  instagram: 'aythamihernandez',
  imdb: 'nm0000000',
  height: "1'78m",
  hair: 'Castaño oscuro',
  eyes: 'Marrones',
  age_range: '25-35',
};

export const defaultProjects: Project[] = [
  { id: '1', title: 'La Última Función', role: 'Protagonista', year: 2024, type: 'theater', description: 'Drama sobre la soledad y la redención ambientado en un teatro abandonado.', order_index: 0 },
  { id: '2', title: 'Entre Sombras', role: 'Detective Ruiz', year: 2023, type: 'tv', description: 'Serie de suspense emitida en prime time. 12 episodios.', order_index: 1 },
  { id: '3', title: 'Sal y Arena', role: 'Javier', year: 2023, type: 'film', description: 'Largometraje premiado en el Festival de Málaga.', order_index: 2 },
  { id: '4', title: 'Voces del Mar', role: 'Narrador', year: 2022, type: 'short', description: 'Cortometraje documental con voz en off.', order_index: 3 },
];

export const defaultGallery: GalleryImage[] = [];
