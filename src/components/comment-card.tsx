
import type { Comment } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CheckCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface CommentCardProps {
    comment: Comment;
    isPostAuthor?: boolean;
}

export function CommentCard({ comment, isPostAuthor = false }: CommentCardProps) {
    return (
        <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
                <AvatarImage src={comment.user.avatarUrl} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{comment.user.name}</p>
                    {isPostAuthor && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Original Poster</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                </div>
                <p className="text-sm text-foreground/90">{comment.text}</p>
            </div>
        </div>
    )
}
