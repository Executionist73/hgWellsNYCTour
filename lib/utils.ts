/**
 * Gets the base path for the application
 * This is necessary for GitHub Pages deployment where the app is in a subdirectory
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

/**
 * Prepends the base path to an asset URL
 * Use this for all static assets (audio, images, etc.)
 */
export function assetUrl(path: string): string {
  const basePath = getBasePath();
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}

