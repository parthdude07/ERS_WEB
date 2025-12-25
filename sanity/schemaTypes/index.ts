import { type SchemaTypeDefinition } from 'sanity'



// Import your NEW schemas
import teamMember from './teamMember'
import event from './event'
import gallery from './gallery'
import project from './project'
import achievement from './achievement'
import popup from './popup'
// (Optional) Keep these if you still want the default blog features, otherwise remove them
// import {categoryType} from './categoryType'
// import {postType} from './postType'
// import {authorType} from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  // Add teamMember and event to this list
  types: [
 
    teamMember, 
    event,
    gallery,
    project,
    achievement,
    popup,
    // categoryType, 
    // postType, 
    // authorType
  ],
}