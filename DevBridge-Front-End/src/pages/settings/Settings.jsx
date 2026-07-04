import styles from "./Settings.module.css";
import { Sun, Moon, Monitor, Check ,
     Bug,
    Lightbulb,
    ChevronRight,
    FolderGit2
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";


const Settings = () => {

    const { theme, setTheme } = useTheme();

const themes = [
  {
    id: "light",
    title: "Light",
    description: "Bright appearance",
    icon: Sun,
  },
  {
    id: "dark",
    title: "Dark",
    description: "Recommended",
    icon: Moon,
  },
  {
    id: "system",
    title: "System",
    description: "Follow device",
    icon: Monitor,
  },
];

  return (
    <div className={styles.settings}>
      <div className={styles.header}>
        <h1>Settings</h1>
        <p>Manage your account preferences and application settings.</p>
      </div>

      {/* Appearance */}
     <section className={styles.section}>
  <div className={styles.sectionHeader}>
    <h2>Appearance</h2>
    <p>Choose how DevBridge looks on your device.</p>
  </div>

  <div className={styles.themeGrid}>
    {themes.map((item) => {
      const Icon = item.icon;

      return (
        <div
          key={item.id}
          className={`${styles.themeCard} ${
            theme === item.id ? styles.active : ""
          }`}
          onClick={() => setTheme(item.id)}
        >
          <div className={styles.iconWrapper}>
            <Icon size={24} />
          </div>

          <h3>{item.title}</h3>

          <p>{item.description}</p>

          {theme === item.id && (
            <div className={styles.check}>
              <Check size={18} />
            </div>
          )}
        </div>
      );
    })}
  </div>
</section>

      {/* Help & Feedback */}
      <section className={`${styles.section} card`}>
       <div className={styles.settingsSection}>

    <div className={styles.sectionHeader}>
        <h2>Help & Feedback</h2>
        <p>
            Help improve DevBridge by reporting issues or sharing ideas.
        </p>
    </div>

    <a
        href="mailto:liamlive19@gmail.com?subject=Bug Report - DevBridge"
        className={styles.settingRow}
    >

        <div className={styles.settingInfo}>

            <Bug size={20} />

            <div>

                <h4>Report a Bug</h4>

                <p>
                    Tell us about an issue you've encountered.
                </p>

            </div>

        </div>

        <ChevronRight size={18} />

    </a>

    <a
        href="mailto:liamlive19@gmail.com?subject=Feature Suggestion - DevBridge"
        className={styles.settingRow}
    >

        <div className={styles.settingInfo}>

            <Lightbulb size={20} />

            <div>

                <h4>Suggest a Feature</h4>

                <p>
                    Share your ideas to improve DevBridge.
                </p>

            </div>

        </div>

        <ChevronRight size={18} />

    </a>

</div>
      </section>

      {/* About */}
     <div className={styles.settingsSection}>
  <div className={styles.sectionHeader}>
    <h2>About DevBridge</h2>
    <p>Learn more about the application.</p>
  </div>

  <p className={styles.aboutDescription}>
    DevBridge is a full-stack collaboration platform that connects clients with
    skilled developers. Clients can post projects, hire developers, manage
    contracts, and leave reviews, while developers can showcase their skills,
    apply for projects, complete contracts, and build their professional
    reputation through verified client feedback.
  </p>

  <div className={styles.infoRow}>
    <span className={styles.infoLabel}>Version</span>
    <span className={styles.infoValue}>v1.0.0</span>
  </div>

  <div className={styles.infoRow}>
    <span className={styles.infoLabel}>Technology Stack</span>

    <div className={styles.techStack}>
      <span className="tag">React</span>
      <span className="tag">Node.js</span>
      <span className="tag">Express</span>
      <span className="tag">MongoDB</span>
    </div>
  </div>

  <div className={styles.infoRow}>
    <span className={styles.infoLabel}>Developer</span>
    <span className={styles.infoValue}>Pankaj Kumar</span>
  </div>

  <a
    href="YOUR_GITHUB_REPOSITORY"
    target="_blank"
    rel="noreferrer"
    className={styles.settingRow}
  >
    <div className={styles.settingInfo}>
      <FolderGit2 size={20} />
      <div>
        <h4>GitHub Repository</h4>
        <p>Browse the source code and project documentation.</p>
      </div>
    </div>

    <ChevronRight size={18} />
  </a>
</div>

     
    </div>
  );
};

export default Settings;