"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Upload, Home, Store, CreditCard, Package } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { mockVendors } from "@/lib/health-data";

const formSchema = z.object({
  prescription: z.any().refine((files) => files?.length > 0, "Prescription upload is required."),
  address: z.string().min(10, { message: "Please enter a valid delivery address." }),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function PrescriptionUploadForm() {
  const { toast } = useToast();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isOrderDialog, setOrderDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [selectedVendorId, setSelectedVendorId] = useState<string | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      notes: "",
    },
  });

  function onSubmit(values: FormData) {
    setSubmittedData(values);
    setOrderDialog(true);
  }

  const handleConfirmOrder = () => {
    if (!selectedVendorId) {
      toast({ variant: "destructive", title: "Please select a vendor." });
      return;
    }
    if (!paymentMethod) {
      toast({ variant: "destructive", title: "Please select a payment method." });
      return;
    }

    const vendor = mockVendors.find(v => v.id === selectedVendorId);

    console.log({
      ...submittedData,
      vendor,
      paymentMethod
    });

    toast({
      title: "Order Placed!",
      description: `Your order has been sent to ${vendor?.name}. Payment will be ${paymentMethod === 'cod' ? 'on delivery' : 'online'}.`,
    });

    // Reset everything
    form.reset();
    setSelectedFileName(null);
    setOrderDialog(false);
    setSubmittedData(null);
    setSelectedVendorId(undefined);
    setPaymentMethod(undefined);
  }

  const handleDialogClose = (open: boolean) => {
    if (!open) {
        setOrderDialog(false);
    }
  }

  return (
    <>
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
              {form.formState.isSubmitting ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>

    <Dialog open={isOrderDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Complete Your Order</DialogTitle>
                <DialogDescription>
                    Select a pharmacy and payment method to finalize your order.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
                <div className="space-y-3">
                    <Label className="font-semibold">Choose a Pharmacy</Label>
                    <RadioGroup onValueChange={setSelectedVendorId} value={selectedVendorId} className="space-y-2">
                        {mockVendors.map((vendor) => (
                           <Label key={vendor.id} htmlFor={vendor.id} className="flex items-center gap-4 rounded-md border p-3 has-[:checked]:border-primary cursor-pointer">
                                <RadioGroupItem value={vendor.id} id={vendor.id} />
                                <div className="flex-1">
                                    <p className="font-medium">{vendor.name}</p>
                                    <p className="text-sm text-muted-foreground">{vendor.address}</p>
                                </div>
                               <Store className="h-5 w-5 text-muted-foreground" />
                           </Label>
                        ))}
                    </RadioGroup>
                </div>
                <div className="space-y-3">
                    <Label className="font-semibold">Payment Method</Label>
                     <RadioGroup onValueChange={setPaymentMethod} value={paymentMethod} className="grid grid-cols-2 gap-4">
                        <Label htmlFor="cod" className="flex flex-col items-center justify-center gap-2 rounded-md border p-4 has-[:checked]:border-primary cursor-pointer text-center">
                            <RadioGroupItem value="cod" id="cod" className="sr-only" />
                            <Package className="h-7 w-7 mb-1" />
                            <span className="font-medium text-sm">Pay on Delivery</span>
                        </Label>
                        <Label htmlFor="online" className="flex flex-col items-center justify-center gap-2 rounded-md border p-4 has-[:checked]:border-primary cursor-pointer text-center">
                            <RadioGroupItem value="online" id="online" className="sr-only" />
                            <CreditCard className="h-7 w-7 mb-1" />
                            <span className="font-medium text-sm">Pay Online</span>
                        </Label>
                    </RadioGroup>
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOrderDialog(false)}>Cancel</Button>
                <Button type="button" onClick={handleConfirmOrder} className="glossy-button">
                    Confirm Order
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
