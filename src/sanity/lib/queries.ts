export const allProductsQuery = `
  *[_type == "product"]{
    _id,
    title,
    description,
    price,
    dicountPercentage,
    tags,
    isNew,
    "imageUrl": productImage.asset->url
  }
`;

export const fourProductsQuery = `
  *[_type == "product"][0..3]{
    _id,
    title,
    description,
    price,
    dicountPercentage,
    tags,
    isNew,
    "imageUrl": productImage.asset->url
  }
`;
