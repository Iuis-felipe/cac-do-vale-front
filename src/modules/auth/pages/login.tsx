import { useEffect, useState } from "react";
import useUserLogin from "../hooks/useUserLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error, isSuccess } = useUserLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    mutate({ email, password });
  };

  useEffect(() => {
    if(isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <div className="grid grid-cols-7 h-screen overflow-hidden">
      <div className="col-span-2 bg-blue-800 relative">
        <div className="absolute top-2/7 -right-2/5 w-[80%] rounded-md p-4 bg-white">
          <p className="text-[28px] font-bold"> Entrar </p>
          <p className="text-sm text-gray-500"> Utilize suas credenciais para <br/> acessar o sistema </p>
          <div className="flex flex-col gap-4 mt-6">
            <input 
              type="text" 
              placeholder="Email" 
              className="w-full p-2 rounded-md border border-gray-300" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Senha" 
              className="w-full p-2 rounded-md border border-gray-300" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

            <button 
              className="w-full p-2 rounded-md bg-indigo-900 text-white mt-4 cursor-pointer" 
              onClick={handleLogin} 
              disabled={isPending}
            > 
              {isPending ? <p className="animate-pulse"> Logando </p> : "Entrar"}
            </button>

            {isError && (
              <div className="p-1 w-full rounded-sm bg-red-600/55 border border-red-800">
                <p className="text-white text-sm text-center">{error?.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-5 bg-sky-300 flex items-center justify-center">
        <p className="text-[100px] font-bold text-white"> CAC do Vale </p>
      </div>
    </div>
  );
};

export default Login;