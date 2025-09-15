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
  prompt: `You are an AI assistant that provides information on possible conditions, home remedies, and over-the-counter medicine suggestions based on the user's symptoms. You are not a medical professional.

Analyze the user's symptoms and provide a response in JSON format.

Symptoms: {{{symptoms}}}

Your response must include:
- A disclaimer that this is not a substitute for professional medical advice.
- A list of possible conditions.
- General care advice and home remedies.
- Over-the-counter (OTC) medication suggestions.
- If the symptoms sound critical, an emergency response message.`,
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
