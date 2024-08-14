import { Redirect, redirect } from "react-router-dom";
import { userOktaAuth } from "@okta/okta-react";
import Spinner from "../layouts/utils/Spinner";
import SigninWidget from "./SigninWidget";

const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = userOktaAuth();
  const onSuccess = (token) => {
    oktaAuth.handleLoginRedirect(token);
  };
  const onError = (error) => {
    console.log("Error occur in sign-in " + error);
  };

  if (!authState) {
    return <Spinner />;
  }

  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <SigninWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default LoginWidget;
