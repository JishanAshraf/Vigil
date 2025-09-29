
import React from 'react';

export default function SignUpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen items-center justify-center p-8 bg-background">
            {children}
        </div>
    );
}
