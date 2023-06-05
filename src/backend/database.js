const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Meeting = require("./Modal/Meeting");
const multer = require("multer");

let editId;
const appExpress = express();
appExpress.use(cors());
appExpress.use(bodyParser.json());
appExpress.use(express.json());
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: "./uploads" });

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/lizieDBnew");

  console.log("Connected");

  const propertySchema = new mongoose.Schema({
    title: String,
    address: String,
    property: String,
    rent: Number,
    maintenance: Number,
    rooms: Number,
    area: Number,
    bathrooms: Number,
    parking: Number,
    description: String,
    distrito: String,
    additional: {
      type: Array,
    },
    images: [
      {
        imageUrl: String,
      },
    ],
  });

  const slotSchema = new mongoose.Schema({
    start: String,
    end: String,
    Date: String,
    Time: String,
  });

  const Slot = mongoose.model("Slot", slotSchema);

  const Property = mongoose.model("Property", propertySchema);

  appExpress.use("/uploads", express.static(path.join(__dirname, "uploads")));

  appExpress.post(
    "/api/database",
    upload.array("selectedImages", 10),
    async (req, res) => {
      const propertyData = JSON.parse(req.body.values);
      const files = req.files;
      const images = files.map((file) => {
        const filePath = path.join(__dirname, "uploads", file.originalname);
        fs.rename(file.path, filePath, async (error) => {
          if (error) {
            console.error("Error moving the file:", error);
            return res.status(500).json({ error: "Failed to save the file" });
          }
        });
        return {
          imageUrl: `/uploads/${file.originalname}`,
        };
      });

      const property1 = new Property(propertyData);
      property1.images = images;
      console.log(property1);
      const result = await property1.save();
      res.send(result);
    }
  );

  appExpress.get("/api/property", async (req, res) => {
    const userAll = await Property.find({});
    res.status(200).send(userAll);
  });

  appExpress.post("/api/edit", async (req, res) => {
    editId = req.body.id;
  });

  appExpress.get("/api/edit", async (req, res) => {
    const userAll = await Property.findById(editId);
    res.status(200).send(userAll);
  });

  appExpress.post(
    "/api/editSubmit",
    upload.array("selectedImages", 10),
    async (req, res) => {
      const propId = JSON.parse(req.body.propId);
      const values = JSON.parse(req.body.values);

      const files = req.files;
      console.log(files);
      const prevImages = JSON.parse(req.body.selectedImages1);
      const images = files.map((file) => {
        const filePath = path.join(__dirname, "uploads", file.originalname);
        fs.rename(file.path, filePath, async (error) => {
          if (error) {
            console.error("Error moving the file:", error);
            return res.status(500).json({ error: "Failed to save the file" });
          }
        });
        return {
          imageUrl: `/uploads/${file.originalname}`,
        };
      });

      const userAll = await Property.find({});
      userAll.map(async (obj) => {
        if (propId._id === obj.id) {
          await Property.findByIdAndDelete(obj.id);
          const property1 = new Property(values);

          images.push(...prevImages);
          property1.images = images;
          const result = await property1.save();
          console.log(result);
          res.send(result);
        }
      });
    }
  );

  appExpress.post("/api/delete", async (req, res) => {
    const deleteId = req.body.id;
    await Property.findByIdAndDelete(deleteId);
  });

  appExpress.post("/meetings", async (req, res) => {
    try {
      const { date, time, name, phoneNumber, selectedProperty, userData } = req.body;
      console.log(selectedProperty);
      const meeting = new Meeting({
        date,
        time,
        name,
        phoneNumber,
        selectedProperty,
        userData,
      });

      const savedMeeting = await meeting.save();

      res.status(201).json(savedMeeting);
    } catch (error) {
      res.status(500).json({ error: "Failed to create meeting" });
    }
  });

  appExpress.post("/meeting/slot", async (req, res) => {
    const { start, end } = req.body;
    const { Date, Time } = req.body;
    if (start === undefined && end === undefined) {
      const meetingslot = new Slot({ Date, Time });
      console.log(meetingslot);
      const savedMeeting = await meetingslot.save();
      console.log(savedMeeting);
      res.status(201).json(savedMeeting);
    } else {
      const meetingslot = new Slot({ start, end });
      console.log(meetingslot);
      const savedMeeting = await meetingslot.save();
      console.log(savedMeeting);
      res.status(201).json(savedMeeting);
    }
  });

  appExpress.get("/meeting/slot", async (req, res) => {
    const data = await Slot.find({});
    res.status(200).send(data);
  });

  appExpress.get("/meeting/meetingInfo", async (req, res) => {
    const data = await Meeting.find({});
    res.status(200).send(data);
  });

  appExpress.post("/api/cancel-visit", async (req, res) => {
    const obj = await Meeting.findOneAndDelete({ time: req.body.userTime, date: req.body.userDate }).exec();
  })

  appExpress.post("/slot/time-enable", async (req, res) => {
    console.log(req.body)
    const obj = await Slot.findOneAndDelete({ Time: req.body.itemTime, Date: req.body.itemDate }).exec();
    console.log(obj)
  })

  appExpress.post("/slot/date-enable", async (req, res) => {
    console.log(req.body)
    const obj = await Slot.findOneAndDelete({ start: req.body.itemStart, end: req.body.itemEnd }).exec();
    console.log(obj)
  })

}

appExpress.listen(5000, function () {
  console.log("connected to server");
});
