import { FaCalendarDays, FaLocationDot, FaStar } from "react-icons/fa6";
import { Link } from "react-router";

const BillCard = ({ bill }) => {
  const { _id, title, category, location, date, amount, image, description } = bill;

  return (
    <div className="group card bg-base-100 rounded-[2rem] border border-base-content/5 hover:border-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badges on Image */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="badge badge-primary font-bold shadow-lg shadow-primary/20 rounded-lg">{category}</span>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
            <FaStar className="text-warning" />
            <span>4.8 Rating</span>
          </div>
          <div className="bg-emerald-500/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-400/20">
            Active
          </div>
        </div>
      </div>

      <div className="card-body p-6 flex flex-col flex-grow">
        <div className="flex-grow space-y-4">
          <h3 className="text-xl font-black text-base-content group-hover:text-primary transition-colors line-clamp-1 leading-tight">
            {title}
          </h3>
          
          <p className="text-sm text-base-content/60 font-medium line-clamp-2 leading-relaxed">
            {description || "Efficiently manage your monthly utility payments with our secure and automated billing platform integrated with local providers."}
          </p>
          
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-3 text-base-content/50 text-xs font-bold uppercase tracking-wider">
              <div className="w-7 h-7 rounded-lg bg-base-200 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                <FaLocationDot />
              </div>
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-3 text-base-content/50 text-xs font-bold uppercase tracking-wider">
              <div className="w-7 h-7 rounded-lg bg-base-200 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                <FaCalendarDays />
              </div>
              <span>{date || "Jan 20, 2026"}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-base-content/5 flex items-center justify-between shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em] leading-none mb-1">Fee Starts</span>
            <span className="text-xl font-black text-primary">
              {amount || '120'} <small className="text-[10px] font-black opacity-50 uppercase ml-1">BDT</small>
            </span>
          </div>
          <Link
            to={`/bill/${_id}`}
            className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/20 btn-sm hover:scale-105 transition-transform"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BillCard;
