import Sidebar from './Sidebar'
import styles from './Layout.module.css'
import Topbar from './Topbar'
const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />

      
      <main className={styles.main}>
        <div>
        <Topbar/>
      </div>
        {children}
      </main>
    </div>
  )
}

export default Layout