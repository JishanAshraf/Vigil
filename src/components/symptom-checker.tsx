
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertTriangle, Send, Loader2, Sparkles } from 'lucide-react';

import { getHealthAnalysis } from '@/app/actions';
import type { HealthSymptomCheckerOutput } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }),
});

export function SymptomChecker() {
  const [analysis, setAnalysis] = useState<HealthSymptomCheckerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await getHealthAnalysis({ symptoms: values.symptoms });
      setAnalysis(result);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Sparkles className="w-10 h-10 text-primary" />
            <div>
                <CardTitle className="text-3xl font-headline font-bold tracking-tight text-primary">Vital</CardTitle>
                <CardDescription>Describe your symptoms to get information.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="e.g., 'I have a headache and a sore throat...'"
                        className="resize-none pr-20 min-h-[80px]"
                        {...field}
                      />
                      <Button type="submit" size="icon" className="absolute top-1/2 right-3 -translate-y-1/2 glossy-button" disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        <span className="sr-only">Get Analysis</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        
        {isLoading && (
            <div className="flex items-center justify-center p-8 space-x-3 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p>Analyzing your symptoms...</p>
            </div>
        )}

        {error && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {analysis && (
          <div className="space-y-4 animate-in fade-in-50 duration-500">
            {analysis.emergencyResponse && (
                <Alert variant="destructive" className="bg-red-600 text-white border-red-700 dark:bg-red-800 dark:border-red-700">
                    <AlertTriangle className="h-5 w-5 text-white" />
                    <AlertTitle className="font-bold text-lg text-white">Seek Immediate Medical Attention!</AlertTitle>
                    <AlertDescription className="text-white">
                        {analysis.emergencyResponse}
                    </AlertDescription>
                </Alert>
            )}

            {!analysis.emergencyResponse && (
                <>
                <Alert className="bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <AlertTitle className="font-semibold text-yellow-800 dark:text-yellow-300">Disclaimer</AlertTitle>
                    <AlertDescription className="text-yellow-700 dark:text-yellow-400">
                        {analysis.disclaimer}
                    </Aler
                    tDescription>
                </Alert>
                
                <div className="space-y-4 text-sm">
                    <h4 className="font-semibold text-base">Possible Conditions</h4>
                    <p className="text-foreground/80">{analysis.possibleConditions}</p>

                    <h4 className="font-semibold text-base">General Care Advice</h4>
                    <p className="text-foreground/80 whitespace-pre-line">{analysis.generalCareAdvice}</p>
                    
                    <h4 className="font-semibold text-base">Over-The-Counter (OTC) Suggestions</h4>
                    <p className="text-foreground/80 whitespace-pre-line">{analysis.otcSuggestions}</p>
                </div>
                </>
            )}
          </div>
        )}
      </CardContent>
      {!analysis && !isLoading && <CardFooter>
          <p className="text-xs text-muted-foreground">This tool is for informational purposes and is not a substitute for professional medical advice.</p>
      </CardFooter>}
    </Card>
  );
}
