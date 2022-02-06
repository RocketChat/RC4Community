import urlJoin from 'url-join';
const prepareUrl = (url,returnTo=null,redirectToThisPage=false) => {
    let returnUrl = urlJoin(process.env.AUTH0_BASE_URL || '/', url); 
    if(typeof window !== 'undefined'){
        if(returnTo){
            return returnUrl + '?returnTo='+encodeURIComponent(returnTo);
        } else if(redirectToThisPage){
            return returnUrl + '?returnTo='+encodeURIComponent(window.location.href);
        }
    } 
    return returnUrl;
}

/**
 * 
 * @param {String} returnTo
 * URL to redirect to after logout.
 * @param {boolean} redirectToThisPage 
 * Whether to redirect to the url where the function is called.
 * @returns logoutUrl
 */
export const getAuth0LoginURL = ({
    returnTo = null,
    redirectToThisPage = false
} = {}) => {
    return prepareUrl('/api/auth0/login',returnTo,redirectToThisPage)
};

/**
 * 
 * @param {String} returnTo
 * URL to redirect to after logout. The url passed must be added in logout urls list auth0 dashboard.
 * @param {boolean} redirectToThisPage 
 * Whether to redirect to the url where the function is called. The url must be added in logout urls list in auth0 dashboard.
 * @returns logoutUrl
 */
export const getAuth0LogoutURL = ({
    returnTo = null,
    redirectToThisPage = false
} = {}) => {
    return prepareUrl('/api/auth0/logout',returnTo,redirectToThisPage)
};

export default {
    getAuth0LoginURL,
    getAuth0LogoutURL
};
