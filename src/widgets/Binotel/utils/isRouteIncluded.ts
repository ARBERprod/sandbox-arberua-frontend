export function isRouteIncluded(baseRoute: string, currentRoute: string): boolean {
  const normalizedBaseRoute = baseRoute.endsWith('/') ? baseRoute : `${baseRoute}/`;
  const normalizedCurrentRoute = currentRoute.endsWith('/') ? currentRoute : `${currentRoute}/`;

  return normalizedCurrentRoute.startsWith(normalizedBaseRoute);
}
