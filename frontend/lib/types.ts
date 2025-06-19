// A helper type for Strapi's API response structure
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

// A helper type for a single Strapi data object with attributes
export interface StrapiDataItem<T> {
  id: number;
  attributes: T;
}

// Specific type for the attributes of a Functionary
export interface Functionary {
  name: string;
  createdAt: string;
  updatedAt: string;
  position: string;
  period: string;
  NIM: string;
  class_year: string;
  // The photo would be another StrapiDataItem if we were fetching it
  // photo: StrapiDataItem<StrapiMedia>;
}

// You can add other types here as we build more of the site
// For example:
/*
export interface Article {
  title: string;
  slug: string;
  content: string;
  publishedDate: string;
  // etc.
}

export interface StrapiMedia {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: { url: string; };
    small: { url: string; };
    medium: { url: string; };
    large: { url: string; };
  };
  url: string;
}
*/
