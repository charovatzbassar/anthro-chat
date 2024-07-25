import { useQuery } from "@tanstack/react-query";
import { MessageService } from "@/services";

const useMessages = (messageService: MessageService) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: () => messageService.findAll(),
  });
};

export default useMessages;
