"use server";
import { FormValuesSchema } from "@/components/schema";
import prisma from "./prisma";
import { z } from "zod";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export interface ClientData {
  name: string;
  address: string;
  phone: number;
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

export async function getcru() {
  try {
    const cru = await prisma.client.findMany();
    console.log({ cru });
    return { cru };
  } catch (error) {
    return { error };
  }
}

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
