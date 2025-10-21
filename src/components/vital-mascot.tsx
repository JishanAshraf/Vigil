
import { cn } from "@/lib/utils";

export function VitalMascot({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
        >
            <rect
                width="40"
                height="40"
                rx="20"
                fill="currentColor"
                fillOpacity="0.1"
            />
            <path
                d="M20 12V28M12 20H28"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
