import React, { useState, useEffect, useRef } from "react";
import styles from "./input.module.css";

const LinedTextarea = ({ setCode }) => {
  const [lineNumbers, setLineNumbers] = useState(["1"]);
  const textareaRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = textareaRef.current.scrollTop;
    document.getElementById("line-numbers").scrollTop = scrollTop;
  };

  const handleInput = (e) => {
    const lines = e.target.value.split("\n").length;
    const lineNumbersArray = Array.from({ length: lines }, (_, i) => i + 1);
    setLineNumbers(lineNumbersArray);
  };

  useEffect(() => {
    handleInput({ target: { value: textareaRef.current.value } });
  }, []);

  return (
    <section className={styles.mainConatiner}>
      <div className={styles.text}>Status:🟢</div>
      <div className={styles.container}>
        <div id="line-numbers" className={styles.lineNumbers}>
          {lineNumbers.map((number) => (
            <div key={number}>{number}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          onScroll={handleScroll}
          onInput={handleInput}
          cols={20}
          rows={10}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
      </div>
    </section>
  );
};

export default LinedTextarea;
