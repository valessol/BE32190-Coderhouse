import { redirect } from "@remix-run/node";

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
  const response = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  const { access_token } = data;

  if (!access_token) throw new Error("Error de registro");

  return { authorized: true };
};

export const loginUser = async (userData) => {
  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  const { access_token } = data;

  if (!access_token) throw new Error("Error de login");

  const user = await fetch(`${process.env.API_URL}/auth`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });
  return { user, access_token };
};
