
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
                            <Stethoscope className="mr-2 h-4 w-4"/>
                            Symptom Checker
                        </TabsTrigger>
                        <TabsTrigger value="order">
                            <Pill className="mr-2 h-4 w-4"/>
                            Order Medicines
                        </TabsTrigger>
                        <TabsTrigger value="doctor">
                            <BriefcaseMedical className="mr-2 h-4 w-4"/>
                           Find a Doctor
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
