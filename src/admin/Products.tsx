import { CollectionEditor } from './CollectionEditor'
import { itemLabels, productFields } from './configs'

export default function Products() {
  return (
    <CollectionEditor table="products" title="Products" fields={productFields} itemLabel={itemLabels.products} />
  )
}
