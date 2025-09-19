import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CLT0DXaG.mjs';
import { manifest } from './manifest_B-jxagoJ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/blog/rss.xml.astro.mjs');
const _page2 = () => import('./pages/blog.astro.mjs');
const _page3 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page4 = () => import('./pages/photos.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.13.9_@types+node@16.18.11_@vercel+functions@2.2.13_jiti@1.21.6_rollup@4.51.0_typescript@4.9.5_yaml@2.6.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/blog/rss.xml.js", _page1],
    ["src/pages/blog.astro", _page2],
    ["src/pages/blog/[...slug].astro", _page3],
    ["src/pages/photos.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "bbc034c4-2dda-4867-b84f-d7103d84c871",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
