import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      // id: "m5gr84i9",
      amount: 316,
      status: "Due",
      name: "Anup Mallick",
      address: "Charalagan grocery store",
    },
    {
      // id: "3u1reuv4",
      amount: 242,
      status: "Paid",
      name: "Sanjit Kenya",
      address: "Vasudevpur, Samantpara",
    },
    {
      // id: "derv1ws0",
      amount: 8374,
      status: "Paid",
      name: "Gita shri Mandal",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "newId1",
      amount: 453200,
      status: "Due",
      name: "Pranab Roy",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "5kma53ae",
      amount: 874,
      status: "Due",
      name: "Mohan Biswas",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "bhqecj4p",
      amount: 721,
      status: "Paid",
      name: "Bhola Mallick",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "newId1",
      amount: 450,
      status: "Due",
      name: "Pranab Roy",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "newId2",
      amount: 600,
      status: "Paid",
      name: "Ishan Roy",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "newId3",
      amount: 500,
      status: "Due",
      name: "Bijan Das",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "m5gr84i9",
      amount: 316,
      status: "Due",
      name: "Anup Mallick",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "3u1reuv4",
      amount: 242,
      status: "Paid",
      name: "Sanjit Kenya",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "derv1ws0",
      amount: 837,
      status: "Paid",
      name: "Gita shri Mandal",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "5kma53ae",
      amount: 874,
      status: "Due",
      name: "Mohan Biswas",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "bhqecj4p",
      amount: 721,
      status: "Paid",
      name: "Bhola Mallick",
      address: "Rabindrapalli Milan Sangh",
    },

    {
      // id: "newId2",
      amount: 600,
      status: "Paid",
      name: "Ishan Roy",
      address: "Rabindrapalli Milan Sangh",
    },
    {
      // id: "newId3",
      amount: 500,
      status: "Due",
      name: "Bijan Das",
      address: "Rabindrapalli Milan Sangh",
    },
  ];
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
