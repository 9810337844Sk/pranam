import { CollectionEditor } from './CollectionEditor'
import { itemLabels, serviceFields } from './configs'

export default function Services() {
  return (
    <CollectionEditor table="services" title="Services" fields={serviceFields} itemLabel={itemLabels.services} />
  )
}
