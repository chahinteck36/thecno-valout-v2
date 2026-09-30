/**
 * SEO & Canonical Management for TechVault-Pro
 * Official Canonical Domain: https://techvault-pro.store/
 */

export const OFFICIAL_SITE_URL = 'https://techvault-pro.store';

/**
 * Formats a clean canonical URL ensuring official domain and normalized path.
 */
export function getCanonicalUrl(path: string = '/'): string {
  let cleanPath = (path || '/').trim();
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  // Strip trailing slash except root
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  return cleanPath === '/' ? `${OFFICIAL_SITE_URL}/` : `${OFFICIAL_SITE_URL}${cleanPath}`;
}

export interface SeoOptions {
  title?: string;
  description?: string;
  canonicalPath?: string; // e.g. '/', '/templates', '/templates/my-slug'
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
}

/**
 * Updates head meta tags: Title, Description, Canonical URL, OpenGraph, and Twitter tags.
 * Always resolves canonical to https://techvault-pro.store/ regardless of current hostname (e.g. www or dev).
 */
export function updatePageSeo(options: SeoOptions) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const { title, description, canonicalPath, ogImage, ogType = 'website' } = options;

  if (title) {
    document.title = title;

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twTitle) {
      twTitle = document.createElement('meta');
      twTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twTitle);
    }
    twTitle.setAttribute('content', title);
  }

  if (description) {
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', description);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twDesc) {
      twDesc = document.createElement('meta');
      twDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twDesc);
    }
    twDesc.setAttribute('content', description);
  }

  if (canonicalPath !== undefined) {
    const fullCanonical = getCanonicalUrl(canonicalPath);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonical);

    let ogUrl = document.querySelector("meta[property='og:url']");
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', fullCanonical);
  }

  if (ogImage) {
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', ogImage);

    let twImg = document.querySelector('meta[name="twitter:image"]');
    if (!twImg) {
      twImg = document.createElement('meta');
      twImg.setAttribute('name', 'twitter:image');
      document.head.appendChild(twImg);
    }
    twImg.setAttribute('content', ogImage);
  }

  if (ogType) {
    let typeMeta = document.querySelector('meta[property="og:type"]');
    if (typeMeta) {
      typeMeta.setAttribute('content', ogType);
    }
  }
}
