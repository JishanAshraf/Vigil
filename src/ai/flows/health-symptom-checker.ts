'use server';

/**
 * @fileOverview A health symptom checker AI agent.
 *
 * - healthSymptomChecker - A function that handles the health symptom checking process.
 * - HealthSymptomCheckerInput - The input type for the healthSymptomChecker function.
 * - HealthSymptomCheckerOutput - The return type for the healthSymptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthSymptomCheckerInputSchema = z.object({
  symptoms: z
    .string()
    .describe('The symptoms the user is experiencing.'),
});
export type HealthSymptomCheckerInput = z.infer<typeof HealthSymptomCheckerInputSchema>;

const HealthSymptomCheckerOutputSchema = z.object({
  disclaimer: z.string().describe("A disclaimer stating that this information is for educational purposes only and is not a substitute for professional medical advice."),
  possibleConditions: z.string().describe('A list of possible conditions that match the symptoms.'),
  generalCareAdvice: z.string().describe('A bulleted list of actionable, safe advice.'),
  otcSuggestions: z.string().describe('Suggestions for over-the-counter medicines.'),
  emergencyResponse: z.string().optional().describe('If critical symptoms are detected, a message to seek immediate emergency medical attention.'),
});
export type HealthSymptomCheckerOutput = z.infer<typeof HealthSymptomCheckerOutputSchema>;

export async function healthSymptomChecker(input: HealthSymptomCheckerInput): Promise<HealthSymptomCheckerOutput> {
  return healthSymptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'healthSymptomCheckerPrompt',
  input: {schema: HealthSymptomCheckerInputSchema},
  output: {schema: HealthSymptomCheckerOutputSchema},
  prompt: `You are an AI assistant that provides information on possible conditions, home remedies, and over-the-counter medicine suggestions based on the user's symptoms. You are not a medical professional, and this information is for educational purposes only and is not a substitute for professional medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have.

Symptoms: {{{symptoms}}}

Based on your input, here's some information:

⚠️ Disclaimer: I am an AI assistant and not a medical professional. This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have.

Possible Conditions: {{possibleConditions}}

General Care Advice / Home Remedies: {{generalCareAdvice}}

Over-The-Counter (OTC) Suggestions: {{otcSuggestions}}

{{#if emergencyResponse}}
  **Please stop using this app and seek immediate emergency medical attention. Call [Local Emergency Number, e.g., 911] or go to the nearest emergency room immediately.**
{{/if}}`,
});

const healthSymptomCheckerFlow = ai.defineFlow(
  {
    name: 'healthSymptomCheckerFlow',
    inputSchema: HealthSymptomCheckerInputSchema,
    outputSchema: HealthSymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
