import { CollectionEditor } from './CollectionEditor'
import { itemLabels, processFields } from './configs'

export default function Process() {
  return (
    <CollectionEditor
      table="process_steps"
      title="Process"
      fields={processFields}
      itemLabel={itemLabels.process_steps}
    />
  )
}
