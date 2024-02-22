import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
  // console.log('Rendering RequireAuth');
  const isLoggedIn = useSelector((state) => state.authUser.isLoggedIn);
  // console.log("isLoggedIn RequireAuth", isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
