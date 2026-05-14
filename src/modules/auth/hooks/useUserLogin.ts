import { useMutation } from "@tanstack/react-query";
import { login } from "../services";
import userStore from "../../../core/store/user";
import { LoginResponse } from "../models/responses";
import clinicStore from "@/core/store/clinic";

const useUserLogin = () => {
  const setUser = userStore((state) => state.setUser);
  const setClinic = clinicStore((state) => state.setClinic);

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: { email: string, password: string }) => login(email, password),
    onSuccess: (data: LoginResponse) => {
      if(data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      if(data.user) {
        setUser({
          id: data.user.id,
          name: data.user.nome,
          role: data.user.role,
          email: data.user.email,
        });
      }
      
      if(data.clinic) {
        setClinic({
          id: data.clinic.id,
          name: data.clinic.nome,
          cor: data.clinic.cor,
          slug: data.clinic.slug
        });
      }
    },
  });

  return { mutate, isPending, isError, error, isSuccess };
};

export default useUserLogin;