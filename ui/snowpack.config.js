/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-dotenv',
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 3000,
  },
  buildOptions: {
    /* ... */
  },
  packageOptions: {
    knownEntrypoints: [
      'framesync',
      '@chakra-ui/hooks/use-animation-state',
      '@chakra-ui/hooks/use-animation-state',
      '@chakra-ui/hooks',
    ],
  },
};
