"use client";

import { useRequest } from "@/app/hooks/use-request";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

// TODO create a shared form component for sign in and sign up
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  // TODO create server actions
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form
      onSubmit={onSubmit}
      className=" flex flex-col gap-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-gray-700">Sign up</h1>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email Address
        </label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {errors}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
