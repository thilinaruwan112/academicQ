import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x="0" y="22" fontFamily="Playfair Display, serif" fontSize="24" fill="currentColor">
        Academ
        <tspan fill="hsl(var(--primary))">IQ</tspan>
      </text>
    </svg>
  );
}
