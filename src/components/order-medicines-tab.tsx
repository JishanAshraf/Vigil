'use client';

import { useState } from 'react';
import { PrescriptionUploadForm } from './prescription-upload-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockVendors } from '@/lib/health-data';
import { NearbyVendors } from './nearby-vendors';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

const cities = [...new Set(mockVendors.map(vendor => vendor.city))];

export function OrderMedicinesTab() {
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredVendors = mockVendors.filter(vendor => 
    selectedCity === 'all' || vendor.city === selectedCity
  );

  return (
    <div className="space-y-8">
      <PrescriptionUploadForm />
      
      <Card>
        <CardHeader>
            <CardTitle>Find a Pharmacy by Location</CardTitle>
            <CardDescription>Select your city to see a list of available pharmacies.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <Select onValueChange={setSelectedCity} value={selectedCity}>
                    <SelectTrigger className="w-full md:w-[280px]">
                        <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <NearbyVendors vendors={filteredVendors} />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
