"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/SignupInNavBar/navbar";
import dynamic from "next/dynamic";
const CanvasBackground = dynamic(
  () => import("@/components/SignupInNavBar/canvas-background"),
  { ssr: false }
);

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [signupError, setSignupError] = useState("");
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    const userData = {
      name,
      email,
      password
    };

    try {
      await axios.post("/api/auth/signup", userData);
      console.log("signup successful");
      // Do email verification

      const response = await signIn("credentials", {
        redirect: false,
        email,
        password
      });

      console.log(response);

      console.log("signin.....");
      router.push("/");
    } catch (err) {
      console.error("Signup Error:", err);

      if (axios.isAxiosError(err)) {
        setSignupError(
          err.response?.data?.message || "Signup failed. Please try again."
        );
      } else if (err instanceof Error) {
        setSignupError(err.message); // Handle non-Axios errors
      } else {
        setSignupError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CanvasBackground />
        </div>
        <Card className="relative w-full max-w-xs border rounded-3xl py-8  mb-8 bg-black/50  border-gray-800 backdrop-blur-lg shadow-xl p-6 text-white bg-gradient-to-tr from-black to-zinc-900">
          <div className=""></div>
          <CardHeader>
            <CardTitle className="text-2xl font-medium text-center tracking-wider">
              Hi There!
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-6  space-y-4">
                <div className="space-y-2">
                  <Input
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-zinc-900 font-medium tracking-wider rounded-xl focus:outline-none focus:ring-0 shadow-none"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-zinc-900 font-medium tracking-wider rounded-xl"
                  />
                  {emailError && (
                    <p className="text-sm text-red-600">{emailError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-zinc-900 font-medium tracking-wider rounded-xl"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full hover:bg-black border hover:text-white shadow-inner rounded-full bg-zinc-900 font-medium tracking-wider text-gray-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Signing up...</span>{" "}
                    {/* ✅ Wrap text to apply font styles */}
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>

              <button
                // onClick={handleGoogleSignup}
                className="flex items-center justify-center w-full rounded-full py-2 hover:text-white text-gray-500 texl-lg tracking-wide font-medium  border bg-zinc-900 hover:bg-black transition"
              >
                {/* <FcGoogle className="w-5 h-5 mr-2" /> Sign Up with Google */}
                Sign up with Google
              </button>
            </form>
          </CardContent>
          {signupError && (
            <h1 className="text-center w-full text-sm font-thin tracking-wider  mb-2 text-red-500">
              {signupError}
            </h1>
          )}
          <CardFooter className="flex flex-col items-center space-y-4">
            <Link
              href="/signin"
              className="text-sm text-gray-400 hover:underline hover:text-gray-200"
            >
              Already have an account? Sign In
            </Link>
          </CardFooter>
          <div className="w-full flex justify-center -mb-3">
            <div className="w-8 h-[2px] bg-gray-500 rounded-full opacity-80"></div>
          </div>
          <div className="flex justify-center items-center">
            <div className="absolute  h-[1.5px] w-[16rem] -bottom-0.5  bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Signup;
