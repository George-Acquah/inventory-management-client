/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline"; // Heroicon for remove button
import { useBasket } from "@/utils/contexts/basket.context";
import NoContent from "../ui/noContent";
import { CardImage } from "../ui/card";
import { API } from "@/lib/dataFetching";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { useToast } from "@/utils/contexts/toasts.contexts";
import { sellItem } from "@/lib/actions";
import { usePathname } from "next/navigation";

const InventoryBasket = () => {
  const {
    state: { items, totalPrice },
    removeFromBasket,
    clearBasket
  } = useBasket();
  const { showToast } = useToast();
  const pathname = usePathname();

const handleSellItemsInBasket = async () => {
  if (!items) {
    showToast("Ensure the price is selected and it's correct", 10000, "error");
    return;
  }

  const sellingItems = items.map(item => {
    const { itemImage, ...rest } = item; // Destructure itemImage and keep the rest
    return { ...rest }; // Return the rest of the item properties
  });

  const itemToSell: _ISellPayload = {
    items: sellingItems,
    totalPrice
  };

  // const response = await sellItem(itemToSell, pathname);
  // if (response?.statusCode === 200) {
  //   showToast(response.message, 10000, "success");
  // }
  // return;

  return await sellItem(itemToSell, pathname);
};

  return (
    <div className="w-full rounded-md px-2 py-4">
      {items && items.length > 0 ? (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.itemId}
                className="flex justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-600 p-2 rounded-md overflow-hidden"
              >
                <div className="flex">
                  {/* Item Image */}
                  <CardImage
                    src={`${
                      item?.itemImage
                        ? `${API}/items/image/${item.itemImage}`
                        : "/No+Image.png"
                    }`}
                    alt={item.itemName}
                    className="rounded-t-md w-14 h-14"
                    width={item?.itemImage ? 560 : 320}
                    height={item?.itemImage ? 860 : 320}
                  />

                  {/* Item Details */}
                  <div className="flex flex-col flex-grow ml-4 w-full md:w-32 2xl:w-40">
                    <Typography
                      className="font-semibold truncate"
                      variant={"span"}
                    >
                      {item.itemName}
                    </Typography>
                    <Typography variant="span">GHC{item.soldPrice}</Typography>
                    <Typography variant="span" className="font-bold">
                      {item.quantity}
                    </Typography>
                  </div>
                </div>

                {/* Remove Button */}
                <ArchiveBoxXMarkIcon
                  className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700 transition duration-150 ease-in-out"
                  onClick={() => removeFromBasket(item.itemId)}
                  aria-label="Remove from basket"
                />
              </div>
            ))}
          </div>
          {/* Total Price and Checkout Button */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <Typography variant="h5" className="text-lg font-semibold">
              Total: GHC{totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="secondary"
              size="default"
              onClick={handleSellItemsInBasket}
              className=""
            >
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <NoContent
          message="You have no items in your basket"
          subMessage="Please add items to your basket and checkout here"
            actionLabel="Add Items"
            className="pt-4"
          onActionClick={() => {}}
        />
      )}
    </div>
  );
};

export default InventoryBasket;
