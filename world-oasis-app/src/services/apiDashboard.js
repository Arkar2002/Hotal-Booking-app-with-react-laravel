import { axiosClient } from "./axiosClient";

export async function getDashboard(last = 7) {
  const {
    data: { data },
  } = await axiosClient.get(`dashboard?last=${last}`);
  return data;
}
