
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect } from 'react';

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
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  phone: z.string().optional(),
  postalCode: z.string().min(5, { message: "Please enter a valid postal code." }),
});

type ProfileData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profileData: ProfileData;
}

export function ProfileForm({ profileData }: ProfileFormProps) {
  const { toast } = useToast();

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    // The form values will be controlled by the profileData prop
    values: profileData,
  });

  // This effect resets the form when the profileData prop changes.
  // This is important for when the data is loaded asynchronously from localStorage.
  useEffect(() => {
    form.reset(profileData);
  }, [profileData, form]);

  function onSubmit(values: z.infer<typeof profileSchema>) {
    // When the user updates their profile, save it back to localStorage
    localStorage.setItem('dummy-user-profile', JSON.stringify(values));
    toast({
      title: "Profile Updated",
      description: "Your information has been saved successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code / Neighbourhood</FormLabel>
              <FormControl>
                <Input placeholder="Your postal code" {...field} />
              </FormControl>
              <FormDescription>This helps us show you relevant community alerts.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="glossy-button">Update Profile</Button>
      </form>
    </Form>
  );
}
