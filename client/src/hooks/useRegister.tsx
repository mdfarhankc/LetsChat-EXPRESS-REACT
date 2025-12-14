import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export interface RegisterInputType {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
}

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const register = async (inputs: RegisterInputType) => {
    try {
        setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setAuthUser(data);
      toast.success("Account Registered Successfully!")
    } catch (error) {
      console.error("Error", error);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {loading, register};
};

export default useRegister;
