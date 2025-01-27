import { createClient } from "next-sanity";

const client = createClient({
  projectId: "ulz56sw2",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-08-31",
});

export async function sanityFetch({
  query,
  params = {},
}: {
  query: string;
  params?: any;
}) {
  const result = await client.fetch(query, params);
  console.log("Fetched data:", result); // Debug fetched data
  return result;
}
