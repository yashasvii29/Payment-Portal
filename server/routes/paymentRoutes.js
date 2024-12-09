const express = require('express');
const router = express();
const stripe = require("stripe")(process.env.stripeKey);


router.get("/make-payment", async (req, res) => {
    let user = req.user;
    if (!user) throw new Error("User not authenticated");
    let products = await User.findById({ _id: user._id }).populate("cart");
    if (!products || !products.cart.length)
      throw new Error("No products in cart");
    // console.log("\n******************NEW ORDER STARTS **************** ");
    // console.log(products.cart);
  
    const customer = await stripe.customers.create({
      name: user.username,
      email: user.email,
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    });
    // console.log("req.user.name -> ", req.user);
    // console.log("Current Customer who made an order : ", customer);
  




    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: Array.from(products.cart).map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${item.name}`,
            },
            unit_amount: item.price * 100,
          },
          quantity: 1,
        };
      }),
      mode: "payment",
    //   success_url: "https://shopapp-90nf.onrender.com/success",
    //   cancel_url: "https://shopapp-90nf.onrender.com/cancel",
      success_url: "https://ecommerce-website-jg4c.vercel.app/success",
      cancel_url: "https://ecommerce-website-jg4c.vercel.app/cancel",
      customer: customer.id, // Link the customer to the session
    });
  
    res.render(303, session.url);
  });
  




  router.get("/success", async (req, res) => {
    let currUser = req.user;
    // console.log("Before Current User :-> ", currUser);
    // console.log("CurrUser.cart -> ", currUser.cart);
    let products = currUser.cart.map((productId) => ({
      product: productId,
      quantity: 1, // Assuming 1 for now, update logic if needed
    }));
    // console.log("Cart Products : ", products);
  
    let userId = req.user._id;
    let user = await User.findById(userId).populate("cart");
    //   console.log(user, "sam");
    let totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
  
    const order = new Order({
      user: currUser._id,
      products,
      totalAmount,
      status: "completed",
    });
    // console.log("Cart Order : ", order);
    await order.save();
    currUser.cart = [];
    await currUser.save();
    // console.log("After Current User :-> ", currUser);
    // req.flash("success", "Order Placed Successfully");
    res.render("order placed successfully");
  });
  



  router.get("/cancel", (req, res) => {
    // req.flash("error", "Something Wrong !! Retry");
    res.redirect("order has been cancelled");
  });
