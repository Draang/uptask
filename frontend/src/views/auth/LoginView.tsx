import { useForm } from "react-hook-form";
import type { UserLoginForm } from "@/types/index";
import ErrorMsg from "@/components/ErrorMsg";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/authApi";
import { toast } from "react-toastify";
export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast(error.message, { type: "error" });
    },
    onSuccess: () => {
     navigate("/");
    },
  });
  const handleLogin = (formData: UserLoginForm) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/register"}
          className="text-center text-gray-300 font-normal"
        >
          No tienes cuenta? Registrate ahora
        </Link>
        <Link
          to={"/auth/forgot-pssw"}
          className="text-center text-gray-300 font-normal"
        >
          Olvidaste tu contraseña? Restablecer
        </Link>
      </nav>
    </>
  );
}
