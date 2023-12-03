import { axiosClient } from "./axiosClient";

export async function login(user) {
  const {
    data: { data },
  } = await axiosClient.post("/admin/login", user);
  return data;
}

export async function getUser() {
  const {
    data: { data },
  } = await axiosClient("/admin/user");
  return data;
}

export async function updateUser(userObj) {
  await axiosClient.post("/admin/update", userObj);
}

export async function updateUserPassword(passwordObj) {
  const {
    data: { data },
  } = await axiosClient.post("/admin/updatepassword", passwordObj);

  return data;
}
