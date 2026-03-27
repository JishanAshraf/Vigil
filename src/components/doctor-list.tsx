'use client';

import { mockDoctors, Doctor } from "@/lib/health-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState, useMemo } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const cities = [...new Set(mockDoctors.map(doctor => doctor.city))];
const specialties = [...new Set(mockDoctors.map(doctor => doctor.specialty))];

export function DoctorList() {
    const { toast } = useToast();
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>("");

    const [selectedCity, setSelectedCity] = useState<string>('all');
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

    const filteredDoctors = useMemo(() => {
        return mockDoctors.filter(doctor => {
            const cityMatch = selectedCity === 'all' || doctor.city === selectedCity;
            const specialtyMatch = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
            return cityMatch && specialtyMatch;
        });
    }, [selectedCity, selectedSpecialty]);

    const handleBookAppointment = () => {
        if (!selectedDoctor || !selectedTime) {
            toast({
                variant: "destructive",
                title: "Booking Failed",
                description: "Please select a time slot.",
            });
            return;
        }

        toast({
            title: "Appointment Booked!",
            description: `Your appointment with ${selectedDoctor.name} at ${selectedTime} has been scheduled.`,
        });
        
        setSelectedDoctor(null);
        setSelectedTime("");
    }

    const handleCloseDialog = (open: boolean) => {
        if (!open) {
            setSelectedDoctor(null);
            setSelectedTime("");
        }
    }

    const availableTimes = ["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];
    
  return (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Consult a Doctor</CardTitle>
                <CardDescription>Find and book appointments with healthcare professionals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select onValueChange={setSelectedCity} value={selectedCity}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Cities</SelectItem>
                            {cities.map(city => (
                                <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     <Select onValueChange={setSelectedSpecialty} value={selectedSpecialty}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Specialization" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Specializations</SelectItem>
                            {specialties.map(spec => (
                                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                            <div key={doctor.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{doctor.name}</p>
                                        <p className="text-sm text-muted-foreground">{doctor.specialty} - {doctor.city}</p>
                                    </div>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="glossy-button"
                                    onClick={() => setSelectedDoctor(doctor)}
                                >
                                    Book Appointment
                                </Button>
                            </div>
                        ))
                    ) : (
                         <div className="text-center text-muted-foreground py-8">
                            No doctors found matching your criteria.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
        
        <Dialog open={!!selectedDoctor} onOpenChange={handleCloseDialog}>
            <DialogContent className="sm:max-w-[425px]">
                {selectedDoctor && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Book Appointment</DialogTitle>
                            <DialogDescription>
                                Select a time to book an appointment with {selectedDoctor.name}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <p className="font-semibold text-sm">Available Time Slots:</p>
                            <RadioGroup onValueChange={setSelectedTime} value={selectedTime} className="grid grid-cols-2 gap-4">
                                {availableTimes.map(time => (
                                    <div key={time} className="flex items-center space-x-2">
                                        <RadioGroupItem value={time} id={`time-${time}`} />
                                        <Label htmlFor={`time-${time}`} className="font-normal cursor-pointer text-sm">
                                            {time}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <DialogFooter className="sm:justify-between gap-2 flex-col-reverse sm:flex-row">
                            <Button type="button" onClick={handleBookAppointment} className="glossy-button w-full sm:w-auto">
                                Confirm Appointment
                            </Button>
                             <Button asChild variant="outline" className="glossy-button w-full sm:w-auto">
                                <a href={`tel:${selectedDoctor.phone}`}>
                                    <Phone className="mr-2 h-4 w-4"/>
                                    Call Doctor
                                </a>
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    </>
  );
}
