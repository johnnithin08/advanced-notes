import { FunctionComponent } from 'react'
import { NoteData, Tag } from './App'
import { NoteForm } from './NoteForm'

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    addTag: (tag: Tag) => void;
    availableTags: Tag[]
}

export const NewNote: FunctionComponent<NewNoteProps> = ({ addTag, availableTags, onSubmit }: NewNoteProps) => {
    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm
                addTag={addTag} availableTags={availableTags}
                onSubmit={onSubmit} />
        </>
    )
}

