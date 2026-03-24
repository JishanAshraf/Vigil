
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Upload, Home } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";

const formSchema = z.object({
  prescription: z.any().refine((files) => files?.length > 0, "Prescription upload is required."),
  address: z.string().min(10, { message: "Please enter a valid delivery address." }),
  notes: z.string().optional(),
});

export function PrescriptionUploadForm() {
  const { toast } = useToast();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Order Placed!",
      description: "Your prescription has been sent. A partner pharmacy will contact you shortly.",
    });
    form.reset();
    setSelectedFileName(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Medicines</CardTitle>
        <CardDescription>Upload your prescription and we'll deliver to your doorstep.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Prescription</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="prescription-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PDF, PNG, JPG</p>
                        </div>
                        <Input
                          id="prescription-file"
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, application/pdf"
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            setSelectedFileName(e.target.files?.[0]?.name ?? null);
                          }}
                        />
                      </label>
                    </div>
                  </FormControl>
                  {selectedFileName && (
                    <div className="pt-2">
                       <Badge variant="secondary">{selectedFileName}</Badge>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input placeholder="Your full address" {...field} className="pl-10"/>
                    </FormControl>
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special instructions for the pharmacy..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full glossy-button" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Placing Order...' : 'Place Order'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
