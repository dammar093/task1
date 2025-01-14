import React from "react";
import styles from "./output.module.css";

const Output = ({ output, setOutput }) => {
  return (
    <section className={styles.mainConatiner}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div className={styles.text}>Output:</div>
        <div>
          <button
            onClick={() => {
              setOutput("");
            }}
            className={styles.button}
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        className={styles.output}
        cols={20}
        rows={10}
        value={String(output).replaceAll(",", "")}
      ></textarea>
    </section>
  );
};

export default Output;
