import { useNavigate } from "react-router-dom";
export function redirection() {
    const navigate = useNavigate();
    navigate("/login");
}

