/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
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
  },
  packageOptions: {
    knownEntrypoints: ['framesync', '@chakra-ui/hooks/use-animation-state', '@chakra-ui/hooks'],
  },
};
