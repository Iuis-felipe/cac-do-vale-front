import { useMutation } from "@tanstack/react-query";
import { login } from "../services";
import userStore from "../../../core/store/user";
import { LoginResponse } from "../models/responses";

const useUserLogin = () => {
  const setUser = userStore((state) => state.setUser);

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: { email: string, password: string }) => login(email, password),
    onSuccess: (data: LoginResponse) => {
      if(data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      setUser({
        id: data.user.id,
        name: data.user.nome,
        role: "admin",
        email: data.user.email,
      });
    },
  });

  return { mutate, isPending, isError, error, isSuccess };
};

export default useUserLogin;