import { axiosClient } from "../services/axiosClient";

export function usePreShowImage() {
  return (image, setImage) => {
    const formData = new FormData();
    formData.append("image", image);
    axiosClient
      .post("image/upload", formData)
      .then(({ data }) => setImage(data));
  };
}
