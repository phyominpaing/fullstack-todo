import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { useLogoutMutation } from "../slices/userApi";
import { clearUserInfo } from "../slices/auth";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout({}).unwrap();
      dispatch(clearUserInfo());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="flex my-10 items-center justify-between">
      <Link to="/" className="text-3xl font-bold">
        Simple Share
      </Link>

      <div className="space-x-4">
        {userInfo ? (
          <>
            <Link
              to={"/profile"}
              className=" text-white bg-black py-2 px-4 rounded-md border"
            >
              Profile
            </Link>

            <button
              type="button"
              className="text-white cursor-pointer bg-red-500 py-2 px-4 rounded-md"
              onClick={logoutHandler}
              disabled={isLoading}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className=" text-white bg-black py-2 px-4 rounded-md border"
            >
              Login
            </Link>
            <Link to="/register" className="border py-2 px-4 rounded-md">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
