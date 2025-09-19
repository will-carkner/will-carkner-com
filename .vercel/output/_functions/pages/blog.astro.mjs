/* empty css                                */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BUEHO2fz.mjs';
import { $ as $$Layout } from '../chunks/Layout_DsW7tR7Y.mjs';
import { $ as $$Section } from '../chunks/FormattedDate_D4iLkoSx.mjs';
import { g as getPosts, $ as $$ArticleDisplay } from '../chunks/funcs_CeIReeHe.mjs';
export { renderers } from '../renderers.mjs';

const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getPosts();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "show": true, "title": "Blog | Will Carkner" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Section", $$Section, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<h2>Writings</h2> ${renderComponent($$result3, "ArticleDisplay", $$ArticleDisplay, { "title": "All Posts", "posts": posts })} <a class="text-white font-mono font-bold no-underline hover:text-sky-400 text-base hover:underline" href="/blog/rss.xml">View RSS</a> ` })} ` })}`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/pages/blog.astro", void 0);

const $$file = "/Users/williamcarkner/coding/will-carkner-com/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
