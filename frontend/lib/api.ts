import { Department, Functionary, ProgramKerja, GalleryItem, StrapiApiResponse, StrapiDataItem } from "./types";
import qs from 'qs';

/**
 * Fetches data from the Strapi API.
 */
async function fetchApi<T>(endpoint: string, queryParams: Record<string, any> = {}, options: RequestInit = {}): Promise<T> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  
  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true });
  const requestUrl = `${strapiUrl}/api${endpoint}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(requestUrl, {
      cache: 'no-store',
      ...options,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Strapi Error Body: ${errorBody}`);
      throw new Error(`Failed to fetch from Strapi: ${response.status} ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Strapi API fetch error:", error);
    throw new Error('Could not fetch data from Strapi.');
  }
}

/**
 * Fetches all functionaries, populating their photo and department.
 */
export async function getFunctionaries(): Promise<StrapiDataItem<Functionary>[]> {
  const query = {
    populate: { photo: true, department: { fields: ['name'] } },
    pagination: { limit: -1 }
  };
  const response = await fetchApi<StrapiApiResponse<StrapiDataItem<Functionary>[]>>('/functionaries', query);
  return response.data;
}

/**
 * Fetches all departments, populating their profile picture and members.
 */
export async function getDepartments(): Promise<StrapiDataItem<Department>[]> {
  const query = {
    populate: { profile_picture: true, functionaries: { populate: ['photo'] } }
  };
  const response = await fetchApi<StrapiApiResponse<StrapiDataItem<Department>[]>>('/departments', query);
  return response.data;
}

/**
 * Fetches all work programs, populating their department and images.
 */
export async function getPrograms(): Promise<StrapiDataItem<ProgramKerja>[]> {
  const query = {
    populate: ['department', 'main_image', 'poster_image']
  };
  const response = await fetchApi<StrapiApiResponse<StrapiDataItem<ProgramKerja>[]>>('/programs', query);
  return response.data;
}

/**
 * Fetches all gallery items, populating their images.
 */
export async function getGalleryItems(): Promise<StrapiDataItem<GalleryItem>[]> {
    const query = {
        populate: ['images'],
        sort: ['publishedAt:desc'],
    };
    const response = await fetchApi<StrapiApiResponse<StrapiDataItem<GalleryItem>[]>>('/gallery-items', query);
    return response.data;
}

/**
 * Fetches the total count of functionaries.
 */
export async function getFunctionariesCount(): Promise<number> {
    const query = { pagination: { pageSize: 1 } };
    const response = await fetchApi<StrapiApiResponse<[]>>('/functionaries', query);
    return response.meta?.pagination.total || 0;
}

/**
 * Fetches the total count of departments.
 */
export async function getDepartmentsCount(): Promise<number> {
    const query = { pagination: { pageSize: 1 } };
    const response = await fetchApi<StrapiApiResponse<[]>>('/departments', query);
    return response.meta?.pagination.total || 0;
}
