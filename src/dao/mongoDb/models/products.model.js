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
  owner: {
    type: String,
    default: "admin",
  },
  status: { type: Boolean, default: true },
});

//AGGREGATION PIPELINE CATEGORY, PRICEMIN, PRICEMAX, SORT
productsSchema.statics.filterProducts = async function (params) {
  const pipeline = [];

  if (params.category) pipeline.push({ $match: { category: params.category } });

  const priceFilter = {};
  if (params.priceMin) priceFilter.$gte = params.priceMin;
  if (params.priceMax) priceFilter.$lte = params.priceMax;
  if (Object.keys(priceFilter).length > 0)
    pipeline.push({ $match: { price: priceFilter } });

  if (params.sort) {
    const sortField = "price";
    const sortOrder = params.sort === "asc" ? 1 : -1;
    pipeline.push({ $sort: { [sortField]: sortOrder } });
  }

  const aggregation =
    pipeline.length === 0
      ? await this.find({ status: true })
      : await this.aggregate(pipeline);
  const filterQuery = {
    _id: { $in: aggregation.map((item) => item._id) },
  };

  const options = {
    page: params.page || 1,
    limit: params.limit || 10,
  };

  const result = await this.paginate(filterQuery, options);

  const baseUrl = `?category=${params.category}&priceMin=${params.priceMin}&priceMax=${params.priceMax}&sort=${params.sort}`;
  const currentPage = result.page;
  const totalPages = result.totalPages;
  const prevPageLink =
    currentPage > 1 ? `${baseUrl}&page=${currentPage - 1}` : null;
  const nextPageLink =
    currentPage < totalPages ? `${baseUrl}&page=${currentPage + 1}` : null;

  result.prevPageLink = prevPageLink;
  result.nextPageLink = nextPageLink;

  return result;
};

//MONGOOSE-PAGINATE-V2
productsSchema.plugin(mongoosePaginate);
const Products = mongoose.model(productsCollection, productsSchema);

module.exports = Products;
