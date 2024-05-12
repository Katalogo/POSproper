import { getClients, ClientData } from "@/lib/cru";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  console.log("table");

  const cru = await getClients();
  // console.log("start: ", { cru });
  // Assuming 'cru' is an array of clients, you might need to transform it to match the expected structure
  // For example, if each client has an 'amount', 'status', 'name', and 'address', you could transform it like this:
  // const clients = cru?.clients || [];
  // console.log("end: ", { clients });
  return cru.clients.map((client: ClientData) => ({
    amount: client.totalDue, // Adjust based on your actual data structure
    status: client.totalDue !== 0 ? "Due" : "Paid", // Adjust based on your actual data structure
    name: client.name, // Adjust based on your actual data structure
    address: client.address, // Adjust based on your actual data structure
  }));

  // return [
  //   {
  //     // id: "m5gr84i9",
  //     amount: 316,
  //     status: "Due",
  //     name: "Anup Mallick",
  //     address: "Charalagan grocery store",
  //   },
  // ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    // <div className="container mx-auto">
    <div className="w-full px-1 mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
