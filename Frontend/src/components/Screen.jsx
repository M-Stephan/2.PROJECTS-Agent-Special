// Screen.js
import "../styles/Screen.css";
import detective_desk from "../assets/detective_desk2.png";

// Component to display a screen overlay with a detective desk background
function Screen({ children, className }) {
  // Render the screen with background and children content
  return (
    <div className="pc-container">
      <img src={detective_desk} className="pc-image" alt="PC" />
      <div className={`screen-in ${className || ""}`}>
        {children}
      </div>
    </div>
  );
}

export default Screen;