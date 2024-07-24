import type { DefaultDocumentNodeResolver} from 'sanity/structure';
import DocumentsPane from 'sanity-plugin-documents-pane';


// Everytime we render a document, if the document type matches a specific type, costumize the way that it is showing, otherwise, by default, just show the form
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
    switch (schemaType) {
      case `artist`:
        return S.document().views([
          S.view.form(),
          S.view
          // Make the component reveal the documents which match this query
            .component(DocumentsPane)
            .options({
              query: `*[_type == "event" && references($id)]`,
              params: {id: `_id`},
              options: {perspective: 'previewDrafts'}
            })
            .title('Events'),
        ])
      default:
        return S.document().views([S.view.form()])
    }
  }