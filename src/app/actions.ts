"use server";

import { getRuleBasedHealthResponse, HealthKnowledgeOutput } from '@/lib/health-knowledge-base';

export interface HealthSymptomCheckerInput {
  symptoms: string;
}

export type HealthSymptomCheckerOutput = HealthKnowledgeOutput;


export async function getHealthAnalysis(input: HealthSymptomCheckerInput): Promise<HealthSymptomCheckerOutput> {
  // TODO: Implement real authentication check here.
  // This is a placeholder to show where you would verify that the user is logged in.
  // For a real app, you would use a library like NextAuth.js or Firebase Authentication.
  const isAuthenticated = true; // Replace with actual session check

  if (!isAuthenticated) {
    throw new Error("Authentication required. You must be logged in to perform this action.");
  }

  try {
    const result = getRuleBasedHealthResponse(input.symptoms);
    return await Promise.resolve(result);
  } catch (error) {
    console.error("Error in getHealthAnalysis:", error);
    throw new Error("Failed to get health analysis. Please try again later.");
  }
}
