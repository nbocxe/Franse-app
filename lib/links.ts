/** Waar een les te vinden is: de grammatica heeft een eigen leespagina. */
export function lesLink(id: string): string {
  return id.endsWith(":grammatica") ? `/grammatica?h=${id.slice(1, id.indexOf(":"))}` : `/les?id=${encodeURIComponent(id)}`;
}
