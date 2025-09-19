import { d as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, a as renderTemplate, b as renderSlot } from './astro/server_BUEHO2fz.mjs';
import { a as $$FormattedDate } from './FormattedDate_D4iLkoSx.mjs';
import { g as getCollection } from './_astro_content_BmfVM5oc.mjs';

const $$Astro$2 = createAstro("https://willcarkner.com");
const $$ArticleLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ArticleLink;
  const { post } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/blog/${post.slug}`, "href")} class="no-underline"> <div class="mb-2 flex-row justify-between flex hover:scale-105 duration-300"> <div class="flex-col text-left flex"> <p class="text-white font-bold text-xl">${post.data.title}</p> <p class="text-gray-400 text-sm font-mono"> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate })} </p> </div> <span class="text-white text-2xl">&rarr;</span> </div> </a>`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/components/ArticleLink.astro", void 0);

const $$Astro$1 = createAstro("https://willcarkner.com");
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Card;
  const { class: className, parentClass: parentClassName } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${addAttribute([parentClassName, " group relative list-none"], "class:list")}> <div${addAttribute([
    className,
    "shadow-slate-900 rounded-xl border-2 border-gray-600 bg-black p-6 flex flex-col items-center justify-center relative w-full shadow-lg"
  ], "class:list")}> ${renderSlot($$result, $$slots["default"])} </div> </li>`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/components/Card.astro", void 0);

const $$Astro = createAstro("https://willcarkner.com");
const $$ArticleDisplay = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArticleDisplay;
  const { posts, title, home } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", $$Card, { "parentClass": "w-full", "class": "space-y-4" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a class="no-underline" href="/blog"> <h4>${title}</h4> </a> <div class="w-full"> <ul> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "ArticleLink", $$ArticleLink, { "post": post })}`)} </ul> </div> ${home && renderTemplate`<a href="/blog" class="text-white font-mono font-bold no-underline hover:text-sky-400 text-base hover:underline">
Read More
</a>`}` })}`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/components/ArticleDisplay.astro", void 0);

const getPosts = async () => (await getCollection("blog")).filter((data) => data.data.published === true).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);

export { $$ArticleDisplay as $, $$Card as a, getPosts as g };
