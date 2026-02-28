import React from "react";
import { STATUS_CONFIG } from "./auxiliar";
import { BadgeRoot } from "./StatusBadge.styled";

interface IStatusBadgeProps {
  status?: string;
}

const StatusBadge: React.FC<IStatusBadgeProps> = ({ status }) => {
  const { label, icon } = STATUS_CONFIG[status || ""] || STATUS_CONFIG.default;
  return (
    <BadgeRoot status={status}>
      {icon}
      <span>{label}</span>
    </BadgeRoot>
  );
};

export default StatusBadge;