
import type { Comment } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface CommentCardProps {
    comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
    return (
        <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
                <AvatarImage src={comment.user.avatarUrl} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-sm">{comment.user.name}</p>
                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                </div>
                <p className="text-sm text-foreground/90">{comment.text}</p>
            </div>
        </div>
    )
}
