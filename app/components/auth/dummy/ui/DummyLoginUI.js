import { Button } from "react-bootstrap";
import { NoUserAvatar } from "../../NoUserAvatar";
import { dummyUserLogin } from "../lib/function";

export default function DummyLoginUI({ user, setUser }) {
  const login = () => {
    const dummy_user = dummyUserLogin();
    setUser(dummy_user);
    sessionStorage.setItem("dummy_user", JSON.stringify(dummy_user));
  }
  const logout = () => {
    setUser({});
    sessionStorage.removeItem("dummy_user");
  }
  return (
      !user.id ? <div className="d-flex flex-column align-items-center my-3">
        <Button onClick={login}>Login</Button>
      </div> : 
    <>
      <div className="d-flex flex-column align-items-center mt-4 mb-3 ml-3 mr-3 border-bottom">
        <div className="mb-1">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              style={{
                borderRadius: "50%",
              }}
              height="64px"
              width="64px"
            />
          ) : (
            <NoUserAvatar size="64" name={user.name} />
          )}
        </div>
        <div className="font-weight-bold mb-1">{user.name}</div>
        <div className="mb-1" style={{ color: "var(--bs-gray-700)" }}>
          {user.email}
        </div>
      </div>
      <div className="d-flex justify-content-center mb-4 mt-3 ml-3 mr-3">
        <Button variant="secondary" onClick={logout}>Sign Out</Button>
      </div>
      </>
  );
}
