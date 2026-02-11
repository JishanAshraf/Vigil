"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MapPin, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useAlerts } from "@/contexts/AlertsContext";

const issueCategories = [
  "Suspicious Activity",
  "Lost Pet",
  "Broken Infrastructure",
  "Pothole",
  "Graffiti",
  "Illegal Dumping",
  "Noise Complaint",
  "Other",
];

const formSchema = z.object({
  category: z.string().min(1, { message: "Please select a category." }),
  images: z.any().optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  location: z.string().optional(),
  notifyAuthorities: z.boolean().default(false).optional(),
  postAnonymously: z.boolean().default(false).optional(),
});

export function ReportIssueForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { addAlert } = useAlerts();
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      description: "",
      location: "",
      notifyAuthorities: false,
      postAnonymously: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const images = values.images && (values.images as FileList).length > 0
        ? Array.from(values.images as FileList).map(file => ({ url: URL.createObjectURL(file), hint: 'custom upload' }))
        : [{ url: 'https://picsum.photos/seed/newissue/600/400', hint: 'issue report' }];

    addAlert({
      category: values.category,
      description: values.description,
      location: values.location || 'Location not specified',
      isAnonymous: values.postAnonymously || false,
      images,
    });
    
    toast({
      title: "Issue Reported!",
      description: "Thank you for helping improve your community.",
    });
    router.push('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {issueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image(s)</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImageIcon className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF</p>
                        </div>
                        <Input 
                          id="dropzone-file" 
                          type="file" 
                          className="hidden" 
                          multiple 
                          accept="image/png, image/jpeg, image/gif"
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            if (e.target.files) {
                              setSelectedFileNames(Array.from(e.target.files).map(f => f.name));
                            } else {
                              setSelectedFileNames([]);
                            }
                          }}
                        />
                    </label>
                </div> 
              </FormControl>
              {selectedFileNames.length > 0 && (
                <div className="mt-4 space-y-2">
                  <FormLabel>Selected files</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {selectedFileNames.map((name, i) => (
                      <Badge key={i} variant="secondary">{name}</Badge>
                    ))}
                  </div>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about the issue..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="e.g., Near Main St & 5th Ave" {...field} />
                </FormControl>
                <Button type="button" variant="outline" onClick={() => form.setValue('location', 'Current Location (detected)')} className="glossy-button">
                  <MapPin className="h-4 w-4" />
                  <span className="sr-only">Detect Location</span>
                </Button>
              </div>
              <FormDescription>
                We can detect your location automatically, or you can enter it manually.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="notifyAuthorities"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Notify relevant local authorities
                  </FormLabel>
                  <FormDescription>
                    This will send an email to the appropriate department based on the category and location.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postAnonymously"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Post Anonymously
                  </FormLabel>
                  <FormDescription>
                    Your username and avatar will be hidden from the public post.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full glossy-button" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit Report'}
        </Button>
      </form>
    </Form>
  );
}
