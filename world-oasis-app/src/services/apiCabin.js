import { axiosClient } from "./axiosClient";

export async function getCabins(page) {
  const { data } = await axiosClient.get(`/cabins?page=${page}`);
  return data;
}

export async function createCabin(newCabin) {
  const {
    data: { data },
  } = await axiosClient.post("/cabins", newCabin);
  return data;
}

export async function updateCabin(id, cabin) {
  const {
    data: { data },
  } = await axiosClient.post(`/cabins/${id}`, cabin);
  return data;
}

export async function deleteCabin(id) {
  await axiosClient.post(`/cabins/${id}`, {
    _method: "DELETE",
  });
}
