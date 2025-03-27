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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
// import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [signinError, setSigninError] = useState("");

  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Invalid Credentials");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    // const userData = {
    //   email,
    //   password
    // };

    try {
      // await axios.post("/api/auth/signin", userData);
      console.log("signin successful");

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password
      });
      if (res?.error) {
        setSigninError("SignIn Error, Please try again later.");
        console.log(res.error);
        setIsLoading(false);
        return;
      }
      console.log("signin.....");
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <Card className="relative w-full max-w-xs border rounded-3xl py-8 mb-8 bg-black/50  border-gray-800 backdrop-blur-lg shadow-xl p-6 text-white bg-gradient-to-tr from-black to-zinc-900">
          <div className=""></div>
          <CardHeader>
            <CardTitle className="text-2xl font-medium text-center tracking-wider">
              Hi There!
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to Sign In
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 " onSubmit={handleSubmit}>
              <div className="mb-6 relative ">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-zinc-900 font-medium tracking-wider rounded-xl text-gray-500"
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
                <button className="text-xs absolute right-1 mt-2 tracking-wider font-thin text-gray-300">
                  Forget Password?
                </button>
              </div>
              {/* <div className="border "> */}

              <Button
                type="submit"
                className="w-full hover:bg-black border hover:text-white shadow-inner rounded-full bg-zinc-900 font-medium tracking-wider text-gray-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Signing in...</span>{" "}
                    {/* ✅ Wrap text to apply font styles */}
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <button
                // onClick={handleGoogleSignup}
                className="flex items-center justify-center w-full rounded-full py-2 hover:text-white text-gray-500 texl-lg tracking-wide font-medium  border bg-zinc-900 hover:bg-black transition"
              >
                {/* <FcGoogle className="w-5 h-5 mr-2" /> Sign Up with Google */}
                Sign in with Google
              </button>
            </form>
          </CardContent>
          {signinError && (
            <h1 className="text-center w-full text-sm font-thin tracking-wider  mb-2 text-red-500">
              {signinError}
            </h1>
          )}
          <CardFooter className="flex flex-col items-center space-y-4">
            <Link
              href="/signup"
              className="text-sm text-gray-400 hover:underline hover:text-gray-200"
            >
              You dont have an account? Sign up
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

export default Signin;
