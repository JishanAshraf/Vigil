'use client';

import { Vendor } from "@/lib/health-data";
import { Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";

interface NearbyVendorsProps {
  vendors: Vendor[];
}

export function NearbyVendors({ vendors }: NearbyVendorsProps) {
  return (
    <div className="space-y-4 pt-4">
        {vendors.length > 0 ? (
            vendors.map((vendor) => (
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
                No pharmacies found for the selected city.
            </div>
        )}
    </div>
  );
}
