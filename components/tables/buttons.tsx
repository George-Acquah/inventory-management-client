import Link from "next/link";
import { DeleteClientBtn } from "../client/clientButtons";
import { cn } from "@/utils/classes.utils";
import { EyeIcon } from "@heroicons/react/24/outline";

export function EditBtn({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link href={href} aria-label={href}>
      <button
        aria-label={href}
        className={cn(
          "w-7 h-7 flex items-center justify-center rounded-full text-primary-foreground bg-blue-200 dark:bg-blue-300",
          className
        )}
      >
        <EyeIcon className="w-4 h-4 font-black" />
      </button>
    </Link>
  );
}

export function DeleteBtn({ id, label, action, path }: _IActionBtn) {
  const deleteAction = action.bind(null, id, path ?? "");

  return (
    <form action={deleteAction}>
      <DeleteClientBtn label={label} />
    </form>
  );
}
