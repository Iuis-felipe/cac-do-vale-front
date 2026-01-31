import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ChartPieIcon,
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  ArrowRightEndOnRectangleIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import userStore from '@/core/store/user';
import clinicStore from '@/core/store/clinic';

interface ISidebarButtonProps {
  icon: ReactNode;
  text: string;
  isExpanded: boolean;
  isActive: boolean;
  onClick: () => void;
  show?: boolean;
}

const SidebarButton = ({ icon, text, isExpanded, isActive, onClick, show = true }: ISidebarButtonProps) => {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center w-full text-white cursor-pointer rounded-md
        relative py-3 px-4
        transition-colors duration-200
        ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}
        ${isExpanded ? 'justify-start gap-4' : 'justify-center'}
      `}
    >
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute left-0 h-8 w-1 bg-purple-400 rounded-r-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <span className="flex-shrink-0">{icon}</span>
      {isExpanded && (
        <motion.span
          className="text-lg whitespace-nowrap"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.15, ease: 'easeOut' }}
        >
          {text}
        </motion.span>
      )}
    </button>
  );
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = userStore();
  const clinic = clinicStore.getState().clinic;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLabel = () => {
    if (!user || !user.name) return '-';
    const splitedName = user.name.trim().split(' ');
    if (splitedName.length === 1) {
      return `${splitedName[0][0]?.toUpperCase()}${splitedName[0][1]?.toUpperCase() || ''}`;
    }
    return `${splitedName[0][0]?.toUpperCase()}${splitedName[splitedName.length - 1][0]?.toUpperCase()}`;
  };

  const handleName = () => {
    if (!user || !user.name) return '-';
    const splitedName = user.name.trim().split(' ');
    if (splitedName.length === 1) {
      return splitedName[0];
    }
    return `${splitedName[0]} ${splitedName[splitedName.length - 1]}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  const navLinks = [
    { path: '/', icon: <ChartPieIcon className="size-7" />, text: 'Dashboard', permission: ['ATENDENTE', 'ADMIN', 'OWNER'] },
    { path: '/agendamento', icon: <CalendarIcon className="size-7" />, text: 'Agenda', permission: ['ATENDENTE', 'ADMIN', 'OWNER'] },
    { path: '/horarios', icon: <ClockIcon className="size-7" />, text: 'Horários', permission: ['ATENDENTE', 'ADMIN', 'OWNER'] },
    { path: '/analytics', icon: <ChartBarIcon className="size-7" />, text: 'Análise', permission: ['ATENDENTE', 'ADMIN', 'OWNER'] },
    { path: '/usuario', icon: <UserGroupIcon className="size-7" />, text: 'Usuários', permission: ['ADMIN', 'OWNER'] },
    { path: '/clinica', icon: <BuildingOfficeIcon className="size-7" />, text: 'Clinicas', permission: ['OWNER'] },
  ];

  return (
    <motion.aside
      style={{ background: clinic && clinic.cor ? clinic.cor : '#101F59' }}
      className="h-screen flex flex-col justify-between shadow-xl"
      initial={{ width: '5rem' }}
      animate={{ width: isExpanded ? '16rem' : '5rem' }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="w-full flex flex-col p-2">
        <div className="h-16 flex flex-col items-center justify-center w-full">
          <p className="text-center text-white font-bold text-2xl w-full whitespace-nowrap overflow-hidden">
            {isExpanded ? 'Agendamento' : 'A'}
          </p>
          <p className="text-center text-white font-light text-sm w-full whitespace-nowrap overflow-hidden">
            {isExpanded && clinic && `${clinic.name}`}
          </p>
        </div>

        <div className="w-full flex flex-col gap-2 mt-4">
          {navLinks.map((link) => (
            <SidebarButton
              key={link.path}
              icon={link.icon}
              text={link.text}
              isExpanded={isExpanded}
              isActive={location.pathname === link.path}
              onClick={() => navigate(link.path)}
              show={user ? link.permission.includes(user.role) : false}
            />
          ))}
        </div>
      </div>

      <div className="w-full p-3">
        <div className="w-full flex flex-row items-center gap-3 p-2 rounded-lg">
          <div className="p-2 rounded-full bg-purple-800 flex items-center justify-center min-w-[40px] h-[40px] ring-2 ring-white/20">
            <p className="text-sm text-white font-bold">{handleLabel()}</p>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.15, ease: 'easeOut' }}
              className="flex-1 flex items-center justify-between overflow-hidden"
            >
              <p className="text-md font-medium text-white whitespace-nowrap">{handleName()}</p>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="Sair"
                title="Sair"
              >
                <ArrowRightEndOnRectangleIcon className="size-6" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
