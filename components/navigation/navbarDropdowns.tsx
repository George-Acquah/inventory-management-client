"use client";
import {
  AdjustmentsHorizontalIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "../ui/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown";
import { notificationsData } from "@/data/sidebar.data";
import { getDropdownStyles, truncateMessage } from "@/utils/root.utils";
import Avatar from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useIsMobile from "@/utils/hooks/useMobileView";

const NavbarDropdowns = ({ user }: { user: any }) => {
  const notificationsCount = 5;
  const digitCount = notificationsCount.toString().length; // Get the number of digits
  // const dropDownSubMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isMobile = useIsMobile(); // Check if the screen size is mobile
  const notificationStyles = getDropdownStyles(
    "-10rem", // mobile left
    "100%", // mobile top
    "-8rem", // desktop left
    "100%", // desktop top
    isMobile // isMobile boolean
  );
  const profileStyles = getDropdownStyles(
    "-12rem", // mobile left
    "100%", // mobile top
    "-10.5rem", // desktop left
    "100%", // desktop top
    isMobile // isMobile boolean
  );

  return (
    <div className="flex items-center gap-6">
      <DropdownMenu
        trigger={
          <div className="relative cursor-pointer">
            <BellAlertIcon className="h-6 w-6 text-neutral-600 dark:text-neutral-300" />
            <div
              className={`absolute ${
                digitCount > 1 ? "-top-3 -right-4" : "-top-3 -right-2"
              } bg-secondary rounded-full m-0`}
            >
              <Typography
                variant="span"
                className="text-secondary-foreground px-[0.4rem] py-[-0.1rem]"
              >
                {notificationsCount}
              </Typography>
            </div>
          </div>
        }
        style={notificationStyles}
        className="dark:bg-neutral-800 bg-white ring-1 ring-black w-56 rounded-md px-1"
      >
        {(onClose) => (
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex flex-row justify-between items-center">
              <Typography variant="h5">Notifications</Typography>
              <AdjustmentsHorizontalIcon className="h-4 w-4" />
            </DropdownMenuLabel>
            {notificationsData.slice(0, 4).map((notification) => (
              <DropdownMenuItem
                onClick={() => {
                  onClose();
                }}
                key={notification.id}
                className="flex flex-col items-start"
              >
                <div className="font-bold">{notification.subject}</div>
                <div>{truncateMessage(notification.message, 25)}</div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="flex flex-row justify-between items-center">
              <Typography variant="h5">Announcements</Typography>
              <AdjustmentsHorizontalIcon className="h-4 w-4" />
            </DropdownMenuLabel>
            {notificationsData.slice(0, 4).map((notification) => (
              <DropdownMenuItem
                onClick={() => {
                  onClose();
                }}
                key={notification.id}
                className="flex flex-col items-start"
              >
                <div className="font-bold">{notification.subject}</div>
                <div>{truncateMessage(notification.message, 25)}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      <DropdownMenu
        trigger={
          <div className="cursor-pointer mb-1">
            <Avatar
              src={"/avatar.png"}
              alt="Profile Avatar"
              width={28}
              height={28}
              priority={true}
              className=""
            />
          </div>
        }
        style={profileStyles}
        className="dark:bg-neutral-800 bg-white ring-1 ring-black w-56 rounded-md px-1"
      >
        {(onClose) => (
          <DropdownMenuContent>
            <DropdownMenuLabel className="">
              <Typography variant="h5">{user.name}</Typography>
              <Typography variant="span">
                {truncateMessage(user.email, 26)}
              </Typography>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Button
              variant="default"
              size="lg"
              className="w-full"
              onClick={() => {
                router.push("/dashboard/profile");
                onClose();
              }}
            >
              View Profile
            </Button>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
};

export default NavbarDropdowns;
