import { DesktopSidebar, MobileSidebar } from "./sidebarTypes";
import ResolvedLogo from "../ui/logo";
import { sidebarLinks } from "@/data/sidebar.data";
import { SidebarLink } from "./sidebarLinks";
import { Typography } from "../ui/typography";
import React from "react";
import { PowerIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { signOut } from "@/auth";

export const SidebarBody = (props: React.ComponentProps<'div'>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

const Sidebar = () => {
  return (
    <SidebarBody className="justify-between gap-10">
      <div className="flex flex-col overflow-x-hidden">
        <ResolvedLogo />
        <div className="mt-8 flex flex-col gap-2">
          {sidebarLinks.map((link, idx) => (
            <React.Fragment key={idx}>
              {link.parent && (
                <Typography variant="h4">{link.parent}</Typography>
              )}
              <SidebarLink key={idx} link={link} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
          className="flex items-center justify-center gap-2 w-full"
        >
          <Button
            variant="destructive"
            size="lg"
            type="submit"
            className={`rounded-md p-3 text-white flex gap-4 items-center justify-center w-[80%]`}
          >
            <PowerIcon className="w-6" />
            <div className="">Sign Out</div>
          </Button>
        </form>
      </div>
    </SidebarBody>
  );
};

export default Sidebar;
