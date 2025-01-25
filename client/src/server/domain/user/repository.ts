import { UserEntity } from './user';

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | undefined>;
}
