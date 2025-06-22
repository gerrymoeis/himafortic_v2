// =============================================================================
// GENERIC STRAPI TYPES
// =============================================================================

/** A helper type for Strapi's API response structure for collections. */
export interface StrapiApiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** A helper type for a single Strapi data object with attributes. */
export interface StrapiDataItem<T> {
  id: number;
  attributes: T;
}

/** A helper type for a Strapi relation that holds a single data item. */
export interface StrapiRelation<T> {
  data: StrapiDataItem<T> | null;
}

/** A helper type for a Strapi relation that holds multiple data items. */
export interface StrapiMediaRelation {
  data: StrapiDataItem<StrapiMedia>[] | null;
}

// =============================================================================
// MEDIA & COMPONENT TYPES
// =============================================================================

/** Specific type for Strapi's media format. */
export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

/** Specific type for the attributes of a Strapi Media object. */
export interface StrapiMedia {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// COLLECTION TYPES
// =============================================================================

/** Specific type for the attributes of a Functionary. */
export interface Functionary {
  name: string;
  position: string;
  period: string;
  NIM: string;
  class_year: string;
  createdAt: string;
  updatedAt: string;
  photo: StrapiRelation<StrapiMedia>;
  department: StrapiRelation<Department>;
}

/** Specific type for the attributes of a Department. */
export interface Department {
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  profile_picture: StrapiRelation<StrapiMedia>;
  functionaries: StrapiApiResponse<StrapiDataItem<Functionary>[]>;
  programs: StrapiApiResponse<StrapiDataItem<ProgramKerja>[]>;
}

/** Specific type for the attributes of a Program Kerja (Work Program). */
export interface ProgramKerja {
  name: string;
  description: string;
  status: 'Planned' | 'Ongoing' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  registration_link: string | null;
  info_link: string | null;
  department: StrapiRelation<Department>;
  main_image: StrapiRelation<StrapiMedia>;
  poster_image: StrapiRelation<StrapiMedia>;
  gallery_items: StrapiMediaRelation;
}

/** Specific type for the attributes of a Gallery Item. */
export interface GalleryItem {
    title: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images: StrapiMediaRelation;
}

/** Specific type for the attributes of an Article. */
export interface Article {
    title: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images: StrapiMediaRelation;
}
