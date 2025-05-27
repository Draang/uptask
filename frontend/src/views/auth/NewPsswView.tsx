import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";

export default function NewPsswView() {
  const [isValidToken, setIsValidToken] = useState(false);
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  return (
    <>
      <h1 className="text-5xl font-black text-white">Restablecer contraseña</h1>
      <p className="text-2xl font-light text-white mt-5">
        Olvidaste tu contraseña {""}
        <span className=" text-fuchsia-500 font-bold">ingresa codigo</span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token}/>
      )}
    </>
  );
}
