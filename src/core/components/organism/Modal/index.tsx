import { XMarkIcon } from "@heroicons/react/24/outline";

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  size?: string;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, title, size = "w-1/3", onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-50">
      <div className={`${size} h-fit bg-white rounded-md p-4`}>
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">{title}</p>
          <button onClick={onClose} className="cursor-pointer p-0">
            <XMarkIcon className="size-6 text-slate-600"/>
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;