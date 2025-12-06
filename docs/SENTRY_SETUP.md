# Sentry Error Tracking Setup

This project is configured with Sentry for production error tracking and monitoring.

## Features

- ✅ Automatic error capture (client & server)
- ✅ Session replay for debugging
- ✅ Performance monitoring
- ✅ Error boundaries for React errors
- ✅ Source maps for better stack traces
- ✅ Automatic Vercel Cron monitoring

## Setup Instructions

### 1. Create Sentry Account

1. Go to [sentry.io](https://sentry.io) and create a free account
2. Create a new project (select "Next.js")
3. Copy your DSN (Data Source Name)

### 2. Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN="https://your-dsn@sentry.io/your-project-id"
SENTRY_ORG="your-org-slug"
SENTRY_PROJECT="your-project-slug"
SENTRY_AUTH_TOKEN="your-auth-token"
```

**Note:** Only `NEXT_PUBLIC_SENTRY_DSN` is required for basic error tracking. The other variables are needed for source map uploads.

### 3. Get Auth Token (Optional - for source maps)

1. Go to Sentry Settings → Auth Tokens
2. Create a new token with `project:releases` scope
3. Copy the token to `SENTRY_AUTH_TOKEN`

### 4. Deploy to Vercel

Add the environment variables to your Vercel project:

```bash
vercel env add NEXT_PUBLIC_SENTRY_DSN
vercel env add SENTRY_ORG
vercel env add SENTRY_PROJECT
vercel env add SENTRY_AUTH_TOKEN
```

## Configuration

### Sample Rates

Current configuration (adjust in `sentry.*.config.ts`):

- **Traces Sample Rate**: 10% (0.1) - Performance monitoring
- **Replays on Error**: 100% (1.0) - Capture replay when error occurs
- **Replays Session**: 10% (0.1) - Random session replays

### Ignored Errors

The following errors are automatically filtered:

**Client-side:**
- Browser extension errors
- Network errors (Failed to fetch)
- Random plugin errors

**Server-side:**
- Connection errors (ECONNREFUSED, ETIMEDOUT)
- DNS errors (ENOTFOUND)

### Development Mode

Sentry is **disabled in development** to avoid noise. Errors are logged to console instead.

## Usage

### Automatic Error Capture

Errors are automatically captured:

```typescript
// This will be sent to Sentry automatically
throw new Error('Something went wrong');
```

### Manual Error Tracking

```typescript
import * as Sentry from '@sentry/nextjs';

// Capture exception with context
Sentry.captureException(error, {
  extra: {
    userId: user.id,
    action: 'checkout',
  },
});

// Capture message
Sentry.captureMessage('User completed checkout', 'info');
```

### Using Error Boundary

Wrap components with ErrorBoundary:

```typescript
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>
```

### Track Errors with Analytics

```typescript
import { trackError } from '@/lib/analytics';

try {
  // Your code
} catch (error) {
  trackError(error, { context: 'user-action' });
}
```

This will send the error to both Vercel Analytics and Sentry.

## Monitoring

### View Errors

1. Go to your Sentry dashboard
2. Navigate to Issues
3. Click on any error to see:
   - Stack trace
   - User context
   - Session replay (if available)
   - Breadcrumbs (user actions before error)

### Set Up Alerts

1. Go to Alerts → Create Alert
2. Choose conditions (e.g., "New issue created")
3. Set notification channels (email, Slack, etc.)

### Performance Monitoring

1. Go to Performance
2. View transaction traces
3. Identify slow endpoints
4. Optimize based on data

## Best Practices

### 1. Add Context to Errors

```typescript
Sentry.setContext('user', {
  id: user.id,
  email: user.email,
  plan: user.plan,
});
```

### 2. Set User Information

```typescript
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});
```

### 3. Add Breadcrumbs

```typescript
Sentry.addBreadcrumb({
  category: 'auth',
  message: 'User logged in',
  level: 'info',
});
```

### 4. Use Tags for Filtering

```typescript
Sentry.setTag('page', 'checkout');
Sentry.setTag('feature', 'payment');
```

## Cost Optimization

Sentry free tier includes:
- 5,000 errors/month
- 10,000 performance units/month
- 50 replays/month

To stay within limits:

1. **Adjust sample rates** in config files
2. **Filter common errors** in `ignoreErrors` array
3. **Use environments** to separate dev/staging/prod
4. **Set up alerts** for quota usage

## Troubleshooting

### Errors not appearing in Sentry

1. Check `NEXT_PUBLIC_SENTRY_DSN` is set
2. Verify DSN is correct
3. Check browser console for Sentry errors
4. Ensure you're not in development mode

### Source maps not uploading

1. Verify `SENTRY_AUTH_TOKEN` is set
2. Check token has `project:releases` scope
3. Check build logs for upload errors
4. Ensure `SENTRY_ORG` and `SENTRY_PROJECT` are correct

### Too many errors

1. Add more patterns to `ignoreErrors`
2. Reduce sample rates
3. Use `beforeSend` to filter errors
4. Set up rate limiting in Sentry dashboard

## Resources

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Dashboard](https://sentry.io)
- [Error Tracking Best Practices](https://docs.sentry.io/product/issues/)
- [Performance Monitoring](https://docs.sentry.io/product/performance/)

## Support

For issues with Sentry integration:
1. Check [Sentry Status](https://status.sentry.io/)
2. Review [Sentry Docs](https://docs.sentry.io)
3. Contact Sentry Support

---

**Last Updated:** December 6, 2025
