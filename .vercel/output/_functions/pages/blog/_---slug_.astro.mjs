/* empty css                                   */
import { c as createComponent, m as maybeRenderHead, b as renderSlot, a as renderTemplate, d as createAstro, r as renderComponent } from '../../chunks/astro/server_BUEHO2fz.mjs';
import { g as getCollection } from '../../chunks/_astro_content_BmfVM5oc.mjs';
import { $ as $$Section, a as $$FormattedDate } from '../../chunks/FormattedDate_D4iLkoSx.mjs';
import { $ as $$Layout } from '../../chunks/Layout_DsW7tR7Y.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="shadow-slate-900 rounded-xl border border-gray-600 bg-black p-6 flex flex-col items-left justify-left relative w-full shadow-lg"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/components/BlogCard.astro", void 0);

const $$Astro$1 = createAstro("https://willcarkner.com");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, pubDate, updatedDate } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "show": true, "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Section", $$Section, { "class": "!mt-8" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-4"> <h2>${title}</h2> <div class="flex flex-row items-center justify-center space-x-4"> <p class="font-mono text-gray-400">
Published ${renderComponent($$result3, "FormattedDate", $$FormattedDate, { "date": pubDate })} </p> ${updatedDate && renderTemplate`<p class="font-mono text-gray-400"> | </p>
            <p class="font-mono text-gray-400">
Last Updated ${renderComponent($$result3, "FormattedDate", $$FormattedDate, { "date": updatedDate })} </p>`} </div> ${renderComponent($$result3, "Section", $$Section, { "class": "text-left md:text-justify" }, { "default": ($$result4) => renderTemplate` <article> ${renderComponent($$result4, "BlogCard", $$BlogCard, {}, { "default": ($$result5) => renderTemplate` ${renderSlot($$result5, $$slots["default"])} ` })} </article> ` })} </div> ` })}  ` })}`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/layouts/BlogPost.astro", void 0);

const $$Astro = createAstro("https://willcarkner.com");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { ...post.data }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/pages/blog/[...slug].astro", void 0);

const $$file = "/Users/williamcarkner/coding/will-carkner-com/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
