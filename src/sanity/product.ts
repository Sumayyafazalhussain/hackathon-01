import { defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    },
    {
      name: "productImage",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "dicountPercentage",
      title: "Discount Percentage",
      type: "number",
      validation: (rule) => rule.min(0).max(100),
    },
    {
      name: "isNew",
      title: "New Badge",
      type: "boolean",
    },
  ],
});
