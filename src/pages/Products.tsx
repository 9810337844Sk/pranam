import { ProductsSection } from '../components/ProductsSection'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

export default function Products() {
  return (
    <>
      <Seo
        title="Our Products"
        description="See recent projects by Pranam Software — websites, mobile apps and custom software delivered for businesses across Nepal."
        path="/products"
      />
      <PageHero title="Our Products" />
      <ProductsSection withHead={false} />
    </>
  )
}