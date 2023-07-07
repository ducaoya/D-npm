export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index-es.mjs",
      format: "es",
    },
    {
      file: "dist/index-cjs.cjs",
      format: "cjs",
    },
  ],
};
