import Modal from "@/core/components/organism/Modal";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { IClinic, IClinicBody } from "../../model";
import useCreateClinic from "../../hook/useCreateClinic";
import useUpdateClinic from "../../hook/useUpdateClinic";

interface IActionModalProps {
  clinic?: IClinic;
  isOpen: boolean;
  handleCloseModalActions: () => void;
  reloadData: () => void;
}

const UserFormModal: React.FC<IActionModalProps> = ({ clinic, isOpen, handleCloseModalActions, reloadData }) => {
  const colorRef = useRef<HTMLInputElement>(null)
  
  const { mutate: createClinic, isPending: isCreating } = useCreateClinic()
  const { mutate: updateClinic, isPending: isUpdating } = useUpdateClinic()

  const [form, setForm] = useState<IClinicBody>({
    name: "",
    cnpj: "",
    phone: "",
    email: "",
    address: "",
    color: ""
  })

  useEffect(() => {
    if (clinic) {
      setForm({
        name: clinic.nome,
        cnpj: clinic.cnpj,
        phone: clinic.telefone,
        email: clinic.email,
        address: clinic.endereco,
        color: clinic.cor
      })
    }
  }, [clinic])

  const handleCreateClinic = () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.color) {
      toast.error("Preencha todos os campos")
      return
    }

    const body = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      color: form.color,
      cnpj: form.cnpj || "-"
    }

    createClinic(body, {
      onSuccess: () => {
        reloadData()
        toast.success("Clinica criada com sucesso", {
          dismissible: true,
          onDismiss: () => {
            handleCloseModal()
          },
          onAutoClose: () => {
            handleCloseModal()
          }
        })
      },
      onError: (error) => {
        toast.error("Erro ao criar clínica", {
          dismissible: true,
          description: error?.message || "Erro ao criar a clínica, procure o suporte por favor."
        })
      }
    })
  }

  const handleUpdateClinic = () => {
    let payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      color: form.color,
      cnpj: form.cnpj || "-"
    }

    updateClinic({ id: clinic?.id || "", clinic: payload }, {
      onSuccess: () => {
        reloadData()
        toast.success("Clinica atualizada com sucesso", {
          dismissible: true,
          onDismiss: () => {
            handleCloseModal()
          },
          onAutoClose: () => {
            handleCloseModal()
          }
        })
      },
      onError: (error) => {
        toast.error("Erro ao atualizar clínica", {
          dismissible: true,
          description: error?.message || "Erro ao atualizar a clínica, procure o suporte por favor."
        })
      }
    })
  }

  const handleCloseModal = () => {
    setForm({
      name: "",
      cnpj: "",
      phone: "",
      email: "",
      address: "",
      color: ""
    })

    handleCloseModalActions()
  }

  return (
    <Modal size="w-[40%]" isOpen={isOpen} title={clinic ? "Editar clínica" : "Criar clínica"} onClose={handleCloseModal}>
      <div>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 mt-2">
            <label htmlFor="nome" className="text-sm font-semibold">Nome</label>
            <input 
              type="text" 
              placeholder="Nome" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            <label htmlFor="telefone" className="text-sm font-semibold">Telefone</label>
            <input 
              type="text" 
              placeholder="Telefone" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.phone} 
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="col-span-2 mt-2">
            <label htmlFor="cnpj" className="text-sm font-semibold">CNPJ</label>
            <input 
              type="text" 
              placeholder="CNPJ" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.cnpj} 
              onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
            />
          </div>
          <div className="col-span-3 mt-2">
            <label htmlFor="endereco" className="text-sm font-semibold">Endereço</label>
            <input 
              type="text" 
              placeholder="Endereço" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.address} 
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <div className="col-span-1 mt-2">
            <label htmlFor="cor" className="text-sm font-semibold">Cor</label>
            <div 
              className="w-full h-[43px] rounded-lg cursor-pointer" 
              style={{ backgroundColor: form.color }} 
              onClick={() => colorRef.current?.click()}
            />
            <input 
              ref={colorRef}
              type="color" 
              placeholder="Cor" 
              className="absolute opacity-0 pointer-events-none"
              value={form.color} 
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              defaultValue="#000000"
            />
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
            onClick={clinic ? handleUpdateClinic : handleCreateClinic}  
            className="w-fit py-2 px-4 cursor-pointer bg-blue-800 text-white rounded-md flex flex-row items-center justify-center gap-2"
          >
            {isUpdating || isCreating && <Loader2Icon className="size-5 animate-spin" />}
            <p className="text-sm font-semibold">{clinic ? "Atualizar" : "Criar"}</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UserFormModal;