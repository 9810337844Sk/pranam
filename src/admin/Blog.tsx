import { CollectionEditor } from './CollectionEditor'
import { blogFields, itemLabels } from './configs'

export default function Blog() {
  return (
    <CollectionEditor table="blog_posts" title="Blog" fields={blogFields} itemLabel={itemLabels.blog_posts} />
  )
}
