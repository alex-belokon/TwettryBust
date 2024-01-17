import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function RequireAuth({ children }) {
  const isLogin = false; //поки false потім тягнути з редакса, залежно від того залогінений користувач чи ні

  if (!isLogin) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};