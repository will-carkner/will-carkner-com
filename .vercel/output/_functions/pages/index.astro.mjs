/* empty css                                */
import { b as createAstro, c as createComponent, m as maybeRenderHead, g as addAttribute, a as renderTemplate, r as renderComponent, f as renderScript, u as unescapeHTML } from '../chunks/astro/server_qtT_TmK9.mjs';
import { $ as $$Layout } from '../chunks/Layout_Nvd8Jiuo.mjs';
import { g as getPosts, a as $$Card, $ as $$ArticleDisplay } from '../chunks/funcs_DiF8i-E9.mjs';
import { $ as $$Section } from '../chunks/FormattedDate_BaPYkBYD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://willcarkner.com");
const $$Project = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Project;
  const { title, tags, image, url, class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} target="_blank" class="no-underline w-full"> <div${addAttribute([
    "flex flex-row items-center duration-300 space-x-4 hover:scale-110"
  ], "class:list")}> <img${addAttribute(image, "src")}${addAttribute(["h-24 w-auto border border-gray-600 rounded-lg", className], "class:list")}${addAttribute(title + "image", "alt")}> <div class="flex flex-col space-y-2 text-left"> <p class="sm:text-2xl text-xl font-semibold"> ${title} </p> <div class="flex flex-wrap xs:flex-nowrap xs:flex-row xs:space-y-0 items-center justify-start space-x-2"> ${tags.map((tag) => renderTemplate`<span${addAttribute([
    "bg-slate-600 w-fit bg-opacity-50 text-xs shadow-lg rounded-md px-2 py-1 text-white",
    tags.indexOf(tag) === tags.length - 1 ? "mt-2 xs:mt-0 -translate-x-2 xs:translate-x-0" : ""
  ], "class:list")}> ${tag} </span>`)} </div> </div> </div> </a>`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/components/Project.astro", void 0);

const text = "childe hassam\nbowl of goldfish, 1912";
const imageUrl = "https://pbs.twimg.com/media/G714FGZWYAALsNP.jpg";
const cachedAt = "2025-12-11T03:44:09.854Z";
const artData = {
  text,
  imageUrl,
  cachedAt,
};

const $$Astro = createAstro("https://willcarkner.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const cachedDate = new Date(artData.cachedAt);
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - cachedDate.getTime();
  const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
  const lastUpdated = diffHours < 1 ? "last changed less than an hour ago" : `last changed ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const posts = (await getPosts()).slice(0, 3);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Will Carkner" }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Section", $$Section, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="grid w-full grid-cols-1 gap-8 md:flex-row md:flex"> <!-- ABOUT ME --> <div class="md:flex-1 space-y-8"> <div class="rounded-xl bg-gradient-to-r animate-gradient-x from-blue-600 via-purple-600 to-violet-600 p-0.5"> ${renderComponent($$result3, "Card", $$Card, { "class": "items-left !border-none !shadow-none" }, { "default": async ($$result4) => renderTemplate` <div class="flex-col text-left space-y-4 flex"> <div class="flex flex-row space-x-4"> <img alt="Will Carkner" src="will-c.jpg" class="w-24 h-auto rounded-lg"> <div class="flex flex-col justify-end text-left"> <h2>Will</h2> <h2>Carkner</h2> </div> </div> <p class="text-gray-400 font-mono bold-slate-p text-justify">
I'm a 19 year old <b> engineering</b> student, based in Dublin. I
<b>love</b> to build stuff!
</p><p class="text-gray-400 font-mono bold-slate-p text-justify">
I am currently <b>teaching myself</b> RF electronics and building
                a few fun side projects.
</p> <p class="text-gray-400 font-mono bold-slate-p text-justify">
I believe energy is the <b>most important resource of our time.
</b> I'm thinking about how the global grid <b>evolves</b> to meet
                demand.
</p> </div> ` })} </div> <!-- Writing --> ${renderComponent($$result3, "ArticleDisplay", $$ArticleDisplay, { "home": true, "title": "Writing", "posts": posts })} <!-- Music --> ${renderComponent($$result3, "Card", $$Card, {}, { "default": async ($$result4) => renderTemplate` <div class="flex flex-row items-center space-x-4 justify-center"> <img class="w-20 h-20 hover:scale-110 duration-300 hover:cursor-pointer border border-gray-600 rounded-md" src="dyer-maker.jpg" alt="dyer maker album cover"> <div class="flex flex-col text-left justify-center space-y-2"> <!-- <h4 class="mb-1">Music</h4> --> <p class="text-gray-400 font-mono"> <b class="text-white">D'yer Mak'er</b> by
<a class="hover:cursor-pointer" href="https://www.youtube.com/watch?app=desktop&v=xje-1sw3T0s&t=0s">Led Zepplin</a> </p> <p class="font-mono text-gray-400 font-bold">
my (current) favourite music
</p> </div> </div> ` })} <!-- Contact --> <div class="rounded-xl bg-gradient-to-r animate-gradient-x from-blue-600 via-purple-600 to-violet-600 p-0.5"> ${renderComponent($$result3, "Card", $$Card, { "class": "space-y-2 !border-none !shadow-none" }, { "default": async ($$result4) => renderTemplate` <p class="font-mono text-gray-400 bold-slate-p">
If any of what you see here seems interesting, I'd <b>love</b> to hear
              from you!
</p> <div class="flex flex-row space-x-4"> ${[
    {
      text: "/github",
      href: "https://github.com/will-carkner"
    },
    {
      text: "/x",
      href: "https://x.com/carknerwill"
    },
    {
      text: "/insta",
      href: "https://www.instagram.com/_willcarkner/"
    },
    {
      text: "/mail",
      href: "mailto:will@willcarkner.com"
    }
  ].map((item) => renderTemplate`<a${addAttribute(item.href, "href")} target="_blank" class="hover:duration-300 font-mono no-underline hover:underline hover:scale-110"> ${item.text} </a>`)} </div> <a class="text-white font-mono font-bold no-underline hover:text-sky-400 text-base hover:underline" href="/blog/contact">
learn more
</a> ` })} </div> <!-- Reading --> ${renderComponent($$result3, "Card", $$Card, { "class": "space-y-4" }, { "default": async ($$result4) => renderTemplate` <ul class="text-left font-mono list-disc text-gray-400 bold-slate-p pl-2"> <li>
RF Electronics Handbook | <b>American Radio Relay League</b> </li> <li>The Big Score | <b>Michael S. Malone</b></li> <li>Storm of Steel | <b>Ernst Jünger</b></li> </ul> <a class="text-white font-mono font-bold no-underline hover:text-sky-400 text-base hover:underline" href="/blog/reading">
view my notes
</a> ` })} ${renderComponent($$result3, "Card", $$Card, {}, { "default": async ($$result4) => renderTemplate` <div class="space-y-4"> <p class="text-gray-400 font-mono bold-slate-p text-left">
Do not go gentle into that good night,<br>
Old age should burn and rave at close of day;<br>
Rage, rage against the dying of the light.
</p> <p class="text-gray-400 font-mono bold-slate-p text-left">
Though wise men at their end know dark is right, <br>
Because their words had forked no lightning they <br>
Do not go gentle into that good night.
</p> <div id="full-poem-text" class="hidden space-y-4"> <p class="text-gray-400 font-mono bold-slate-p text-left">
Good men, the last wave by, crying how bright <br>
Their frail deeds might have danced in a green bay,<br>
Rage, rage against the dying of the light.
</p> <p class="text-gray-400 font-mono bold-slate-p text-left">
Wild men who caught and sang the sun in flight,<br>
And learn, too late, they grieved it on its way,<br>
Do not go gentle into that good night.
</p> <p class="text-gray-400 font-mono bold-slate-p text-left">
Grave men, near death, who see with blinding sight<br>
Blind eyes could blaze like meteors and be gay,<br>
Rage, rage against the dying of the light.
</p> <p class="text-gray-400 font-mono bold-slate-p text-left">
And you, my father, there on the sad height,<br>
Curse, bless, me now with your fierce tears, I pray.<br>
Do not go gentle into that good night.<br>
Rage, rage against the dying of the light.
</p> </div> <div class="flex flex-col space-y-2"> <p class="text-gray-400 font-mono text-left">- dylan thomas</p> <a class="text-white font-mono font-bold no-underline hover:text-sky-400 text-base hover:cursor-pointer hover:underline" id="full-poem">
view full poem
</a> ${renderScript($$result4, "/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </div> </div> ` })} </div> <!-- SECOND COLUMN --> <div class="md:flex-1 space-y-8"> <!-- Projects --> ${renderComponent($$result3, "Card", $$Card, { "class": "space-y-4" }, { "default": async ($$result4) => renderTemplate`  <div class="flex flex-col space-y-4 justify-end"> ${[
    {
      title: "Lumindt",
      tags: ["Hardware", "Energy", "EE"],
      image: "lumindt.png",
      url: "https://lumindt.com",
      class: "aspect-[3/2]"
    },
    {
      title: "Founders Site",
      tags: ["Astro", "Tailwind", "Client"],
      image: "founders.jpg",
      url: "https://joinfounders.co",
      class: "aspect-[3/2]"
    },
    {
      title: "BloodBox",
      tags: ["Hardware", "ML", "MedTech"],
      image: "bloodbox.jpg",
      url: "https://bloodbox.info"
    },
    {
      title: "Helio",
      tags: ["SaaS", "Client", "NextJS"],
      image: "helio.png",
      url: "https://helio-safety.com",
      class: "aspect-[3/2]"
    },
    {
      title: "Research",
      tags: ["Economics", "Genomics", "AI"],
      image: "research.jpeg",
      url: "https://willcarkner.com/blog/research",
      class: "aspect-[3/2]"
    },
    {
      title: "NDRC Event Site",
      tags: ["Landing Page", "Client"],
      image: "investor.png",
      url: "https://investordemoday.ndrc.ie",
      class: "aspect-[3/2]"
    },
    {
      title: "MLTCC Tennis",
      tags: ["Landing Page", "Client"],
      image: "mltcc.jpg",
      url: "https://mltcc.com",
      class: "aspect-[3/2]"
    },
    {
      title: "BattleBot",
      tags: ["Hardware", "Robotics"],
      image: "bot.jpeg",
      url: ""
    },
    {
      title: "TCD Hist Club",
      tags: ["Landing Page", "Client"],
      image: "hist-club.png",
      url: "https://tcdhistclub.com",
      class: "aspect-[3/2]"
    }
  ].map((item, i) => renderTemplate`<div${addAttribute(`project-${i}`, "id")}${addAttribute([i < 3 ? "visible" : "hidden"], "class:list")}> ${renderComponent($$result4, "Project", $$Project, { "title": item.title, "tags": item.tags, "image": "projects/" + item.image, "url": item.url, "class": item.class })} </div>`)} </div> <a class="text-white font-mono font-bold no-underline hover:text-sky-400 text-base hover:cursor-pointer hover:underline" id="more-projects">
view all work
</a> ${renderScript($$result4, "/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=1&lang.ts")}  ` })} <!-- CORE IDEAS --> <!-- <Card class="space-y-2">
          <ul class="flex flex-row space-x-4">
            {
              [
                {
                  idea: 'Learn',
                  href: '/blog/learn',
                },
                {
                  idea: 'Build',
                  href: '/blog/current',
                },
                {
                  idea: 'Impact',
                  href: '/blog/impact',
                },
              ].map((item) => (
                <li class="flex flex-row">
                  <a href={item.href}>
                    <div class="font-mono bold-slate-p">{item.idea}</div>
                  </a>
                  {item.idea !== 'Impact' ? <p class="pl-3">|</p> : ''}
                </li>
              ))
            }
          </ul>
          <div class="text-gray-400 font-mono bold-slate-p">
            I aim to <b>constantly learn</b>, <b>build tangible things</b>, and <b
              >focus on impact</b
            >.
          </div>
        </Card>
 --> <!--PHOTOS --> ${renderComponent($$result3, "Card", $$Card, {}, { "default": async ($$result4) => renderTemplate` <div class="space-y-4"> <!-- <h4>Photos</h4> --> <div class="flex flex-row space-x-2 md:space-x-4 items-center justify-center"> ${[
    {
      img: "cool-photos/beach.jpeg",
      alt: "Italian Beach"
    },
    {
      img: "cool-photos/city.jpeg",
      alt: "Matera"
    },
    {
      img: "cool-photos/town.jpeg",
      alt: "Italian town"
    }
  ].map((item) => renderTemplate`<img${addAttribute(item.alt, "alt")} class="w-20 h-30 sm:w-40 sm:h-32 border border-gray-600 rounded-lg"${addAttribute(item.img, "src")}>`)} </div> <div> <a class="text-white font-mono font-bold no-underline hover:text-sky-400 text-base hover:underline" href="/photos">
view my photos
</a> </div> </div> ` })} <!-- Quote--> ${renderComponent($$result3, "Card", $$Card, {}, { "default": async ($$result4) => renderTemplate` <div class="space-y-2"> <p class="text-gray-400 font-mono bold-slate-p text-left">
Fall in love and <b>stay in love</b>. Explode. Don't
              intellectualize. Get passionate about ideas. Cram your head full
              of images. Stay in the library. Stay off the internet and all that
              crap. <b>Read all the great books</b>. Read all the great poetry.
              See all the great films. Fill your life with metaphors. <b>And then explode.</b> </p> <div class="flex flex-row space-x-2"> <p class="text-gray-400 font-mono">- ray bradbury</p> </div> </div> ` })} ${renderComponent($$result3, "Card", $$Card, {}, { "default": async ($$result4) => renderTemplate` <div class="space-y-2"> <div class="relative group"> <img id="art-image"${addAttribute(artData.text, "alt")} class="w-full h-full border border-gray-600 rounded-lg hover:cursor-zoom-in"${addAttribute(artData.imageUrl, "src")}> <button id="open-art-modal" aria-label="View full screen" class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 hover:bg-black/60 text-white rounded-md px-2 py-1 text-sm"> <span class="-translate-y-50">⤢</span> </button> </div> <div id="art-modal" class="fixed -top-3 left-0 w-screen h-screen bg-black/95 hidden opacity-0 transition-opacity duration-200 items-center justify-center"> <button id="close-art-modal" aria-label="Close" class="absolute top-4 right-4 text-white/70 hover:text-white text-3xl">
×
</button> <img${addAttribute(artData.text, "alt")}${addAttribute(artData.imageUrl, "src")} class="max-w-[90vw] max-h-[90vh] rounded-lg border border-gray-700"> </div> ${renderScript($$result4, "/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=2&lang.ts")} <div class="flex flex-col items-center justify-center text-center space-y-2"> <p class="text-gray-400 font-mono italic whitespace-pre-line">${unescapeHTML(artData.text)}</p> <p class="text-gray-400 font-mono">${lastUpdated}</p> </div> </div> ` })} </div> </div> ` })} ` })}`;
}, "/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro", void 0);

const $$file = "/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
