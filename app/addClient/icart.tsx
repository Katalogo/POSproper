"use client";

import * as React from "react";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
// import { ChevronsUpDownIcon } from "lucide-react";
import { nullable, number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValuesSchema } from "@/components/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IndianRupee, Box, Hash, Trash, Divide } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import TimeStamp from "@/components/timeStamp";
import {
  ClientWithItemsAndPayments,
  // createClient,
  createClientWithItemsAndPayments,
} from "@/lib/cru";
import { FormattedNumber } from "@/components/calculations";

// const FormValuesSchema = z.object({
//   name: z.coerce
//     .string()
//     .min(2, {
//       message: "Username must be at least 2 characters.",
//     })
//     .max(30, {
//       message: "Username must not be longer than 30 characters.",
//     }),
//   address: z.string().min(2, {
//     message: "Address must be at least 2 characters.",
//   }),
//   phone: z.coerce.number(),
//   item: z.array(
//     z.object({
//       name: z.string({
//         required_error: "Please select a item.",
//       }),
//       price: z.coerce.number(),
//       quantity: z.coerce.number(),
//     })
//   ),
//   payments: z.array(
//     z.object({
//       paid: z.coerce.number(),
//     })
//   ),
// });

type FormValuesSchema = z.infer<typeof FormValuesSchema>;
// const defaultValues: Partial<FormValuesSchema> = {
//   item: [{ name: "", quantity: undefined, price: undefined }],
// };

const Total = ({ control }: { control: Control<FormValuesSchema> }) => {
  const formValues =
    useWatch({
      name: "item",
      control,
    }) || [];
  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  return total;
};

const TotalDue = ({ control }: { control: Control<FormValuesSchema> }) => {
  const formValues =
    useWatch({
      name: "payments",
      control,
    }) || [];
  const due = formValues.reduce(
    (acc, current) => acc - (current.paid || 0),
    +Total({ control })
  );
  return <FormattedNumber value={due} />;
};

export function ICart() {
  const form = useForm<FormValuesSchema>({
    resolver: zodResolver(FormValuesSchema),
    // defaultValues,
    mode: "onChange",
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control: form.control,
    name: "item",
  });
  const {
    fields: paymentFields,
    append: appendPayment,
    remove: removePayment,
  } = useFieldArray({
    control: form.control,
    name: "payments",
  });
  const { errors } = form.formState;
  // const onSubmit = (data: FormValuesSchema) => console.log(data);

  const onSubmit = (data: FormValuesSchema) => {
    console.log(data);
    // Assuming FormValuesSchema has the structure you've described
    // and ClientWithItemsAndPayments expects clientData, itemsData, paymentsData

    // Extract the necessary data from the form values
    // const clientData = {
    //   name: data.name,
    //   address: data.address,
    //   phone: data.phone,
    // };

    // const itemsData = data.item.map((item) => ({
    //   name: item.name,
    //   price: item.price,
    //   quantity: item.quantity,
    // }));

    // const paymentsData = data.payments.map((payment) => ({
    //   paid: payment.paid,
    // }));

    // // Create the object that matches the ClientWithItemsAndPayments type
    // const clientWithItemsAndPaymentsData: ClientWithItemsAndPayments = {
    //   clientData,
    //   itemsData,
    //   paymentsData,
    // };

    // // Now pass this correctly structured object to the function
    // createClientWithItemsAndPayments(clientWithItemsAndPaymentsData);
    // // createClient(clientData);
  };

  return (
    <Form {...form}>
      {/* console.log(`cart.${index}.name`) */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pb-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-5 items-center py-1">
                  <FormLabel className="col-span-1 text-right pr-4">
                    Name
                  </FormLabel>
                  <FormControl className="col-span-3 pr-7">
                    <Input placeholder="name" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
          {/* <FormField control={form.control}
            name="name"
            render={({ field }) =>/> */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-5 items-center py-1">
                  <FormLabel className="col-span-1 text-right pr-4">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      placeholder="address"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-5 items-center py-1">
                  <FormLabel className="col-span-1 text-right pr-4">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      type="number"
                      placeholder="phone"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid">
          <Button
            className="my-1 w-[100px]"
            type="button"
            onClick={() =>
              appendItem({ name: "", quantity: null, price: null })
            }
          >
            APPEND
          </Button>
          {itemFields.map((field, index) => (
            <div key={field.id} className="flex flex-row justify-between">
              <FormField
                control={form.control}
                name={`item.${index}.name`}
                render={({ field }) => (
                  <FormItem className="p-1">
                    {/* {`item.${index}.name`} */}
                    {/* <FormLabel>Price</FormLabel> */}
                    <FormControl>
                      <div className="relative ml-auto flex-1 md:grow-0">
                        <Box className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder="product"
                          type="string"
                          className="min-w-40 rounded-lg bg-background pl-8 md:w-[150px] lg:w-[336px]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`item.${index}.quantity`}
                render={({ field }) => (
                  <FormItem className="p-1">
                    {/* {`item.${index}.quantity`} */}
                    {/* <FormLabel>Quantity</FormLabel> */}
                    <FormControl>
                      <div className="relative ml-auto flex-1 md:grow-0">
                        <Hash className="absolute left-1 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder="quantity"
                          type="number"
                          className="w-full rounded-lg bg-background pl-5 md:w-[200px] lg:w-[336px]"
                          value={field.value || ""}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`item.${index}.price`}
                render={({ field }) => (
                  <FormItem className="p-1">
                    {/* {`item.${index}.price`} */}
                    {/* <FormLabel>Price</FormLabel> */}
                    <FormControl>
                      <div className="relative ml-auto flex-1 md:grow-0">
                        <IndianRupee className="absolute left-1 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder="price"
                          type="number"
                          // pattern=""
                          className="w-full rounded-lg bg-background pl-5 md:w-[200px] lg:w-[336px]"
                          value={field.value || ""}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="m-1 p-0 px-2"
                type="button"
                onClick={() => removeItem(index)}
              >
                <Trash className="h-4 w-4 " />
              </Button>
            </div>
          ))}
          <Total control={form.control} />
        </div>
        <div>
          <Button
            className="my-1 w-[100px]"
            type="button"
            onClick={() => appendPayment({ paid: null })}
          >
            APPEND
          </Button>
          {paymentFields.map((field, index) => (
            <div key={field.id} className="flex flex-row justify-between">
              <FormField
                control={form.control}
                name={`payments.${index}.paid`}
                render={({ field }) => (
                  <FormItem className="p-1">
                    {/* {`item.${index}.quantity`} */}
                    {/* <FormLabel>Quantity</FormLabel> */}
                    <FormControl>
                      <div className="relative ml-auto flex-1 md:grow-0">
                        <IndianRupee className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder="paying"
                          type="number"
                          className="min-w-40 rounded-lg bg-background pl-8 md:w-[150px] lg:w-[336px]"
                          value={field.value || ""}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TimeStamp />
              <Button
                className="m-1 p-0 px-2"
                type="button"
                onClick={() => removePayment(index)}
              >
                <Trash className="h-4 w-4 " />
              </Button>
            </div>
          ))}
          {/* <FormattedNumber value={total} />; */}
          <TotalDue control={form.control} />
        </div>
        {/* <Button
          type="button"
          onClick={() => append({ name: "", quantity: 0, price: 0 })}
        >
          APPEND
        </Button> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
