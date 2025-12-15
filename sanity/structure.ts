import type { StructureResolver } from 'sanity/structure'

// Custom desk structure to ensure all content types are visible and grouped
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Events')
        .schemaType('event')
        .child(S.documentTypeList('event')),
      S.listItem()
        .title('Team Members')
        .schemaType('teamMember')
        .child(S.documentTypeList('teamMember')),
      S.listItem()
        .title('Gallery Uploads')
        .schemaType('gallery')
        .child(S.documentTypeList('gallery')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['event', 'teamMember', 'gallery'].includes(
            listItem.getId() ?? ''
          )
      ),
    ])