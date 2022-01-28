import functions from "./lib/functions";
import firebaseAuthMenuButtonModule from "./ui/FirebaseAuthMenuButton";
import firebaseAuthUIModule from "./ui/FirebaseAuthUI";
import firebaseLogimFormModule from "./ui/FirebaseLoginForm";
import firebaseSignupFormModule from "./ui/FirebaseSignupForm";
import firebaseUserInfoModule from "./ui/FirebaseUserInfo";

export const withFirebaseAuthUser = functions.withFirebaseAuthUser;
export const withFirebaseAuthUserSSR = functions.withFirebaseAuthUserSSR;
export const withFirebaseAuthUserTokenSSR = functions.withFirebaseAuthUserTokenSSR;
export const useFirebaseAuthUser = functions.useFirebaseAuthUser;
export const getInitAuthResult = functions.getInitAuthResult;
export const initAuth = functions.initAuth;
export const createEmptyAuthUser = functions.createEmptyAuthUser;

export const FirebaseAuthMenuButton = firebaseAuthMenuButtonModule;
export const FirebaseAuthUI = firebaseAuthUIModule;
export const FirebaseLoginForm = firebaseLogimFormModule;
export const FirebaseSignupForm = firebaseSignupFormModule;
export const FirebaseUserInfo = firebaseUserInfoModule;
