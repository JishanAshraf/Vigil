
import React from 'react';

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col h-screen bg-background">
            {children}
        </div>
    );
}
