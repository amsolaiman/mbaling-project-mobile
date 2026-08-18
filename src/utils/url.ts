// ----------------------------------------------------------------------

/**
 * Determines whether a given path/url points to an external resource rather than
 * an internal app route. A path is external if it starts with a URL scheme
 * (http:, https:, mailto:, tel:, a custom deep link scheme, etc.) or is
 * protocol-relative (starts with "//"). Relative paths, query strings, and
 * fragments are treated as internal.
 *
 * @param path - string | null
 * @returns - true | false
 */
export function isExternalUrl(path?: string | null): boolean {
  if (!path) return false;

  const trimmed = path.trim();
  if (!trimmed) return false;

  if (trimmed.startsWith('//')) return true;

  const schemePattern = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

  return schemePattern.test(trimmed);
}
