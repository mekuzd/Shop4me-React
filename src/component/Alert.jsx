import React, { useEffect } from "react";

const Alert = ({ closeAlert, alertMessage }) => {
  useEffect(() => {
    setTimeout(closeAlert, 3000);
  }, []);
  return (
    <div className="alert">
      <p className="text-center">{alertMessage}</p>
    </div>
  );
};

export default Alert;
