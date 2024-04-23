"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, PenBox, Trash } from "lucide-react";

export type Payment = {
  // id: string;
  amount: number;
  status: "Due" | "Paid";
  name: string;
  address: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "address",
    header: () => <div>address</div>,
    cell: ({ row }) => {
      const aaddress = new String(row.getValue("address"));
      // return (
      //   <div>
      //     <span className="capitalize">{row.getValue("status")}</span>
      //     <p className="font-normal text-muted-foreground">{aaddress}</p>
      //     <p className="font-normal text-muted-foreground">{formatted}</p>
      //   </div>
      // );
    },
    size: 50,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      );
    },
    cell: ({ row }) => {
      // const amount = parseFloat(row.getValue("amount"));

      // // Format the amount as a INR amount
      // const formatted = new Intl.NumberFormat("en-IN", {
      //   style: "currency",
      //   currency: "INR",
      //   notation: "compact",
      //   maximumSignificantDigits: 10,
      // }).format(amount);
      // const aaddress = new String(row.getValue("address"));
      return (
        <div>
          <span className="capitalize">{row.getValue("status")}</span>
          {/* <p className="font-normal text-muted-foreground">{aaddress}</p> */}
          {/* <p className="font-normal text-muted-foreground">{formatted}</p> */}
        </div>
      );
    },
    size: 50,
  },

  // {
  //   accessorKey: "status",
  //   // header: "Status",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("status")}</div>
  //   ),
  //   size: 50,
  // },
  {
    accessorKey: "address" && "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    cell: ({ row }) => {
      const aaddress = new String(row.getValue("address"));

      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "INR",
      // }).format(amount);
      return (
        <div>
          <span className="capitalize">{row.getValue("name")}</span>
          {/* <p className="font-normal text-muted-foreground">
            {row.getValue("address")}
          </p> */}
          <p className="font-normal text-muted-foreground">{aaddress}</p>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "name",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Name
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  // },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        notation: "compact",
        maximumSignificantDigits: 10,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    size: 50,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <PenBox className="h-6 w-6" />
        </Button>
      );
    },
    size: 60,
  },
];
