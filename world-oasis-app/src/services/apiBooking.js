import { axiosClient } from "./axiosClient";

export async function getBookings(page = 1, filter, sortby) {
  const { data } = await axiosClient.get(
    `bookings?page=${page}&filter[${filter.field}]=${filter.value}&sortby[${sortby.field}]=${sortby.direction}`
  );
  return data;
}

export async function getBooking(id) {
  const {
    data: { data },
  } = await axiosClient.get(`/bookings/${id}`);
  return data;
}

export async function checkIn(checkInData, id) {
  await axiosClient.post(`/bookings/${id}`, checkInData);
}

export async function checkOut(status, id) {
  await axiosClient.post(`/bookings/${id}/checkout`, { status });
}

export async function deleteBooking(id) {
  await axiosClient.post(`/bookings/${id}`, { _method: "DELETE" });
}
