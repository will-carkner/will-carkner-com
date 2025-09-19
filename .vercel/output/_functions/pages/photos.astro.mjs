/* empty css                                */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_BUEHO2fz.mjs';
import { $ as $$Layout } from '../chunks/Layout_DsW7tR7Y.mjs';
export { renderers } from '../renderers.mjs';

const $$Photos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "show": true, "title": "Photos" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h2 class="pt-3">2024</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl py-4"> <div class="grid gap-4"> ${[
    {
      image: "/cool-photos/mullaghmore.jpeg",
      alt: "Image 1"
    },
    {
      image: "/cool-photos/math.jpeg",
      alt: "Image 2"
    },
    {
      image: "/cool-photos/brothers.jpeg",
      alt: "Image 3"
    },
    {
      image: "/cool-photos/sandwiches.jpeg",
      alt: "Image 4"
    }
  ].map(({ image, alt }) => renderTemplate`<div> <img class="h-auto max-w-full rounded-lg"${addAttribute(image, "src")}${addAttribute(alt, "alt")}> </div>`)} </div> <div class="grid gap-4"> ${[
    {
      image: "/cool-photos/bot.jpeg",
      alt: "Image 1"
    },
    {
      image: "/cool-photos/beach-new.jpeg",
      alt: "Image 2"
    },
    {
      image: "/cool-photos/lake.jpeg",
      alt: "Image 3"
    }
  ].map(({ image, alt }) => renderTemplate`<div> <img class="h-auto max-w-full rounded-lg"${addAttribute(image, "src")}${addAttribute(alt, "alt")}> </div>`)} </div> <div class="grid gap-2"> ${[
    {
      image: "/cool-photos/shoes.jpeg",
      alt: "Image 1"
    },
    {
      image: "/cool-photos/boat.jpeg",
      alt: "Image 2"
    },
    {
      image: "/cool-photos/france.jpeg",
      alt: "Image 3"
    },
    {
      image: "/cool-photos/kiara.jpeg",
      alt: "Image 4"
    }
  ].map(({ image, alt }) => renderTemplate`<div> <img class="h-auto max-w-full rounded-lg"${addAttribute(image, "src")}${addAttribute(alt, "alt")}> </div>`)} </div> <div class="grid gap-4"> ${[
    {
      image: "/cool-photos/borsht.jpeg",
      alt: "Image 1"
    },
    {
      image: "/cool-photos/oscar.jpeg",
      alt: "Image 2"
    },
    {
      image: "/cool-photos/bridge.jpeg",
      alt: "Image 3"
    }
  ].map(({ image, alt }) => renderTemplate`<div> <img class="h-auto max-w-full rounded-lg"${addAttribute(image, "src")}${addAttribute(alt, "alt")}> </div>`)} </div> </div> <h2 class="pt-3">2023</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl py-4"> <div class="grid gap-4"> ${[
    {
      image: "/cool-photos/beach.jpeg",
      alt: "Image 1"
    },
    {
      image: "/cool-photos/vedh-will.jpeg",
      alt: "Image 2"
    },
    {
      image: "/cool-photos/town.jpeg",
      alt: "Image 3"
    },
    {
      image: "/cool-photos/sf.jpeg",
      alt: "Image 4"
    }
  ].map(({ image, alt }) => renderTemplate`<div> <img class="h-auto max-w-full rounded-lg"${addAttribute(image, "src")}${addAttribute(alt, "alt")}> </div>`)} </div> <div class="grid gap-4"> ${[
    {
      image: "/cool-photos/weird.jpeg",
      alt: "Image 1"
    },
    {
      image: "/cool-photos/dublin.jpeg",
      alt: "Image 2"
    },
    {
      image: "/cool-photos/howth.jpeg",
      alt: "Image 3"
    }
  ].map(({ image, alt }) => renderTemplate`<div> <img class="h-auto max-w-full rounded-lg"${addAttribute(image, "src")}${addAttribute(alt, "alt")}> </div>`)} </div> <div class="grid gap-2"> ${[
    {
      image: "/cool-photos/will.jpeg",
      alt: "Image 1"
    },
    {
      image: "/cool-photos/food.jpeg",
      alt: "Image 2"
    },
    {
      image: "/cool-photos/tower.jpeg",
      alt: "Image 3"
    },
    {
      image: "/cool-photos/hospital.jpeg",
      alt: "Image 4"
    }
  ].map(({ image, alt }) => renderTemplate`<div> <img class="h-auto max-w-full rounded-lg"${addAttribute(image, "src")}${addAttribute(alt, "alt")}> </div>`)} </div> <div class="grid gap-4"> ${[
    {
      image: "/cool-photos/spain.jpeg",
      alt: "Image 1"
    },
    {
      image: "/cool-photos/gytis.jpeg",
      alt: "Image 2"
    },
    {
      image: "/cool-photos/italy.jpeg",
      alt: "Image 3"
    }
  ].map(({ image, alt }) => renderTemplate`<div> <img class="h-auto max-w-full rounded-lg"${addAttribute(image, "src")}${addAttribute(alt, "alt")}> </div>`)} </div> </div> ` })}`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/pages/photos.astro", void 0);

const $$file = "/Users/williamcarkner/coding/will-carkner-com/src/pages/photos.astro";
const $$url = "/photos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Photos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
