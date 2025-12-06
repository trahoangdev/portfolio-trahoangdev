import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Projects - trahoangdev';
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
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              letterSpacing: '-0.05em',
            }}
          >
            PROJECT HYPERGRID
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#888',
              letterSpacing: '0.1em',
            }}
          >
            Explore My Work
          </div>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              fontSize: 24,
              color: '#666',
              marginTop: '20px',
            }}
          >
            <span>Full Stack</span>
            <span>•</span>
            <span>Web Apps</span>
            <span>•</span>
            <span>Open Source</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
