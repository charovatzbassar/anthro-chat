import { RoomUserDto } from "@/dto";
import { UserService } from "@/services";
import { queryClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

const useJoinUser = (userService: UserService) => {
  return useMutation({
    mutationFn: (data: RoomUserDto) => userService.joinRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export default useJoinUser;
