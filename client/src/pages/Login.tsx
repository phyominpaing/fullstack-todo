import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/login";
import { useLoginMutation } from "../slices/userApi";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../slices/auth";

type FormInputs = z.infer<typeof loginSchema>;

const Login = () => {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setUserInfo(res));
    } catch (err : any) {
      console.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div className="max-w-md mx-auto border p-4 mt-20">
      <h2 className="text-3xl font-medium mb-2">Login</h2>
      <form
        className=" flex flex-col space-y-2"
        onSubmit={handleSubmit(submit)}
      >
        <div>
          <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            className="form"
            type="email"
            id="email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label
            className="block mb-1 text-sm text-gray-500"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password")}
            className="form"
            type="password"
            id="password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
