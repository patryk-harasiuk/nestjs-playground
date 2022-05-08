/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  mount: {
    public: { url: '/', resolve: true },
    src: '/dist',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-dotenv',
  ],
  packageOptions: {},
  devOptions: {
    port: 3000,
  },
  buildOptions: {
    jsxInject: `import React from "react"`,
    baseUrl: '/',
  },
  packageOptions: {
    knownEntrypoints: ['framesync', '@chakra-ui/hooks/use-animation-state', '@chakra-ui/hooks'],
  },
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    },
  ],
};
