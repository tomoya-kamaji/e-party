import { RoomEntity } from './room';

export interface IRoomRepository {
  findById(id: string): Promise<RoomEntity | undefined>;
  findByUserId(userId: string): Promise<RoomEntity[]>;
  save(room: RoomEntity): Promise<RoomEntity>;
}
