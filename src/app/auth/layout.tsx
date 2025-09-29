
import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col h-screen bg-background">
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/auth-background.png')" }}
                data-ai-hint="community people"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 flex flex-col flex-grow h-full">
                {children}
            </div>
        </div>
    );
}
