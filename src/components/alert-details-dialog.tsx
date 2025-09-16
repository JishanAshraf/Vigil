
'use client';

import type { Alert } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { MapPin, Clock, VenetianMask, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CommentCard } from './comment-card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface AlertDetailsDialogProps {
  alert: Alert;
}

export function AlertDetailsDialog({ alert }: AlertDetailsDialogProps) {
  return (
    <div className="grid md:grid-cols-2 max-h-[80vh]">
      <div className="p-0 relative hidden md:block">
        {alert.images.length > 0 ? (
          <Carousel className="w-full h-full">
            <CarouselContent>
              {alert.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-full aspect-square">
                    <Image
                      src={image.url}
                      alt={alert.description.substring(0, 50)}
                      fill
                      className="object-cover rounded-l-lg"
                      data-ai-hint={image.hint}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {alert.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-2" />
                <CarouselNext className="absolute right-2" />
              </>
            )}
          </Carousel>
        ) : (
          <div className="bg-muted h-full w-full flex items-center justify-center rounded-l-lg">
            <p className="text-muted-foreground">No image provided</p>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-6">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={!alert.isAnonymous ? alert.user.avatarUrl : ''} />
                  <AvatarFallback>{alert.isAnonymous ? <VenetianMask /> : alert.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <CardTitle className="text-base font-bold mb-1">
                        {alert.isAnonymous ? 'Anonymous Resident' : alert.user.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{alert.timestamp}</span>
                    </div>
                </div>
                <Badge variant="secondary">{alert.category}</Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 space-y-4">
              <p className="text-sm">{alert.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{alert.location}</span>
              </div>
            </CardContent>
          </div>

          <Separator />
            
          <div className="p-6 space-y-4">
            <h4 className="text-sm font-semibold tracking-tight">Comments ({alert.comments.length})</h4>
            {alert.comments.length > 0 ? (
              <div className="space-y-4">
                {alert.comments.map(comment => (
                  <CommentCard 
                    key={comment.id} 
                    comment={comment}
                    isPostAuthor={comment.user.id === alert.user.id}
                  />
                ))}
              </div>
            ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                    No comments yet. Be the first to say something!
                </p>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-6 border-t bg-background">
          <div className="flex items-start gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026707d" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="relative flex-1">
              <Textarea placeholder="Write a comment..." className="pr-12" />
              <Button size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 glossy-button">
                <Send className="h-4 w-4" />
                <span className="sr-only">Post comment</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
