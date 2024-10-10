"use client";

import { DesktopSidebar, MobileSidebar } from "./sidebarTypes";
import { Logo, LogoIcon } from "../ui/logo";
import { sidebarLinks } from "@/data/sidebar.data";
import { SidebarLink } from "./sidebarLinks";
import Image from "next/image";
import { useConfigurator } from "@/utils/contexts/configurator.context";

export const SidebarBody = (props: React.ComponentProps<'div'>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

const Sidebar = () => {
  const { state: { openSidenav } } = useConfigurator();
  return (
    <SidebarBody className="justify-between gap-10">
      <div className="flex flex-col overflow-x-hidden">
        {openSidenav ? <Logo /> : <LogoIcon />}
        <div className="mt-8 flex flex-col gap-2">
          {sidebarLinks.map((link, idx) => (
            <SidebarLink key={idx} link={link} />
          ))}
        </div>
      </div>
      <div>
        <SidebarLink
          link={{
            label: "ChaGeo",
            href: "https://github.com/cha-geo",
            icon: (
              <Image
                src="https://assets.aceternity.com/manu.png"
                className="h-7 w-7 flex-shrink-0 rounded-full object-cover" // Ensure object-cover is applied
                width={50}
                height={50}
                alt="Avatar"
              />
            ),
          }}
        />
      </div>
    </SidebarBody>
  );
};

export default Sidebar;
