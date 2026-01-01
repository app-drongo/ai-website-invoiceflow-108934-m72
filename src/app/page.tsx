import { Hero, Pricing, Contact, CallToAction } from '@/components/sections/home'

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="cta">
        <CallToAction />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  )
}