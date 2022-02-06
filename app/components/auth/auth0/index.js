import Auth0AuthMenuButtonModule from './ui/Auth0AuthMenuButton';
import Auth0UserInfoModule from './ui/Auth0UserInfo';
import functions from './lib/functions';

export const Auth0AuthMenuButton = Auth0AuthMenuButtonModule;
export const Auth0AuthUserInfo = Auth0UserInfoModule;

export const getAuth0LoginURL = functions.getAuth0LoginURL;
export const getAuth0LogoutURL = functions.getAuth0LogoutURL;
