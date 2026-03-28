'use client';

import { PrescriptionUploadForm } from './prescription-upload-form';
import { LocationBasedVendorSearch } from './location-based-vendor-search';

export function OrderMedicinesTab() {
  return (
    <div className="space-y-8">
      <PrescriptionUploadForm />
      <LocationBasedVendorSearch />
    </div>
  );
}
