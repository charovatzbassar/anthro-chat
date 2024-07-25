import { UserDto } from "@/dto";
import { UserService } from "@/services";
import { queryClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

const useCreateUser = (userService: UserService) => {
  return useMutation({
    mutationFn: (data: UserDto) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useCreateUser;