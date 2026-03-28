'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, MapPin, Phone } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { mockVendors } from "@/lib/health-data";

export function LocationBasedVendorSearch() {
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFindNearby = () => {
        setIsLoading(true);
        setError(null);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setIsLoading(false);
                },
                (err) => {
                    setError(`Error: ${err.message}. Please ensure location services are enabled.`);
                    setIsLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Find Nearby Pharmacies</CardTitle>
                <CardDescription>Use your location to find pharmacies near you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {!location && !isLoading && !error && (
                    <div className="flex flex-col items-center justify-center gap-4 p-4 border-2 border-dashed rounded-lg">
                        <MapPin className="w-10 h-10 text-muted-foreground"/>
                        <p className="text-center text-muted-foreground">Click the button to find pharmacies based on your current location.</p>
                        <Button onClick={handleFindNearby} disabled={isLoading} className="glossy-button">
                           "Find Pharmacies Near Me"
                        </Button>
                    </div>
                )}
                
                {isLoading && (
                    <div className="flex items-center justify-center p-8 space-x-3 text-muted-foreground">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <p>Finding Your Location...</p>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Location Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {location && (
                    <div className="space-y-6">
                        <div>
                             <h3 className="font-semibold mb-2">Your Location</h3>
                             <div className="aspect-video w-full overflow-hidden rounded-lg border">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&hl=en&z=14&output=embed`}
                                ></iframe>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="font-semibold">Available Pharmacies</h3>
                             <p className="text-sm text-muted-foreground">Contact a pharmacy for assistance. Delivery areas may vary.</p>
                            {mockVendors.length > 0 ? (
                                mockVendors.map((vendor) => (
                                    <div key={vendor.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                                        <div>
                                            <p className="font-semibold">{vendor.name}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                <MapPin className="h-3 w-3" />
                                                <span>{vendor.address}</span>
                                            </div>
                                        </div>
                                        <Button asChild variant="outline" size="sm" className="glossy-button">
                                            <a href={`tel:${vendor.phone}`}>
                                                <Phone className="mr-2 h-4 w-4"/>
                                                Call
                                            </a>
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted-foreground py-8">
                                    No pharmacies found.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
