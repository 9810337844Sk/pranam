import { CollectionEditor } from './CollectionEditor'
import { itemLabels, testimonialFields } from './configs'

export default function Testimonials() {
  return (
    <CollectionEditor
      table="testimonials"
      title="Testimonials"
      fields={testimonialFields}
      itemLabel={itemLabels.testimonials}
    />
  )
}
