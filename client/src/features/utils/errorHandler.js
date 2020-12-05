import { notification } from "antd";

const errorHandler = (error) => {
  console.error(error);
  notification.error({
    message: "Something went wrong",
    description: error.message,
  });
};

export default errorHandler;
