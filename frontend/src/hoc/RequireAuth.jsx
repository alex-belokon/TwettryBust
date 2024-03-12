import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
  const isLoggedIn = useSelector((state) => state.authUser.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/authorization"></Navigate>;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
