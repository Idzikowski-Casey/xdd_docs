const withCSS = require("@zeit/next-css");
const withStylus = require("@zeit/next-stylus");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
const withCoffeescript = require("next-coffeescript");
const isProd = process.env.NODE_ENV === "production";

function getBasePath() {
  var basePath = "";

  if (isProd && process.env.BASE_PATH) {
    if (process.env.BASE_PATH.startsWith("/")) {
      basePath = process.env.BASE_PATH;
    } else {
      basePath = "/" + process.env.BASE_PATH;
    }
  }

  console.log("getBasePath() : isProd = " + isProd);
  console.log("getBasePath() : basePath = " + basePath);

  return basePath;
}

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
  assetPrefix: getBasePath(),

  publicRuntimeConfig: {
    basePath: getBasePath(),
  },
};

module.exports = withMDX(withCSS(withCoffeescript(withStylus(cfg))));
