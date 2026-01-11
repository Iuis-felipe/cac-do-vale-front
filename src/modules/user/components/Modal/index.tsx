import Modal from "@/core/components/organism/Modal";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useUpdateUser from "../../hook/useUpdateUser";
import useCreateUser from "../../hook/useCreateUser";
import useGetUserClinicOptions from "../../hook/useGetUserClinicOptions";

interface IActionModalProps {
  user?: { id: string; nome: string; email: string; codigo: string, ativo: boolean, clinicId: string, role: string };
  isOpen: boolean;
  handleCloseModalActions: () => void;
  reloadData: () => void;
}

const UserFormModal: React.FC<IActionModalProps> = ({ user, isOpen, handleCloseModalActions, reloadData }) => {
  const { clinics } = useGetUserClinicOptions()

  const { mutate, isPending, isError, error, isSuccess } = useUpdateUser()
  const { mutate: createUser, isPending: isCreating, isSuccess: isCreated, isError: isCreatedError } = useCreateUser()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [form, setForm] = useState<{ nome: string; email: string; codigo: string, senha?: string | undefined, clinicId: string, role: string, ativo: boolean }>({
    nome: "",
    email: "",
    codigo: "",
    senha: undefined,
    role: "",
    clinicId: "",
    ativo: true
  })

  useEffect(() => {
    if (user) {
      setForm(user)
    }
  }, [user])

  const handleCreateUser = () => {
    if (!form.nome || !form.email || !form.senha) {
      toast.error("Preencha todos os campos")
      return
    }

    console.log(form)

    createUser({
      nome: form.nome,
      email: form.email,
      senha: form.senha,
      clinicId: form.clinicId,
      role: form.role
    })
  }

  const handleUpdateUser = () => {
    let payload: { nome: string; email: string; ativo: boolean; senha?: string; clinicId?: string; role?: string } = {
      nome: form.nome,
      email: form.email,
      ativo: form.ativo,
      clinicId: form.clinicId,
      role: form.role
    }

    console.log(payload)

    if (form.senha) {
      payload.senha = form.senha
    }

    mutate({ id: user?.id || "", user: payload })
  }

  const handleCloseModal = () => {
    setForm({
      nome: "",
      email: "",
      codigo: "",
      clinicId: "",
      role: "",
      senha: undefined,
      ativo: true
    })
    handleCloseModalActions()
  }

  useEffect(() => {
    if (isSuccess) {
      reloadData()
      toast.success("Usuário atualizado com sucesso", {
        dismissible: true,
        onDismiss: () => {
          handleCloseModal()
        },
        onAutoClose: () => {
          handleCloseModal()
        }
      })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isCreated) {
      reloadData()
      toast.success("Usuário criado com sucesso", {
        dismissible: true,
        onDismiss: () => {
          handleCloseModal()
        },
        onAutoClose: () => {
          handleCloseModal()
        }
      })
    }
  }, [isCreated])

  useEffect(() => { 
    if (isError) {
      toast.error("Erro ao atualizar usuário", {
        dismissible: true,
        description: error?.message || "Erro ao atualizar o usuário, procure o suporte por favor."
      })
    }   
  }, [isError, error])

  useEffect(() => {
    if (isCreatedError) {
      toast.error("Erro ao criar usuário", {
        description: error?.message || "Erro ao criar o usuário, procure o suporte por favor."
      })
    }
  }, [isCreatedError, error])

  return (
    <Modal size="w-[40%]" isOpen={isOpen} title={user ? "Editar usuário" : "Criar usuário"} onClose={handleCloseModal}>
      <div>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 mt-2">
            <label htmlFor="nome" className="text-sm font-semibold">Nome</label>
            <input 
              type="text" 
              placeholder="Nome" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.nome} 
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>
          <div className="col-span-2 mt-2">
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <input 
              type="text" 
              placeholder="Email" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="col-span-2 mt-2">
            <label htmlFor="clinica" className="text-sm font-semibold">Clinica</label>
            <select 
              name="clinica" 
              id="clinica" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.clinicId} 
              onChange={(e) => setForm({ ...form, clinicId: e.target.value })}
            >
              <option value="">Selecione uma clínica</option>
              {clinics && clinics.map((clinic: { label: string, value: string}) => (
                <option key={clinic.value} value={clinic.value}>{clinic.label}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2 mt-2">
            <label htmlFor="role" className="text-sm font-semibold">Permissão</label>
            <select 
              name="role" 
              id="role" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.role} 
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="ADMIN">Admin local</option>
              <option value="ATENDENTE">Gestor</option>
              <option value="OWNER">Permissão total</option>
            </select>
          </div>
          <div className="col-span-1 mt-2">
            <label htmlFor="ativo" className="text-sm font-semibold">Ativo</label>
            <select 
              name="ativo" 
              id="ativo" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.ativo ? "Ativo" : "Inativo"} 
              onChange={(e) => setForm({ ...form, ativo: e.target.value === "Ativo" })}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
          <div className="col-span-3 mt-2">
            <label htmlFor="senha" className="text-sm font-semibold">Senha</label>
            <div className="flex flex-row items-center gap-2">
              <input 
                type={showPassword ? "text" : "password"} 
              placeholder="Senha" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.senha} 
                onChange={(e) => setForm({ ...form, senha: e.target.value })}
              />
              <button 
                className="py-2 px-4 cursor-pointer bg-blue-800 text-white rounded-md flex flex-row items-center gap-2" 
                onClick={() => setShowPassword(!showPassword)}
                disabled={!form.senha}
              >
                {!showPassword ? <Eye className="size-5"/> : <EyeOff className="size-5"/>}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-row items-center justify-end gap-4 mt-10">
          <button 
            onClick={handleCloseModal}
            className="cursor-pointer text-red-600 text-sm"
          >
            Cancelar
          </button>
          <button 
            onClick={user ? handleUpdateUser : handleCreateUser}
            className="w-fit py-2 px-4 cursor-pointer bg-blue-800 text-white rounded-md flex flex-row items-center justify-center gap-2"
          >
            {isPending || isCreating && <Loader2Icon className="size-5 animate-spin" />}
            <p className="text-sm font-semibold">{user ? "Atualizar" : "Criar"}</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UserFormModal;