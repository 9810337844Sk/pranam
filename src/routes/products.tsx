import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '~/components/PageHero'
import { ProductsSection } from '~/components/ProductsSection'
import { MarketProducts } from '~/components/MarketProducts'
import { Testimonials } from '~/components/Testimonials'
import { HireCta } from '~/components/HireCta'

export const Route = createFileRoute('/products')({
  component: Products,
  head: () => ({ meta: [{ title: 'Products — Pranam Software' }] }),
})

function Products() {
  return (
    <>
      <PageHero
        crumb="Product"
        title="Our Recent Products"
        subtitle="Latest digital products crafted with performance, security, and user experience in mind."
      />
      <ProductsSection withHead={false} />
      <MarketProducts />
      <Testimonials />
      <HireCta />
    </>
  )
}
