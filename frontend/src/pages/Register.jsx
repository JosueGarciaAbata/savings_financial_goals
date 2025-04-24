import { useMutation } from "@tanstack/react-query";
import { register } from "../api/authApi";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      alert("Registro exitoso");
      navigate("/login");
    },
    onError: () => alert("Error al registrarse"),
  });

  return (
    <div>
      <h2>Registro</h2>
      <AuthForm
        onSubmit={(data) => mutation.mutate(data)}
        isLoading={mutation.isPending}
        buttonLabel="Registrar"
      />
    </div>
  );
}
