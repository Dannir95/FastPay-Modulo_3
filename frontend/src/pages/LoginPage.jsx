import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {Link} from 'react-router-dom'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="h-[calc(100vh-100px)  ] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 roundedn-md">
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500">Emial is required</p>}
          <input
            type="password"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button>Login</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
