import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBuilding, FaHardHat, FaCheckCircle, FaRulerCombined } from "react-icons/fa";

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden w-full sm:w-[340px] flex flex-col justify-between group">
      <div>
        <div className="relative h-52 overflow-hidden">
          <Link to={`/listing/${listing._id}`}>
            <img
              src={
                listing.imageUrls?.[0] ||
                "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80"
              }
              alt={listing.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
              {listing.type || "Construction"}
            </div>
            {listing.offer && (
              <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-full shadow-md">
                Featured Build
              </div>
            )}
          </Link>
        </div>

        <div className="p-5 space-y-3">
          <Link to={`/listing/${listing._id}`}>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
              {listing.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
            <MdLocationOn className="h-4 w-4 text-amber-500 shrink-0" />
            <p className="truncate">{listing.address}</p>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100 font-semibold">
            <div className="flex items-center gap-1">
              <FaCheckCircle className="text-amber-500" /> OSHA Compliant
            </div>
            <div className="flex items-center gap-1">
              <FaHardHat className="text-amber-500" /> Turnkey Build
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
        <div>
          <div className="text-[10px] text-slate-400 font-bold uppercase">Estimated Value</div>
          <div className="text-lg font-black text-slate-900">
            ${listing.regularPrice?.toLocaleString()}
          </div>
        </div>
        <Link
          to={`/listing/${listing._id}`}
          className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
        >
          View Blueprints &rarr;
        </Link>
      </div>
    </div>
  );
};

export default ListingItem;
