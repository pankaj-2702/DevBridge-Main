import styles from "./Skeleton.module.css";

const Skeleton = ({
  width = "100%",
  height = "20px",
  circle = false,
  className = ""
}) => {

  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        borderRadius: circle ? "50%" : "8px"
      }}
    />
  );

};

export default Skeleton;