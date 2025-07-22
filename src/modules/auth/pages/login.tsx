import { useEffect, useState } from "react";
import useUserLogin from "../hooks/useUserLogin";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error, isSuccess } = useUserLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    mutate({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <div className="grid md:grid-cols-2 h-screen overflow-hidden">

      <div className="hidden md:flex flex-col items-center justify-center bg-[#101F59] p-12 text-white text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Bem-vindo(a) de volta!</h1>
          <p className="mt-4 text-lg text-white/80">
            Acesse o sistema de agendamento para gerenciar os atendimentos.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 flex flex-col items-center justify-center p-6 col-span-2 md:col-span-1">
        <div className="w-full max-w-sm">
          <div>
            <h2 className="text-3xl font-bold text-[#101F59]">Entrar</h2>
            <p className="mt-2 text-sm text-gray-500">
              Utilize suas credenciais para acessar o sistema
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2F58FF]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2F58FF]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isError && (
              <div className="flex items-center gap-2 p-2 w-full rounded-md bg-red-100 border border-red-400 text-red-700">
                <ExclamationTriangleIcon className="size-5" />
                <p className="text-sm font-medium">{error?.message || "Ocorreu um erro."}</p>
              </div>
            )}

            <button
              className="w-full p-3 rounded-lg bg-[#2F58FF] hover:bg-[#101F59] text-white font-semibold mt-4 cursor-pointer transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleLogin}
              disabled={isPending}
            >
              {isPending ? <span className="animate-pulse">Entrando...</span> : "Entrar"}
            </button>
          </div>

          <p className="text-xs text-center text-gray-400 mt-8">
            Desenvolvido por: <a href="https://novadevelopments.com.br/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#2F58FF] hover:underline">Nova Developments</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;