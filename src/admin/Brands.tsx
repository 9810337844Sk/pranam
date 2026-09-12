import { CollectionEditor } from './CollectionEditor'
import { brandFields, itemLabels } from './configs'

export default function Brands() {
  return (
    <CollectionEditor table="brands" title="Trusted By (Logos)" fields={brandFields} itemLabel={itemLabels.brands} />
  )
}
