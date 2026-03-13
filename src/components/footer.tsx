import type React from "react"
import type { ComponentProps, ReactNode } from "react"
import { Link } from "react-router"
import { motion, useReducedMotion } from "framer-motion"
import { Logo } from "./logo"

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: "Company",
    links: [
      { title: "About Fusion", href: "/about" },
      { title: "Service Offerings", href: "/services" },
      { title: "Contact", href: "/contact" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    label: "Wellhead Services",
    links: [
      { title: "Wellhead Equipment Supply", href: "/services#equipment-supply" },
      { title: "Installation & Running Services", href: "/services#installation-running" },
      { title: "Maintenance & Workover", href: "/services#maintenance-workover" },
      { title: "Connector Reconditioning", href: "/services#connector-reconditioning" },
      { title: "Subsea & Deepwater Solutions", href: "/services#subsea" },
    ],
  },
  {
    label: "Applications & Capabilities",
    links: [
      { title: "HPHT Wellhead Integrity", href: "/about#hpht" },
      { title: "Deepwater & Subsea Installations", href: "/about#subsea" },
      { title: "Workover & Intervention Campaigns", href: "/about#workover" },
      { title: "Recoverable Module Operations", href: "/about#modules" },
    ],
  },
  {
    label: "Contact & Support",
    links: [
      { title: "Email: info@thefusionlimited.com", href: "mailto:info@thefusionlimited.com" },
      { title: "Phone: +234 802 827 1207", href: "tel:+2348028271207" },
      { title: "Office: Port Harcourt, Nigeria", href: "/contact" },
      { title: "24/7 Critical Operations Support", href: "/contact#support" },
    ],
  },
]

export function Footer() {
  return (
    <div className="flex justify-center p-4 md:p-6">
        <footer className="relative md:w-[85%] w-full flex flex-col items-center justify-center bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] border bg-background/80 backdrop-blur-md px-6 py-12 lg:py-16">
        <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
            <AnimatedContainer className="space-y-4">
            <Logo height={80} width={80} />
            <p className="text-muted-foreground text-sm max-w-sm">
                Specialist wellhead solutions partner and authorized provider of VETCO GRAY wellhead systems – securing your well&apos;s future, from spud to completion.
            </p>
            <div className="text-muted-foreground mt-8 text-sm md:mt-0 md:block hidden">
                <p>© {new Date().getFullYear()} Fusion. All rights reserved.</p>
            </div>
            </AnimatedContainer>

            <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {footerLinks.map((section, index) => (
                <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0">
                    <h3 className="text-xs">{section.label}</h3>
                    <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                    {section.links.map((link) => (
                        <li key={link.title} className="text-xs items-center transition-all duration-300 hover:text-bexoni cursor-pointer ">
                        <Link
                            to={link.href}
                            className="hover:text-bexoni cursor-pointer hover:underline inline-flex items-center"
                        >
                            {link.icon && <link.icon className="me-1 size-4" />}
                            {link.title}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
                </AnimatedContainer>
            ))}
            </div>
        </div>

        <div className="md:hidden mt-8 text-center space-y-2">
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Fusion. All rights reserved.</p>
            <p className="text-muted-foreground text-xs">Developed by <a href="https://www.bexoni.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Bexoni</a></p>
        </div>

        <div className="hidden md:block mt-8 pt-6 border-t border-foreground/10 w-full">
            <p className="text-muted-foreground text-xs text-center">Developed  by <a href="https://www.bexoni.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Bexoni</a></p>
        </div>
        </footer>
    </div>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>["className"]
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
