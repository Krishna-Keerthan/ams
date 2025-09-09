"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import LogOutBtn from "./LogOutBtn";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full flex justify-between items-center p-4 shadow-md bg-white overflow-hidden">
      {/* Left Side - Logo/Title */}
      <h1 className="text-xl font-bold">AMS</h1>

      {/* Right Side - Auth Button */}
      {status === "loading" ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : session ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">
            Hi, {session.user?.name || "User"}
          </span>
          <LogOutBtn className={'w-fit'} />
        </div>
      ) : (
        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      )}
    </header>
  );
}
