import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("text-2xl font-headline font-bold tracking-tight text-primary", className)}>
            Vigil
        </div>
    );
}
