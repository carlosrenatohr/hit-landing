import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium transition-colors duration-200';
  const combinedClasses = `${baseClasses} ${className}`;
  
  return (
    <a href={href} className={combinedClasses} {...props}>
      {children}
    </a>
  );
};