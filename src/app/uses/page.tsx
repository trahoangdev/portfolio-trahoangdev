import { Monitor, Cpu, Code2, Headphones, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Uses - Tra Hoang',
    description: 'A curated list of the tech I use, software I love, and other things I recommend.',
};

interface UseItem {
    title: string;
    description: string;
}

interface UseCategory {
    title: string;
    icon: React.ElementType;
    items: UseItem[];
}

const USES_DATA: UseCategory[] = [
    {
        title: 'Workstation',
        icon: Monitor,
        items: [
            {
                title: 'MacBook Pro 16" (M2 Max) / MSI Cyborg 15 A12UC',
                description: 'My daily driver. The performance is incredible and the battery life is unmatched.'
            },
            {
                title: 'Dell UltraSharp U2720Q 27"',
                description: '4K monitor with excellent color accuracy. Standard for creative work.'
            },
            {
                title: 'Keychron K2 Pro',
                description: 'Wireless mechanical keyboard. Compact, tactile, and satisfying.'
            },
            {
                title: 'Logitech MX Master 3S',
                description: 'The best productivity mouse ever made. Infinite scroll is a game changer.'
            }
        ]
    },
    {
        title: 'Development',
        icon: Terminal,
        items: [
            {
                title: 'VS Code',
                description: 'My main editor. configured with VIM mode and GitHub Copilot.'
            },
            {
                title: 'Warp Terminal',
                description: 'A modern, Rust-based terminal that makes command line interaction intuitive.'
            },
            {
                title: 'JetBrains Mono',
                description: 'My typeface of choice for coding. Ligatures are beautiful.'
            },
            {
                title: 'Figma',
                description: 'The standard for interface design and prototyping. I spend half my life here.'
            },
            {
                title: 'GitHub Dark Theme',
                description: 'Easy on the eyes, high contrast, and classic.'
            }
        ]
    },
    {
        title: 'Audio & Gear',
        icon: Headphones,
        items: [
            {
                title: 'Sony WH-1000XM5',
                description: 'Noise cancelling headphones. Essential for deep work sessions.'
            },
            {
                title: 'Blue Yeti Nano',
                description: 'Great microphone for calls and recording.'
            },
            {
                title: 'IKEA Bekant',
                description: 'Simple, sturdy standing desk.'
            }
        ]
    }
];

export default function UsesPage() {
    return (
        <div className="container py-12 md:py-24 space-y-16 max-w-4xl mx-auto px-6">
            <div className="flex flex-col items-start space-y-4 animate-in slide-in-from-bottom-5 fade-in duration-500">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                    What I Use
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                    A list of the hardware, software, and tools I use on a daily basis to build things.
                </p>
            </div>

            <div className="space-y-16">
                {USES_DATA.map((category, idx) => (
                    <section
                        key={category.title}
                        className="animate-in slide-in-from-bottom-5 fade-in duration-500"
                        style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}
                    >
                        <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-4">
                            <div className="p-2 rounded-lg bg-secondary/50 text-secondary-foreground">
                                <category.icon className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-semibold tracking-tight">
                                {category.title}
                            </h2>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {category.items.map((item) => (
                                <div
                                    key={item.title}
                                    className="group relative rounded-xl border border-border/50 bg-card p-6 transition-all hover:bg-secondary/20 hover:border-border"
                                >
                                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <div className="text-center pt-8 text-sm text-muted-foreground">
                <p>Last updated: January 2026</p>
            </div>
        </div>
    );
}
