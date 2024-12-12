import { useQuery } from '@tanstack/react-query'
import { getAllEntries } from '../apis/entries'

interface Entry {
  id: number
  date: string
  location_name: string
  details: string
  image_url: string | null
}

export default function EntryList() {
  const {
    data: entries,
    error,
    isLoading,
  } = useQuery<Entry[]>({ queryKey: ['entries'], queryFn: getAllEntries })

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
            <h3>{entry.location_name}</h3>
            <p className="date">{new Date(entry.date).toLocaleDateString()}</p>
            <p>{entry.details}</p>
            {entry.image_url && (
              <img src={entry.image_url} alt={entry.location_name} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 