import { SymptomChecker } from "@/components/symptom-checker";

export default function HealthPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <SymptomChecker />
        </div>
    );
}
