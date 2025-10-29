import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import ReactMarkdown from "react-markdown";
import "./Post.css";

export default function Post() {
  const [code, setCode] = useState("");

  return (
    <div className="post-container">
      <h2 className="post-title">Create a Post</h2>

      <div className="editor-container">
        <CodeMirror
          value={code}
          height="250px"
          extensions={[javascript()]}
          onChange={(value) => setCode(value)}
        />
      </div>

      <h3 className="preview-title">Preview:</h3>
      <div className="markdown-preview">
        <ReactMarkdown>{code}</ReactMarkdown>
      </div>
    </div>
  );
}
