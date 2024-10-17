import InventoryActions from "@/components/inventory/inventoryActions";
import SingleInventoryActions from "@/components/inventory/singleInventoryActions";
import { Badge } from "@/components/ui/badge";
import Carousel from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";
import { deleteItem, fetchSingleItem } from "@/lib/actions";
import { THEME } from "@/utils/constants";
import { MapPinIcon, PlusIcon, TrashIcon, UserCircleIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

interface _IPageId {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params: { id } }: _IPageId,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const item = await fetchSingleItem(id);
  const previousImages = (await parent).openGraph?.images || [];

  // Handle cases where item is not found
  if (!item) {
    return {
      title: "Item Not Found - Inventory",
      description: "The item you are looking for does not exist.",
    };
  }

  return {
    title: `${item.itemName} - Inventory`,
    description: `View details and information about ${item.itemName}. Price: GHC ${item.price}, Last Price: GHC ${item.lastPrice}.`,
    openGraph: {
      title: `${item.itemName} - Inventory`,
      description: `View details and information about ${item.itemName}.`,
      images: [
        {
          url: "https://via.placeholder.com/600x400?text=Item+Image",
          width: 450,
          height: 450,
          alt: item.itemName,
        },
        ...previousImages,
      ],
    },
  };
}

const renderSexTypeIcon = (sexType: string) => {
  switch (sexType) {
    case "male":
      return <UserIcon className="w-4 h-4 text-blue-500" />;
    case "female":
      return <UserCircleIcon className="w-4 h-4 text-pink-500" />;
    case "unisex":
      return <UserGroupIcon className="w-4 h-4 text-green-500" />;
    default:
      return null;
  }
};

const DynamicItemPage = async ({ params: { id } }: _IPageId) => {
  const item = await fetchSingleItem(id);

  // If item is not found, return a 404 or error message
  if (!item) {
    return (
      <div className="container mx-auto py-10">
        <Typography variant="h3" className="text-red-500">
          Item not found
        </Typography>
      </div>
    );
  }

  return (
    <div className="py-10 w-full md:max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left */}
      <div className="w-full md:w-1/2 xl:w-3/5 flex flex-col gap-4 overflow-hidden">
        <div className="flex justify-between ">
          <div className="space-y-4">
            <Typography variant="h4" className="truncate">
              {item.itemName}
            </Typography>
            <Typography
              variant="p"
              className="truncate flex gap-2 items-center"
            >
              <UserIcon className="w-4 h-4" />
              {item.addedByName}
            </Typography>
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                <Badge variant="default" className="rounded-full">
                  <Typography variant="span" className="capitalize">
                    {item.zone}
                  </Typography>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {renderSexTypeIcon(item.sexType)}
                <Badge variant="default" className="rounded-full">
                  <Typography variant="span" className="capitalize">
                    {item.sexType}
                  </Typography>
                </Badge>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <InventoryActions
              type="update"
              trigger={
                <div className="bg-secondary flex gap-2 items-center justify-center dark:bg-secondary-dark text-white dark:text-black px-6 py-2 rounded-full">
                  <PlusIcon className="h-4 w-4" />
                  Update this item
                </div>
              }
              data={item}
              id={item._id}
            />
            <InventoryActions
              type="delete"
              trigger={
                <div className="bg-destructive flex gap-2 items-center justify-center dark:bg-destructive-dark text-white px-6 py-2 rounded-full">
                  <TrashIcon className="h-4 w-4" />
                  Delete this item
                </div>
              }
              action={deleteItem}
              id={item._id}
            />
          </div>
        </div>
        <Carousel
          images={item.itemImage || []}
          alt={item.itemName}
          className="w-full"
        />
      </div>

      {/* Right */}
      <div
        className={`w-full md:w-1/2 xl:w-2/5 ${THEME.secBg} rounded-md flex flex-col justify-between px-6 py-8 items-center space-y-4`}
      >
        <SingleInventoryActions item={item} />
      </div>
    </div>
  );
};

export default DynamicItemPage;
