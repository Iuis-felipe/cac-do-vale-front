import Modal from "@/core/components/organism/Modal";
import { Loader2Icon, BuildingIcon, MailIcon, PhoneIcon, MapPinIcon, PaletteIcon, FileTextIcon } from "lucide-react";
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
  const colorRef = useRef<HTMLInputElement>(null);

  const { mutate: createClinic, isPending: isCreating } = useCreateClinic();
  const { mutate: updateClinic, isPending: isUpdating } = useUpdateClinic();

  const [form, setForm] = useState<IClinicBody>({
    name: "",
    cnpj: "",
    phone: "",
    email: "",
    address: "",
    color: "#3b82f6",
  });

  useEffect(() => {
    if (clinic) {
      setForm({
        name: clinic.nome,
        cnpj: clinic.cnpj,
        phone: clinic.telefone,
        email: clinic.email,
        address: clinic.endereco,
        color: clinic.cor,
      });
    }
  }, [clinic]);

  const handleCreateClinic = () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.color) {
      toast.error("Preencha todos os campos obrigatórios", {
        description: "Nome, email, telefone, endereço e cor são obrigatórios",
      });
      return;
    }

    const body = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      color: form.color,
      cnpj: form.cnpj || "-",
    };

    createClinic(body, {
      onSuccess: () => {
        reloadData();
        toast.success("Clínica criada com sucesso", {
          dismissible: true,
          onDismiss: () => {
            handleCloseModal();
          },
          onAutoClose: () => {
            handleCloseModal();
          },
        });
      },
      onError: (error) => {
        toast.error("Erro ao criar clínica", {
          dismissible: true,
          description: error?.message || "Erro ao criar a clínica, procure o suporte por favor.",
        });
      },
    });
  };

  const handleUpdateClinic = () => {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      color: form.color,
      cnpj: form.cnpj || "-",
    };

    updateClinic(
      { id: clinic?.id || "", clinic: payload },
      {
        onSuccess: () => {
          reloadData();
          toast.success("Clínica atualizada com sucesso", {
            dismissible: true,
            onDismiss: () => {
              handleCloseModal();
            },
            onAutoClose: () => {
              handleCloseModal();
            },
          });
        },
        onError: (error) => {
          toast.error("Erro ao atualizar clínica", {
            dismissible: true,
            description: error?.message || "Erro ao atualizar a clínica, procure o suporte por favor.",
          });
        },
      },
    );
  };

  const handleCloseModal = () => {
    setForm({
      name: "",
      cnpj: "",
      phone: "",
      email: "",
      address: "",
      color: "#3b82f6",
    });

    handleCloseModalActions();
  };

  return (
    <Modal
      size="w-[45%]"
      isOpen={isOpen}
      title={clinic ? "Editar clínica" : "Criar clínica"}
      onClose={handleCloseModal}
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <BuildingIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-gray-700">Informações Básicas</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="text-sm font-medium text-gray-600 mb-1 block">
                Nome da Clínica
              </label>
              <input
                type="text"
                id="nome"
                placeholder="Digite o nome da clínica"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="cnpj" className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <FileTextIcon className="w-4 h-4 text-gray-500" />
                <span>CNPJ</span>
              </label>
              <input
                type="text"
                id="cnpj"
                placeholder="00.000.000/0000-00"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={form.cnpj}
                onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-3">
            <MailIcon className="w-5 h-5 text-green-600" />
            <h3 className="text-sm font-bold text-gray-700">Informações de Contato</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <MailIcon className="w-4 h-4 text-gray-500" />
                <span>Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="contato@clinica.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="telefone" className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <PhoneIcon className="w-4 h-4 text-gray-500" />
                <span>Telefone</span>
              </label>
              <input
                type="text"
                id="telefone"
                placeholder="(00) 00000-0000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <MapPinIcon className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-bold text-gray-700">Localização e Personalização</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="endereco" className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <MapPinIcon className="w-4 h-4 text-gray-500" />
                <span>Endereço Completo</span>
              </label>
              <input
                type="text"
                id="endereco"
                placeholder="Rua, número, bairro, cidade - estado"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="cor" className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <PaletteIcon className="w-4 h-4 text-gray-500" />
                <span>Cor de Identificação</span>
              </label>
              <div className="flex items-center gap-3">
                <div
                  className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-purple-400 transition-colors shadow-sm"
                  style={{ backgroundColor: form.color || "#3b82f6" }}
                  onClick={() => colorRef.current?.click()}
                />
                <input
                  ref={colorRef}
                  type="color"
                  className="absolute opacity-0 pointer-events-none"
                  value={form.color || "#3b82f6"}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
                <div className="text-xs font-mono text-gray-600 bg-white px-3 py-2 rounded border border-gray-200 min-w-[100px] text-center">
                  {form.color || "#3b82f6"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-end gap-4 pt-2">
          <button
            onClick={handleCloseModal}
            className="px-6 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={clinic ? handleUpdateClinic : handleCreateClinic}
            disabled={isUpdating || isCreating}
            className="px-6 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg flex flex-row items-center justify-center gap-2 transition-colors shadow-sm"
          >
            {(isUpdating || isCreating) && <Loader2Icon className="size-5 animate-spin" />}
            <p className="text-sm font-semibold">{clinic ? "Atualizar Clínica" : "Criar Clínica"}</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserFormModal;
