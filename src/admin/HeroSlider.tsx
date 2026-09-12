import { CollectionEditor } from './CollectionEditor'
import { heroSlideFields, itemLabels } from './configs'

export default function HeroSlider() {
  return (
    <CollectionEditor
      table="hero_slides"
      title="Hero Slider"
      fields={heroSlideFields}
      itemLabel={itemLabels.hero_slides}
    />
  )
}
