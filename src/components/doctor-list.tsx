
'use client';

import { mockDoctors } from "@/lib/health-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export function DoctorList() {
    const { toast } = useToast();

    const handleBookAppointment = (doctorName: string) => {
        toast({
            title: "Appointment Booked (Mock)",
            description: `Your appointment with ${doctorName} has been scheduled.`,
        });
    }
  
  return (
    <Card>
        <CardHeader>
            <CardTitle>Consult a Doctor</CardTitle>
            <CardDescription>Find and book appointments with healthcare professionals.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {mockDoctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={doctor.avatarUrl} />
                            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{doctor.name}</p>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        </div>
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="glossy-button"
                        onClick={() => handleBookAppointment(doctor.name)}
                    >
                        Book Appointment
                    </Button>
                </div>
            ))}
        </CardContent>
    </Card>
  );
}
