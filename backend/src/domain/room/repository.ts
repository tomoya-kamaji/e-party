import { RoomEntity } from './room';

export interface IRoomRepository {
  findById(id: string): Promise<RoomEntity | undefined>;
  save(room: RoomEntity): Promise<RoomEntity>;
}
