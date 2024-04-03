import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

// Secure
import { limiterDefault } from "./middleware/rateLimiterDefault.js";

// Events
import { returnBadRequest } from "./utils/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

import { Users } from "./models/Users.js";
import { error } from "console";
import createHttpError from "http-errors";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_LINK}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
      }
    );
    console.log("Mongo DB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

// var whitelist = ["http://localhost:3000"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(limiterDefault);
}

// app.use(helmet());
// app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(returnBadRequest);

const PORT = process.env.SERVER_PORT || 3001;

app.post("/ar", async (req, res) => {
  const { id: idTest } = req.body;

  if (!idTest) {
    return res.status(400).send("Bad request");
  }

  const findUser = await Users.findOne({ idTest });

  if (!findUser) {
    return res.status(404).send("Not found");
  }

  try {
    const data = await Users.findOneAndUpdate(
      { idTest },
      { enableAr: true },
      { returnDocument: "after" }
    );

    return res.status(200).json({ success: true });
  } catch (error) {}
});

app.get("/ar/:id", async (req, res) => {
  try {
    // const { id: idTest } = req.params;

    // if (!idTest) {
    //   return res.status(400).send("Bad request");
    // }

    // const findUser = await Users.findOne({ idTest });
    // if (!findUser || !findUser?.enableAr) {
    //   return res.status(404).send("Not found");
    // }

    const filePath = path.join(__dirname, "/public/model.gltf");
    const fileExtension = path.extname(filePath);

    const contentType = "model/gltf-binary";

    const options = {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
      },
    };

    // await Users.findOneAndUpdate(
    //   {
    //     idTest,
    //   },
    //   { enableAr: false }
    // );

    // res.sendFile(filePath, options);

    // Cài đặt headers cho response

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Disposition": "inline",
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

    readStream.on("error", (error) => {
      res.sendStatus(404);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/image", (req, res) => {
  const filePath = path.join(__dirname, "/public/model.glb");
  const fileExtension = path.extname(filePath);

  let contentType = "application/octet-stream";
  if (fileExtension === ".glb") {
    contentType = "model/gltf-binary";
  } else if (fileExtension === ".usdz") {
    contentType = "model/vnd.usdz+zip";
  }

  const options = {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": "inline",
    },
  };

  res.sendFile(filePath, options);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

  console.log("NODE_ENV: ", process.env.NODE_ENV, process.env.BSC_CHAIN_ID);

  // referralEvent();
});
