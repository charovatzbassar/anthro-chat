import { useQuery } from "@tanstack/react-query";
import { RoomService } from "@/services";

const useRooms = (roomService: RoomService) => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => roomService.findAll(),
  });
};

export default useRooms;
