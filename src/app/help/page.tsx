
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

const faqs = [
    {
        question: "How do I report an issue?",
        answer: "You can report an issue by clicking the 'Report an Issue' button in the sidebar. This will take you to a form where you can provide details about the problem, upload images, and specify the location."
    },
    {
        question: "What happens after I report an issue?",
        answer: "Once you submit a report, it will be visible on the community feed for other residents to see. If you choose to notify authorities, an email will be sent to the relevant local department. You can track the status of your report on the alert details page."
    },
    {
        question: "Can I post anonymously?",
        answer: "Yes, you can. When you fill out the report form, there is an option to 'Post Anonymously'. If you select this, your name and avatar will be hidden from the public post."
    },
    {
        question: "How does the Health Assistant work?",
        answer: "The Health Assistant is an AI-powered tool to help you understand your symptoms. Simply describe how you're feeling, and the assistant will provide information on possible conditions, general care advice, and over-the-counter medication suggestions. Please note, this is not a substitute for professional medical advice."
    },
    {
        question: "How do I update my profile information?",
        answer: "You can manage your profile by navigating to the 'Profile' section from the main navigation. There, you can update your name, contact information, and postal code."
    }
]

export default function HelpPage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Help & Support</CardTitle>
          <CardDescription>
            Find answers to common questions and get in touch with our support team.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            
            <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <p className="text-muted-foreground mt-1">If you can't find the answer you're looking for, please reach out to us.</p>
                <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <a href="mailto:support@vigil.app" className="hover:underline">support@vigil.app</a>
                    </div>
                     <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
