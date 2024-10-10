import { cn } from "@/utils/classes.utils";
import { useConfigurator } from "@/utils/contexts/configurator.context";
import Link, { LinkProps } from "next/link";

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: _ILinks;
  className?: string;
  props?: LinkProps;
}) => {
  const { state: { openSidenav }} = useConfigurator();
  return (
    <Link
      href={link.href}
      aria-label={link.label}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <span
        // animate={{
        //   opacity: openSidenav ? 1 : 0,
        //   width: openSidenav ? "auto" : 0, // Animate width to avoid flickering
        // }}
        className={cn(
          "text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 overflow-hidden",
          openSidenav ? "opacity-100 w-auto" : "opacity-0 w-0"
        )}
      >
        {link.label}
      </span>
    </Link>
  );
};
