import { Functionary, StrapiApiResponse, StrapiDataItem } from "./types";

/**
 * Fetches data from the Strapi API.
 * @param endpoint The API endpoint to fetch (e.g., '/articles')
 * @param options Optional fetch options.
 * @returns The JSON response from the API.
 */
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  const url = `${strapiUrl}/api${endpoint}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store', // For now, we fetch fresh data on every request.
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Strapi: ${response.status} ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Strapi API fetch error:", error);
    throw new Error('Could not fetch data from Strapi.');
  }
}

/**
 * Fetches all functionaries from the API.
 * @returns A list of functionaries.
 */
export async function getFunctionaries(): Promise<StrapiDataItem<Functionary>[]> {
  const response = await fetchApi<StrapiApiResponse<StrapiDataItem<Functionary>[]>>('/functionaries');
  return response.data;
}

// We can add more functions here as needed, for example:
/*
export async function getArticles() {
  // ...
}
*/
