import { useQuery } from "@tanstack/react-query";
import { MessageService } from "@/services";

const useMessagesByRoom = (messageService: MessageService, room: string) => {
  return useQuery({
    queryKey: ["messages", room],
    queryFn: () => messageService.findByRoom(room),
  });
};

export default useMessagesByRoom;
