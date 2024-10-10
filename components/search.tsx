"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { SEARCH_PARAMS } from "@/utils/constants/search.constants";
import { PlaceholdersAndVanishInput } from "./ui/vanishInputs";

interface IProps<T> {
  entityType: T; // Add entityType prop
  placeholders?: string[];
  disabled?: boolean;
}

// Define the type for SEARCH_PARAMS keys
type SearchParamKeys = keyof typeof SEARCH_PARAMS;

export default function Search<T extends SearchParamKeys>({
  entityType,
  disabled,
  placeholders = [
    "Search for entity 1",
    "Another Search for entity 2",
    "Search for entity 3",
  ],
}: IProps<T>) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(SEARCH_PARAMS[entityType], term);
    } else {
      params.delete(SEARCH_PARAMS[entityType]);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={
          searchParams.get(SEARCH_PARAMS[entityType])?.toString() ?? ""
        }
        isPending={isPending}
        disabled={disabled}
      />
    </div>
  );
}
