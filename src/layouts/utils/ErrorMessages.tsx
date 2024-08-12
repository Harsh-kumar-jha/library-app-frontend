import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong>Error!</strong> {message}
    </div>
  );
};

export default ErrorMessage;
