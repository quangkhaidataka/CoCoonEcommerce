const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const cors = require('cors');


// Connect to MongoDB
mongoose.connect('mongodb+srv://quangkhaiolympic:01LMnyVM%40%40@cluster0.gocddiq.mongodb.net/CocoonEcommerce?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
  });


  // Use bodyParser middleware
  app.use(cors());
  app.use(express.json());

///////////////             Design a  Schema                              ///////////////////////////
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: String,
  price: Number,
  thumbnail: String, // Changed from Image to String to store image URL
  description: String
});

const Shop = mongoose.model('Shop', shopSchema);


const orderSchema = new Schema({
  orderDate: {
    type: Date,
    default: Date.now
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    }
    // Removed quantity
  }],
  totalPrice: Number
});

const Order = mongoose.model('Order', orderSchema);

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Shop' },
  // You can add more fields here as needed, like quantity, user reference, etc.
});

const CartItem = mongoose.model('CartItem', cartItemSchema);


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id) && new RegExp("^[0-9a-fA-F]{24}$").test(id);


app.post('/addcart', async (req, res) => {
  const { id } = req.body;

  if (!id || !mongoose.isValidObjectId(id)) {
    return res.status(400).json({ "error": "Invalid product ID format" });
  }

  try {
    const product = await Shop.findById(id);
    if (!product) {
      return res.status(404).json({ "error": "Product not found" });
    }

    const newCartItem = new CartItem({ productId: id });
    await newCartItem.save();
    res.json(newCartItem);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ "error": "An error occurred while adding to the cart" });
  }
});


app.post('/addorder', async (req, res) => {
  const { cartitems } = req.body;

  try {
    // Fetch Cart Items
    const cartItems = await CartItem.find({
      _id: { $in: cartitems }
    }).populate('productId'); // Ensure productId contains price information

    // Calculate Total Price
    const totalPrice = cartItems.reduce((total, item) => total + item.productId.price, 0);

    // Create an Order Object
    const newOrder = new Order({
      items: cartItems.map(item => ({
        product: item.productId._id
      })),
      totalPrice: totalPrice // Set the total price
    });

    // Save the Order
    await newOrder.save();

    // Delete all records from CartItem collection
    await CartItem.deleteMany({});

    // Send Response
    res.status(201).json({ message: 'Order created and cart cleared successfully', order: newOrder });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.get('/orders', async (req, res) => {
  try {
    // Find all orders and populate product details
    const orders = await Order.find().populate('items.product');
    console.log("hello all orders");

    // Send response with orders
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


async function getProductsInOrder(orderId) {
  if (!mongoose.isValidObjectId(orderId)) {
    throw new Error("Invalid orderId ID format");
  }

  const order = await Order.findById(orderId).populate('items.product');
  if (!order) {
    throw new Error("Order not found");
  }

  // Extracting product details from each item
  const products = order.items.map(item => item.product);
  return products;
}

app.get('/orders/:id/products', async (req, res) => {
  const orderId = req.params.id; // Correctly extract the orderId from params

  console.log("Requested orderId ID:", orderId, typeof orderId);

  try {
    const products = await getProductsInOrder(orderId);
    res.json(products);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.message === "Invalid orderId ID format" || error.message === "Order not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


app.get('/cart', async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('productId');
    res.json(cartItems);
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ "error": "An error occurred while fetching cart items" });
  }
});



app.get("/shopping", async (req, res) => {
    let page = parseInt(req.query.page) || 1; // Default to 1 if not provided
    let limit = parseInt(req.query.limit) || 3; // Default to 10 if not provided
    let skip = (page - 1) * limit; // Calculate the number of documents to skip

    try {
        // Fetch paginated blogs
        let blogs = await Shop.find({}).skip(skip).limit(limit);

        // Get total number of blogs
        let total = await Shop.countDocuments();

        res.send({
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data: blogs
        });
    } catch (err) {
        res.status(500).send({ message: "Error retrieving blogs", error: err });
    }
});

app.post("/search", async (req, res) => {
  const { search } = req.body;

  if (!search) {
    return res.status(400).send('Search term is required');
  }

  try {
    // Using a regular expression to make the search case-insensitive
    const searchRegex = new RegExp(search, 'i');

    // Querying the database
    const results = await Shop.find({
      $or: [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ]
    });

    // Sending back the results
    res.status(200).json(results);

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send('Error occurred during the search');
  }
});




app.get("/shopping/:id", async (req, res) => {
  const postID = req.params.id;
  console.log("Requested product ID:", postID,typeof postID);

  // Basic validation
  if (!postID || !isValidObjectId(postID)) {
    return res.status(400).json({ "error": "Invalid product ID format" });
  }

  // Convert string to ObjectId
  let objectId;
  try {
    objectId = new mongoose.Types.ObjectId(postID); // new is very important, we must discover this
  } catch (error) {
    return res.status(400).json({ "error": "Invalid product ID format" });
  }

  try {
    // Assuming 'Blog' is your Mongoose model
    const blogPost = await Shop.findById(objectId); // Use await to ensure the promise resolves

    if (!blogPost) {
      return res.status(404).json({ "error": "{Product not found" });
    }

    res.json(blogPost);
    console.log(blogPost);
  } catch (err) {
    console.error('Error fetching product :', err);
    res.status(500).json({ "error": "An error occurred while fetching the product" });
  }
});


app.get("/edit/:id",async (req,res)=>{

  const postID = req.params.id;
  console.log("Requested Post ID:", postID,typeof postID);
  // Basic validation
  if (!postID || !isValidObjectId(postID)) {
    return res.status(400).json({ "error": "Invalid Post ID format" });
  }

  // Convert string to ObjectId
  let objectId;
  try {
    objectId = new mongoose.Types.ObjectId(postID); // new is very important, we must discover this
  } catch (error) {
    return res.status(400).json({ "error": "Invalid Post ID Hi format" });
  }

  try {
    // Assuming 'Blog' is your Mongoose model
    const blogPost = await Shop.findById(objectId); // Use await to ensure the promise resolves

    if (!blogPost) {
      return res.status(404).json({ "error": "Blog post not found" });
    }

    res.json(blogPost);
    console.log(blogPost);
  } catch (err) {
    console.error('Error fetching blog post:', err);
    res.status(500).json({ "error": "An error occurred while fetching the post" });
  }
});

app.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, thumbnailUrl } = req.body;

  try {
    // Update the post in the database
    await Shop.updateOne({ _id: id }, {
      name: name,
      price: price,
      description: description,
      thumbnail: thumbnailUrl
    });

    console.log("Successfully updated");
    res.redirect(`/shopping/${id}`); // Use template literals to insert the id

  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating the post");
  }
});



app.post("/add", async (req, res) => {
  // Create and add new product to the database
  const newProduct = new Shop({
    name: req.body.name,
    price: req.body.price,
    thumbnail: req.body.thumbnailUrl,
    description: req.body.description,
  });

  try {
    await newProduct.save(); // Use await for asynchronous operation
    res.status(200).json({ message: "New product added successfully" }); // Send success response
  } catch (error) {
    res.status(500).json({
      message: "Error adding product",
      error: error.message // It's often useful to send the error message
    });
  }
});

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
//
// // The catch-all handler for any request that doesn't match the above
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });



app.listen(port, () => console.log(`Listening to the port ${port}`));
