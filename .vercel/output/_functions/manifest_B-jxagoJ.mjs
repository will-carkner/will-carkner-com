import { w as decodeKey } from './chunks/astro/server_BUEHO2fz.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BFYjd3oH.mjs';

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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/williamcarkner/coding/will-carkner-com/","cacheDir":"file:///Users/williamcarkner/coding/will-carkner-com/node_modules/.astro/","outDir":"file:///Users/williamcarkner/coding/will-carkner-com/dist/","srcDir":"file:///Users/williamcarkner/coding/will-carkner-com/src/","publicDir":"file:///Users/williamcarkner/coding/will-carkner-com/public/","buildClientDir":"file:///Users/williamcarkner/coding/will-carkner-com/dist/client/","buildServerDir":"file:///Users/williamcarkner/coding/will-carkner-com/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.13.9_@types+node@16.18.11_@vercel+functions@2.2.13_jiti@1.21.6_rollup@4.51.0_typescript@4.9.5_yaml@2.6.0/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/blog/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/blog\\/rss\\.xml\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/rss.xml.js","pathname":"/blog/rss.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/blog.Bfu41Fgo.css"},{"type":"external","src":"/_astro/_slug_.KRJYBfDw.css"}],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/blog.Bfu41Fgo.css"},{"type":"inline","content":"article *{padding-left:.5rem;padding-right:.5rem;font-family:ui-serif,Georgia,Cambria,Times New Roman,Times,serif}article h1,article h2,article h3,article h4,article h5,article h6{padding-left:0!important;padding-right:0!important;--tw-text-opacity: 1;color:rgb(226 232 240 / var(--tw-text-opacity, 1))}article h1,article h2{padding-top:.75rem;padding-bottom:.5rem;font-size:1.875rem;line-height:2.25rem;font-weight:700}@media (min-width: 768px){article h1,article h2{font-size:2.25rem;line-height:2.5rem}}article h3{padding-top:.5rem;padding-bottom:.25rem;font-size:1.25rem;line-height:1.75rem;font-weight:700}@media (min-width: 768px){article h3{font-size:1.5rem;line-height:2rem}}article h4{padding-top:.25rem;padding-bottom:.5;font-size:1rem;line-height:1.5rem;font-weight:700}@media (min-width: 768px){article h4{font-size:1.125rem;line-height:1.75rem}}article li{padding:.5;--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity, 1))}article p{--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity, 1));margin-top:.5rem}article b,article strong{--tw-text-opacity: 1;color:rgb(226 232 240 / var(--tw-text-opacity, 1))}article b,article strong,article em,article a{--tw-text-opacity: 1;color:rgb(226 232 240 / var(--tw-text-opacity, 1));padding-left:0!important;padding-right:0!important}article pre{border-radius:.75rem;border-width:1px;border-color:#e2e8f01a;padding:.75rem 1rem}article blockquote{margin-top:.5rem;margin-bottom:.5rem;margin-left:.5rem;border-left-width:2px;--tw-border-opacity: 1;border-color:rgb(226 232 240 / var(--tw-border-opacity, 1));font-style:italic}article table{margin-left:.5rem;margin-right:.5rem;border-collapse:collapse;border-width:1px;border-color:#e2e8f01a}article th,article td{border-width:1px;border-color:#e2e8f01a;padding:.5rem;--tw-text-opacity: 1;color:rgb(203 213 225 / var(--tw-text-opacity, 1))}article th{background-color:#cbd5e133}article tr:nth-child(odd){background-color:#e2e8f00d}article tr:nth-child(2n){background-color:#e2e8f01a}article ul{list-style-type:\"•\";padding-left:1.5rem}article ul ul{padding-left:.5rem}article ol{padding-left:1.5rem}article ol li::marker{content:counter(list-item) \".\"}article li{padding-left:1ch}article li::marker{font-size:1rem;line-height:1.5rem;font-weight:700}article ul>li>ul>li{font-size:.875rem;line-height:1.25rem;--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity, 1));list-style-type:\"-\";padding-left:.75rem}article ul>li>ul>li>ul>li{--tw-text-opacity: 1;color:rgb(100 116 139 / var(--tw-text-opacity, 1))}article p:has(>img){display:flex;align-items:center;justify-content:center}article div{display:flex;flex-direction:column}article img{border-radius:.75rem}article div *:first-child{padding-top:0!important}\n"},{"type":"external","src":"/_astro/_slug_.KRJYBfDw.css"}],"routeData":{"route":"/blog/[...slug]","isIndex":false,"type":"page","pattern":"^\\/blog(?:\\/(.*?))?\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/blog/[...slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/blog.Bfu41Fgo.css"},{"type":"external","src":"/_astro/_slug_.KRJYBfDw.css"}],"routeData":{"route":"/photos","isIndex":false,"type":"page","pattern":"^\\/photos\\/?$","segments":[[{"content":"photos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/photos.astro","pathname":"/photos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/blog.Bfu41Fgo.css"},{"type":"external","src":"/_astro/_slug_.KRJYBfDw.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://willcarkner.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/pages/blog/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/utils/funcs.ts",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/pages/blog.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/williamcarkner/coding/will-carkner-com/src/pages/photos.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.13.9_@types+node@16.18.11_@vercel+functions@2.2.13_jiti@1.21.6_rollup@4.51.0_typescript@4.9.5_yaml@2.6.0/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/blog/rss.xml@_@js":"pages/blog/rss.xml.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/photos@_@astro":"pages/photos.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B-jxagoJ.mjs","/Users/williamcarkner/coding/will-carkner-com/node_modules/.pnpm/astro@5.13.9_@types+node@16.18.11_@vercel+functions@2.2.13_jiti@1.21.6_rollup@4.51.0_typescript@4.9.5_yaml@2.6.0/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BJKvLDS3.mjs","/Users/williamcarkner/coding/will-carkner-com/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/williamcarkner/coding/will-carkner-com/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_VK1AhkpQ.mjs","/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.hF7JJTDl.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/williamcarkner/coding/will-carkner-com/src/pages/index.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"more-projects\"),r=document.querySelectorAll('[id^=\"project-\"]');let e=!0;s.addEventListener(\"click\",()=>{e=!e,r.forEach((t,o)=>{o<3||(t.classList.toggle(\"visible\",!e),t.classList.toggle(\"hidden\",e))}),s.innerText=e?\"See More\":\"See Less\"});"]],"assets":["/_astro/_slug_.KRJYBfDw.css","/_astro/blog.Bfu41Fgo.css","/cv.pdf","/dyer-maker.jpg","/favicon.ico","/optimize.js","/pink.png","/will-c.jpg","/cool-photos/beach-new.jpeg","/cool-photos/beach.jpeg","/cool-photos/boat.jpeg","/cool-photos/borsht.jpeg","/cool-photos/bot.jpeg","/cool-photos/bridge.jpeg","/cool-photos/brothers.jpeg","/cool-photos/city.jpeg","/cool-photos/dublin.jpeg","/cool-photos/food.jpeg","/cool-photos/france.jpeg","/cool-photos/gytis.jpeg","/cool-photos/hospital.jpeg","/cool-photos/howth.jpeg","/cool-photos/italy.jpeg","/cool-photos/kiara.jpeg","/cool-photos/lake.jpeg","/cool-photos/math.jpeg","/cool-photos/mullaghmore.jpeg","/cool-photos/oscar.jpeg","/cool-photos/sandwiches.jpeg","/cool-photos/sf.jpeg","/cool-photos/shoes.jpeg","/cool-photos/spain.jpeg","/cool-photos/tower.jpeg","/cool-photos/town.jpeg","/cool-photos/vedh-will.jpeg","/cool-photos/weird.jpeg","/cool-photos/will.jpeg","/projects/bloodbox.jpg","/projects/bot.jpeg","/projects/founders.jpg","/projects/helio.png","/projects/hist-club.png","/projects/lumindt.png","/projects/mltcc.jpg","/projects/research.jpeg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"nGOohcm+nYAC8XifDCGLwmd72GmUlccAzW9TtQfFl0Q="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
