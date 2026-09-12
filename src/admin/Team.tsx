import { CollectionEditor } from './CollectionEditor'
import { itemLabels, teamFields } from './configs'

export default function Team() {
  return (
    <CollectionEditor table="team_members" title="Team" fields={teamFields} itemLabel={itemLabels.team_members} />
  )
}
