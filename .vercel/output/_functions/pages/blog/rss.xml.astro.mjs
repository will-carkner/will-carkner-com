import rss from '@astrojs/rss';
import { g as getCollection } from '../../chunks/_astro_content_BmfVM5oc.mjs';
export { renderers } from '../../renderers.mjs';

async function get(context) {
  const posts = await getCollection('blog');
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
