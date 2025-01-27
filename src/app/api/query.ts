export const allProductsQuery = 
`*[_type == "product"]{
    _id,                          // Unique ID
    title,                        // Product Title
    price,                        // Product Price
    "mainImageUrl": mainImage.asset->url, // Main Image URL
    "thumbnailImagesUrls": thumbnailImages[].asset->url, // Thumbnail Images URLs
    color,                        // Available Colors
    size                          // Available Sizes
  }`;