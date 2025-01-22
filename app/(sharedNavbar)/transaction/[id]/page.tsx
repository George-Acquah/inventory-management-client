import { DownloadTransactionButton, PrintTransactionButton } from '@/components/transactions/buttons';
import { Typography } from '@/components/ui/typography';
import { fetchSingleTransaction } from '@/lib/actions';
import { ResolvingMetadata, Metadata } from 'next';
import React from 'react'

export async function generateMetadata(
    { params: { id } }: _IPageId,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const item = await fetchSingleTransaction(id);
    console.log(item);
    const previousImages = (await parent).openGraph?.images || [];
  
    // Handle cases where item is not found
    if (!item) {
      return {
        title: "Transaction Not Found - Inventory",
        description: "The transaction does not exist.",
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
            alt: "",
          },
          ...previousImages,
        ],
      },
    };
  }
const TransactionPage = async ({ params: { id } }: _IPageId) => {
  const item = await fetchSingleTransaction(id);

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
    <div className="container mx-auto py-10">
      <div className="bg-white rounded-md shadow-md p-6">
        <Typography variant="h4" className="mb-4">
          Transaction Completed Successfully!
        </Typography>
        <Typography variant="p" className="mb-2">
          <strong>Transaction ID:</strong> {item._id}
        </Typography>
        <Typography variant="p" className="mb-2">
          <strong>Sold By:</strong> {item.soldByName} (ID: {item.soldById})
        </Typography>
        <Typography variant="p" className="mb-2">
          <strong>Total Price:</strong> ${item.totalPrice.toFixed(2)}
        </Typography>
        <Typography variant="p" className="mb-2">
          <strong>Items:</strong> {item.itemNames.join(", ")}
        </Typography>
        <Typography variant="p" className="mb-2">
          <strong>Total Quantity:</strong> {item.totalQuantity}
        </Typography>
        <Typography variant="p" className="mb-2">
          <strong>Date:</strong> {new Date(item.createdAt).toLocaleDateString()}
        </Typography>
        <div className="flex space-x-4 mt-6">
          <DownloadTransactionButton item={item} />
          <PrintTransactionButton item={item} />
        </div>
      </div>
    </div>
  );
}

export default TransactionPage