var admin = require("firebase-admin");

var serviceAccount = require("./roozgar-vendor-firebase-adminsdk-bevsb-a62c2d7a10.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../keys");
const bcrypt = require("bcryptjs");
const router = express.Router();
const OngoingOrder = mongoose.model("OngoingOrder");
const Vendor = mongoose.model("Vendor");
const Service = mongoose.model("Service");
const Category = mongoose.model("Category");
const SubCategory = mongoose.model("SubCategory");
const UnVerifiedVendor = mongoose.model("unverifiedvendors");
const BlockedVendor = mongoose.model("blockedvendors");
const BlockedService = mongoose.model("blockedservice");

router.post("/signup", async (req, res) => {
  try {
    const userName =
      req.body.firstName +
      "_" +
      req.body.lastName +
      Math.floor(Math.random() * 100);
    var vendor = new Vendor({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: userName,
      email: userName + "@gmail.com",
      cnic: req.body.cnic,
      passwordHash: await bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      image: req.body.image,
      cnicFront: req.body.cnicFront,
      cnicBack: req.body.cnicBack,
    });
    const cat = await Category.findById(req.body.category);
    vendor.category = cat._id;
    const unVerifiedVendor = new UnVerifiedVendor({
      firstName: vendor.firstName,
      lastName: vendor.lastName,
      userName: vendor.userName,
      email: vendor.email,
      cnic: vendor.cnic,
      phone: vendor.phone,
      image: vendor.image,
      cnicFront: vendor.cnicFront,
      cnicBack: vendor.cnicBack,
      category: vendor.category,
    });
    await vendor.save();
    await unVerifiedVendor.save();
    const token = jwt.sign({ vendorId: vendor._id }, jwtKey);
    vendor = await Vendor.findById(vendor._id).populate("category");
    return res.send({ vendor: vendor, token: token });
  } catch (err) {
    return res.send({ error: err.message });
  }
});

router.get("/checkAlreadyRegistered/:phone", async (req, res) => {
  const { phone } = req.params;
  try {
    const vendor = await Vendor.findOne({ phone });
    if (vendor) {
      return res.send({
        error: "This mobile no. has been already registered!",
      });
    }
  } catch (err) {
    return res.send({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.send({ error: "Must provide both email and password!" });
  }
  const vendor = await Vendor.findOne({ phone }).populate("category");
  if (!vendor) {
    return res.send({
      error: "Sorry, couldn't find any account with this mobile no.!",
    });
  }
  try {
    if (bcrypt.compareSync(req.body.password, vendor.passwordHash)) {
      const unVerifiedVendor = await UnVerifiedVendor.findOne({ phone });
      if (!unVerifiedVendor) {
        const blockedVendor = await BlockedVendor.findOne({ phone });
        if (!blockedVendor) {
          const token = jwt.sign({ vendorId: vendor._id }, jwtKey);
          return res.send({ vendor: vendor, token: token });
        }
        return res.send({ error: "Your account has been blocked by admin!" });
      }
      return res.send({ error: "Your account has not been verified yet!" });
    } else {
      return res.send({ error: "Invalid mobile no. or password!" });
    }
  } catch (err) {
    return res.send({ error: err });
  }
});

router.put("/changePassword/:id", async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  var vendor = await Vendor.findById(req.params.id);
  if (!vendor) {
    return res.send({ error: "Vendor must be signed in for this purpose!" });
  }
  try {
    if (bcrypt.compareSync(oldPassword, vendor.passwordHash)) {
      if (newPassword.localeCompare(confirmNewPassword) === 0) {
        vendor = await Vendor.findOneAndUpdate(
          { _id: vendor._id },
          {
            passwordHash: await bcrypt.hashSync(newPassword, 10),
          },
          {
            new: true,
          }
        );
        await vendor.save();
        const token = jwt.sign({ vendorId: vendor._id }, jwtKey);
        return res.send({
          success: "Password has been updated!",
          token: token,
        });
      } else {
        return res.send({ error: "New passwords don't match!" });
      }
    } else {
      return res.send({ error: "Current password entered is invalid!" });
    }
  } catch (err) {
    return res.send(err.message);
  }
});

router.put("/editVendorDetails/:id", async (req, res) => {
  const { firstName, lastName, image, phone } = req.body;
  try {
    var vendor = await Vendor.findOneAndUpdate(
      { _id: req.params.id },
      {
        firstName: firstName,
        lastName: lastName,
        image: image,
        phone: phone,
      },
      {
        new: true,
      }
    );
    await vendor.save();
    vendor = await Vendor.findById(req.params.id).populate("category");
    return res.send({
      vendor: vendor,
      success: "Profile updated successully!",
    });
  } catch (err) {
    return res.send(err.message);
  }
});

router.post("/addService", async (req, res) => {
  const { vendorId, title, description, price, image, subCategoryId } =
    req.body;
  console.log(req.body);
  if (!vendorId) {
    return res.send({ error: "Vendor must be logged in for this purpose!" });
  }
  try {
    const vendor = await Vendor.findById(vendorId);
    const subCategory = await SubCategory.findById(subCategoryId);
    const service = new Service({
      vendorId: vendor._id,
      vendorName: vendor.firstName + " " + vendor.lastName,
      subCategory: subCategory._id,
      title: title,
      price: price,
      image: image,
      description: description,
    });
    await service.save();
    vendor.service.push(service._id);
    await vendor.save();
    return res.send({ service: service });
  } catch (err) {
    return res.send(err.message);
  }
});

router.put("/editService/:id", async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: title,
        price: price,
        description: description,
      },
      {
        new: true,
      }
    );
    await service.save();
    return res.send({ service: service });
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/getServices/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const vendor = await Vendor.findById(_id);
    const vendorId = vendor._id;
    const services = await Service.find({ vendorId }).populate("subCategory");
    // const blockedServices = await BlockedService.find({ vendorName });
    // var availableServices = [];
    // for (var i = 0; i < services.length; i++) {
    //   for (var j = 0; j < blockedServices.length; j++) {
    //     if (services[i].title != blockedServices[j].title)
    //       availableServices.push(services[i]);
    //   }
    // }
    console.log(services);
    res.send({ services: services });
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/getCategories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send({ categories });
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/getSubCategories/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const subCategories = await SubCategory.find({ category });
    res.send({ subCategories });
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/getService/:id", async (req, res) => {
  try {
    const serv = await Service.findById(req.params.id);
    res.send({ service: service });
  } catch (err) {
    return res.send(err.message);
  }
});

// router.get("/ongoingAppointments/:phone", async (req, res) => {
//   const { phone } = req.params;
//   if (!phone) {
//     return res.send({ error: "Vendor must be logged in for this purpose!" });
//   }
//   try {
//     const vendor = await Vendor.findOne({ phone });
//     const vendorName = vendor.userName;
//     const appointments = await AcceptedOrder.find({ vendorName })
//       .populate("serviceId")
//       .populate("clientId");
//     // const completedAppointments = await CompletedOrder.find({vendorName});
//     // var ongoingAppointments = [];
//     // for (var i = 0; i < appointments.length; i++) {
//     //     for (var j = 0; j < completedAppointments.length; j++) {
//     //         if(appointments[i].dateCreated != completedAppointments[j].dateCreated)
//     //         ongoingAppointments.push(appointments[i]);
//     //     }
//     // }
//     res.send({ appointments: appointments });
//   } catch (err) {
//     return res.send(err.message);
//   }
// });

// router.post("/completeAppointment/:id", async (req, res) => {
//   const { phone } = req.body;
//   if (!phone) {
//     return res.send({ error: "Vendor must be logged in for this purpose!" });
//   }
//   try {
//     const appointment = await AcceptedOrder.findById();
//     const completedAppointment = new CompletedOrder({
//       serviceId: appointment.serviceId,
//       clientId: appointment.clientId,
//       vendorId: appointment.vendorId,
//       price: appointment.price,
//       completionTime: appointment.completionTime,
//       dateCreated: appointment.dateCreated,
//     });
//     await completedAppointment.save();
//     res.send({ completedAppointment: completedAppointment });
//   } catch (err) {
//     return res.send(err.message);
//   }
// });

router.delete("/myServices/:id", async (req, res) => {
  const { vendorId } = req.body;
  if (!vendorId) {
    return res.send({ error: "Vendor must be logged in for this purpose!" });
  }
  try {
    const vendor = await Vendor.findById(vendorId);
    const service = await Service.findByIdAndDelete(req.params.id);
    await vendor.service.filter((id) => id !== service._id);
    await vendor.save;
    console.log(service);
    return res.send({ message: "Success" });
  } catch (err) {
    return res.send(err.message);
  }
});

router.post("/respondToOrder", (req, res) => {
  console.log(req.body);
  const message = {
    notification: {
      title: "Order Accepted",
      body: "I have accepted your order",
    },
    token: req.body.clientToken,
  };
  admin
    .messaging()
    .send(message)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
