export default {
  async fetch(request, env) {
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
      globalOutbound: null,
    }));

    return worker.getEntrypoint().fetch(request);
  },
};
