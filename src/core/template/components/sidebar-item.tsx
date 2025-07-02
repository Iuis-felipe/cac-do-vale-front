import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

interface ISidebarItemProps {
  href: string;
  icon: ReactNode;
  text: string;
  isExpanded: boolean;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({ href, icon, text, isExpanded }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href)
  }

  return (
    <div onClick={() => handleClick()}>
      <motion.li className={`relative flex items-center px-4 py-2 transition-all`}>
        <span className="mr-3 flex-shrink-0">
          {icon}
        </span>

        {isExpanded && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            {text}
          </motion.span>
        )}
      </motion.li>
    </div>
  );
};

export default SidebarItem;