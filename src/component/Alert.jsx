import React, { useEffect } from "react";

const Alert = ({ closeAlert, alertMessage }) => {
  useEffect(() => {
    let alert = setTimeout(closeAlert, 3000);

    return () => clearTimeout(alert);
  }, []);

  return (
    <div>
      <p className="text-center">{alertMessage}</p>
    </div>
  );
};

export default Alert;
