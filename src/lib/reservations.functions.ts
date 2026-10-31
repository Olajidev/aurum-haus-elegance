import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const reservationSchema = z.object({
  productSlug: z.string().min(1).max(100),
  productName: z.string().min(1).max(200),
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(320),
  pricePaid: z.number().int().min(0).max(100000),
});

export const createReservation = createServerFn({ method: "POST" })
  .validator((data: unknown) => reservationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { error } = await supabaseAdmin.from("reservations").insert({
      product_slug: data.productSlug,
      product_name: data.productName,
      full_name: data.fullName,
      email: data.email,
      price_paid: data.pricePaid,
    });

    if (error) {
      console.error("Failed to create reservation:", error);
      throw new Error("We couldn't save your reservation. Please try again.");
    }

    return { success: true as const };
  });
