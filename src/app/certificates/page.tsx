import type { Metadata } from 'next';
import { CERTIFICATES } from '@/infrastructure/certificates/certificateData';
import { CertificateCard } from '@/components/certificates/CertificateCard';

export const metadata: Metadata = {
    title: 'Certificates | trahoangdev',
    description: 'Professional certifications and achievements.',
};

export default function CertificatesPage() {
    return (
        <div className="min-h-screen text-foreground">
            <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 pt-28 pb-16 sm:pb-20 lg:pb-24 space-y-12">
                <header className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                            Professional Growth
                        </span>
                        <div className="h-px w-16 bg-border/60" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                        Credentials & <br /> Certifications
                    </h1>

                    <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                        A verified record of continuous learning and technical mastery.
                        Validating expertise across cloud architecture, frontend engineering, and system design.
                    </p>
                </header>

                <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {CERTIFICATES.map((cert) => (
                        <CertificateCard key={cert.id} certificate={cert} />
                    ))}
                </div>
            </main>
        </div>
    );
}
