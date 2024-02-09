"use server";

import { cookies } from "next/headers";
import axios from "axios";
import {
  LoggedInUser,
  LoginData,
  NewUser,
  RegisterUser,
  UserInfo,
} from "@/lib/auth/types";
import { BASE_URL } from "@/lib/variables";

const cookieStore = cookies();

export const getUser = async () => {
  const id = cookies().get("userId");
  const token = cookies().get("token");
  if (token && id) {
    const url = `${BASE_URL}users/user/${id.value}/`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token.value}`,
        },
      });
      if (response.status === 200) {
        const data: UserInfo = response.data;
        return data;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  } else {
    return null;
  }
};

export async function storeToken(token: string) {
  cookies().set({
    name: "token",
    value: token,
    secure: true,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });
}

export async function storeId(id: number) {
  cookies().set({
    name: "userId",
    value: id.toString(),
    secure: true,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });
}

export async function getUserToken() {
  const token = cookieStore.get("token");
  return token;
}

export async function getUserId() {
  const userId = cookieStore.get("userId");
  return userId;
}

export async function deleteCookie(name: string) {
  cookieStore.delete(name);
}

export const register = async (userData: RegisterUser) => {
  try {
    const response = await axios.post(`${BASE_URL}users/register/`, {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password2: userData.repeatPassword,
    });

    if (response.status === 201) {
      const data: NewUser = response.data;
      storeToken(data.token);
      storeId(data.id);
      return { success: true };
    } else {
      return { success: false, error: "Something went wrong!" };
    }
  } catch (error) {
    return { success: false, error: "An error occurred" };
  }
};

export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}auth/login/`, {
      username: loginData.username,
      password: loginData.password,
    });

    if (response.status === 200) {
      const data: LoggedInUser = response.data;
      storeToken(data.key);
      storeId(data.user.id);
      return { success: true, error: "" };
    } else {
      return { success: false, error: "Something went wrong!" };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred. Please check your credentials.",
    };
  }
};

export const logout = async () => {
  const token = cookies().get("token");
  try {
    const response = await axios.post(
      `${BASE_URL}auth/logout/`,
      {},
      {
        headers: {
          Authorization: `Token ${token?.value}`,
        },
      }
    );

    if (response.status === 200) {
      cookies().delete("userId");
      cookies().delete("token");
      return { success: true, error: "" };
    } else {
      return { success: false, error: "Something went wrong!" };
    }
  } catch (error) {
    return { success: false, error: "An error occurred" };
  }
};
