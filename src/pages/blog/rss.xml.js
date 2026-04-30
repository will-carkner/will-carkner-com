import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const posts = await getCollection('blog')
  return rss({
    title: "Will Carkner's Blog",
    description: "Things I'm learning and thinking about",
    site: context.site,
    items: posts
      .filter((info) => info.data.published === true)
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}/`,
      })),
  })
}
