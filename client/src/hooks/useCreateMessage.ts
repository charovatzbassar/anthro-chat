import { MessageDto } from "@/dto";
import { MessageService } from "@/services";
import { queryClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

const useCreateMessage = (messageService: MessageService) => {
  return useMutation({
    mutationFn: (data: MessageDto) => messageService.create(data),
    onSuccess: (data: MessageDto) => {
      queryClient.invalidateQueries({ queryKey: ["messages", data.room] });
    },
  });
};

export default useCreateMessage;
