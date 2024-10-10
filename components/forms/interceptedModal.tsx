"use client";
import { useModal } from "@/utils/contexts/modal.context";
import { ReactNode, useEffect } from "react";
import { ModalBody, ModalContent } from "../ui/modal";

export function InterceptedModal({ children }: { children: ReactNode }) {
  const { setOpen } = useModal();
  useEffect(() => {
    setOpen('login', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ModalBody modalKey={"login"}  intercepted>
      <ModalContent>
        <div className="flex flex-col justify-center items-center">
          {children}
        </div>
      </ModalContent>
    </ModalBody>
  );
}

{
  /* <ModalFooter className="gap-4">
          <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
            Cancel
          </button>
          <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
            Book Now
          </button>
        </ModalFooter> */
}
