import { useNavigate, useParams } from 'react-router-dom'
import { Entry } from '../../models/entries.ts' 
import EditEntryForm from './EditEntryForm.tsx'
import useEditEntry from '../hooks/useEditEntries.ts'
import useEntriesData from '../hooks/useEntriesData.ts'
import useDeleteEntry from '../hooks/useDeleteEntry.ts';

export default function EditEntry() {
  const params = useParams()
  const id = Number(params.id)
  const contact = useContactData(id)
  const editContact = useEditContact(id)
  const navigate = useNavigate()
  const deleteEntry = useDeleteEntry(id);

  const handleSubmit = async (data: ContactData) => {
    try {
      await editContact.mutateAsync({ id, ...data })
      console.log('Contact updated successfully')
      navigate('/contacts/')
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry.mutateAsync();
        console.log('Entry deleted successfully');
        navigate('/entries/'); // Navigate to the entries list after deletion
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

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
      <button onClick={handleDelete} className='delete-button'>
        Delete entry
      </button>
    </>
  )
}