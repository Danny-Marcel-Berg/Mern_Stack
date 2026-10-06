import express from "express";
import {
  createListing,
  getListing,
  getListings,
} from "../controller/listing.controller.js";

const router = express.Router();

router.post("/create", createListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router;
