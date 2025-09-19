import { d as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, b as renderSlot, a as renderTemplate } from './astro/server_BUEHO2fz.mjs';

const $$Astro$1 = createAstro("https://willcarkner.com");
const $$Section = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Section;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute([
    className,
    "my-4 flex max-w-4xl p-4 lg:p-0 flex-col space-y-10 items-center w-full"
  ], "class:list")}> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/components/Section.astro", void 0);

const $$Astro = createAstro("https://willcarkner.com");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-uk", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  })} </time>`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/components/FormattedDate.astro", void 0);

export { $$Section as $, $$FormattedDate as a };
