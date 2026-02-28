const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getProducts(req, res) {
  try {
    const { categoryId, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const where = categoryId ? { categoryId } : {};

    const products = await prisma.product.findMany({
      where,
      skip: +skip,
      take: +limit,
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: "Product is not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}



async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price, imageUrl, description } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: price ? parseFloat(price) : undefined,
        imageUrl,
        description,
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
}


async function createProduct(req, res) {
  try {
    const { categoryId, name, price, imageUrl, description } = req.body;

    const product = await prisma.product.create({
      data: {
        categoryId,
        name,
        price,
        imageUrl,
        description,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {id} // convert if id is Int in schema
    });

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
