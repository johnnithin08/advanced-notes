import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from 'react'
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import { NewNote } from "./NewNote"
import { useLocalStorage } from "./useLocalStorage"
import { v4 as uuidV4 } from "uuid"
import { NoteList } from "./NoteList"
import { NoteLayout } from "./NoteLayout"
import { Note } from "./Note"
import { EditNote } from "./EditNote"

export type Note = {
  id: string;
} & NoteData

export type RawNote = {
  id: string;
} & RawNoteData

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[]
}

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[]
}

export type Tag = {
  id: string;
  label: string;
}

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  const onCreateNote = (data: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: data.tags.map(tag => tag.id) }]
    })
  }

  const onEditNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        }
        else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  const updateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label: label }
        }
        else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id))
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList availableTags={tags} deleteTag={deleteTag} notes={notesWithTags} updateTag={updateTag} />} />
        <Route path="/new" element={<NewNote addTag={addTag} availableTags={tags} onSubmit={onCreateNote} />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path="edit" element={<EditNote addTag={addTag} availableTags={tags} onSubmit={onEditNote} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App