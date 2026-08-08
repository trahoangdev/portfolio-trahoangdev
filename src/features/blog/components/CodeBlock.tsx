'use client';

import { useState, isValidElement } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

function extractText(node: React.ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(extractText).join('');
    }

    if (isValidElement<{ children?: React.ReactNode }>(node)) {
        return extractText(node.props.children);
    }

    return '';
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    children?: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        const textToCopy = extractText(children);

        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            toast.success('Copied to clipboard!', {
                className: 'bg-green-500 text-white border-none',
                duration: 2000,
            });
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy');
            console.error('Failed to copy!', err);
        }
    };

    return (
        <div className="relative group my-6">
            <pre
                className={cn(
                    "overflow-x-auto rounded-xl border border-border bg-zinc-100 dark:bg-zinc-900 p-4 shadow-sm",
                    "[&_code]:bg-transparent [&_code]:p-0 [&_code]:border-none [&_code]:text-inherit",
                    className
                )}
                {...props}
            >
                {children}
            </pre>
            <button
                onClick={copyToClipboard}
                className={cn(
                    "absolute right-3 top-3 p-2 rounded-md transition-interface",
                    "bg-background/80 hover:bg-background border border-border/50 backdrop-blur-sm",
                    "opacity-0 group-hover:opacity-100 focus:opacity-100",
                    "text-muted-foreground hover:text-foreground",
                    isCopied && "text-green-500"
                )}
                aria-label="Copy code"
            >
                {isCopied ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
            </button>
        </div>
    );
}
