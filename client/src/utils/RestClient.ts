import appAxios from "./appAxios";

class RestClient {
  static get = async (url: string) =>
    appAxios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });

  static post = async (url: string, data: any) =>
    appAxios
      .post(url, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });

  static put = async (url: string, data: any) =>
    appAxios
      .put(url, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });

  static delete = async (url: string) =>
    appAxios
      .delete(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return error;
      });
}

export default RestClient;
