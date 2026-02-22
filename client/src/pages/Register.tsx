import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";


const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { register, handleSubmit } = useForm<FormInputs>();

  const submit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
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
          <input
            {...register("name", { required: "Name is required" })}
            className="form"
            type="text"
            id="name"
          />
          {/* {errors.name && <p className="text-red-500">{errors.name.message}</p>} */}
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
            Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            className="form"
            type="email"
            id="email"
          />
        </div>
        <div>
          <label
            className="block mb-1 text-sm text-gray-500"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            className="form"
            type="password"
            id="password"
          />
        </div>
        <button
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
