const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

const csvtojson = require("csvtojson");
const path = require("path");
const Xlsx = require("xlsx");

// Create Product -- Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  // req.body.images = [
  //   {
  //     public_id: "photo/2015/11/10/14/26/box-1036976_960_720.png",
  //     url: "https://cdn.pixabay.com/photo/2015/11/10/14/26/box-1036976_960_720.png",
  //   },
  //   {
  //     public_id: "photo/2015/11/10/14/26/box-1036976_960_720.png",
  //     url: "https://cdn.pixabay.com/photo/2015/11/10/14/26/box-1036976_960_720.png",
  //   },
  //   {
  //     public_id: "photo/2015/11/10/14/26/box-1036976_960_720.png",
  //     url: "https://cdn.pixabay.com/photo/2015/11/10/14/26/box-1036976_960_720.png",
  //   },
  // ];
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Product
const getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();

  let product = await apiFeature.query;

  let filteredProductsCount = product.length;

  apiFeature.pagination(resultPerPage);

  product = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    product,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get all Product (ADMIN)

const getAdminProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Update Product -- Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
  }

  // Images Start new

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// delete product -- Admin

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
  }

  // Deleting Images From Cloudinary

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Succesfully",
  });
});

// get Single product details
const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Create New Review or Update the Review

const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a Product

const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Review deleted",
  });
});

// Delete Review
const bulkUpload = catchAsyncErrors(async (req, res, next) => {
  
  if (!req.files || !req.files.csv) {
    return next(new ErrorHandler("No file uploaded", 400));
  }
  // return res.json(req.files.csv.data);
  const file = Xlsx.read(req.files.csv.data);

  const sheets = file.SheetNames;
  const data = [];
  for (let i = 0; i < sheets.length; i++) {
    const sheetname = sheets[i];
    const sheetData = Xlsx.utils.sheet_to_json(file.Sheets[sheetname]);
    sheetData.forEach((a) => {
      a.images = [
        {
          public_id: "photo/2015/11/10/14/26/box-1036976_960_720.png",
          url: "https://cdn.pixabay.com/photo/2015/11/10/14/26/box-1036976_960_720.png",
        },
      ];
      data.push(a);
    });
  }
  // Inserting the data into the database
  Product.insertMany(data)
    .then(() => {
      res.json({ success: true, msg: "Data inserted successfully." });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler("Error while inserting data.", 500));
    });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  bulkUpload,
};
