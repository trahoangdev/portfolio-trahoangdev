import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'magnet';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm';
    
    const variantClasses = {
      default: baseClasses,
      magnet: `${baseClasses} magnet-card cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`,
    };
    
    const classes = `${variantClasses[variant]} ${className || ''}`;
    
    return (
      <div
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className || ''}`}
      ref={ref}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`}
      ref={ref}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      className={`text-sm text-muted-foreground ${className || ''}`}
      ref={ref}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={`p-6 pt-0 ${className || ''}`}
      ref={ref}
      {...props}
    />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={`flex items-center p-6 pt-0 ${className || ''}`}
      ref={ref}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';