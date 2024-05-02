"use client";

import * as React from "react";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormValuesSchema = z.object({
  cart: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
    })
  ),
});

type FormValuesSchema = z.infer<typeof FormValuesSchema>;

const Total = ({ control }: { control: Control<FormValuesSchema> }) => {
  const formValues =
    useWatch({
      name: "cart",
      control,
    }) || [];
  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  return <p>Total Amount: {total}</p>;
};

export function Cart() {
  const form = useForm<FormValuesSchema>({
    resolver: zodResolver(FormValuesSchema),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control: form.control,
  });
  const { errors } = form.formState;
  const onSubmit = (data: FormValuesSchema) => console.log(data);

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <input
                  placeholder="name"
                  {...form.register(`cart.${index}.name` as const, {
                    required: true,
                  })}
                  className={errors?.cart?.[index]?.name ? "error" : ""}
                />
                <input
                  placeholder="quantity"
                  type="number"
                  {...form.register(`cart.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.cart?.[index]?.quantity ? "error" : ""}
                />
                <input
                  placeholder="value"
                  type="number"
                  {...form.register(`cart.${index}.price` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.cart?.[index]?.price ? "error" : ""}
                />
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}

        <Total control={form.control} />

        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              quantity: 0,
              price: 0,
            })
          }
        >
          APPEND
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
