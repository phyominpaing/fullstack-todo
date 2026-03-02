import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useUpdateProfileMutation } from "../slices/userApi";
import { toast } from "react-toastify";
import { setUserInfo } from "../slices/auth";
import { updateProfileSchema } from "../schema/update";

type FormInputs = z.infer<typeof updateProfileSchema>;

const Profile = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      password: "",
    },
  });

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await updateProfile(data).unwrap();
      dispatch(setUserInfo(res));
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <main className="max-w-lg mx-auto">
      <h2 className="text-3xl mb-5 font-bold">Profile</h2>
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
          Update Profile
        </button>
      </form>
    </main>
  );
};

export default Profile;
