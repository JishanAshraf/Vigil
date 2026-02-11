
'use server';

export interface HealthKnowledgeOutput {
  disclaimer: string;
  possibleConditions: string;
  generalCareAdvice: string;
  otcSuggestions: string;
  emergencyResponse?: string;
}

const knowledgeBase = [
    {
        keywords: ['headache', 'migraine'],
        response: {
            possibleConditions: 'Tension Headache, Migraine, Dehydration.',
            generalCareAdvice: '- Rest in a quiet, dark room.\n- Apply a cold or warm compress to your forehead or the back of your neck.\n- Stay hydrated by drinking plenty of water.\n- Gently massage your neck and temples.',
            otcSuggestions: 'Ibuprofen (Advil, Motrin), Acetaminophen (Tylenol), or Aspirin. For migraines, look for products containing caffeine.'
        }
    },
    {
        keywords: ['sore throat', 'scratchy throat'],
        response: {
            possibleConditions: 'Common Cold, Strep Throat, Tonsillitis, Allergies.',
            generalCareAdvice: '- Gargle with warm salt water (1/2 teaspoon of salt in a glass of warm water).\n- Drink warm liquids like tea with honey or broth.\n- Use a humidifier to add moisture to the air.\n- Rest your voice.',
            otcSuggestions: 'Lozenges or throat sprays containing benzocaine or menthol. Pain relievers like Acetaminophen or Ibuprofen can also help.'
        }
    },
    {
        keywords: ['cough', 'coughing'],
        response: {
            possibleConditions: 'Common Cold, Flu, Bronchitis, Allergies.',
            generalCareAdvice: '- Stay hydrated with water and warm liquids.\n- Use a humidifier or take a steamy shower.\n- Honey can help soothe a cough (do not give to children under 1).',
            otcSuggestions: 'Cough suppressants with dextromethorphan for a dry cough. Expectorants with guaifenesin for a productive (wet) cough.'
        }
    },
    {
        keywords: ['fever', 'chills'],
        response: {
            possibleConditions: 'Infection (viral or bacterial), Flu, Common Cold.',
            generalCareAdvice: '- Rest as much as possible.\n- Drink plenty of fluids to prevent dehydration.\n- Wear light clothing and use a light blanket.\n- Take a lukewarm bath.',
            otcSuggestions: 'Acetaminophen (Tylenol) or Ibuprofen (Advil, Motrin) to help reduce fever and relieve body aches.'
        }
    },
    {
        keywords: ['chest pain', 'shortness of breath', 'difficulty breathing', 'numbness', 'fainting', 'dizzy'],
        response: {
            emergencyResponse: "Your symptoms could be a sign of a serious medical emergency. Please call your local emergency services or go to the nearest emergency room immediately. Do not delay seeking care."
        }
    }
];

const defaultResponse = {
    possibleConditions: 'General Malaise or unspecified symptoms.',
    generalCareAdvice: '- Get plenty of rest.\n- Stay well-hydrated by drinking water or other clear fluids.\n- Eat a balanced diet with fruits and vegetables.\n- Monitor your symptoms. If they worsen or new ones appear, consider consulting a healthcare professional.',
    otcSuggestions: 'A general multivitamin may support overall health. For minor aches, consider Acetaminophen or Ibuprofen, following package directions.'
};

const disclaimer = "This information is for educational purposes only and is not a substitute for professional medical advice. Always consult a healthcare provider for diagnosis and treatment.";

export function getRuleBasedHealthResponse(symptoms: string): HealthKnowledgeOutput {
    const lowerCaseSymptoms = symptoms.toLowerCase();

    for (const entry of knowledgeBase) {
        for (const keyword of entry.keywords) {
            if (lowerCaseSymptoms.includes(keyword)) {
                if(entry.response.emergencyResponse) {
                    return {
                        disclaimer,
                        possibleConditions: '',
                        generalCareAdvice: '',
                        otcSuggestions: '',
                        emergencyResponse: entry.response.emergencyResponse,
                    };
                }
                return { disclaimer, ...entry.response, emergencyResponse: undefined };
            }
        }
    }

    return { disclaimer, ...defaultResponse, emergencyResponse: undefined };
}
