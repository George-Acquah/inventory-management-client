import LoginBtn from "@/components/navigation/loginBtn";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils/classes.utils";
import { THEME } from "@/utils/constants";
import dynamic from "next/dynamic";

const Search = dynamic(() => import("@/components/search"), {
  loading: () => <Typography variant="span">Loading...</Typography>,
});

const Sidebar = dynamic(() => import("@/components/navigation/sidebar"), {
  loading: () => <Typography variant="span">Loading...</Typography>,
});

const NavbarDropdowns = dynamic(
  () => import("@/components/navigation/navbarDropdowns"),
  {
    loading: () => <Typography variant="span">Loading...</Typography>,
  }
);

export default function DashboardLayout({ children }: _IChildren) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700",
        "h-screen overflow-hidden"
      )}
    >
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div
          className={`p-2 md:px-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 ${THEME.mainBg} min-h-screen flex flex-col gap-2`}
        >
          <div className="md:mb-4 flex flex-row justify-between items-center">

            <LoginBtn />
            <Search entityType="QUERY" />
            <NavbarDropdowns
              user={{
                name: "George Acquah",
                email: "georgeacquah889@gmail.com",
              }}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
