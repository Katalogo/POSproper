import prisma from "./prisma";

export async function createClientWithItemsAndPayments(data) {
  try {
    console.log("Before creating new client");
    const newClient = await prisma.client.create({
      data,
    });
    console.log("clientwithItem");
    console.log({ newClient });
    return { newClient };
  } catch (error) {
    console.error("Error in createClientWithItemsAndPayments:", error);
    return { error };
  }
}
