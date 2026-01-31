import { STATUS_CONFIG } from "./auxiliar";

interface IStatusBadgeProps {
  status?: string;
}

const StatusBadge: React.FC<IStatusBadgeProps> = ({ status }) => {
  const { label, color, icon } = STATUS_CONFIG[status || ""] || STATUS_CONFIG.default;
  return (
    <div className={`hidden md:flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border font-medium ${color}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default StatusBadge;