# Dynamic Worker — Hello World

A minimal starter template for [Dynamic Worker Loaders](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/) on Cloudflare Workers.

Dynamic Workers let you spawn Workers at runtime that execute arbitrary code — sandboxed, fast, and disposable.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dinasaur404/dynamic-worker-hello-world)

## What this does

A single Worker that creates a dynamic Worker on each request. The dynamic Worker runs inline code and returns `"Hello from a dynamic Worker!"`.

```
Request → Host Worker → spawns Dynamic Worker → Response
```

## Project structure

```
├── src/index.js      # Host worker — loads the dynamic worker
├── wrangler.toml     # Config with [[worker_loaders]] binding
└── package.json
```

## Get started

```sh
npm install
npm run dev
# Visit http://localhost:8787
```

## Deploy

```sh
npm run deploy
```

## How it works

The host worker uses the `worker_loaders` binding to create a dynamic isolate:

```js
const worker = env.LOADER.get(null, () => ({
  compatibilityDate: "2026-03-17",
  mainModule: "worker.js",
  modules: {
    "worker.js": `
      export default {
        fetch() {
          return new Response("Hello from a dynamic Worker!");
        },
      };
    `,
  },
  globalOutbound: null, // sandbox: no network access
}));

return worker.getEntrypoint().fetch(request);
```

- `env.LOADER.get(null, callback)` — creates a one-off dynamic isolate (no caching)
- `mainModule` / `modules` — the code that runs inside the isolate
- `globalOutbound: null` — blocks all outbound network access from the dynamic Worker
- `worker.getEntrypoint().fetch(request)` — forwards the request to the dynamic Worker

## Learn more

- [Dynamic Worker Loaders docs](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/)
- [Cloudflare Workers docs](https://developers.cloudflare.com/workers/)
