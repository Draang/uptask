import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  userSchema,
  type CheckPasswordForm,
  type ConfirmToken,
  type ForgotPasswordForm,
  type NewPasswordForm,
  type RequestConfirmationCodeForm,
  type UserLoginForm,
  type UserRegistrationForm,
} from "../types";
export async function createAccount(formData: UserRegistrationForm) {
  try {
    const { data } = await api.post<string>("/auth/create-account", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function confirmAccount(token: ConfirmToken) {
  try {
    const { data } = await api.post<string>("/auth/confirm", token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function requestConfirmationCode(
  email: RequestConfirmationCodeForm
) {
  try {
    const { data } = await api.post<string>("/auth/request_code", email);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function login(formData: UserLoginForm) {
  try {
    const { data } = await api.post<string>("/auth/login", formData);
    /**  * localstorage
     *    ? [no requiere config, persistente, permanece en navegador]
     *     ! [vunerable en xss, 5 a 10 mb, no CORS]
     *  * session storage
     *  * cookies
     *     ? [Seguro, soporte para cors, controlar expiracion]
     *     ! [sobrecarga de red, capacidad limitada 4kb, pueden ser eliminadas por usuario]
     */
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function requestForgotPassword(formData: ForgotPasswordForm) {
  try {
    const { data } = await api.post<string>("/auth/forgot_password", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function validateTokenForgotPassword(formData: ConfirmToken) {
  try {
    const { data } = await api.post<string>("/auth/validate_token", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function updateForgotPassword({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) {
  try {
    const { data } = await api.post<string>(
      `/auth/update_password/${token}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function getUser() {
  try {
    const { data } = await api("/auth/user");
    const res = userSchema.safeParse(data);
    if (res.success) {
      return res.data;
    } else {
      throw new Error("Error en usuario");
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}
export async function checkPassword(formData:CheckPasswordForm) {
  try {
    const { data } = await api.post<string>("/auth/check-password",formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}