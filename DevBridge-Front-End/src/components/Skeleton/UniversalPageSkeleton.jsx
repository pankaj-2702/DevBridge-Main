import Skeleton from "./Skeleton.jsx"; 
import styles from "./UniversalPageSkeleton.module.css";

const UniversalPageSkeleton = () => {

    return (
      <div className={styles.container}>
         <div className={styles.grid}>
        <Skeleton height="200px" width="450px"/>
        <Skeleton height="200px" width="450px"/>
        <Skeleton height="200px" width="450px"/>
        <Skeleton height="200px" width="450px"/>
        <Skeleton height="200px" width="450px"/> 
        <Skeleton height="200px" width="450px"/>
        <Skeleton height="200px" width="450px"/>
        <Skeleton height="200px" width="450px"/>
        <Skeleton height="200px" width="450px"/>
        <Skeleton height="200px" width="450px"/>
        <Skeleton height="200px" width="450px"/>
      </div>
      </div>
    );

};

export default UniversalPageSkeleton;