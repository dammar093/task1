import React, { useEffect, useRef, useState } from "react";
import Input from "./componnets/input/Input";
import Output from "./componnets/output/Output";
import "./App.css";
import HomeLayout from "./componnets/layout/HomeLayout";

const App = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://compiler.skillshikshya.com/ws/compiler/"
    );
    socketRef.current = socket;

    // Connection opened
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received:", data);

      if (data.type === "stdout") {
        setOutput((prevOutput) => [...prevOutput, data.data]);
      }
    };

    // Handle WebSocket errors
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle connection close
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const runCode = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const payload = {
        command: "run",
        code: code,
        language: language,
        input: input,
      };

      socketRef.current.send(JSON.stringify(payload));
      console.log("Payload sent:", payload);
    } else {
      console.error("WebSocket is not open.");
    }
  };

  const stopCode = () => {
    if (socketRef.current) {
      socketRef.current.close();
      console.log("WebSocket connection stopped.");
      setOutput([]);
    } else {
      console.warn("No active WebSocket connection to stop.");
    }
  };
  return (
    <HomeLayout
      run={runCode}
      stopCode={setCode}
      setLanguage={setLanguage}
      language={language}
    >
      <div className="component-wrapper">
        <div className="input">
          <Input setCode={setCode} />
        </div>
        <div className="output">
          <Output output={output} setOutput={setOutput} />
        </div>
      </div>
    </HomeLayout>
  );
};

export default App;
