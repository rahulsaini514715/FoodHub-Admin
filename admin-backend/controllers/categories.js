const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

/* =========================
   GET ALL CATEGORIES
========================= */
// GET /api/v1/categories?page=1&limit=10
async function getCategories(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const categories = await prisma.category.findMany({
      include: { products: true },
      skip,
      take: limit,
    });

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

/* =========================
   GET PRODUCTS BY CATEGORY
========================= */
// GET /api/v1/categories/:id/products
async function getProductsByCategory(req, res) {
  try {
    const { id } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where: { categoryId: id },
      skip,
      take: limit,
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

/* =========================
   CREATE CATEGORY
========================= */
// POST /api/v1/categories
async function createCategory(req, res) {
  try {
    const { name, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await prisma.category.create({
      data: { name, imageUrl },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create category" });
  }
}

/* =========================
   UPDATE CATEGORY
========================= */
// PUT /api/v1/categories/:id
async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, imageUrl } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: { name, imageUrl },
    });

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update category" });
  }
}

/* =========================
   DELETE CATEGORY
========================= */
// DELETE /api/v1/categories/:id
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    // delete products first
    await prisma.product.deleteMany({
      where: { categoryId: id },
    });

    await prisma.category.delete({
      where: { id },
    });

    res.json({ message: "Category and products deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete category" });
  }
}

module.exports = {
  getCategories,
  getProductsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

// const { PrismaClient } = require("@prisma/client");
// const { MongoDBAdapter } = require("@prisma/adapter-mongodb");
// const { MongoClient } = require("mongodb");

// // MongoDB adapter setup (Prisma v7 requirement)
// const mongo = new MongoClient(process.env.DATABASE_URL);
// const adapter = new MongoDBAdapter(mongo);

// const prisma = new PrismaClient({
//   adapter,
// });


// // GET categories with products (pagination)
// // URL: /api/v1/categories?page=1&limit=10
// async function getCategories(req, res) {
//   try {
//     const { page = 1, limit = 10 } = req.query;

//     const pageNum = parseInt(page);
//     const limitNum = parseInt(limit);
//     const skip = (pageNum - 1) * limitNum;

//     const categories = await prisma.category.findMany({
//       include: { products: true },
//       skip,
//       take: limitNum,
//     });

//     res.json(categories);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch categories" });
//   }
// }


// // GET products by category
// // URL: /api/v1/categories/:id/products?page=1&limit=10
// async function getProductsByCategory(req, res) {
//   try {
//     const { id } = req.params;
//     const { page = 1, limit = 10 } = req.query;

//     const pageNum = parseInt(page);
//     const limitNum = parseInt(limit);
//     const skip = (pageNum - 1) * limitNum;

//     const products = await prisma.product.findMany({
//       where: { categoryId: id },
//       skip,
//       take: limitNum,
//     });

//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// }


// // CREATE category
// async function createCategory(req, res) {
//   try {
//     const { name, imageUrl } = req.body;

//     const category = await prisma.category.create({
//       data: { name, imageUrl },
//     });

//     res.json(category);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create category" });
//   }
// }


// // UPDATE category
// async function updateCategory(req, res) {
//   try {
//     const { id } = req.params;
//     const { name, imageUrl } = req.body;

//     const category = await prisma.category.update({
//       where: { id },
//       data: { name, imageUrl },
//     });

//     res.json(category);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update category" });
//   }
// }


// // DELETE category and its products
// async function deleteCategory(req, res) {
//   try {
//     const { id } = req.params;

//     await prisma.product.deleteMany({
//       where: { categoryId: id },
//     });

//     await prisma.category.delete({
//       where: { id },
//     });

//     res.json({ message: "Category and its products deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to delete category" });
//   }
// }


// module.exports = {
//   getCategories,
//   getProductsByCategory,
//   createCategory,
//   updateCategory,
//   deleteCategory,
// };
