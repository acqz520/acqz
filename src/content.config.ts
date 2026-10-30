import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

/**
 * Pages CMS stores the wall-clock time from its date picker with a "Z" suffix,
 * e.g. 01:07 Beijing time is written as `01:07:00Z`. YAML turns that into a Date,
 * so treat a Date's UTC fields as wall-clock time in the site timezone.
 * Strings keep their own offset (e.g. "2026-10-31T10:00:00+08:00").
 */
function wallClockToInstant(value: unknown) {
  if (value === "" || value == null) return null;
  if (!(value instanceof Date)) return value;
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: config.site.timezone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(value)
      .map(p => [p.type, Number(p.value)])
  );
  const offset =
    Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second) -
    Math.floor(value.getTime() / 1000) * 1000;
  return new Date(value.getTime() - offset);
}

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.preprocess(wallClockToInstant, z.coerce.date()),
      modDatetime: z.preprocess(
        wallClockToInstant,
        z.coerce.date().optional().nullable()
      ),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, pages };
