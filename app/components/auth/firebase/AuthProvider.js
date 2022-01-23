import React, { useEffect, useRef, useState } from 'react';
import {initializeApp} from 'firebase/app';
import { getFirebaseConfig } from './lib/functions';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FB_APP_NAME } from './lib/constants';

export const AuthContext = React.createContext();

export default function AuthProvider({children}){
    const [user,setUser] = useState(null);
    useEffect(()=>{
        const app = initializeApp(getFirebaseConfig(),FB_APP_NAME);    
        return onAuthStateChanged(getAuth(app),(user) => setUser(user));
    },[]);
    
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}   