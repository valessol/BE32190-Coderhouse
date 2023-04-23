import { redirect } from "@remix-run/node";
import axios from "axios";

export const authUser = async (authorization) => {
  const fetchedData = await fetch(`${process.env.API_URL}/auth`, {
    method: "GET",
    headers: {
      authorization,
    },
  });

  if (fetchedData.status === 403) redirect("/login");

  const data = await fetchedData.json();
  const { user, error } = data;

  if (error) redirect("/login");

  return user;
};

export const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(`${process.env.API_URL}/auth/register`, {
      ...userData,
    });
    return { text: data.msg, type: "success" };
  } catch (error) {
    return { text: error.response.data.msg, type: "error" };
  }
};

export const loginUser = async (userData) => {
  try {
    const { data } = await axios.post(`${process.env.API_URL}/auth/login`, {
      ...userData,
    });
    return data;
  } catch (error) {
    return { text: error.response.data.msg, type: "error" };
  }
};
