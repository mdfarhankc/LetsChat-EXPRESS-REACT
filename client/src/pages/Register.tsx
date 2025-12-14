import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import useRegister, { RegisterInputType } from "../hooks/useRegister";

const Register = () => {
  const {loading, register} = useRegister();

  const [inputs, setInputs] = useState<RegisterInputType>({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register(inputs);
  };

  return (
    <section className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> LetsChat</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Your Full Name..."
              className="w-full input input-bordered  h-10"
              value={inputs.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Your Username ..."
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-white">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-x-1">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-white">Male</span>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="radio checked:bg-blue-500"
                  checked={inputs.gender === "male"}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-white">Female</span>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="radio checked:bg-pink-500"
                  checked={inputs.gender === "female"}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700" disabled={loading}>
              {
                loading ? "Loading ..." : "Sign Up"
              }
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Register;
