import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function get(context) {
  const posts = await getCollection('blog')
  return rss({
    title: "Will Carkner's Blog",
    description: "Things I'm learning and thinking about",
    site: context.site,
    items: posts
      .filter((info) => info.data.published === true)
      .map((post) => ({
        ...post.data,
        link: `/blog/${post.slug}/`,
      })),
  })
}
