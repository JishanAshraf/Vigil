'use client';

import Image from 'next/image';
import { AlertCircle, Bell, CheckCircle, HelpCircle, Clock, MapPin, VenetianMask, MessageSquare, Trash2, AlertTriangle, UserX } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';

import type { Alert } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDetailsDialog } from './alert-details-dialog';
import { useAlerts } from '@/contexts/AlertsContext';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

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
  const [isDetailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [reportersDialogOpen, setReportersDialogOpen] = useState(false);
  const { deleteAlert, toggleReport, currentUser } = useAlerts();
  const { toast } = useToast();

  const isOwner = currentUser?.id === alert.user.id;
  const isReported = currentUser ? alert.reporters.some(reporter => reporter.id === currentUser.id) : false;

  const handleDelete = () => {
    deleteAlert(alert.id);
  };
  
  const handleReportToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
        toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "You must be logged in to report an issue.",
            action: <Button asChild variant="secondary"><Link href="/login">Login</Link></Button>
        })
        return;
    }
    toggleReport(alert.id);
  };

  const handleOpenReporters = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (alert.reporters.length > 0) {
      setReportersDialogOpen(true);
    }
  };

  return (
    <>
      <Dialog open={isDetailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogTrigger asChild>
          <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 bg-card hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
            <CardHeader className="flex-row items-start gap-4 space-y-0 p-4">
              <Avatar>
                <AvatarImage src={!alert.isAnonymous ? alert.user.avatarUrl : ''} />
                <AvatarFallback>{alert.isAnonymous ? <VenetianMask /> : (alert.user.name ? alert.user.name.charAt(0) : <UserX />)}</AvatarFallback>
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

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1.5 h-auto px-2 py-1 text-xs hover:bg-destructive/10",
                    isReported ? "text-destructive hover:text-destructive/80" : "hover:text-destructive"
                  )}
                  onClick={handleReportToggle}
                  onDoubleClick={handleOpenReporters}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>{alert.reporters.length}</span>
                </Button>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>{alert.comments.length} {alert.comments.length === 1 ? 'comment' : 'comments'}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-0">
          <AlertDetailsDialog alert={alert} onOpenChange={setDetailsDialogOpen} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={reportersDialogOpen} onOpenChange={setReportersDialogOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Reported by</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-60">
            <div className="space-y-4 pr-4">
              {alert.reporters.map(reporter => (
                <div key={reporter.id} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={reporter.avatarUrl} />
                    <AvatarFallback>{reporter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm">{reporter.name}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
