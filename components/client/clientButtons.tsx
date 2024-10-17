// import { SvgSpinner } from '@/components/ui/icons';
// import { TrashIcon } from '@heroicons/react/24/outline';
// import { useFormStatus } from 'react-dom';
// import { Typography } from '../ui/typography';
// import { Button } from '../ui/button';

// export function DeleteClientBtn({ label }: { label: string }) {
//   const { pending } = useFormStatus();
//   return (
//     <Button
//       variant='default'
//       size='sm'
//       aria-disabled={pending}
//       aria-label={label}
//       className="w-7 h-7 flex items-center justify-center rounded-full text-primary-foreground bg-neutral-400 dark:bg-zinc-500"
//       type="submit"
//     >
//       {pending ? (
//         <div className="flex items-center">
//           <SvgSpinner className=" text-white w-4 h-4" fill="white" />
//         </div>
//       ) : (
//         <>
//           <Typography variant="span" className="">
//             {label}
//           </Typography>
//           <TrashIcon className="w-4 h-4" />
//         </>
//       )}
//     </Button>
//   );
// }


import { SvgSpinner } from "@/components/ui/icons";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useFormStatus } from "react-dom";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";

export function DeleteClientBtn({ label, table }: { label: string, table?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={table ? "default" : "destructive"}
      size={table ? "sm" : "lg"}
      aria-disabled={pending}
      aria-label={label}
      className={`rounded-full ${
        table
          ? "w-7 h-7 p-0 flex items-center justify-center rounded-full text-primary-foreground bg-neutral-400 dark:bg-zinc-500 "
          : ""
      }`}
      type="submit"
    >
      {pending ? (
        <div className="flex items-center">
          <SvgSpinner className=" text-white w-4 h-4" fill="white" />
        </div>
      ) : (
        <>
          {table ? (
            <TrashIcon className="w-4 h-4 text-white" />
          ) : (
            <Typography variant="span" className="">
              {label}
            </Typography>
          )}
        </>
      )}
    </Button>
  );
}
