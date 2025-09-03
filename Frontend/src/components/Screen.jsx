// Screen.js
import "../styles/Screen.css";
import detective_desk from "../assets/detective_desk2.png";

function Screen({ children, className }) {
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