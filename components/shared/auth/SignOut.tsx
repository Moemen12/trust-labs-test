import React, { JSX } from "react";
import clsx from "clsx";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface SignOutProps {
  textBtn: string;
  className?: string;
}

const SignOut: React.FC<SignOutProps> = ({
  textBtn = "connect",
  className,
}: SignOutProps): JSX.Element => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/guide");
      }}
    >
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

export default SignOut;
