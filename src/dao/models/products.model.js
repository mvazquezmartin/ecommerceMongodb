const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const collectionName = "productos";

const collectionSchema = new mongoose.Schema({
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
collectionSchema.statics.filterProducts = function (params) {
  const pipeline = [];

  if (params.category) pipeline.push({ $match: { category: params.category } });
  
  if (params.priceMin || params.priceMax) {
    const priceFilter = {};
    if (params.priceMin) priceFilter.$gte = params.priceMin;
    if (params.priceMax) priceFilter.$lte = params.priceMax;
    pipeline.push({ $match: { price: priceFilter } });
  }

  if (params.sort) {
    const sortField = "price";
    const sortOrder = (params.sort === "asc") ? 1 : -1;
    pipeline.push({ $sort: { [sortField]: sortOrder } });
  }
  
  return this.aggregate(pipeline);
};

//MONGOOSE-PAGINATE-V2
collectionSchema.plugin(mongoosePaginate)
collectionSchema.statics.paginateProduct = async function(query, options){
  const result = await this.paginate(query, options)
  return result
}

const Products = mongoose.model(collectionName, collectionSchema);

module.exports = Products;
