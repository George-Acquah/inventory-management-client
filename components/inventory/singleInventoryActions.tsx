"use client";
import {
  ArrowPathIcon,
  CalendarIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { SvgSpinner } from "../ui/icons";
import { useFormStatus } from "react-dom";
import { Typography } from "../ui/typography";
import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { getRelativeTime } from "@/utils/root.utils";
import { useBasket } from "@/utils/contexts/basket.context";
import { useToast } from "@/utils/contexts/toasts.contexts";
import { sellItem } from "@/lib/actions";
import { usePathname } from "next/navigation";

const SingleInventoryActions = ({ item }: { item: _IItem }) => {
  const { pending: loading } = useFormStatus();
  const {
    addToBasket,
    removeFromBasket,
    state: { items: basketItems },
  } = useBasket();
  const { showToast } = useToast();
  const pathname = usePathname();

  // State to manage whether the item is already in the basket
  const [isInBasket, setIsInBasket] = useState<boolean>(false);

  const [selectedPrice, setSelectedPrice] = useState<number | "custom">(
    item.price
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [customPrice, setCustomPrice] = useState<number | "">("");

  const dateDifference = getRelativeTime(item.createdAt, item.updatedAt);

  // Check if the item is already in the basket on mount
  useEffect(() => {
    const isItemInBasket = basketItems.some(
      (basketItem) => basketItem.itemId === item._id
    );
    setIsInBasket(isItemInBasket);
  }, [basketItems, item._id]);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setSelectedQuantity((prevQuantity) => {
      return type === "increment"
        ? prevQuantity + 1
        : Math.max(prevQuantity - 1, 0);
    });
  };

  const handleAddToBasket = () => {
    const priceToUse = selectedPrice === "custom" ? customPrice : selectedPrice;

    if (
      Number(priceToUse) < 0 ||
      Number(priceToUse) < item.lastPrice ||
      Number(priceToUse) > item.price ||
      selectedQuantity === 0 ||
      priceToUse === ""
    ) {
      showToast("Ensure the price is selected and its correct", 10000, "error");
    } else {
      addToBasket({
        ...item,
        price: Number(priceToUse),
        stock: selectedQuantity,
      });
      setIsInBasket(true); // Mark item as in basket
    }
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(item._id);
    setIsInBasket(false); // Mark item as removed from basket
  };

  const handleSellItem = async () => {
    const priceToUse = selectedPrice === "custom" ? customPrice : selectedPrice;
    const numericPrice = Number(priceToUse);

    if (
      numericPrice < 0 ||
      numericPrice < item.lastPrice ||
      numericPrice > item.price ||
      selectedQuantity === 0 ||
      !priceToUse
    ) {
      showToast(
        "Ensure the price is selected and it's correct",
        10000,
        "error"
      );
      return;
    }

    const itemToSell: _ISellPayload = {
      items: [
        {
          itemId: item._id,
          itemName: item.itemName,
          soldPrice: numericPrice,
          quantity: selectedQuantity,
        },
      ],
      totalPrice: numericPrice,
    };

    return await sellItem(itemToSell, pathname);
    // const response = await sellItem(itemToSell, pathname);
    // if (response?.statusCode === 200) {
    //   showToast(response.message, 10000, "success");
    // }
  };

  return (
    <>
      <div className="w-full space-y-6">
        {/* Prices */}
        <div className="w-full flex gap-4">
          <div
            className={`flex ${
              selectedPrice === "custom"
                ? "flex-col space-y-2"
                : "flex-row gap-8"
            } flex-grow transition-all duration-200`}
          >
            <div className={`${selectedPrice === "custom" ? "" : "space-y-2"}`}>
              <Typography variant="span" className="truncate">
                Standard Price
              </Typography>
              <Typography variant="h3" className="truncate">
                GHc{item.price}
              </Typography>
            </div>
            <div className={`${selectedPrice === "custom" ? "" : "space-y-2"}`}>
              <Typography variant="span" className="truncate">
                Last Price
              </Typography>
              <Typography variant="h3" className="truncate">
                GHc{item.lastPrice}
              </Typography>
            </div>
          </div>
          <div>
            <Typography variant="p" className="dark:text-neutral-200">
              Select Price:
            </Typography>
            <div className="flex w-full items-center gap-2">
              <select
                value={selectedPrice}
                onChange={(e) =>
                  setSelectedPrice(
                    e.target.value === "custom"
                      ? "custom"
                      : Number(e.target.value)
                  )
                }
                className="block bg-neutral-200 dark:bg-zinc-950 text-black dark:text-white rounded-md px-3 py-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
              >
                <option value={item.price}>Price: GHC {item.price}</option>
                <option value={item.lastPrice}>
                  Last Price: GHC {item.lastPrice}
                </option>
                <option value="custom">Custom Price</option>
              </select>

              {selectedPrice === "custom" && (
                <input
                  type="number"
                  className="block w-1/2 bg-gray-50 dark:bg-zinc-950 text-black dark:text-white rounded-md px-3 py-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  placeholder="Enter custom price"
                />
              )}
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="h-[1px] w-full bg-white dark:bg-neutral-500" />

        {/* Stock */}
        <div className="w-full">
          <div className="flex">
            <Typography variant="p" className="dark:text-neutral-200">
              There are
            </Typography>
            <Typography
              variant="p"
              className="mx-1 font-extrabold"
            >{` ${item.stock}`}</Typography>
            <Typography
              variant="p"
              className="dark:text-neutral-200"
            >{` ${item.itemName} in the shop`}</Typography>
          </div>
          <div className="flex w-full items-center gap-2">
            <Typography variant="p" className="dark:text-neutral-200 w-2/3">
              Set your Quantity:
            </Typography>
            <div className="flex items-center justify-end gap-2 w-1/3">
              <Button
                variant="default"
                size="sm"
                className="p-2 rounded-full"
                aria-disabled={selectedQuantity === 0}
                onClick={() => handleQuantityChange("decrement")}
              >
                <MinusIcon className="w-4 h-4 fill-white" />
              </Button>
              <Typography variant="span" className="font-semibold">
                {selectedQuantity}
              </Typography>
              <Button
                variant="default"
                size="sm"
                className="p-2 rounded-full"
                aria-disabled={selectedQuantity === item.stock}
                onClick={() => handleQuantityChange("increment")}
              >
                <PlusIcon className="w-4 h-4 fill-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="h-[1px] w-full bg-white dark:bg-neutral-500" />

        {/* Dates */}
        <div className="w-full">
          <div className="flex items-center gap-10 mb-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <Badge variant="default" className="rounded-full">
                <Typography variant="span" className="">
                  {item.createdAt}
                </Typography>
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <ArrowPathIcon className="w-4 h-4" />
              <Badge
                variant={dateDifference ? "success" : "default"}
                className="rounded-full"
              >
                <Typography variant="span" className="capitalize">
                  {item.updatedAt}
                </Typography>
              </Badge>
            </div>
          </div>
          {dateDifference ? (
            <Typography variant="span" className="">
              This item was updated {dateDifference}
            </Typography>
          ) : (
            <Typography variant="span" className="">
              This item has not been updated before
            </Typography>
          )}
        </div>

        {/* Horizontal Divider */}
        <div className="h-[1px] w-full bg-white dark:bg-neutral-500" />
      </div>

      {/* Basket Action */}
      <div className="w-full flex justify-between items-center gap-8">
        <Button
          variant="secondary"
          size="lg"
          className="rounded-full w-1/2"
          onClick={handleSellItem}
        >
          Sell Item
        </Button>

        {isInBasket ? (
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-1/2"
            onClick={handleRemoveFromBasket}
            disabled={loading}
          >
            {loading ? <SvgSpinner /> : <>Remove from Basket</>}
          </Button>
        ) : (
          <Button
            variant="default"
            size="lg"
            className="flex justify-center items-center rounded-full gap-2 w-1/2"
            onClick={handleAddToBasket}
            disabled={loading}
          >
            {loading ? (
              <SvgSpinner />
            ) : (
              <>
                <ShoppingBagIcon className="w-4 h-4" /> Add to Basket
              </>
            )}
          </Button>
        )}
      </div>
    </>
  );
};

export default SingleInventoryActions;
