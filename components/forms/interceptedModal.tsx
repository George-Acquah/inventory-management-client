"use client";
import { useModal } from "@/utils/contexts/modal.context";
import { ReactNode, useEffect } from "react";
import { ModalBody, ModalContent } from "../ui/modal";

export function InterceptedModal({ children }: { children: ReactNode }) {
  const { setOpen } = useModal();
  useEffect(() => {
    setOpen('login', true);
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