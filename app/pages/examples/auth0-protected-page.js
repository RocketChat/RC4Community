import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getAuth0LoginURL, getAuth0LogoutURL } from '../../components/auth/auth0';

export default ({customProp}) => {
    const { user, error, isLoading } = useUser();
    console.log(customProp);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (user) {
        return (
            <div>
            Welcome {user.name}! <a href={getAuth0LogoutURL({redirectToThisPage: true})}>Logout</a>
            </div>
        );
    }
    return <a href={getAuth0LoginURL({redirectToThisPage: true})}>Login</a>;
};

export const getServerSideProps = withPageAuthRequired({ 
    async getServerSideProps(){
        return {
            props: {
                customProp: "customPropValue"
            }
        }
    }
});
