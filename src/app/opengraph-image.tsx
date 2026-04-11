import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Hoàng Trọng Trà (trahoangdev) - Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoData = await fetch(new URL('../../public/logo.png', import.meta.url)).then(
    (res) => res.arrayBuffer()
  );
  const logoBase64 = Buffer.from(logoData).toString('base64');
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#09090b', // zinc-950 dark background
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background Gradients for depth */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '80%',
            height: '80%',
            backgroundImage: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 60%)', // sky-400 glow
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '80%',
            height: '80%',
            backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 60%)', // purple-500 glow
          }}
        />

        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0V0zm20 20h2v2h-2v-2z\' fill=\'%23ffffff\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Main Split Layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '80px',
            zIndex: 10,
          }}
        >
          {/* Left Content Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '65%',
            }}
          >
            {/* Tagline / Subtitle */}
            <div
              style={{
                fontSize: 28,
                color: '#38bdf8', // sky-400
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '24px',
              }}
            >
              Software Engineer
            </div>

            {/* Title / Name */}
            <div
              style={{
                fontSize: 88,
                fontWeight: 'bold',
                lineHeight: 1.1,
                color: '#f8fafc', // slate-50
                marginBottom: '32px',
                letterSpacing: '-0.02em',
              }}
            >
              HOÀNG TRỌNG TRÀ
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 32,
                fontWeight: 400,
                color: '#94a3b8', // slate-400
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '650px',
              }}
            >
              Building modern, scalable, and responsive web experiences with bleeding-edge web technologies.
            </p>

            {/* Tech Stack Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginTop: '48px',
              }}
            >
              {['Next.js', 'React', 'TypeScript', 'TailwindCSS'].map((tech) => (
                <div
                  key={tech}
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    color: '#e2e8f0', // slate-200
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '8px 24px',
                    borderRadius: '99px',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Right Brand Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '100%',
              width: '35%',
            }}
          >
            {/* Avatar / Logo Graphic */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                backgroundColor: 'rgba(3, 7, 18, 0.6)',
                border: '4px solid #38bdf8', // sky-400 border
                boxShadow: '0 0 60px rgba(56, 189, 248, 0.4)',
                marginTop: '20px',
                padding: '12px',
              }}
            >
              <img
                src={logoSrc}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Username branding at bottom right */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 32,
                fontWeight: 600,
                color: '#e2e8f0', // slate-200
              }}
            >
              <span style={{ color: '#94a3b8', marginRight: '8px' }}>@</span>
              trahoangdev
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
