import { appAxios } from "@/utils";

class MessageService {
  findAll = async () => {
    return appAxios
      .get("/messages")
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });
  };
}

export default MessageService;
