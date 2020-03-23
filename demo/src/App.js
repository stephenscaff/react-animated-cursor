import React from "react";
import AnimatedCursor from "../../lib"
import DemoContent from "./DemoContent";
import "./demo-styles.css";

export default function App() {
  return (
    <div className="App">
      <AnimatedCursor
        dotSize={8}
        outlineSize={8}
        color='220, 90, 90'
        outlineAlpha = {0.2}
      />
      <DemoContent />
    </div>
  );
}
