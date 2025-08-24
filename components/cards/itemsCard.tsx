"use client";
import { useState } from "react";
import { cn } from "@/utils/classes.utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "../ui/card";
import { Typography } from "../ui/typography";
import { THEME } from "@/utils/constants";
import { API } from "@/lib/dataFetching";
import { Button } from "../ui/button";
import {
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "../ui/badge";
import { useBasket } from "@/utils/contexts/basket.context";
import { SvgSpinner } from "../ui/icons";
import Link from "next/link";
import { useToast } from "@/utils/contexts/toasts.contexts";
import { sellItem } from "@/lib/actions";
import { usePathname } from "next/navigation";

interface _InventoryItemCard {
  item: _IItem;
  className?: string;
}

const InventoryItemsCard = ({ className, item }: _InventoryItemCard) => {
  const {
    addToBasket,
    state: { loading },
  } = useBasket();

  const { showToast } = useToast();
  const pathname = usePathname();

  const [selectedPrice, setSelectedPrice] = useState<number | "custom">(
    item.price
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [customPrice, setCustomPrice] = useState<number | "">("");

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setSelectedQuantity((prevQuantity) => {
      return type === "increment" ? prevQuantity + 1 : prevQuantity - 1;
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
    }
  };

const handleSellItem = async () => {
  const priceToUse = selectedPrice === "custom" ? customPrice : selectedPrice;
  const numericPrice = Number(priceToUse);

  // Validation checks
  if (
    numericPrice < 0 ||
    numericPrice < item.lastPrice ||
    numericPrice > item.price ||
    selectedQuantity === 0 ||
    !priceToUse
  ) {
    showToast("Ensure the price is selected and it's correct", 10000, "error");
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

  // const response = await sellItem(itemToSell, pathname);
  // if (response?.statusCode === 200) {
  //   showToast(response.message, 10000, "success");

  //   // redirec
  // }

  return await sellItem(itemToSell, pathname);
};

  return (
    <Card
      className={cn(
        `rounded-md ${THEME.secBg} p-1 flex-1 min-w-[100px] space-y-0 border-none`,
        className
      )}
    >
      <CardHeader className="p-1 space-y-0">
        <Link className="h-40" href={`/inventory/${item._id}`}>
          <CardImage
            src={`${
              item?.itemImage
                ? `${API}/image/${item.itemImage[0]}`
                : "/No+Image.png"
            }`}
            alt={item.itemName}
            className="rounded-t-md"
            width={item?.itemImage ? 260 : 100}
            height={item?.itemImage ? 75 : 50}
            priority={!!item?.itemImage}
            loading={item?.itemImage ? "eager" : "lazy"} // Lazy-load placeholder images
          />
        </Link>
      </CardHeader>

      <CardContent className="px-2 space-y-2">
        {/* Item Name and Price */}
        <CardTitle className="flex justify-between items-center">
          <Typography variant="h4" className="dark:text-white">
            {item.itemName}
          </Typography>
          <Badge variant={"default"} className="rounded-full">
            <Typography variant="span" className="text-white dark:text-white">
              {`GHC ${item.price}`}
            </Typography>
          </Badge>
        </CardTitle>

        {/* Last Price */}
        <CardTitle className="flex justify-between items-center">
          <Typography
            variant="p"
            className="text-neutral-600 dark:text-neutral-200"
          >
            Last Price
          </Typography>
          <Badge variant={"destructive"} className="rounded-full">
            <Typography variant="span" className="text-white dark:text-white">
              {`GHC ${item.lastPrice}`}
            </Typography>
          </Badge>
        </CardTitle>

        <div className="flex w-full items-center gap-2">
          <Typography variant="p" className="dark:text-neutral-200 w-2/3">
            Select Quantity:
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

        {/* Price Selection Dropdown */}
        <div className="space-y-2">
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
              className="block w-1/2 bg-neutral-200 dark:bg-zinc-950 text-black dark:text-white rounded-md px-3 py-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
            >
              <option value={item.price}>Price: GHC {item.price}</option>
              <option value={item.lastPrice}>
                Last Price: GHC {item.lastPrice}
              </option>
              <option value="custom">Custom Price</option>
            </select>

            {selectedPrice === "custom" && (
              <>
                <input
                  type="number"
                  className="block w-1/2 bg-gray-50 dark:bg-zinc-950 text-black dark:text-white rounded-md px-3 py-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  placeholder="Enter custom price"
                />
              </>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-1 flex justify-between items-center">
        <Badge variant={"default"} className="rounded-full ">
          <Typography variant="span" className="text-white dark:text-white">
            {item.sexType}
          </Typography>
        </Badge>

        <div className="flex justify-end items-center gap-2">
          <Button variant="default" size="sm" onClick={handleSellItem}>
            Sell Item
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex justify-between items-center gap-2"
            onClick={handleAddToBasket}
            disabled={loading}
          >
            {loading ? (
              <SvgSpinner />
            ) : (
              <>
                <ShoppingBagIcon className="w-4 h-4 dark:text-black" /> Add to
                Basket
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InventoryItemsCard;
