import { useState, useEffect } from 'react'
import ProjectCard from '../../components/project/ProjectCard'
import { getProjects } from '../../services/projectService'
import styles from './Projects.module.css'
import UniversalPageSkeleton from '../../components/Skeleton/UniversalPageSkeleton'
const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const data = await getProjects()
        setProjects(data.projects)
      } catch (err) {
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading){
       return (
  <UniversalPageSkeleton/>

    );
  } 
  if (error) return <div className={`${styles.center} error`}>{error}</div>

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <h2>Browse Projects</h2>
        <p>Find exciting projects and work on what inspires you.</p>
      </div>

      {projects.length === 0 ? (
        <div className={styles.center}>No projects found</div>
      ) : (
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

    </div>
  )
}

export default Projects