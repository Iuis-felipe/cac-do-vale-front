import { useMemo, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import {
  ArrowRightEndOnRectangleIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userStore from "@/core/store/user";
import "./sidebar.css";
import { HomeIcon } from "lucide-react";

interface NavLink {
  path: string;
  icon: ReactNode;
  text: string;
  permission: string[];
}

interface NavSection {
  title: string;
  links: NavLink[];
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  href: string;
  isActive: boolean;
  onClick: (event: MouseEvent) => void;
}

const SidebarItem = ({ icon, text, href, isActive, onClick }: SidebarItemProps) => {
  return (
    <Link to={href} className={`nav-item ${isActive ? "active" : ""}`} title={text} aria-label={text} onClick={onClick}>
      <div className="left-bar"></div>
      <div className="sidebar-icon" aria-hidden="true">
        {icon}
      </div>
      <span className="nav-text">{text}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = userStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLabel = () => {
    if (!user || !user.name) return "-";
    const splitedName = user.name.trim().split(" ");
    if (splitedName.length === 1) {
      return `${splitedName[0][0]?.toUpperCase()}${splitedName[0][1]?.toUpperCase() || ""}`;
    }
    return `${splitedName[0][0]?.toUpperCase()}${splitedName[splitedName.length - 1][0]?.toUpperCase()}`;
  };

  const handleName = () => {
    if (!user || !user.name) return "-";
    const splitedName = user.name.trim().split(" ");
    if (splitedName.length === 1) {
      return splitedName[0];
    }
    return `${splitedName[0]} ${splitedName[splitedName.length - 1]}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const navSections: NavSection[] = useMemo(
    () => [
      {
        title: "Menu",
        links: [
          {
            path: "/",
            icon: <HomeIcon className="size-6" />,
            text: "Dashboard",
            permission: ["ATENDENTE", "ADMIN", "OWNER"],
          },
          {
            path: "/agendamento",
            icon: <CalendarIcon className="size-6" />,
            text: "Agenda",
            permission: ["ATENDENTE", "ADMIN", "OWNER"],
          },
          {
            path: "/horarios",
            icon: <ClockIcon className="size-6" />,
            text: "Horários",
            permission: ["ATENDENTE", "ADMIN", "OWNER"],
          },
          {
            path: "/analytics",
            icon: <ChartBarIcon className="size-6" />,
            text: "Análise",
            permission: ["ATENDENTE", "ADMIN", "OWNER"],
          },
        ],
      },
      {
        title: "Geral",
        links: [
          {
            path: "/usuario",
            icon: <UserGroupIcon className="size-6" />,
            text: "Usuários",
            permission: ["ADMIN", "OWNER"],
          },
          {
            path: "/clinica",
            icon: <BuildingOfficeIcon className="size-6" />,
            text: "Clinicas",
            permission: ["OWNER"],
          },
        ],
      },
    ],
    [],
  );

  const isOpen = isHovered || isExpanded;
  const roleLabel = user?.role ?? "-";

  const handleItemClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleProfileClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded((prev) => !prev)}
      role="navigation"
      aria-label="Navegacao principal"
      aria-expanded={isOpen}
    >
      <div className="sidebarWrapper">
        <div className="sidebar-logo">
          <img
            src={isOpen ? "src/assets/nova-full-logo.svg" : "src/assets/nova-small-logo.svg"}
            alt="Nova Developments logo"
            width={isOpen ? 120 : 32}
            height={32}
          />
        </div>

        {navSections.map((section, sectionIndex) => {
          const visibleLinks = section.links.filter((link) => (user ? link.permission.includes(user.role) : false));
          if (visibleLinks.length === 0) return null;

          return (
            <div key={section.title}>
              <div className="sidebar-title" data-section={section.title.toLowerCase()}>
                <h3>{section.title}</h3>
              </div>
              <nav className="nav-section">
                {visibleLinks.map((link) => (
                  <SidebarItem
                    key={link.path}
                    icon={link.icon}
                    text={link.text}
                    href={link.path}
                    isActive={isActivePath(link.path)}
                    onClick={handleItemClick}
                  />
                ))}
              </nav>
              {sectionIndex < navSections.length - 1 && <span className="sidebar-divider"></span>}
            </div>
          );
        })}
      </div>

      <div className="sidebarProfile">
        <span className="sidebar-divider"></span>
        <div className="profile" onClick={handleProfileClick}>
          <div className="profile-avatar" aria-hidden="true">
            {handleLabel()}
          </div>
          <div className="profile-infos">
            <h3 className="name">{handleName()}</h3>
            <p className="rule">{roleLabel}</p>
          </div>
          <div className="profile-actions">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleLogout();
              }}
              className="profile-logout"
              aria-label="Sair"
              title="Sair"
            >
              <ArrowRightEndOnRectangleIcon className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
