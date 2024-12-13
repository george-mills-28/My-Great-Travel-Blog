import { useNavigate, useParams } from 'react-router-dom'
import { Entry } from '../../models/entries.ts' 
import EditEntryForm from './EditEntryForm.tsx'
import useEditEntry from '../hooks/useEditEntries.ts'
import useEntriesData from '../hooks/useEntriesData.ts'

export default function EditEntry() {
  const params = useParams()
  const id = Number(params.id)
  const contact = useContactData(id)
  const editContact = useEditContact(id)
  const navigate = useNavigate()

  const handleSubmit = async (data: ContactData) => {
    try {
      await editContact.mutateAsync({ id, ...data })
      console.log('Contact updated successfully')
      navigate('/contacts/')
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }

  if (contact.isLoading) {
    return <LoadingIndicator />
  }

  if (contact.isError || !contact.data) {
    return <p>Failed to load contact data. Please try again later.</p>
  }

  return (
    <>
      <MainNav />
      <h2>
        Edit Contact: <span className="data">{contact.data.name}</span>
      </h2>
      <EditContactForm
        {...contact.data}
        submitLabel="Update Contact"
        onSubmit={handleSubmit}
      />
    </>
  )
}