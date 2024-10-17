'use client'

import Link from "next/link";
import { Typography } from "./typography";
import { useConfigurator } from "@/utils/contexts/configurator.context";

export const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="Logo Label"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <Typography variant="span" className="font-medium text-black dark:text-white whitespace-pre opacity-100 transition-all duration-500 delay-300">
        Logo Name
      </Typography>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      aria-label="Logo Icon"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};


const ResolvedLogo = () => {
  const { state: { openSidenav }} = useConfigurator();
  return <>{openSidenav ? <Logo /> : <LogoIcon />}</>;
}

export default ResolvedLogo;