'use client'
import { ArchiveBoxXMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import { Typography } from "../ui/typography";
import { useBasket } from "@/utils/contexts/basket.context";
import { ModalBody, ModalContent, ModalTrigger } from "../ui/modal";
import { Button } from "../ui/button";
import { useModal } from "@/utils/contexts/modal.context";

export const ShoppingBasket = () => {
  const { state: { items }} = useBasket();
  const digitCount = items.length.toString().length; // Get the number of digits
  return (
    <div className="relative">
      <ShoppingCartIcon className="h-6 w-6" />
      <div
        className={`absolute ${
          digitCount > 1 ? "-top-3 -right-4" : "-top-3 -right-2"
        } ${
          items.length === 0 ? "bg-destructive" : "bg-secondary"
        } rounded-full m-0`}
      >
        <Typography
          variant="span"
          className="text-secondary-foreground px-[0.4rem] py-[-0.1rem]"
        >
          {items.length}
        </Typography>
      </div>
    </div>
  );
}

export const ClearBasket = () => {
  const {
    clearBasket, state: { items }
  } = useBasket();
  const { setOpen } = useModal();
  const modalKey = "clear-basket";
  return (
    <div className="">
      <ModalTrigger
        className={items.length === 0 ? "opacity-50 pointer-events-none" : ""}
        modalKey={modalKey}
      >
        <ArchiveBoxXMarkIcon
          className={`h-6 w-6 cursor-pointer hover:scale-105 transition-all duration-150 text-red-700 ${
            items.length === 0 ? "opacity-50 pointer-events-none" : ""
          }`}
        />
      </ModalTrigger>
      <ModalBody modalKey={modalKey} className={"md:min-h-[20%] h-10rem"}>
        <ModalContent className="md:px-1">
          <div className="p-4 flex flex-col gap-4 justify-center items-center">
            <span className="text-center font-medium">
              All items will be lost. Are you sure you want to clear the basket
            </span>
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-32 text-white dark:text-white"
              onClick={() => {
                clearBasket();
                setOpen(modalKey, false);
              }}
            >
              Clear
            </Button>
          </div>
        </ModalContent>
      </ModalBody>
    </div>
  );
};
