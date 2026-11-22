import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts are included only in dev. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date | string): string {
  return dateFormat.format(typeof date === 'string' ? new Date(date) : date);
}

export function readingTime(body: string | undefined): string {
  const words = (body ?? '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Every tag with its post count, most used first. */
export function countTags(entries: { tags: string[] }[]): { tag: string; slug: string; count: number }[] {
  const map = new Map<string, { tag: string; slug: string; count: number }>();
  for (const item of entries) {
    for (const tag of item.tags) {
      const slug = tagSlug(tag);
      const entry = map.get(slug) ?? { tag, slug, count: 0 };
      entry.count += 1;
      map.set(slug, entry);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** One row in a post list: either a post on this site or one I wrote for another site. */
export interface Entry {
  title: string;
  href: string;
  date: Date;
  summary: string;
  tags: string[];
  /** Set when the post lives on another site. */
  source?: string;
  readingTime?: string;
}

export function toEntry(post: Post): Entry {
  return {
    title: post.data.title,
    href: `/blog/${post.id}/`,
    date: post.data.pubDate,
    summary: post.data.description,
    tags: post.data.tags,
    readingTime: readingTime(post.body),
  };
}

/** Posts on this site plus the ones published elsewhere, newest first. */
export async function getAllEntries(): Promise<Entry[]> {
  const { ELSEWHERE } = await import('../site.config');
  const own = (await getPosts()).map(toEntry);
  const other = ELSEWHERE.map((item) => ({
    title: item.title,
    href: item.href,
    date: new Date(item.date),
    summary: item.summary,
    tags: item.tags,
    source: item.source,
  }));
  return [...own, ...other].sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
