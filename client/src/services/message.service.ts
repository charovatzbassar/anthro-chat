import { MessageDto } from "@/dto";
import { appAxios } from "@/utils";
import { BaseService } from "./BaseService";

class MessageService implements BaseService<MessageDto> {
  findAll = async (): Promise<MessageDto[]> =>
    appAxios
      .get("/messages")
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });

  create = async (message: MessageDto): Promise<MessageDto> =>
    appAxios
      .post("/messages", message)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });

  update = async (
    id: string,
    message: MessageDto
  ): Promise<MessageDto | null> =>
    appAxios
      .put(`/messages/${id}`, message)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });

  delete = async (id: string): Promise<MessageDto | null> =>
    appAxios
      .delete(`/messages/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });

  findById = async (id: string): Promise<MessageDto | null> =>
    appAxios
      .get(`/messages/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });

  findByRoom = async (room: string): Promise<MessageDto[]> =>
    appAxios
      .get(`/messages/?room=${room}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });
}

export default MessageService;
