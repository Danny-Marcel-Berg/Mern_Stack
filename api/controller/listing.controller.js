import Listing from "../models/listing.model.js";
import { errorHandler } from "./auth.controller.js";
import mongoose from "mongoose";

// Sample initial dummy construction projects data
export const sampleListings = [
  {
    _id: "list_1",
    name: "Apex Tower & Commercial Headquarters",
    description:
      "State-of-the-art 18-story commercial skyscraper featuring sustainable glass facade, LEED Gold certification, smart HVAC integration, and modern open-plan office spaces. Built with heavy steel framing and seismic dampers.",
    address: "742 Innovation Way, Financial District, CA 90210",
    regularPrice: 18500000,
    discountPrice: 17200000,
    bathrooms: 24,
    bedrooms: 0,
    furnished: true,
    parking: true,
    type: "commercial",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
    ],
    userRef: "admin_1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "list_2",
    name: "Modern Coastal Eco-Villa Residence",
    description:
      "Custom luxury residential construction project built on hillside cliff with floor-to-ceiling panoramic glass, infinity edge pool, concrete cantilevered foundation, solar array, and smart home automation.",
    address: "100 Grand Horizon Cliff, Malibu, CA 90265",
    regularPrice: 4200000,
    discountPrice: 3950000,
    bathrooms: 5,
    bedrooms: 5,
    furnished: true,
    parking: true,
    type: "residential",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    userRef: "admin_1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "list_3",
    name: "Downtown Loft Historic Brick Renovation",
    description:
      "Complete structural rebuild and interior redesign of a 1920s historic brick warehouse into luxury modern loft apartments. Reinforced load-bearing walls, exposed wooden beam ceilings, and acoustic soundproofing.",
    address: "45 Heritage Plaza, Austin, TX 78701",
    regularPrice: 2800000,
    discountPrice: 2800000,
    bathrooms: 8,
    bedrooms: 12,
    furnished: true,
    parking: true,
    type: "renovation",
    offer: false,
    imageUrls: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    ],
    userRef: "admin_1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "list_4",
    name: "Metro Industrial Logistics & Distribution Hub",
    description:
      "High-bay industrial facility spanning 120,000 sq ft with heavy-load concrete flooring, automated loading docks, 36-foot clear heights, and integrated corporate offices.",
    address: "210 Cargo Boulevard, Logistics Park, TX 75001",
    regularPrice: 12500000,
    discountPrice: 11800000,
    bathrooms: 10,
    bedrooms: 0,
    furnished: false,
    parking: true,
    type: "industrial",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    ],
    userRef: "admin_1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "list_5",
    name: "Oakridge Luxury Subdivision Development",
    description:
      "Turnkey residential construction project consisting of 12 custom contemporary family homes with energy-efficient heat pumps, composite roofing, and landscaped communal parks.",
    address: "88 Oakridge Drive, Seattle, WA 98101",
    regularPrice: 8900000,
    discountPrice: 8900000,
    bathrooms: 36,
    bedrooms: 48,
    furnished: false,
    parking: true,
    type: "residential",
    offer: false,
    imageUrls: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
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
        type = { $in: ["commercial", "residential", "renovation", "industrial", "sale", "rent"] };
      }

      const searchTerm = req.query.searchTerm || "";
      const sort = req.query.sort || "createdAt";
      const order = req.query.order || "desc";

      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: "i" },
        offer,
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
  if (req.query.type && req.query.type !== "all") {
    filtered = filtered.filter((l) => l.type === req.query.type);
  }

  return res.status(200).json(filtered);
};
