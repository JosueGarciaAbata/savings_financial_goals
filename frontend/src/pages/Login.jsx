import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import AuthForm from "./../components/AuthForm";

export default function Login() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      alert("Login exitoso");
      // Aquí podrías navegar a dashboard
    },
    onError: () => alert("Error al iniciar sesión"),
  });

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <AuthForm
        onSubmit={(data) => mutation.mutate(data)}
        isLoading={mutation.isPending}
        buttonLabel="Iniciar"
      />
    </div>
  );
}
