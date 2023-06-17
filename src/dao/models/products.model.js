const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productsCollection = "productos";

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  category: String,
  code: String,
  stock: Number,
  status: Boolean,
});

//AGGREGATION PIPELINE CATEGORY, PRICEMIN, PRICEMAX, SORT
productsSchema.statics.filterProducts = async (params) => {
  const pipeline = [];
  if (
    typeof params !== "object" ||
    isNaN(params.priceMin) ||
    isNaN(params.priceMax)
  ) {
    throw new Error("Parámetros inválidos");
  }

  if (params.category) pipeline.push({ $match: { category: params.category } });

  const priceFilter = {};
  if (params.priceMin) priceFilter.$gte = params.priceMin;
  if (params.priceMax) priceFilter.$lte = params.priceMax;
  if (Object.keys(priceFilter).length > 0) pipeline.push({ $match: { price: priceFilter } });

  if (params.sort) {
    const sortField = "price";
    const sortOrder = params.sort === "asc" ? 1 : -1;
    pipeline.push({ $sort: { [sortField]: sortOrder } });
  }

  pipeline.push({ $limit: params.limit || 10 });

  const options = {
    page: params.page || 1,
    limit: params.limit || 10
   };
   const result = await this.aggregate(pipeline).paginateProduct(options); 
  
   return result
};

//MONGOOSE-PAGINATE-V2
productsSchema.plugin(mongoosePaginate);
const Products = mongoose.model(productsCollection, productsSchema);

module.exports = Products;
