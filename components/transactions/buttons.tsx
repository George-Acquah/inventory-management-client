"use client"

import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { Button } from "../ui/button"
import { SvgSpinner } from "../ui/icons"
import { useState } from "react"

interface _IBtnTransaction {
    item: _ITransaction;
}
const DownloadTransactionButton = ({item}: _IBtnTransaction) => {

    const [loading, setLoading] = useState(false);
    const handleDownloadInvoice = () => {

        const invoiceContent = `
          Transaction Invoice
          -------------------
          Transaction ID: ${item._id}
          Sold By: ${item.soldByName} (ID: ${item.soldById})
          Total Price: $${item.totalPrice.toFixed(2)}
          Items: ${item.itemNames.join(", ")}
          Total Quantity: ${item.totalQuantity}
          Date: ${new Date(item.createdAt).toLocaleDateString()}
        `;
    
        setLoading(true);
        const blob = new Blob([invoiceContent], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Invoice_${item._id}.txt`;
        link.click();
        setLoading(false);
      };
    return (
        <Button
            variant="default"
            size="lg"
            className="flex justify-center items-center  gap-2 w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleDownloadInvoice}
            disabled={loading}
          >
            {loading ? (
              <SvgSpinner />
            ) : (
              <>
                <ShoppingBagIcon className="w-4 h-4" /> Download this invoice
              </>
            )}
          </Button>
    )
}

const PrintTransactionButton = ({item}: _IBtnTransaction) => {

    const [loading, setLoading] = useState(false);
    const handlePrintInvoice = () => {
        const printWindow = window.open("", "_blank");
        if (printWindow) {
            setLoading(true);
          printWindow.document.write(`
            <html>
              <head>
                <title>Transaction Invoice</title>
              </head>
              <body>
                <h1>Transaction Invoice</h1>
                <p><strong>Transaction ID:</strong> ${item._id}</p>
                <p><strong>Sold By:</strong> ${item.soldByName} (ID: ${item.soldById})</p>
                <p><strong>Total Price:</strong> $${item.totalPrice.toFixed(2)}</p>
                <p><strong>Items:</strong> ${item.itemNames.join(", ")}</p>
                <p><strong>Total Quantity:</strong> ${item.totalQuantity}</p>
                <p><strong>Date:</strong> ${new Date(item.createdAt).toLocaleDateString()}</p>
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
          setLoading(false);
        }
      };
    return (
        <Button
            variant="default"
            size="lg"
            className="flex justify-center items-center gap-2 w-1/2  bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={handlePrintInvoice}
            disabled={loading}
          >
            {loading ? (
              <SvgSpinner />
            ) : (
              <>
                <ShoppingBagIcon className="w-4 h-4" /> Print this invoice
              </>
            )}
          </Button>
    )
}


export { DownloadTransactionButton, PrintTransactionButton };