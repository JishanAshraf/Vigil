'use client';

import Image from 'next/image';
import { AlertCircle, Bell, CheckCircle, HelpCircle, Clock, MapPin, VenetianMask, MessageSquare, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import type { Alert } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AlertDetailsDialog } from './alert-details-dialog';
import { useAlerts, mockLoggedInUser } from '@/contexts/AlertsContext';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

type AlertCardProps = {
  alert: Alert;
};

const statusConfig = {
  Reported: { icon: AlertCircle, className: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/30', label: 'Reported' },
  'Authorities Notified': { icon: Bell, className: 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30', label: 'Notified' },
  Resolved: { icon: CheckCircle, className: 'bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30', label: 'Resolved' },
};

export function AlertCard({ alert }: AlertCardProps) {
  const status = statusConfig[alert.status] || { icon: HelpCircle, className: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Unknown' };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { deleteAlert } = useAlerts();
  const isOwner = mockLoggedInUser.id === alert.user.id;

  const handleDelete = () => {
    deleteAlert(alert.id);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 bg-card hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
          <CardHeader className="flex-row items-start gap-4 space-y-0 p-4">
            <Avatar>
              <AvatarImage src={!alert.isAnonymous ? alert.user.avatarUrl : ''} />
              <AvatarFallback>{alert.isAnonymous ? <VenetianMask /> : alert.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-base font-bold">
                {alert.isAnonymous ? 'Anonymous Resident' : alert.user.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{alert.timestamp}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="secondary" className="whitespace-nowrap">{alert.category}</Badge>
                 {isOwner && !alert.isAnonymous && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                            onClick={(e) => { e.stopPropagation(); }}
                            >
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your issue report.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={handleDelete}
                            >
                                Delete
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex-1">
            {alert.images.length > 0 && (
              <Carousel className="w-full">
                <CarouselContent>
                  {alert.images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="relative aspect-video w-full">
                            <Image
                                src={image.url}
                                alt={alert.description.substring(0, 50)}
                                width={600}
                                height={400}
                                className="object-cover w-full h-auto"
                                data-ai-hint={image.hint}
                            />
                        </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {alert.images.length > 1 && <>
                    <CarouselPrevious className="absolute left-2" />
                    <CarouselNext className="absolute right-2" />
                </>}
              </Carousel>
            )}
            
            <div className="p-4 space-y-2">
                <p className="text-sm text-foreground/90 line-clamp-3">{alert.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{alert.location}</span>
                </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 flex justify-between items-center bg-background">
            <Badge variant="outline" className={cn("gap-1.5", status.className)}>
              <status.icon className="h-3.5 w-3.5" />
              {status.label}
            </Badge>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>{alert.comments.length} {alert.comments.length === 1 ? 'comment' : 'comments'}</span>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0">
        <AlertDetailsDialog alert={alert} onOpenChange={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}
