"use client";
import { ModalBody, ModalContent } from "./ui/modal";
import useCustomSearchParams from "@/utils/hooks/useCustomSearch";
import { useEffect, useMemo } from "react";
import { useModal } from "@/utils/contexts/modal.context";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Typography } from "./ui/typography";

export default function ErrorModal() {
  const { setOpen, isOpen } = useModal(); // Assuming you have isOpen state in useModal context
  const { handleSetParams, modalValue, paramValues } = useCustomSearchParams(
    "ERROR",
    ["ERR_MSG", "BTN_LABEL", "ENTITY_TYPE", "ERR_DESC"]
  );

  // Memoized values to prevent unnecessary re-calculations
  const error_message = useMemo(
    () => paramValues.ERR_MSG ?? "error",
    [paramValues]
  );
  const modal = useMemo(() => !!modalValue, [modalValue]);
  const error_description = useMemo(() => paramValues.ERR_DESC, [paramValues]);
  const type = useMemo(() => paramValues.ENTITY_TYPE, [paramValues]);
  const button_label = useMemo(() => paramValues.BTN_LABEL, [paramValues]);

  // Only open/close modal if there's an actual change
  useEffect(() => {
    if (modal !== isOpen(`${modalValue!}-${type}`)) {
      setOpen(`${modalValue!}-${type}`, modal); // Only set if modal needs to open/close
    }
  }, [modalValue, type, modal, isOpen, setOpen]); // Ensure isOpen is included in the dependency array

  const CloseButton = () => (
    <button
      onClick={() => {
        handleSetParams(false);
      }}
      className="inline-flex items-center gap-2 rounded-md bg-slate-800/70 dark:bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
    >
      {button_label ?? "Close"}
    </button>
  );

  return (
    <ModalBody
      modalKey={`${modalValue!}-${type}`}
      closeModal={() => {
        handleSetParams(false);
      }}
      className="min-h-[20%] max-h-[90%] md:min-h-[100px]"
    >
      <ModalContent className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <ExclamationCircleIcon className="w-10 h-10 text-red-500" />
          <Typography variant="h2" className="ml-3 text-lg text-red-500 dark:text-red-500">
            Error Occurred
          </Typography>
        </div>
        <Typography variant="h2" className="mt-4">
          {error_message ??
            `An unexpected error occurred. Please try again later or contact
          support if the issue persists.`}
        </Typography>
        {error_description && (
          <Typography
            variant="p"
            className="mt-2 text-sm text-gray-700 dark:text-white/70"
          >
            {error_description}
          </Typography>
        )}
        <div className="mt-12 flex justify-end">
          <CloseButton />
        </div>
      </ModalContent>
    </ModalBody>
  );
}
