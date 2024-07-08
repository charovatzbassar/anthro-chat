import * as Yup from "yup";

export const messageSchema = Yup.object().shape({
  message: Yup.string().required("Message is required"),
});

export const roomSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  room: Yup.string().required("Room is required"),
});
