
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  phone: z.string().optional(),
  postalCode: z.string().min(5, { message: "Please enter a valid postal code." }),
});

export function ProfileForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Alex Doe",
      email: "alex.doe@example.com",
      phone: "+1 555 123 4567",
      postalCode: "90210",
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    toast({
      title: "Profile Updated",
      description: "Your information has been saved successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026707d" />
                <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline" className="glossy-button">Change Photo</Button>
        </div>

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
