import { useQuery } from "@tanstack/react-query";
import { RoomService } from "@/services";

const useRoomUserCount = (roomService: RoomService, roomId: string) => {
  return useQuery({
    queryKey: ["rooms", roomId],
    queryFn: () => roomService.getRoomUserCount(roomId),
  });
};

export default useRoomUserCount;
