"use server";

import { healthSymptomChecker, HealthSymptomCheckerInput, HealthSymptomCheckerOutput } from '@/ai/flows/health-symptom-checker';

export async function getHealthAnalysis(input: HealthSymptomCheckerInput): Promise<HealthSymptomCheckerOutput> {
  try {
    const result = await healthSymptomChecker(input);
    return result;
  } catch (error) {
    console.error("Error in getHealthAnalysis:", error);
    throw new Error("Failed to get health analysis. Please try again later.");
  }
}
