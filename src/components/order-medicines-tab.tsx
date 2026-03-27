
'use client';

import { useState, useMemo } from 'react';
import { PrescriptionUploadForm } from './prescription-upload-form';
import { NearbyVendors } from './nearby-vendors';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockVendors } from '@/lib/health-data';

const cities = [...new Set(mockVendors.map(vendor => vendor.city))];

export function OrderMedicinesTab() {
  const [selectedCity, setSelectedCity] = useState(cities[0] || '');

  const filteredVendors = useMemo(() => {
    if (!selectedCity) return mockVendors;
    return mockVendors.filter(vendor => vendor.city === selectedCity);
  }, [selectedCity]);

  return (
    <div className="space-y-8">
      <PrescriptionUploadForm />
      
      <Card>
        <CardHeader>
          <CardTitle>Select Your City</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedCity} defaultValue={selectedCity}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a city from Madhya Pradesh..." />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <NearbyVendors vendors={filteredVendors} />
    </div>
  );
}
