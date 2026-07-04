import { NavLink, useNavigate } from 'react-router-dom'
import  useAuth  from '../../hooks/useAuth'
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
  FolderKanban
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

const Sidebar = () => {
  const { user,logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    logout()
    navigate('/login')
  }
  //console.log(user)
  return (
    <aside className={styles.sidebar}>

      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.logoIcon}>⬡</span>
        <span className={styles.logoText}>DevBridge</span>
      </div>

      {/* Nav Items */}
      <nav className={styles.nav}>
  {navItems
    .filter((item) => item.roles.includes(user?.role))
    .map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/projects"}
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <Icon size={20} className={styles.icon} />
          <span>{item.label}</span>
        </NavLink>
      );
    })}
</nav>

      {/* Bottom — Settings + Logout */}
      <div className={styles.bottom}>
        <NavLink to="/settings" className={styles.navItem}>
          <Settings className={styles.icon}/>
          <span>Settings</span>
        </NavLink>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut className={styles.icon}/>
          <span>Logout</span>
        </button>
      </div>

    </aside>
  )
}

export default Sidebar