import { NavLink, useNavigate } from 'react-router-dom'
import  useAuth  from '../../hooks/useAuth'
import useModal from '../../hooks/useModal'
import styles from './Sidebar.module.css'
import {
  House,
  User,
  FolderOpen,
  PlusSquare,
  FileText,
  MessageSquare,
  BriefcaseBusiness,
  Settings,
  LogOut,
  FolderKanban,
 XIcon
} from "lucide-react";

const navItems = [
  {
    label: "Home",
    path: "/dashboard",
    icon: House,
    roles: ["client", "developer"],
  },
  {
    label: "Profile",
    path: "/profile",
    icon: User,
    roles: ["client", "developer"],
  },
  {
    label: "Browse Projects",
    path: "/projects",
    icon: FolderOpen,
    roles: ["client", "developer"],
  },
  {
    label: "Create Project",
    path: "/projects/create",
    icon: PlusSquare,
    roles: ["client"],
  },
  {
    label: "My Projects",
    path: "/my-projects",
    icon: FolderKanban,
    roles: ["client"],
  },
  {
    label: "My Proposals",
    path: "/proposals",
    icon: FileText,
    roles: ["developer"],
  },
  
  {
    label: "Contracts",
    path: "/contracts",
    icon: BriefcaseBusiness,
    roles: ["client", "developer"],
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user,logout } = useAuth()
  const navigate = useNavigate()

  const { showModal } = useModal();

  const handleLogout = async () => {
    showModal({
      title: "Logout",
      message: "Are you sure you want to logout?",
      confirmText: "Logout",
      cancelText: "Cancel",
      onConfirm: async () => {
        logout();
        navigate('/login');
      }
    })
  }
  //console.log(user)


    return (
  <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
    <button className={styles.closeBtn} onClick={onClose}><XIcon size={20}/></button>

    <div className={styles.logo}>
      <span className={styles.logoIcon}>⬡</span>
      <span className={styles.logoText}>DevBridge</span>
    </div>

    <nav className={styles.nav}>
      {navItems
        .filter((item) => item.roles.includes(user?.role))
        .map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/projects"}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              <Icon size={20} className={styles.icon} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
    </nav>

    <div className={styles.bottom}>
      <NavLink to="/settings" className={styles.navItem} onClick={onClose}>
        <Settings className={styles.icon} />
        <span>Settings</span>
      </NavLink>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        <LogOut className={styles.icon} />
        <span>Logout</span>
      </button>
    </div>
  </aside>
)
  
}

export default Sidebar