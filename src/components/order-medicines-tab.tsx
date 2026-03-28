
'use client';

import { useState, useMemo } from 'react';
import { PrescriptionUploadForm } from './prescription-upload-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockVendors } from '@/lib/health-data';
import { NearbyVendors } from './nearby-vendors';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

const cities = [...new Set(mockVendors.map(vendor => vendor.city))];

export function OrderMedicinesTab() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedColony, setSelectedColony] = useState('all');

  const colonies = useMemo(() => {
    if (selectedCity === 'all') {
      return [];
    }
    const cityVendors = mockVendors.filter(vendor => vendor.city === selectedCity);
    return [...new Set(cityVendors.map(vendor => vendor.colony))];
  }, [selectedCity]);

  // Reset colony when city changes
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedColony('all');
  };

  const filteredVendors = useMemo(() => {
    if (selectedCity === 'all') {
      return mockVendors;
    }
    const cityVendors = mockVendors.filter(vendor => vendor.city === selectedCity);
    if (selectedColony === 'all') {
      return cityVendors;
    }
    return cityVendors.filter(vendor => vendor.colony === selectedColony);
  }, [selectedCity, selectedColony]);

  return (
    <div className="space-y-8">
      <PrescriptionUploadForm />
      
      <Card>
        <CardHeader>
            <CardTitle>Find a Pharmacy by Location</CardTitle>
            <CardDescription>Select your city and colony to see a list of available pharmacies.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select onValueChange={handleCityChange} value={selectedCity}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={setSelectedColony} value={selectedColony} disabled={selectedCity === 'all'}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a colony" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Colonies</SelectItem>
                        {colonies.map(colony => (
                            <SelectItem key={colony} value={colony}>{colony}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
                <NearbyVendors vendors={filteredVendors} />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
