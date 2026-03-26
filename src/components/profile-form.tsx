"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useRef, useState } from 'react';

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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  phone: z.string().optional(),
  postalCode: z.string().min(5, { message: "Please enter a valid postal code." }),
  avatarUrl: z.string().optional(),
});

type ProfileData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profileData: ProfileData;
}

export function ProfileForm({ profileData }: ProfileFormProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(profileData.avatarUrl);

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    values: profileData,
  });

  useEffect(() => {
    form.reset(profileData);
    setAvatarPreview(profileData.avatarUrl);
  }, [profileData, form]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setAvatarPreview(dataUrl);
        form.setValue("avatarUrl", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };


  function onSubmit(values: z.infer<typeof profileSchema>) {
    login(values);
    toast({
      title: "Profile Updated",
      description: "Your information has been saved successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <AvatarImage src={avatarPreview} />
              <AvatarFallback>{form.getValues('name')?.[0]}</AvatarFallback>
            </Avatar>
             <div 
              className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 cursor-pointer border-2 border-background hover:bg-primary/80"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4 text-primary-foreground" />
            </div>
            <Input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/png, image/jpeg"
              onChange={handleAvatarChange}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
