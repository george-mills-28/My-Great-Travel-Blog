import { useState, FormEvent } from 'react'
import { Entry } from '../../models/entries.ts'
import useEntries from '../hooks/useEntries.ts'


interface Props extends Entry {
  submitLabel: string
  onSubmit: (data: Entry) => void
}

export default function EditEntryForm({
  submitLabel,
  onSubmit,
  ...initialData
}: Props) {
  const entries = useEntries()
  const [formData, setFormData] = useState<Entry>(initialData)


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    onSubmit(formData)
  }
  if (entries.isPending) {
    return 'Loading...'
  }

  if (entries.isError || !entries.data) {
    return 'Failed to load entries'
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date" className="label">
          Date:
        </label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
    
        />
      </div>
      <div>
        <label htmlFor="location_name" className="label">
          Location:
        </label>
        <input
          type="text"
          id="location"
          name="location_name"
          value={formData.location_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="details" className="label">
          Details:
        </label>
        <input
          type="details"
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
        />
      </div>
      <div>
      <label htmlFor="image_url" className="label">
          Image URL:
        </label>
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={formData.image_url || ""}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{submitLabel} Submit</button>
    </form>
  )
}
