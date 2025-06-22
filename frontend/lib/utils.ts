import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { StrapiDataItem, StrapiMedia } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** A helper function to get the full URL for Strapi media. */
export function getStrapiMediaUrl(media: StrapiDataItem<StrapiMedia> | null | undefined): string | null {
  if (!media || !media.attributes) {
    return null;
  }
  const url = media.attributes.url;
  if (url.startsWith('/')) {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${url}`;
  }
  return url;
}
