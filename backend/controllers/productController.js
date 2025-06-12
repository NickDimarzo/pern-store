import { sql } from "../config/db.js";

// Get all object from the products table in the DB
export const getProducts = async (req, res) => {
  try {
    const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;
    console.log("Fetched products!", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in getProducts function!", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Get a single object from the products table in the DB using the product id
export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
        SELECT * FROM products WHERE id=${id}
    `;
    console.log("Fetched product!", product);
    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in getProduct function!", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Add a single object into the products table in the DB
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  try {
    const newProduct = await sql`
            INSERT INTO products (name,price,image)
            VALUES(${name},${price},${image})
            RETURNING *
        `;
    console.log("New product added!", newProduct);
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in createProduct function!", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a single product object in the DB using the product id
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const updateProduct = await sql`
            UPDATE products
            SET name=${name}, price=${price}, image=${image}
            WHERE id=${id}
            RETURNING *
        `;

    if (updateProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }
    console.log("Product updated!", updateProduct);
    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    console.log("Error in updateProduct function!", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a single product object from the DB using the product id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await sql`
            DELETE FROM products WHERE id=${id} RETURNING *
        `;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }
    console.log("Product deleted!", deletedProduct);
    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error in deleteProduct function!", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
