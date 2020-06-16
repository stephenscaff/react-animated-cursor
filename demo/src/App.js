import React from "react";
import AnimatedCursor from "../../lib"
import DemoContent from "./DemoContent";
import "./demo-styles.css";

export default function App() {
  return (
    <div className="App">
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color='220, 90, 90'
        outerAlpha = {0.4}
      />
      <DemoContent />
    </div>
  )
}
