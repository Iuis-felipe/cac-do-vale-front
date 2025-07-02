import {  useState } from 'react';
import { motion } from 'motion/react';
import { ChartPieIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (url: string) => {
    navigate(url)
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/auth');
  }

  return (
    <motion.aside
      className="bg-blue-800 h-full flex flex-col items-start justify-between"
      initial={{ width: "3.5rem" }}
      animate={{ width: isExpanded ? "13rem" : "3.5rem" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className='w-full flex flex-col gap-4'>
        {isExpanded ? (
          <p className='text-center mt-4'> Agendamento </p>
        ) : (
          <p className='text-center mt-4'> A </p>
        )}
      
        {isExpanded && (
          <motion.h3
            className="ml-4 font-medium text-[#E9FFF2] text-[20px] tracking-[10%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            MENU
          </motion.h3>
        )}

        <div className='w-full flex flex-col gap-4'>
          <button 
            className={`w-fit py-2 flex flex-row items-center gap-3 cursor-pointer ${isExpanded ? "ml-4" : "mx-auto"}`} 
            onClick={() => handleClick('/')}
          >
            <ChartPieIcon className='text-white size-7' />  
            {isExpanded && <span className='text-white text-lg'> Dashboard </span>}
          </button>
          <button 
            className={`w-fit py-2 flex flex-row items-center gap-3 cursor-pointer ${isExpanded ? "ml-4" : "mx-auto"}`} 
            onClick={() => handleClick('/agendamento')}
          >
            <CalendarIcon className='text-white size-7' />  
            {isExpanded && <span className='text-white text-lg'> Agenda </span>}
          </button>
          <button 
            className={`w-fit py-2 flex flex-row items-center gap-3 cursor-pointer ${isExpanded ? "ml-4" : "mx-auto"}`} 
            onClick={() => handleClick('/usuario')}
          >
            <UserGroupIcon className='text-white size-7' />  
            {isExpanded && <span className='text-white text-lg'> Usuários </span>}
          </button>
        </div>
      </div>
      <div className={`w-full flex flex-row items-center gap-2 ${isExpanded ? 'p-4' : 'justify-center pb-4'}`}>
        <div className='p-2 rounded-full bg-purple-800 flex items-center justify-center'>
          <p className='text-sm text-white'> AD </p>
        </div>
        {isExpanded && (
          <div>
            <p className='text-md font-medium text-white'> Admin Teste </p>
            <p className='text-sm text-white cursor-pointer' onClick={handleLogout}> Sair </p>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

