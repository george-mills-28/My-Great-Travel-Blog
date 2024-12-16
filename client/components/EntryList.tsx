import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteEntry, getAllEntries } from '../apis/entries'
import { Entry } from '../../models/entries'
import { useNavigate } from 'react-router-dom'

export default function EntryList() {
  const navigate = useNavigate()
  const {
    data: entries,
    error,
    isLoading,
  } = useQuery<Entry[]>({ queryKey: ['entries'], queryFn: getAllEntries })

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    }
  })

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  }

  const handleEdit = (id: number) => {
    navigate(`/entries/edit/${id}`)
  }

  if (error) {
    return <p>Failed to load entries</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="entries-container">
      <h2>My Travel Journal</h2>
      <div className="entries-grid">
        {entries?.map((entry) => (
          <div key={entry.id} className="entry-card">
            <h3>Location: {entry.location_name}</h3>
            <p className="date">Date: {new Date(entry.date).toLocaleDateString()}</p>
            <p>Details: {entry.details}</p>
            {entry.image_url && (
              <img src={entry.image_url} alt={entry.location_name} />
            )}
            <div className="button-container">
              <button 
                className="edit-button" 
                onClick={() => handleEdit(entry.id)}
              >
                Edit Entry
              </button>
              <button 
                className="delete-button" 
                onClick={() => handleDelete(entry.id)}
              >
                Delete Entry
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}