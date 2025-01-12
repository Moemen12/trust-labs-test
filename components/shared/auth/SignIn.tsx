"use client";
import React, { JSX } from "react";

import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { handleGoogleSignIn } from "@/lib/actions/auth.action";

interface SignInProps {
  textBtn?: string;
  className?: string;
}

const SignIn: React.FC<SignInProps> = ({
  textBtn = "connect",
  className,
}: SignInProps): JSX.Element => {
  return (
    <form action={handleGoogleSignIn}>
      <Button
        type="submit"
        className={clsx(
          "bg-purple-600 hover:bg-purple-700 w-full sm:w-auto",
          className
        )}
      >
        {textBtn}
      </Button>
    </form>
  );
};

export default SignIn;
