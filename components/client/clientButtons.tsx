import { SvgSpinner } from '@/components/ui/icons';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';
import { Typography } from '../ui/typography';

export function DeleteClientBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      aria-disabled={pending}
      aria-label={label}
      className="w-7 h-7 flex items-center justify-center rounded-full text-primary-foreground bg-neutral-400 dark:bg-zinc-500"
      type="submit"
    >
      {pending ? (
        <div className="flex items-center">
          <SvgSpinner className=" text-white w-4 h-4" fill="white" />
        </div>
      ) : (
        <>
          <Typography variant="span" className="sr-only">
            {label}
          </Typography>
          <TrashIcon className="w-4 h-4" />
        </>
      )}
    </button>
  );
}
