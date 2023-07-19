import { FunctionComponent } from 'react'
import { NoteData, Tag } from './App'
import { NoteForm } from './NoteForm'
import { useNote } from './NoteLayout';

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void;
    addTag: (tag: Tag) => void;
    availableTags: Tag[]
}

export const EditNote: FunctionComponent<EditNoteProps> = ({ addTag, availableTags, onSubmit }: EditNoteProps) => {
    const note = useNote()
    return (
        <>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                addTag={addTag} availableTags={availableTags}
                onSubmit={data => onSubmit(note.id, data)} />
        </>
    )
}

