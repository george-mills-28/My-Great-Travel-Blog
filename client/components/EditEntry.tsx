import { useNavigate, useParams } from 'react-router-dom'
import { Entry } from '../../models/entries.ts' 
import EditEntryForm from './EditEntryForm.tsx'
import useEditEntry from '../hooks/useEditEntries.ts'
import useEntriesData from '../hooks/useEntriesData.ts'
import useDeleteEntry from '../hooks/useDeleteEntry.ts';

export default function EditEntry() {
  const params = useParams()
  const id = Number(params.id)
  const entry = useEntriesData(id)
  const editEntry= useEditEntry(id)
  const navigate = useNavigate()
  const deleteEntry = useDeleteEntry(id);

  const handleSubmit = async (data: Entry) => {
    try {
      await editEntry.mutateAsync({ id, ...data })
      console.log('Contact updated successfully')
      navigate('/')
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry.mutateAsync();
        console.log('Entry deleted successfully');
        navigate('/'); 
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  if (entry.isLoading) {
    return <LoadingIndicator />
  }

  if (entry.isError || !entry.data) {
    return <p>Failed to load contact data. Please try again later.</p>
  }

  return (
    <>
      <h2>
        Edit Entry: <span className="data">{entry.data.location_name}</span>
      </h2>
      <EditEntryForm
        {...entry.data}
        submitLabel="Update Entry"
        onSubmit={handleSubmit}
      />
      <button onClick={handleDelete} className='delete-button'>
        Delete entry
      </button>
    </>
  )
}