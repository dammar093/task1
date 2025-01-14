import React from "react";
import styles from "./layout.module.css";

export const languages = [
  {
    id: 1,
    title: "python",
  },
  {
    id: 2,
    title: "html",
  },
  {
    id: 3,
    title: "javascript",
  },
  {
    id: 4,
    title: "java",
  },
  {
    id: 5,
    title: "c++",
  },
  {
    id: 6,
    title: "rust",
  },
  {
    id: 7,
    title: "php",
  },
];

const HomeLayout = ({ run, stopCode, setLanguage, language, children }) => {
  return (
    <section className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logo}
            src="https://compiler.skillshikshya.com/assets/runnerlogo-BTTcLtOZ.png"
            alt=""
          />
          <h2>Code Runner</h2>
        </div>
        <div>
          <div className={styles.rightContainer}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lg) => (
                <option value={lg.title} key={lg.id}>
                  {lg.title}
                </option>
              ))}
            </select>
            <button
              className={`${styles.button} ${styles.start}`}
              onClick={run}
            >
              start
            </button>
            <button
              className={`${styles.button} ${styles.stop}`}
              onClick={stopCode}
            >
              stop
            </button>
          </div>
        </div>
      </header>
      <div>
        <div></div>
        <div>{children}</div>
      </div>
    </section>
  );
};

export default HomeLayout;
