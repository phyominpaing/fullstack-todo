import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { registerSchema } from "../schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../slices/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const [registerMutation, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await registerMutation(data).unwrap();
      reset();
      toast.success("Registration successful");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="max-w-md mx-auto border p-4 mt-20">
      <h2 className="text-3xl font-medium mb-2">Register</h2>
      <form
        className=" flex flex-col space-y-2"
        onSubmit={handleSubmit(submit)}
      >
        <div>
          <label className="block mb-1 text-sm text-gray-500" htmlFor="name">
            Name
          </label>
          <input {...register("name")} className="form" type="text" id="name" />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
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
          disabled={isSubmitting || isLoading}
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
