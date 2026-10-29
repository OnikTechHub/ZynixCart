import Link from "next/link";

export default function Logo({ size = "md", isLight = false, showTagline = false }) {
  const sizeClasses = {
    sm: {
      svg: "w-7 h-7",
      text: "text-lg",
      badge: "text-[10px] px-1 py-0.2",
    },
    md: {
      svg: "w-9 h-9",
      text: "text-2xl",
      badge: "text-xs px-1.5 py-0.5",
    },
    lg: {
      svg: "w-11 h-11",
      text: "text-3xl",
      badge: "text-xs px-2 py-0.5",
    },
  }[size] || {
    svg: "w-9 h-9",
    text: "text-2xl",
    badge: "text-xs px-1.5 py-0.5",
  };

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
      <div className={`relative flex items-center justify-center ${sizeClasses.svg} transition-transform duration-300 group-hover:scale-105`}>
        {/* Custom Vector SVG Logo */}
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            <linearGradient id="zynixGradient" x1="2" y1="4" x2="42" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="zynixAccent" x1="12" y1="12" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
          </defs>

          {/* Rounded base badge */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="12"
            fill="url(#zynixGradient)"
          />

          {/* Cart handle & basket path */}
          <path
            d="M10 14h4l3.5 12h14l3-9H16.5"
            stroke="url(#zynixAccent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stylized 'Z' dynamic lightning slash through cart */}
          <path
            d="M17 19h9.5l-8 5.5h8.5"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cart Wheels with glowing dots */}
          <circle cx="19" cy="30.5" r="2.2" fill="#FFFFFF" />
          <circle cx="28" cy="30.5" r="2.2" fill="#FFFFFF" />
          <circle cx="19" cy="30.5" r="1" fill="#4F46E5" />
          <circle cx="28" cy="30.5" r="1" fill="#4F46E5" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span
            className={`font-black tracking-tight ${sizeClasses.text} ${
              isLight ? "text-white" : "text-slate-900"
            }`}
          >
            Zynix
          </span>
          <span className={`font-black tracking-tight ${sizeClasses.text} bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
            Cart
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mb-2"></span>
        </div>
        {showTagline && (
          <span className={`text-[10px] font-medium tracking-wider uppercase ${isLight ? "text-slate-400" : "text-slate-500"}`}>
            Smart E-Commerce
          </span>
        )}
      </div>
    </Link>
  );
}
