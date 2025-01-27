import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: "ulz56sw2",
  dataset: "production",
  apiVersion: "2021-08-31",
  useCdn: false, // Set to false if statically generating pages
  token: "sky5WpyT1P6Lcw9YiEs0qRpIc26JXaowjPDy633Nj90yRTDcSIlzCgoJqH6aLyAXhyouDJ3gN6ehyEhiuNPKeMuZBLLZgMyojaPHOOAwecF7Y9ihpzi3CXCNwasE8VQwYz4cw9uQK9b0UbW9jQnKPoI2p9j0Qlk3czYpUWEApEUXDH0dhL6K",
});
