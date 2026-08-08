'use client';

import { isValidElement, useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

function extractText(node: React.ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (isValidElement<{ children?: React.ReactNode }>(node)) return extractText(node.props.children);
    return '';
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    children?: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false);
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (resetTimer.current) clearTimeout(resetTimer.current);
    }, []);

    const copyToClipboard = async () => {
        const textToCopy = extractText(children);
        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            if (resetTimer.current) clearTimeout(resetTimer.current);
            resetTimer.current = setTimeout(() => setIsCopied(false), 2500);
        } catch (error) {
            toast.error('Could not copy the code. Select it and copy manually.');
            console.error('Failed to copy code', error);
        }
    };

    return (
        <figure className="relative my-8 min-w-0 overflow-hidden rounded-[var(--radius-blog-surface)] border border-border bg-muted/70">
            <div className="flex min-h-12 items-center justify-between border-b border-border px-4">
                <figcaption className="font-mono text-xs text-muted-foreground">Code</figcaption>
                <button
                    type="button"
                    onClick={copyToClipboard}
                    className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap px-2 text-xs font-medium text-muted-foreground transition-colors duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] hover:text-foreground focus-visible:rounded-[var(--radius-blog-control)] active:translate-y-px"
                    aria-label={isCopied ? 'Code copied' : 'Copy code'}
                    aria-live="polite"
                >
                    {isCopied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                    {isCopied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <pre
                className={cn(
                    'overflow-x-auto p-4 font-mono text-sm leading-7',
                    '[&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit',
                    className
                )}
                {...props}
            >
                {children}
            </pre>
        </figure>
    );
}
