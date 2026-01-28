import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Hoàng Trọng Trà (trahoangdev) - Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030712', // grave-950/background
          backgroundImage: 'radial-gradient(circle at 50% 50%, #064e3b 0%, #030712 50%)', // emerald-900 tint
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #10b981', // emerald-500
            padding: '40px 80px',
            borderRadius: '20px',
            backgroundColor: 'rgba(3, 7, 18, 0.8)',
            boxShadow: '0 0 50px -12px rgba(16, 185, 129, 0.5)',
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: '#10b981', // emerald-500
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            Software Engineer
          </div>

          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1,
              marginBottom: '20px',
              textShadow: '0 0 20px rgba(255,255,255,0.3)',
            }}
          >
            trahoangdev
          </div>

          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginTop: '20px',
            }}
          >
            {['Next.js', 'TypeScript', 'AI Engineering', 'Systems'].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: 20,
                  color: '#9ca3af', // gray-400
                  border: '1px solid #374151', // gray-700
                  padding: '8px 16px',
                  borderRadius: '99px',
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 18,
            color: '#4b5563',
          }}
        >
          trahoangdev.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
