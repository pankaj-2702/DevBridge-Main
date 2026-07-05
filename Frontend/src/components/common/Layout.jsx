import { useState } from 'react'
import Sidebar from './Sidebar'
import styles from './Layout.module.css'
import Topbar from './Topbar'

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className={styles.layout}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {isSidebarOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <main className={styles.main}>
        <div>
          <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        </div>
        {children}
      </main>
    </div>
  )
}

export default Layout