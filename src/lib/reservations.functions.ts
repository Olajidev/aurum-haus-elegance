import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getProduct } from "@/lib/products";

const reservationSchema = z
  .object({
    productSlug: z.string().trim().min(1).max(100),
    fullName: z.string().trim().min(2).max(200),
    email: z.string().trim().email().max(320),
  })
  .strict();

export const createReservation = createServerFn({ method: "POST" })
  .validator((data: unknown) => reservationSchema.parse(data))
  .handler(async ({ data }) => {
    const canonicalProduct = getProduct(data.productSlug);
    if (!canonicalProduct) {
      throw new Error("Invalid product finish selected.");
    }

    // Canonical server-side price validation — never trust client-supplied prices
    const validatedPrice = canonicalProduct.priceValue;

    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { error } = await supabaseAdmin.from("reservations").insert({
      product_slug: canonicalProduct.slug,
      product_name: canonicalProduct.name,
      full_name: data.fullName,
      email: data.email,
      price_paid: validatedPrice,
    });

    if (error) {
      console.error("[Reservation Error]", error.message);
      throw new Error("We couldn't save your reservation. Please try again.");
    }

    return {
      success: true as const,
      productName: canonicalProduct.name,
      price: validatedPrice,
    };
  });
