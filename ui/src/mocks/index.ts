export const initMocks = () => {
  console.log(import.meta.env.SNOWPACK_PUBLIC_API_MOCKING, 'env variable');

  if (import.meta.env.SNOWPACK_PUBLIC_API_MOCKING === 'true') {
    const loadModule = async () => await (await import('./browser')).worker.start();

    loadModule();
  }
};
