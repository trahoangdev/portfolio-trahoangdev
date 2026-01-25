import { EXPERIENCES } from '@/lib/constants/experiences';
import { ExperienceCard } from '@/components/work/ExperienceCard';

export const metadata = {
    title: 'Experience </> trahoangdev',
    description: 'My professional journey and work experience.',
};

export default function ExperiencePage() {
    return (
        <main className="min-h-screen pt-24 pb-20 px-6 sm:px-8 lg:px-16 max-w-6xl mx-auto">
            <div className="space-y-12 sm:space-y-16">
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                        Experience
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        A timeline of my professional career, projects, and the skills I've gathered along the way.
                    </p>
                </div>

                <div className="space-y-8 sm:space-y-12">
                    {EXPERIENCES.map((job, index) => (
                        <ExperienceCard
                            key={index}
                            job={job}
                            index={index}
                            activeSection="work" // Hardcoded to trigger animations immediately or act as if in view
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
