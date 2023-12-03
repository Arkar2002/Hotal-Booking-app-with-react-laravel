import { axiosClient } from "./axiosClient";

export async function getSettings() {
  const {
    data: { data },
  } = await axiosClient.get("/settings");
  return data;
}

export async function updateSettings(newSettings) {
  await axiosClient.post("/settings/1", newSettings);
}
