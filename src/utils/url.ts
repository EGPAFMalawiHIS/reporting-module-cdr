import { ApiRequestParam } from "@/interfaces";

/**
 * Checks if the path is an external link.
 * 
 * @param path - The path to check.
 * @returns true when the path is an external link. Otherwise, false.
 */
export const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path);

/**
 * Resolves the complete path based on the provided route path and base path.
 * 
 * @param routePath - The path of the route.
 * @param basePath - The base path.
 * @returns The resolved path.
 */
export function resolvePath(routePath: string, basePath: string): string {
  if (isExternal(routePath)) return routePath;
  if (isExternal(basePath)) return basePath;
  const path = `${basePath}/${routePath}`;
  return "/" + path.split("/").filter(Boolean).join("/");
};

/**
 * Constructs a parameterized URL by appending query parameters to the given URI.
 *
 * @param uri - The base URI to which parameters will be added.
 * @param params - An optional object containing key-value pairs of parameters.
 *                 The values can be of type string, boolean, or number.
 * @returns The parameterized URL with appended query parameters.
 */
export function parameterizeUrl(uri: string, params?: ApiRequestParam) {
  if(params) return uri + "?" +  Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
  return uri;
}