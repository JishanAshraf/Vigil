
import { SymptomChecker } from "@/components/symptom-checker";
import { MainHeader } from "@/components/main-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrescriptionUploadForm } from "@/components/prescription-upload-form";
import { NearbyVendors } from "@/components/nearby-vendors";
import { DoctorList } from "@/components/doctor-list";
import { BriefcaseMedical, Pill, Stethoscope } from "lucide-react";


export default function HealthPage() {
    return (
        <>
            <MainHeader />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pl-64 pb-28 md:pb-8">
                <Tabs defaultValue="symptoms" className="w-full max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="symptoms">
                            <Stethoscope className="h-5 w-5 md:h-4 md:w-4 md:mr-2"/>
                            <span className="hidden md:inline">Symptom Checker</span>
                        </TabsTrigger>
                        <TabsTrigger value="order">
                            <Pill className="h-5 w-5 md:h-4 md:w-4 md:mr-2"/>
                            <span className="hidden md:inline">Order Medicines</span>
                        </TabsTrigger>
                        <TabsTrigger value="doctor">
                            <BriefcaseMedical className="h-5 w-5 md:h-4 md:w-4 md:mr-2"/>
                           <span className="hidden md:inline">Find a Doctor</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="symptoms" className="mt-6">
                        <SymptomChecker />
                    </TabsContent>
                    <TabsContent value="order" className="mt-6">
                        <div className="space-y-8">
                            <PrescriptionUploadForm />
                            <NearbyVendors />
                        </div>
                    </TabsContent>
                    <TabsContent value="doctor" className="mt-6">
                        <DoctorList />
                    </TabsContent>
                </Tabs>
            </main>
        </>
    );
}
