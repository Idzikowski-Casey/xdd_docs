const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
const isProd = process.env.NODE_ENV === "production";

const cfg = {
  cssModules: false,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  typescript: {
    /*
    We ignore build errors in order to take advantage of typescript editor
    integrations only.
    */
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  alias: {
    react: "node_modules/react",
    "react-dom": "node_modules/react-dom",
  },
  assetPrefix: isProd ? process.env.BASE_PATH : "",
  basePath: process.env.BASE_PATH || "",
};

module.exports = withMDX(cfg);
