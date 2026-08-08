import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';

export const runtime = 'nodejs';
export const alt = 'Projects - trahoangdev';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoData = await readFile(new URL('../../../public/logo.png', import.meta.url));
  const logoBase64 = logoData.toString('base64');
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090b', // zinc-950 dark background
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Background Gradients for depth */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '120%',
            height: '120%',
            backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 60%)', // purple-500 glow
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
            opacity: 0.1,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.83v58.34h-58.34l-.83-.83L0 54.628v-58.34h58.34l.83.83zM54 54V2H2v52h52z\' fill=\'%23ffffff\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Top Brand Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            backgroundColor: 'rgba(3, 7, 18, 0.6)',
            border: '4px solid #a855f7', // purple-500
            boxShadow: '0 0 60px rgba(168, 85, 247, 0.4)',
            marginBottom: '40px',
            padding: '10px',
          }}
        >
          <img
            src={logoSrc}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Content Centered */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Tagline / Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: '#a855f7', // purple-500
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '24px',
            }}
          >
            PORTFOLIO SHOWCASE
          </div>
          
          {/* Title / Name */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 'bold',
              lineHeight: 1.1,
              color: '#f8fafc', // slate-50
              marginBottom: '32px',
              letterSpacing: '-0.02em',
            }}
          >
            Project Hypergrid
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: '#94a3b8', // slate-400
              lineHeight: 1.5,
              margin: 0,
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            Explore a curated collection of scalable, modern web applications and open-source contributions.
          </p>

          {/* Tech Stack / Extras Pills */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '48px',
            }}
          >
            {['Full Stack', 'Web Apps', 'Open Source', 'System Design'].map((extra) => (
              <div
                key={extra}
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: '#e2e8f0', // slate-200
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '8px 24px',
                  borderRadius: '99px',
                }}
              >
                {extra}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
