import Image from 'next/image';
import { AlertCircle, Bell, CheckCircle, HelpCircle, Tag, Clock, MapPin, VenetianMask } from 'lucide-react';

import type { Alert } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card">
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
        <Badge variant="secondary" className="whitespace-nowrap">{alert.category}</Badge>
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
                            fill
                            className="object-cover"
                            data-ai-hint={image.hint}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            <p className="text-sm text-foreground/90">{alert.description}</p>
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
        {alert.status === 'Reported' && (
          <Button size="sm" variant="outline">
            <Tag className="mr-2 h-4 w-4" />
            Tag Authorities
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
