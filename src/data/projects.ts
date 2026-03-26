export const PROJECT_SLUGS = [
  'ummah',
  'research',
  'baconhead',
  'surprise',
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export function isProjectSlug(s: string): s is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(s);
}
