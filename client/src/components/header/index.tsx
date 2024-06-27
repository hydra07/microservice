"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import AuthButton from './AuthButton';
import useSize from "@/hooks/useSize";
import { cn } from "@/lib/utils";
import MenuList from "./MenuList";
import Search from "./Search";
const AuthButton = dynamic(() => import("./AuthButton"), { ssr: false });
const ModeButton = dynamic(() => import("./ModeButton"));
export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true);
  const { size, setSize } = useSize({ name: "header" });
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      setIsAtTop(false);
    } else {
      setIsAtTop(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        `w-full py-[11px] fixed top-0 left-0 z-50 bg-slate-800 shadow-lg h-[${size}] backdrop-blur-md`,

        {
          "bg-opacity-70": !isAtTop,
          "bg-opacity-20": isAtTop,
        }
      )}
    >
      <div className="w-full px-14">
        <div className="flex justify-between gap-8">
          <div className="">
            <MenuList />
          </div>
          <Search />
          <div className="flex flex-row space-x-4">
            <AuthButton />
            <ModeButton />
          </div>
        </div>
      </div>
    </header>
  );
}
