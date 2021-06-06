const OrderModel = require("../models/order.js");
const ProductModel = require("../models/product.js");

const getOrders = (req, res, next) => {
  console.log(req.body)
  OrderModel.find({}, (err, orders) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Operation Failed" });
    }
    if (orders) {
      // console.log(orders)

      res.status(200).json({ orders });
    }
  });
  next();
};


const postOrder = (req, res) => {
  try {
    const data = req.body;
    const orderData = JSON.parse(data.orderData);

    // validate the received data - email, empty fields

    const itemIds = orderData.items.map(item => item.id);

    ProductModel.find({ code: itemIds }, (err, products) => {
      if (err) {
        console.log(err)
        res.status(500).send({ message: "Operation Failed" })
      }

      const items = [];
      let totalPrice = 0;
      if (products) {
        const saveToDB = () => {
          orderData.billing.total_price = totalPrice;
          orderData.items = items;

          console.log('1', orderData)

          const orderModel = new OrderModel(orderData); // create an instance
          // Save the new model instance, passing a callback

          orderModel.save(function (err) {
            console.log('2');

            const handleError = (error) => {
              if (err.name === "MongoError" && err.code === 11000) {
                // Duplicate order
                return res.send({ success: false, message: "Duplicate Order" });
              }
              // Some other error
              return res.status(422).send(err);
            };

            if (err) return handleError(err);

            res.status(200).send({ success: true, message: "Order Successful.", order: orderData });
          });
        }

        function prepareItems(callbackFn) {
          products.map((product) => {
            const { code, name, price } = product;

            const currentItem = orderData.items.find(curr => curr.id === code);

            items.push({
              code,
              name,
              price,
              quantity: currentItem.quantity
            });

            totalPrice += price * currentItem.quantity;
          })

          callbackFn();
        }

        prepareItems(saveToDB); // prepare the ordered items and then save to database
      }


    })


  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: `Order Unsuccessful. ${error}` });
  }
}


module.exports = { getOrders, postOrder };