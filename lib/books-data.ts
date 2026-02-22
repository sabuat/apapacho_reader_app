// Mock data for books and chapters
export interface Chapter {
  id: string;
  number: number;
  title: string;
  content: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  cover: any;
  chapters: Chapter[];
  totalPages: number;
  tag: string;
}

// Sample chapters content
const CHAPTER_CONTENT = `En 'Bestias de Tierras Malditas', cada relato es un territorio habitado por personajes que deambulan entre la memoria y el abandono, entre la lluvia que inunda los patios y el hambre que silba en las aceras.

Historias que hablan de criaturas de carne y hueso, heridas por el exilio y la pobreza, seres que arrastran sus cicatrices como mapas de un viaje forzado. La tierra maldita no es un lugar, sino un estado del alma: ese rincón olvidado donde germinan la resistencia y el deseo de seguir caminando, incluso cuando el camino se ha borrado.

Un paisaje común donde la soledad y la supervivencia se encuentran, donde cada palabra es un acto de resistencia contra el olvido. Los personajes aquí no son héroes, sino testigos de su propia existencia, buscando en la oscuridad una razón para continuar.

La prosa de Sabuat Urbina Ribeiro captura la esencia de estos momentos, transformando lo cotidiano en poesía, lo marginal en universal. Cada historia es una invitación a reconocer la dignidad en los rincones olvidados, la belleza en la lucha por sobrevivir.`;

export const BOOKS: Book[] = [
  {
    id: "1",
    slug: "bestias-de-tierras-malditas",
    title: "Bestias de Tierras Malditas",
    author: "Sabuat Urbina Ribeiro",
    description:
      "En 'Bestias de Tierras Malditas', cada relato es un territorio habitado por personajes que deambulan entre la memoria y el abandono.",
    cover: require("@/assets/images/icon.png"),
    tag: "Cuentos",
    totalPages: 150,
    chapters: [
      {
        id: "1-1",
        number: 1,
        title: "El Primer Territorio",
        content: CHAPTER_CONTENT,
      },
      {
        id: "1-2",
        number: 2,
        title: "Memorias del Exilio",
        content: CHAPTER_CONTENT,
      },
      {
        id: "1-3",
        number: 3,
        title: "La Lluvia en los Patios",
        content: CHAPTER_CONTENT,
      },
      {
        id: "1-4",
        number: 4,
        title: "Cicatrices y Mapas",
        content: CHAPTER_CONTENT,
      },
      {
        id: "1-5",
        number: 5,
        title: "El Hambre que Silba",
        content: CHAPTER_CONTENT,
      },
      {
        id: "1-6",
        number: 6,
        title: "Resistencia en la Oscuridad",
        content: CHAPTER_CONTENT,
      },
    ],
  },
  {
    id: "2",
    slug: "la-ultima-dragona",
    title: "La Última Dragona",
    author: "Erika Villarroel",
    description:
      "En 'La Última Dragona', Erika Villarroel nos guía a través del viaje de Dalia, una joven que regresa al pueblo donde creció.",
    cover: require("@/assets/images/icon.png"),
    tag: "Novela Joven",
    totalPages: 200,
    chapters: [
      {
        id: "2-1",
        number: 1,
        title: "El Regreso",
        content: CHAPTER_CONTENT,
      },
      {
        id: "2-2",
        number: 2,
        title: "Nostalgia y Pérdida",
        content: CHAPTER_CONTENT,
      },
      {
        id: "2-3",
        number: 3,
        title: "Secretos Familiares",
        content: CHAPTER_CONTENT,
      },
      {
        id: "2-4",
        number: 4,
        title: "Reconciliaciones",
        content: CHAPTER_CONTENT,
      },
    ],
  },
  {
    id: "3",
    slug: "somos-hechos-de-palabras",
    title: "Somos hechos de palabras",
    author: "Sabuat Urbina Ribeiro",
    description:
      "Las crónicas de este libro consiguen adentrarse en una nueva forma de hablar, un nuevo lenguaje.",
    cover: require("@/assets/images/icon.png"),
    tag: "Ensayos",
    totalPages: 180,
    chapters: [
      {
        id: "3-1",
        number: 1,
        title: "La Lengua como Territorio",
        content: CHAPTER_CONTENT,
      },
      {
        id: "3-2",
        number: 2,
        title: "Entre Mundos y Culturas",
        content: CHAPTER_CONTENT,
      },
      {
        id: "3-3",
        number: 3,
        title: "Palabras que Abrazan",
        content: CHAPTER_CONTENT,
      },
    ],
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return BOOKS.find((book) => book.slug === slug);
}

export function getBookById(id: string): Book | undefined {
  return BOOKS.find((book) => book.id === id);
}

export function getChapterByNumber(book: Book, chapterNumber: number): Chapter | undefined {
  return book.chapters.find((ch) => ch.number === chapterNumber);
}
