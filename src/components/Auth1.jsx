import { useContext } from "react";
import AuthContext from "./Auth1";

export const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;