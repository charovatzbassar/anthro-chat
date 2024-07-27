import { useQuery } from "@tanstack/react-query";
import { RoomService } from "@/services";

const useRoomsByUser = (roomService: RoomService, userId: string) => {
  return useQuery({
    queryKey: ["rooms", userId],
    queryFn: () => roomService.findByUser(userId),
  });
};

export default useRoomsByUser;
