import { RoomDto } from "@/dto";
import { RoomService } from "@/services";
import { queryClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

const useCreateRoom = (roomService: RoomService) => {
  return useMutation({
    mutationFn: (data: RoomDto) => roomService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export default useCreateRoom;
