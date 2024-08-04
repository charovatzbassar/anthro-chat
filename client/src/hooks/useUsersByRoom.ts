import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services";

const useUsersByRoom = (userService: UserService, roomId: string) => {
  return useQuery({
    queryKey: ["users", roomId],
    queryFn: () => userService.getByRoomId(roomId),
  });
};

export default useUsersByRoom;
