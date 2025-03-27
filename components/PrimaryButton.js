export default function PrimaryButton({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
    >
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-px bg-white/40 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </span>
      <svg 
        className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </button>
  );
}

