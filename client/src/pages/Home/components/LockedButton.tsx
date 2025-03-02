import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import "../styles/locked-button.css"; // Archivo CSS para animaciones y estilos

interface LockedButtonProps {
  label?: string; // Texto opcional
}

const LockedButton: React.FC<LockedButtonProps> = ({ label = "Locked" }) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    console.log("shake");
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // Duración de la animación
  };

  return (
    <button
      className={`locked-button ${isShaking ? "shake" : ""}`}
      onClick={handleClick}
    >
      <i className="fas fa-lock"></i> {label}
    </button>
  );
};

export default LockedButton;
