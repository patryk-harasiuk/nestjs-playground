export class UsersRepositoryFake {
  public async create(): Promise<void> {}
  public async findOneBy(): Promise<void> {}
  public async findOneById(): Promise<void> {}
  public async updateUserRefreshToken(): Promise<void> {}
  public async removeUserRefreshToken(): Promise<void> {}
  public async getUserIfRefreshTokenMatches(): Promise<void> {}
}
