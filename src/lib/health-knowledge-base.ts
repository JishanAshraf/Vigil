
export interface HealthKnowledgeOutput {
  disclaimer: string;
  possibleConditions: string;
  generalCareAdvice: string;
  homeRemedies: string;
  emergencyResponse?: string;
}

interface KnowledgeBaseEntry {
    keywords: string[];
    response: Partial<Omit<HealthKnowledgeOutput, 'disclaimer'>>;
}

const knowledgeBase: KnowledgeBaseEntry[] = [
    {
        keywords: ['headache', 'migraine'],
        response: {
            possibleConditions: 'Tension Headache, Migraine, Dehydration.',
            generalCareAdvice: '- Rest in a quiet, dark room.\n- Apply a cold or warm compress to your forehead or the back of your neck.\n- Stay hydrated by drinking plenty of water.',
            homeRemedies: '- Gently massage your neck and temples to relieve tension.\n- Drink ginger tea, which may help with nausea associated with migraines.\n- Apply a small amount of diluted peppermint oil to your temples for a cooling effect.'
        }
    },
    {
        keywords: ['sore throat', 'scratchy throat'],
        response: {
            possibleConditions: 'Common Cold, Strep Throat, Tonsillitis, Allergies.',
            generalCareAdvice: '- Gargle with warm salt water (1/2 teaspoon of salt in a glass of warm water).\n- Drink warm liquids like broth or caffeine-free tea.\n- Rest your voice as much as possible.',
            homeRemedies: '- Sip on tea with honey and lemon to soothe your throat.\n- Use a humidifier to add moisture to the air.\n- Eat soft foods and avoid acidic or spicy foods that can cause irritation.'
        }
    },
    {
        keywords: ['cough', 'coughing'],
        response: {
            possibleConditions: 'Common Cold, Flu, Bronchitis, Allergies.',
            generalCareAdvice: '- Stay hydrated with plenty of water and warm liquids.\n- Use a humidifier or take a steamy shower to help loosen congestion.',
            homeRemedies: '- A spoonful of honey can help soothe a cough (do not give to children under 1 year old).\n- Drink ginger or thyme tea, which can act as a natural expectorant.\n- Prop your head up with extra pillows when you sleep to ease coughing.'
        }
    },
    {
        keywords: ['fever', 'chills'],
        response: {
            possibleConditions: 'Infection (viral or bacterial), Flu, Common Cold.',
            generalCareAdvice: '- Rest as much as possible to allow your body to recover.\n- Drink plenty of fluids like water, juice, or broth to prevent dehydration.\n- Wear light clothing and use a light blanket to stay comfortable.',
            homeRemedies: '- Take a lukewarm (not cold) bath to help reduce your fever.\n- Place a cool, damp washcloth on your forehead.\n- Drink herbal teas like elderflower or peppermint to help promote sweating.'
        }
    },
    {
        keywords: ['chest pain', 'shortness of breath', 'difficulty breathing', 'numbness', 'fainting', 'dizzy'],
        response: {
            emergencyResponse: "Your symptoms could be a sign of a serious medical emergency. Please call your local emergency services or go to the nearest emergency room immediately. Do not delay seeking care."
        }
    }
];

const defaultResponse: Omit<HealthKnowledgeOutput, 'disclaimer' | 'emergencyResponse'> = {
    possibleConditions: 'General Malaise or unspecified symptoms.',
    generalCareAdvice: '- Get plenty of rest.\n- Stay well-hydrated by drinking water or other clear fluids.\n- Eat a balanced diet with fruits and vegetables.\n- Monitor your symptoms. If they worsen or new ones appear, consider consulting a healthcare professional.',
    homeRemedies: '- For general wellness, focus on a balanced diet rich in fruits and vegetables.\n- Herbal teas like chamomile or peppermint can be soothing.\n- Ensure you are getting adequate sleep each night.'
};

const disclaimer = "This information is for educational purposes only and is not a substitute for professional medical advice. Always consult a healthcare provider for diagnosis and treatment.";

export function getRuleBasedHealthResponse(symptoms: string): HealthKnowledgeOutput {
    const lowerCaseSymptoms = symptoms.toLowerCase();

    for (const entry of knowledgeBase) {
        for (const keyword of entry.keywords) {
            if (lowerCaseSymptoms.includes(keyword)) {
                return {
                    disclaimer,
                    possibleConditions: entry.response.possibleConditions || '',
                    generalCareAdvice: entry.response.generalCareAdvice || '',
                    homeRemedies: entry.response.homeRemedies || '',
                    emergencyResponse: entry.response.emergencyResponse,
                };
            }
        }
    }

    return { 
        disclaimer, 
        ...defaultResponse,
        emergencyResponse: undefined 
    };
}
