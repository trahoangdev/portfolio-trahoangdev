'use client';

interface PhilosophyProps {
    sectionRef: (el: HTMLElement | null) => void;
}

export function Philosophy({ sectionRef }: PhilosophyProps) {
    return (
        <section ref={sectionRef} id="philosophy" className="py-20 sm:py-32 relative overflow-hidden">
            <div className="flex flex-col items-center justify-center text-center space-y-12">
                <div className="space-y-6 max-w-4xl mx-auto z-10">
                    <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-[0.5em]">
                        The Philosophy
                    </h2>

                    <div className="relative">
                        <span className="absolute -top-8 left-0 sm:-left-8 text-8xl font-serif text-muted/20 select-none">"</span>
                        <p className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                            Code is not just logic.<br />
                            It's the art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">translating thought</span> into reality.
                        </p>
                        <span className="absolute -bottom-12 right-0 sm:-right-8 text-8xl font-serif text-muted/20 select-none">"</span>
                    </div>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        I don't just build websites; I craft digital experiences. Every pixel, every animation, and every line of code is a deliberate stroke in the bigger picture.
                        Simplicity is the ultimate sophistication.
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-b from-purple-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
            </div>
        </section>
    );
}
