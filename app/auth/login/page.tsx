"use client";

import { login } from "@/api/auth";
import Loader from "@/components/ux/Loader";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [passwordInput, setPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      window.setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  }, [isSuccess]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      username,
      password,
      setIsError,
      setIsLoading,
      setIsSuccess,
      setResponseMessage,
    });
  };

  return (
    <div className="flex flex-col gap-6 w-screen h-screen fixed top-0 left-0 items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.form
          layout="position"
          onSubmit={submit}
          className="flex flex-col items-center gap-4 bg-white rounded-[var(--radius-m)] border border-[var(--border-2)] p-4"
        >
          <span className="font-semibold font-h-4">Login</span>

          <div className="input-group w-[17rem]">
            <input
              required
              type="text"
              className="w-[17rem]"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group w-[17rem]">
            <input
              required
              type={passwordInput ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setPasswordInput(!passwordInput)}
              className="flex items-center justify-center"
            >
              <AnimatePresence mode="popLayout">
                {passwordInput ? (
                  <motion.span
                    key={"on"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    className="cursor-pointer ml-auto opacity-50"
                  >
                    <IconEye />
                  </motion.span>
                ) : (
                  <motion.span
                    key={"off"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    className="cursor-pointer ml-auto opacity-50"
                  >
                    <IconEyeOff />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </div>

          <button style={{ width: "100%" }} className="cta">
            {isLoading ? <Loader /> : "Login"}
          </button>
        </motion.form>

        {isError && (
          <motion.span
            layout="position"
            key={'error'}
            className="font-semibold font-p-3 px-4 py-1.5 bg-red-100 text-red-600 border border-red-300 rounded-4xl"
          >
            {responseMessage}
          </motion.span>
        )}

        {isSuccess && (
          <motion.span
            layout="position"
            key={'success'}
            className="font-semibold font-p-3 px-4 py-1.5 bg-green-100 text-green-600 border border-green-300 rounded-4xl"
          >
            You{`'`}re logged in and ready to go...
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
