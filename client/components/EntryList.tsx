import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteEntry, getAllEntries } from '../apis/entries'
import { Entry } from '../../models/entries'


export default function EntryList() {
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
          <button className="delete-button" onClick={() => handleDelete(entry.id)}>
                Delete Entry
              </button>
          </div>
        ))}
      </div>
    </div>
  )
} 