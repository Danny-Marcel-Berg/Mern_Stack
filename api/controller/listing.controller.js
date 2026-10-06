import Listing from "../models/listing.model.js";
import { errorHandler } from "./auth.controller.js";
import mongoose from "mongoose";

// Sample initial dummy listings data
export const sampleListings = [
  {
    _id: "list_1",
    name: "Modern Luxury Villa with Private Pool",
    description:
      "Stunning 4 bedroom luxury villa with panoramic ocean views, private swimming pool, spacious garden, state-of-the-art kitchen, and smart home automation.",
    address: "742 Evergreen Terrace, Beverly Hills, CA 90210",
    regularPrice: 2500000,
    discountPrice: 2200000,
    bathrooms: 4,
    bedrooms: 4,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    userRef: "admin_1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "list_2",
    name: "Cozy Downtown Penthouse Apartment",
    description:
      "Stylish penthouse located in the heart of downtown. Features high ceilings, hardwood floors, floor-to-ceiling windows with skyline views, and a dedicated parking spot.",
    address: "100 Grand Ave, Suite 400, Manhattan, NY 10001",
    regularPrice: 4500,
    discountPrice: 4000,
    bathrooms: 2,
    bedrooms: 2,
    furnished: true,
    parking: true,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    ],
    userRef: "admin_1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "list_3",
    name: "Spacious Family Suburban House",
    description:
      "Beautiful 3 bedroom house in a quiet, family-friendly neighborhood. Includes large backyard, 2-car garage, updated kitchen, and top-rated school district.",
    address: "45 Oakridge Lane, Austin, TX 78701",
    regularPrice: 650000,
    discountPrice: 650000,
    bathrooms: 3,
    bedrooms: 3,
    furnished: false,
    parking: true,
    type: "sale",
    offer: false,
    imageUrls: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    ],
    userRef: "admin_1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "list_4",
    name: "Charming Beachfront Cottage for Rent",
    description:
      "Charming cottage directly on the beach. Enjoy soothing ocean waves, open patio, fire pit, and fully furnished interior perfect for summer getaways or full-time living.",
    address: "210 Ocean Drive, Miami Beach, FL 33139",
    regularPrice: 3200,
    discountPrice: 2800,
    bathrooms: 2,
    bedrooms: 2,
    furnished: true,
    parking: false,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    ],
    userRef: "admin_1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "list_5",
    name: "Modern Urban Loft in Arts District",
    description:
      "Contemporary open-concept studio loft with exposed brick walls, polished concrete floors, stainless steel appliances, and community rooftop deck.",
    address: "88 Industrial Way, Seattle, WA 98101",
    regularPrice: 420000,
    discountPrice: 420000,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: true,
    type: "sale",
    offer: false,
    imageUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
    ],
    userRef: "admin_1",
    createdAt: new Date().toISOString(),
  },
];

let memoryListings = [...sampleListings];

export const createListing = async (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const listing = await Listing.create(req.body);
      return res.status(201).json(listing);
    } catch (error) {
      // ignore
    }
  }

  const newListing = {
    _id: "list_" + Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  memoryListings.unshift(newListing);
  return res.status(201).json(newListing);
};

export const getListing = async (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const listing = await Listing.findById(req.params.id);
      if (listing) {
        return res.status(200).json(listing);
      }
    } catch (error) {
      // try memory store
    }
  }

  const memListing = memoryListings.find((l) => l._id === req.params.id);
  if (!memListing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  return res.status(200).json(memListing);
};

export const getListings = async (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;

      let offer = req.query.offer;
      if (offer === undefined || offer === "false") {
        offer = { $in: [false, true] };
      }

      let furnished = req.query.furnished;
      if (furnished === undefined || furnished === "false") {
        furnished = { $in: [false, true] };
      }

      let parking = req.query.parking;
      if (parking === undefined || parking === "false") {
        parking = { $in: [false, true] };
      }

      let type = req.query.type;
      if (type === undefined || type === "all") {
        type = { $in: ["sale", "rent"] };
      }

      const searchTerm = req.query.searchTerm || "";
      const sort = req.query.sort || "createdAt";
      const order = req.query.order || "desc";

      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);

      if (listings && listings.length > 0) {
        return res.status(200).json(listings);
      }
    } catch (error) {
      // fallback to memory filter
    }
  }

  let filtered = memoryListings;

  const searchTerm = (req.query.searchTerm || "").toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(searchTerm) ||
        l.description.toLowerCase().includes(searchTerm) ||
        l.address.toLowerCase().includes(searchTerm)
    );
  }

  if (req.query.offer === "true") {
    filtered = filtered.filter((l) => l.offer === true);
  }
  if (req.query.furnished === "true") {
    filtered = filtered.filter((l) => l.furnished === true);
  }
  if (req.query.parking === "true") {
    filtered = filtered.filter((l) => l.parking === true);
  }
  if (req.query.type && req.query.type !== "all") {
    filtered = filtered.filter((l) => l.type === req.query.type);
  }

  return res.status(200).json(filtered);
};
