
export interface HealthKnowledgeOutput {
  disclaimer: string;
  possibleConditions: string;
  generalCareAdvice: string;
  homeRemedies: string;
  emergencyResponse?: string;
}

// Define the response types
const responses = {
  headache: {
    possibleConditions: 'Tension Headache, Migraine, Dehydration.',
    generalCareAdvice: '- Rest in a quiet, dark room.\n- Apply a cold or warm compress to your forehead or the back of your neck.\n- Stay hydrated by drinking plenty of water.',
    homeRemedies: '- Gently massage your neck and temples to relieve tension.\n- Drink ginger tea, which may help with nausea associated with migraines.\n- Apply a small amount of diluted peppermint oil to your temples for a cooling effect.'
  },
  soreThroat: {
    possibleConditions: 'Common Cold, Strep Throat, Tonsillitis, Allergies.',
    generalCareAdvice: '- Gargle with warm salt water (1/2 teaspoon of salt in a glass of warm water).\n- Drink warm liquids like broth or caffeine-free tea.\n- Rest your voice as much as possible.',
    homeRemedies: '- Sip on tea with honey and lemon to soothe your throat.\n- Use a humidifier to add moisture to the air.\n- Eat soft foods and avoid acidic or spicy foods that can cause irritation.'
  },
  cough: {
    possibleConditions: 'Common Cold, Flu, Bronchitis, Allergies.',
    generalCareAdvice: '- Stay hydrated with plenty of water and warm liquids.\n- Use a humidifier or take a steamy shower to help loosen congestion.',
    homeRemedies: '- A spoonful of honey can help soothe a cough (do not give to children under 1 year old).\n- Drink ginger or thyme tea, which can act as a natural expectorant.\n- Prop your head up with extra pillows when you sleep to ease coughing.'
  },
  fever: {
    possibleConditions: 'Infection (viral or bacterial), Flu, Common Cold.',
    generalCareAdvice: '- Rest as much as possible to allow your body to recover.\n- Drink plenty of fluids like water, juice, or broth to prevent dehydration.\n- Wear light clothing and use a light blanket to stay comfortable.',
    homeRemedies: '- Take a lukewarm (not cold) bath to help reduce your fever.\n- Place a cool, damp washcloth on your forehead.\n- Drink herbal teas like elderflower or peppermint to help promote sweating.'
  },
  stomachAche: {
    possibleConditions: 'Indigestion, Gas, Constipation, Food Poisoning.',
    generalCareAdvice: '- Avoid solid foods for a few hours.\n- Sip small amounts of clear liquids like water, broth, or ginger ale.\n- Avoid fatty, greasy, or spicy foods.',
    homeRemedies: '- Drink peppermint or chamomile tea to help soothe the stomach.\n- Apply a warm compress or hot water bottle to your abdomen.\n- Follow the BRAT diet (bananas, rice, applesauce, toast) when you start eating again.'
  },
  runnyNose: {
      possibleConditions: 'Common Cold, Allergies, Sinus Infection.',
      generalCareAdvice: '- Get plenty of rest.\n- Drink warm fluids to help thin mucus.\n- Use a saline nasal spray to help clear congestion.',
      homeRemedies: '- Inhale steam from a bowl of hot water or a hot shower.\n- Drink herbal teas like peppermint or eucalyptus.\n- Eat spicy foods, which can temporarily clear nasal passages.'
  },
  skinRash: {
      possibleConditions: 'Contact Dermatitis, Eczema, Heat Rash, Allergic Reaction.',
      generalCareAdvice: '- Avoid scratching the rash to prevent infection.\n- Keep the affected area clean and dry.\n- Wear loose-fitting clothing made from soft fabrics like cotton.',
      homeRemedies: '- Apply a cool, wet compress to the rash to reduce itching.\n- Take an oatmeal bath to soothe irritated skin.\n- Apply aloe vera gel or coconut oil for moisturizing and anti-inflammatory benefits.'
  },
  insomnia: {
      possibleConditions: 'Stress, Anxiety, Poor Sleep Hygiene, Caffeine.',
      generalCareAdvice: '- Establish a regular sleep schedule, even on weekends.\n- Create a relaxing bedtime routine, such as reading or taking a warm bath.\n- Avoid screens (phones, TVs) for at least an hour before bed.',
      homeRemedies: '- Drink warm milk or chamomile tea before bed.\n- Practice relaxation techniques like deep breathing or meditation.\n- Ensure your bedroom is dark, quiet, and cool.'
  },
  emergency: {
    emergencyResponse: "Your symptoms could be a sign of a serious medical emergency. Please call your local emergency services or go to the nearest emergency room immediately. Do not delay seeking care."
  }
};

// Map keywords to the response objects for efficient lookup
const knowledgeBase = new Map<string, Partial<Omit<HealthKnowledgeOutput, 'disclaimer'>>>([
  ['headache', responses.headache],
  ['migraine', responses.headache],
  ['sore', responses.soreThroat],
  ['scratchy', responses.soreThroat],
  ['throat', responses.soreThroat],
  ['cough', responses.cough],
  ['coughing', responses.cough],
  ['fever', responses.fever],
  ['chills', responses.fever],
  ['stomach', responses.stomachAche],
  ['indigestion', responses.stomachAche],
  ['cramps', responses.stomachAche],
  ['nausea', responses.stomachAche],
  ['nose', responses.runnyNose],
  ['runny', responses.runnyNose],
  ['stuffy', responses.runnyNose],
  ['congestion', responses.runnyNose],
  ['rash', responses.skinRash],
  ['itchy', responses.skinRash],
  ['skin', responses.skinRash],
  ['insomnia', responses.insomnia],
  ['sleep', responses.insomnia],
  ['sleepless', responses.insomnia],
  // Emergency keywords
  ['chest', responses.emergency],
  ['pain', responses.emergency],
  ['shortness', responses.emergency],
  ['breath', responses.emergency],
  ['breathing', responses.emergency],
  ['numbness', responses.emergency],
  ['fainting', responses.emergency],
  ['dizzy', responses.emergency],
]);

const defaultResponse: Omit<HealthKnowledgeOutput, 'disclaimer' | 'emergencyResponse'> = {
    possibleConditions: 'General Malaise or unspecified symptoms.',
    generalCareAdvice: '- Get plenty of rest.\n- Stay well-hydrated by drinking water or other clear fluids.\n- Eat a balanced diet with fruits and vegetables.\n- Monitor your symptoms. If they worsen or new ones appear, consider consulting a healthcare professional.',
    homeRemedies: '- For general wellness, focus on a balanced diet rich in fruits and vegetables.\n- Herbal teas like chamomile or peppermint can be soothing.\n- Ensure you are getting adequate sleep each night.'
};

const disclaimer = "This information is for educational purposes only and is not a substitute for professional medical advice. Always consult a healthcare provider for diagnosis and treatment.";

/**
 * Gets a health response from the knowledge base based on symptoms.
 * This is more efficient as it uses a Map for lookups.
 * @param symptoms A string describing the user's symptoms.
 * @returns A HealthKnowledgeOutput object.
 */
export function getRuleBasedHealthResponse(symptoms: string): HealthKnowledgeOutput {
    // Normalize and split the input into individual words
    const symptomWords = symptoms.toLowerCase().replace(/[.,/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
    
    // First, check for any emergency keywords.
    for (const word of symptomWords) {
        const response = knowledgeBase.get(word);
        if (response?.emergencyResponse) {
            return {
                disclaimer,
                possibleConditions: '',
                generalCareAdvice: '',
                homeRemedies: '',
                emergencyResponse: response.emergencyResponse,
            };
        }
    }

    // If no emergency, find the first non-emergency match.
    for (const word of symptomWords) {
        const response = knowledgeBase.get(word);
        if (response) {
            return {
                disclaimer,
                possibleConditions: response.possibleConditions || '',
                generalCareAdvice: response.generalCareAdvice || '',
                homeRemedies: response.homeRemedies || '',
                emergencyResponse: undefined,
            };
        }
    }

    // If no keywords are matched, return the default response.
    return { 
        disclaimer, 
        ...defaultResponse,
        emergencyResponse: undefined 
    };
}
