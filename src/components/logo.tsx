import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <svg
                width="125"
                height="40"
                viewBox="0 0 125 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-auto"
            >
                <path
                    d="M25,35 L23,35 C12.50659,35 12.50659,35 15,25 C17.49341,15 17.49341,15 25,5 L30,0 L35,5 C42.50659,15 42.50659,15 45,25 C47.49341,35 47.49341,35 37,35 L35,35"
                    stroke="currentColor"
                    strokeOpacity="0.8"
                    strokeWidth="1.5"
                    fill="currentColor"
                    fillOpacity="0.1"
                />
                <path
                    d="M40,35 L38,35 C32.748296,35 32.748296,35 35,30 C37.251704,25 37.251704,25 40,20 L42,18 L44,20 C46.751704,25 46.751704,25 49,30 C51.251704,35 51.251704,35 46,35 L44,35"
                    stroke="currentColor"
                    strokeOpacity="0.8"
                    strokeWidth="1.5"
                    fill="currentColor"
                    fillOpacity="0.1"
                />
                <rect x="22" y="15" width="16" height="2" fill="currentColor" fillOpacity="0.5" rx="1" />
                <rect x="22" y="20" width="16" height="2" fill="currentColor" fillOpacity="0.5" rx="1" />
                <rect x="22" y="25" width="16" height="2" fill="currentColor" fillOpacity="0.5" rx="1" />
                <rect x="39" y="24" width="6" height="2" fill="currentColor" fillOpacity="0.5" rx="1" />
                <rect x="39" y="28" width="6" height="2" fill="currentColor" fillOpacity="0.5" rx="1" />
                <path d="M10 20 A 20 20 0 0 1 50 20" fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.5" />
                <circle cx="12" cy="25" r="4" fill="currentColor" fillOpacity="0.7" />
                <path d="M12 29 L12 35" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.5" />
                <circle cx="17" cy="20" r="5" fill="currentColor" fillOpacity="0.5" />
                <path d="M17 25 L17 35" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
                <text
                    x="60"
                    y="30"
                    fontFamily="PT Sans, sans-serif"
                    fontSize="14"
                    fontWeight="bold"
                    fill="currentColor"
                >
                    TOWNISH
                </text>
            </svg>
        </div>
    );
}