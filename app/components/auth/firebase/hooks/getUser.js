import { useContext } from "react"
import { AuthContext } from "../AuthProvider";

/**
 * Returns firebase user if logged in. Otherwise null. firebase app must be initialized before using this hook.
 * @returns firebaseUser
 */
export const getUser = () => {
    const user = useContext(AuthContext);
    return user;
}