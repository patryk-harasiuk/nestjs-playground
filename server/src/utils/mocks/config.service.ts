export const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'ACCESS_TOKEN_EXPIRATION':
        return '1800';
    }
  },
};
