"use client"

import { Link } from 'react-router'
import { useTheme } from '@/components/theme-provider'

interface LogoProps {
  height?: number;
  width?: number;
}

export const Logo = ({ height = 60, width = 80 }: LogoProps) => {
  const { resolvedTheme } = useTheme()
  
  const logoSrc = resolvedTheme === 'dark' ? '/logos.jpg' : '/logos.jpg'

  return (
    <Link to="/">
      <img 
        height={height}
        width={width}
        alt='logo'
        src={logoSrc}
        loading="lazy"
        className="object-contain"
      />
    </Link>
  )
}

