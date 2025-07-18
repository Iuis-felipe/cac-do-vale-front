import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChartPieIcon, UserGroupIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import userStore from '@/core/store/user';

interface ISidebarButtonProps {
  icon: ReactNode;
  text: string;
  isExpanded: boolean;
  onClick: () => void;
}

const SidebarButton = ({ icon, text, isExpanded, onClick }: ISidebarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center w-full text-white cursor-pointer
        py-3 px-4 // Padding consistente
        hover:bg-white/10 // Efeito de hover: fundo branco com 10% de opacidade
        transition-colors duration-200 // Transição suave da cor de fundo
        ${isExpanded ? 'justify-start gap-4' : 'justify-center'}
      `}
    >
      {icon}
      {isExpanded && (
        <motion.span
          className="text-lg whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          {text}
        </motion.span>
      )}
    </button>
  );
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = userStore();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleLabel = () => {
    if (!user || !user.name) return "-";
    const splitedName = user.name.split(" ");
    if (splitedName.length === 1) {
      return `${splitedName[0][0].toUpperCase()}${splitedName[0][1]?.toUpperCase() || ''}`;
    }
    return `${splitedName[0][0].toUpperCase()}${splitedName[1][0].toUpperCase()}`;
  };

  const handleName = () => {
    if (!user || !user.name) return "-";
    const splitedName = user.name.split(" ");
    if (splitedName.length === 1) {
      return `${splitedName[0]}`;
    }
    return `${splitedName[0]} ${splitedName[splitedName.length - 1]}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  return (
    <motion.aside
      className="bg-[#101F59] h-full flex flex-col items-start justify-between"
      initial={{ width: "4rem" }}
      animate={{ width: isExpanded ? "16rem" : "4rem" }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className='w-full flex flex-col'>
        <div className='h-16 flex items-center w-full'>
          <p className='text-center text-white font-bold text-xl w-full whitespace-nowrap'>
            {isExpanded ? "Agendamento" : "A"}
          </p>
        </div>

        <div className='w-full flex flex-col gap-1 mt-4'>
          <SidebarButton
            icon={<ChartPieIcon className='size-7' />}
            text="Dashboard"
            isExpanded={isExpanded}
            onClick={() => navigate('/')}
          />
          <SidebarButton
            icon={<CalendarIcon className='size-7' />}
            text="Agenda"
            isExpanded={isExpanded}
            onClick={() => navigate('/agendamento')}
          />
          <SidebarButton
            icon={<ClockIcon className='size-7' />}
            text="Horarios"
            isExpanded={isExpanded}
            onClick={() => navigate('/horario')}
          />
          <SidebarButton
            icon={<UserGroupIcon className='size-7' />}
            text="Usuários"
            isExpanded={isExpanded}
            onClick={() => navigate('/usuario')}
          />
        </div>
      </div>

      <div className={`w-full flex flex-row items-center gap-3 p-4`}>
        <div className='p-2 rounded-full bg-purple-800 flex items-center justify-center min-w-[40px]'>
          <p className='text-sm text-white font-bold'> {handleLabel()} </p>
        </div>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="overflow-hidden"
          >
            <p className='text-md font-medium text-white whitespace-nowrap'> {handleName()} </p>
            <p className='text-sm text-white/70 cursor-pointer hover:text-white' onClick={handleLogout}> Sair </p>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};