import Order from "../moduls/orderModel.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import catcherrors from "../middleware/catchAsyncError.js";
import Product from "../moduls/productModel.js";
import order from "../moduls/orderModel.js";

// Create new Order ==>

const newOrder = catcherrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//  Get single Order ==>

const getSingleOrder = catcherrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new errorHandler("Order not found with this Id ", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user orderes ==>
const myOrders = catcherrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );

  if (!orders) {
    return next(new errorHandler("Order not found with this Id ", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});
// get ALL ODERES -- ADMIN ==>
const getAllOrders = catcherrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (!orders) {
    return next(new errorHandler("Order not found with this Id ", 404));
  }

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
// Update order status-- ADMIN ==>
const updateOrder = catcherrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new errorHandler("Order not found with this ID", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(
        new errorHandler("You have already delivered this order", 400)
      );
    }

    if (req.body.status === "Shipped") {
      try {
        for (const orderItem of order.orderItems) {
          await updateStock(orderItem.product, orderItem.quantity);
        }
      } catch (error) {
        return next(
          new errorHandler(error.message || "Stock update failed", 400)
        );
      }
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new errorHandler(error.message || "Order update failed", 500));
  }
});

// UPDATE STOCK FUNCTION =======.
async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.Stock < quantity) {
    throw new Error("Insufficient product stock");
  }

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// DELETE ODERE -- ADMIN ==>
const deleteOrder = catcherrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new errorHandler("Order not found with this Id ", 404));
  }
  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

export {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  deleteOrder,
  updateOrder,
};
