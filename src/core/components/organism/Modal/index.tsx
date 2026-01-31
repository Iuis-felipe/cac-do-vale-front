import { XMarkIcon } from "@heroicons/react/24/outline";

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  size?: string;
  height?: string;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, title, size = "w-1/3", height = "h-fit", onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-screen bg-black/80 flex items-center justify-center z-50 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className={`${size} ${height} bg-white rounded-md p-4 my-auto`}>
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">{title}</p>
          <button onClick={onClose} className="cursor-pointer p-0">
            <XMarkIcon className="size-6 text-slate-600" />
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