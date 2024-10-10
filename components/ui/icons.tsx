import { cn } from "@/utils/classes.utils";

export const GitHubIcon = ({ className, ...props}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-6 w-6", className)}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.107-.774.418-1.305.762-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.467-2.382 1.235-3.22-.125-.304-.535-1.524.115-3.176 0 0 1.005-.322 3.3 1.23a11.47 11.47 0 013.004-.404c1.02.005 2.045.137 3.004.404 2.285-1.552 3.29-1.23 3.29-1.23.65 1.653.24 2.872.12 3.176.77.838 1.23 1.91 1.23 3.22 0 4.61-2.805 5.623-5.475 5.92.43.37.815 1.102.815 2.222 0 1.606-.015 2.9-.015 3.293 0 .32.215.695.825.575C20.565 21.796 24 17.303 24 12 24 5.373 18.627 0 12 0z"
    />
  </svg>
);

export function SvgSpinner({
  className = "text-gray-700 h-5 w-5",
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      className={cn("animate-spin ", className!)}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="green"
        strokeWidth="4"
      />
      <path
        className=""
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
