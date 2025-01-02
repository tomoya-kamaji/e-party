import { RoomEntity } from './room';

interface IRoomRepository {
  findById(id: string): Promise<RoomEntity | undefined>;
  save(room: RoomEntity): Promise<RoomEntity>;
}

export { IRoomRepository };
