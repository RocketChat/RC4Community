import { useContext, useEffect, useState } from "react"
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { getApp } from "firebase/app";
import { FB_APP_NAME } from "../lib/constants";
import { AuthContext } from "../AuthProvider";

/**
 * Returns firebase user if logged in. Otherwise null. firebase app must be initialized before using this hook.
 * @returns firebaseUser
 */
export const getUser = () => {
    const user = useContext(AuthContext);
    return user;
}