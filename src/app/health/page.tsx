
import { SymptomChecker } from "@/components/symptom-checker";
import { MainHeader } from "@/components/main-header";

export default function HealthPage() {
    return (
        <>
            <MainHeader />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pl-64 pb-28 md:pb-8">
                <div className="flex flex-1 items-center justify-center w-full">
                    <SymptomChecker />
                </div>
            </main>
        </>
    );
}
