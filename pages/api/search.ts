import { NextApiRequest, NextApiResponse } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProductsQuery } from "@/sanity/lib/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query; // Get the search query

  try {
    // Fetch all products from Sanity
    const products = await sanityFetch({ query: allProductsQuery });

    // Filter products based on the query (case-insensitive)
    const filteredProducts = products.filter((product: any) =>
      product.title.toLowerCase().includes((q as string).toLowerCase())
    );

    res.status(200).json({ results: filteredProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}