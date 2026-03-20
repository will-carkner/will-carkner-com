import { t as decodeKey } from './chunks/astro/server_qtT_TmK9.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DpBZhbNs.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/williamcarkner/coding/will-carkner-com/","cacheDir":"file:///Users/williamcarkner/coding/will-carkner-com/node_modules/.astro/","outDir":"file:///Users/williamcarkner/coding/will-carkner-com/dist/","srcDir":"file:///Users/williamcarkner/coding/will-carkner-com/src/","publicDir":"file:///Users/williamcarkner/coding/will-carkner-com/public/","buildClientDir":"file:///Users/williamcarkner/coding/will-carkner-com/dist/client/","buildServerDir":"file:///Users/williamcarkner/coding/will-carkner-com/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/blog\\/rss\\.xml\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/rss.xml.js","pathname":"/blog/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"gift/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/gift","isIndex":false,"type":"page","pattern":"^\\/gift\\/?$","segments":[[{"content":"gift","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gift.astro","pathname":"/gift","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"photos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/photos","isIndex":false,"type":"page","pattern":"^\\/photos\\/?$","segments":[[{"content":"photos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/photos.astro","pathname":"/photos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.13.9_@types+node@16.18.11_@vercel+functions@2.2.13_jiti@1.21.6_rollup@4.51.0_typescript@4.9.5_yaml@2.6.0/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/blog.BIRHqTko.css"},{"type":"external","src":"/_astro/_slug_.jnBNZuEz.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://willcarkner.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/williamcarkner/coding/will-carkner-com/src/pages/gift.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/pages/blog/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/utils/funcs.ts",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/pages/blog.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/pages/photos.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.13.9_@types+node@16.18.11_@vercel+functions@2.2.13_jiti@1.21.6_rollup@4.51.0_typescript@4.9.5_yaml@2.6.0/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/blog/rss.xml@_@js":"pages/blog/rss.xml.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/gift@_@astro":"pages/gift.astro.mjs","\u0000@astro-page:src/pages/photos@_@astro":"pages/photos.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_q5bRK6lm.mjs","/Users/williamcarkner/coding/will-carkner-com/node_modules/.pnpm/astro@5.13.9_@types+node@16.18.11_@vercel+functions@2.2.13_jiti@1.21.6_rollup@4.51.0_typescript@4.9.5_yaml@2.6.0/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_6yq99AC4.mjs","/Users/williamcarkner/coding/will-carkner-com/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/williamcarkner/coding/will-carkner-com/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CWM1yCSY.mjs","/Users/williamcarkner/coding/will-carkner-com/src/pages/gift.astro?astro&type=script&index=0&lang.ts":"_astro/gift.astro_astro_type_script_index_0_lang.BHq4YDtk.js","/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.DfwkCvOU.js","/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=1&lang.ts":"_astro/index.astro_astro_type_script_index_1_lang.CSv6-mDL.js","/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=2&lang.ts":"_astro/index.astro_astro_type_script_index_2_lang.BGfaT6cc.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/williamcarkner/coding/will-carkner-com/src/pages/gift.astro?astro&type=script&index=0&lang.ts","const i=document.getElementById(\"fireworks\"),n=i.getContext(\"2d\");let a=[],s=!1;function f(){i.width=window.innerWidth,i.height=window.innerHeight}f();window.addEventListener(\"resize\",f);const h=[\"#d4a088\",\"#7fb5b0\",\"#b8836f\",\"#e8c4a8\",\"#8cc4bf\",\"#d98a72\",\"#6ba8a2\",\"#e6b090\",\"#c47a62\",\"#9dd4ce\"];function l(e,t){for(let o=0;o<60;o++){const r=Math.PI*2*o/60+(Math.random()-.5)*.3,d=2+Math.random()*4;a.push({x:e,y:t,vx:Math.cos(r)*d,vy:Math.sin(r)*d,life:1,color:h[Math.floor(Math.random()*h.length)],size:2+Math.random()*2})}s||(s=!0,u())}function u(){n.clearRect(0,0,i.width,i.height),a=a.filter(e=>e.life>0);for(const e of a)e.x+=e.vx,e.y+=e.vy,e.vy+=.06,e.vx*=.985,e.life-=.012,n.globalAlpha=e.life,n.fillStyle=e.color,n.beginPath(),n.arc(e.x,e.y,e.size*e.life,0,Math.PI*2),n.fill();n.globalAlpha=1,a.length>0?requestAnimationFrame(u):(s=!1,n.clearRect(0,0,i.width,i.height))}function g(e){const t=e.getBoundingClientRect(),c=t.left+t.width/2,o=t.top+t.height/2;l(c,o),setTimeout(()=>l(c-60+Math.random()*120,o-40),150),setTimeout(()=>l(c-60+Math.random()*120,o-20),300)}document.querySelectorAll(\".destination-card\").forEach(e=>{e.addEventListener(\"click\",()=>{document.querySelectorAll(\".destination-card\").forEach(t=>t.classList.remove(\"selected\")),e.classList.add(\"selected\"),g(e)})});const m=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add(\"visible\")})},{threshold:.15});document.querySelectorAll(\".fade-in\").forEach(e=>{m.observe(e)});"],["/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"open-art-modal\"),e=document.getElementById(\"art-modal\"),d=document.getElementById(\"close-art-modal\"),a=()=>{e.classList.remove(\"hidden\"),e.classList.add(\"flex\"),requestAnimationFrame(()=>{e.classList.add(\"opacity-100\"),e.classList.remove(\"opacity-0\")}),document.documentElement.classList.add(\"overflow-hidden\")},n=()=>{e.classList.add(\"opacity-0\"),e.classList.remove(\"opacity-100\");const t=o=>{o.target===e&&(e.removeEventListener(\"transitionend\",t),e.classList.add(\"hidden\"),e.classList.remove(\"flex\"),document.documentElement.classList.remove(\"overflow-hidden\"))};e.addEventListener(\"transitionend\",t)};s.addEventListener(\"click\",t=>{t.stopPropagation(),a()});d.addEventListener(\"click\",t=>{t.stopPropagation(),n()});e.addEventListener(\"click\",t=>{t.target===e&&n()});document.addEventListener(\"keydown\",t=>{t.key===\"Escape\"&&n()});"],["/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=1&lang.ts","const o=document.getElementById(\"more-projects\"),s=document.querySelectorAll('[id^=\"project-\"]');let e=!0;o.addEventListener(\"click\",()=>{e=!e,s.forEach((t,r)=>{r<3||(t.classList.toggle(\"visible\",!e),t.classList.toggle(\"hidden\",e))}),o.innerText=e?\"view all work\":\"view less work\"});"],["/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=2&lang.ts","const l=document.getElementById(\"full-poem\"),t=document.getElementById(\"full-poem-text\");let e=!0;l.addEventListener(\"click\",()=>{e=!e,t.classList.toggle(\"hidden\",e),t.classList.toggle(\"visible\",!e),l.innerText=e?\"view full poem\":\"hide full poem\"});"]],"assets":["/_astro/_slug_.DleViR76.css","/_astro/_slug_.jnBNZuEz.css","/_astro/blog.BIRHqTko.css","/_astro/gift.ByW2PPYY.css","/antibes.jpg","/cv.pdf","/daily-art.json","/dyer-maker.jpg","/favicon.ico","/optimize.js","/pink.png","/road-trip-poster.png","/will-c.jpg","/projects/bloodbox.jpg","/projects/bot.jpeg","/projects/founders.jpg","/projects/helio.png","/projects/hist-club.png","/projects/investor.png","/projects/lumindt.png","/projects/mltcc.jpg","/projects/research.jpeg","/cool-photos/beach-new.jpeg","/cool-photos/beach.jpeg","/cool-photos/boat.jpeg","/cool-photos/borsht.jpeg","/cool-photos/bot.jpeg","/cool-photos/bridge.jpeg","/cool-photos/brothers.jpeg","/cool-photos/city.jpeg","/cool-photos/dublin.jpeg","/cool-photos/food.jpeg","/cool-photos/france.jpeg","/cool-photos/gytis.jpeg","/cool-photos/hospital.jpeg","/cool-photos/howth.jpeg","/cool-photos/italy.jpeg","/cool-photos/kiara.jpeg","/cool-photos/lake.jpeg","/cool-photos/math.jpeg","/cool-photos/mullaghmore.jpeg","/cool-photos/oscar.jpeg","/cool-photos/sandwiches.jpeg","/cool-photos/sf.jpeg","/cool-photos/shoes.jpeg","/cool-photos/spain.jpeg","/cool-photos/tower.jpeg","/cool-photos/town.jpeg","/cool-photos/vedh-will.jpeg","/cool-photos/weird.jpeg","/cool-photos/will.jpeg","/blog/rss.xml","/blog/index.html","/gift/index.html","/photos/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"9/bz+wxxmmvAeklds6O3B8c8gr+LSR55YTiPTZmj8CM="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
