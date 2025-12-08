import Link from 'next/link';
import { Certificate } from '@/infrastructure/certificates/certificateData';

interface CertificateCardProps {
    certificate: Certificate;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
    return (
        <div className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-primary/5">
            <div className="space-y-4">
                {/* Header: Date & Issuer */}
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{certificate.date}</span>
                    <span>{certificate.issuer}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold uppercase tracking-wide group-hover:text-primary transition-colors">
                    {certificate.title}
                </h3>

                {/* Skills/Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {certificate.skills.map((skill) => (
                        <span
                            key={skill}
                            className="inline-flex items-center rounded-full border border-border bg-muted/20 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer: Link */}
            {certificate.credentialUrl && (
                <div className="mt-6 pt-6 border-t border-dashed border-border/50">
                    <Link
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground group-hover:underline decoration-border underline-offset-4"
                    >
                        View Credential
                        <svg
                            className="ml-2 h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    );
}
