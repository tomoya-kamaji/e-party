import { UserEntity } from './user';

interface IUserRepository {
  findById(id: string): Promise<UserEntity | undefined>;
}

export { IUserRepository };
