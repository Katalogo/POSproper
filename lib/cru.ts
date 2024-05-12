"use server";
import { FormValuesSchema } from "@/components/schema";
import prisma from "./prisma";
import { z } from "zod";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export interface ClientData {
  // name: string;
  // address: string;
  // phone: number;
  // total: number;
  // totalDue: number;
  // id: string;
  name: string;
  address: string;
  phone: number;
  total: number;
  totalDue: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemData {
  name: string;
  price: number;
  quantity: number;
}

export interface PaymentData {
  paid: number;
}

export interface ClientWithItemsAndPayments {
  clientData: ClientData;
  itemsData: ItemData[];
  paymentsData: PaymentData[];
}

// export interface Cru {
//   clients: ClientData[];
// }

// export async function getcru() {
//   try {
//     const cru: ClientData = await prisma.client.findMany();
//     console.log({ cru });
//     return { cru };
//   } catch (error) {
//     return { error };
//   }
// }

export interface ClientsResponse {
  clients: ClientData[];
  error?: any; // Use a more specific type if possible
}

export async function getClients(): Promise<ClientsResponse> {
  try {
    console.log("database");
    const clients = await prisma.client.findMany();
    console.log("end: ", { clients });
    return { clients };
  } catch (error) {
    console.error(error);
    return { clients: [], error };
  }
}

// export async function getcru() {
//   try {
//     const clients = await prisma.client.findMany({
//       select: {
//         id: true,
//         name: true,
//         address: true,
//         totalDue: true,
//         phone: true, // Ensure this is included
//         total: true, // Ensure this is included
//       },
//     });
//     const cru: Cru = { clients }; // Wrap the clients array in an object with a 'clients' property
//     console.log("end: ", { cru });
//     return { cru };
//   } catch (error) {
//     return { error };
//   }
// }

export async function createClientWithItemsAndPayments(
  data: ClientWithItemsAndPayments
) {
  try {
    console.log("Before creating new client");
    const newClient = await prisma.client.create({
      data: {
        ...data.clientData,
        items: {
          create: data.itemsData,
        },
        payments: {
          create: data.paymentsData,
        },
      },
    });
    console.log("clientwithItem");
    console.log({ newClient });
    return { newClient };
  } catch (error) {
    console.error("Error in createClientWithItemsAndPayments:", error);
    return { error };
  }
}

// // cru.ts

// // import prisma from "./prisma";

// // Assuming ClientData is already defined
// // export interface ClientData {
// //   name: string;
// //   address: string;
// //   phone: number;
// // }

// // Function to create a client
// export async function createClient(data: ClientData) {
//   try {
//     console.log("Creating new client");
//     const newClient = await prisma.client.create({
//       data: {
//         ...data,
//       },
//     });
//     console.log("New client created:", newClient);
//     return { newClient };
//   } catch (error) {
//     console.error("Error in createClient:", error);
//     return { error };
//   }
// }

// export async function createClientWithItemsAndPayments(
//   data: ClientWithItemsAndPayments
// ) {
//   try {
//     // Validate the input data against the Zod schema
//     const validatedData = FormValuesSchema.parse(data);

//     // Use Prisma to create the client along with nested items and payments
//     const newClient = await prisma.client.create({
//       data: {
//         ...validatedData,
//         items: {
//           create: validatedData.item,
//         },
//         payments: {
//           create: validatedData.payments,
//         },
//       },
//     });

//     console.log("New client created:", newClient);
//     return { newClient };
//   } catch (error) {
//     console.error("Error in createClientWithItemsAndPayments:", error);
//     return { error };
//   }
// }
