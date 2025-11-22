import { Info } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-[#006747] border-b-2 border-[#CFC493] shadow-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          {/* Logo Placeholder - Circular */}
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#006747]"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.2"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title & Subtitle */}
          <div className="flex flex-col">
            <h1 className="text-white leading-tight">
              USF SmartNav
            </h1>
            <p className="text-[#CFC493] text-xs leading-none mt-0.5 hidden sm:block">
              The Vague Direction Agent
            </p>
          </div>
        </div>

        {/* Right: About Link */}
        <button
          className="flex items-center gap-2 text-white hover:text-[#CFC493] transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
          onClick={() => alert("USF SmartNav - Your intelligent campus navigation assistant")}
        >
          <Info className="w-5 h-5" />
          <span className="hidden sm:inline">About</span>
        </button>
      </div>
    </header>
  );
}
