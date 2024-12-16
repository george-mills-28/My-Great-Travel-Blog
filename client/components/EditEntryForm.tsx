import { useState, FormEvent } from 'react'
import { Entry } from '../../models/entries.ts'

interface Props extends Entry {
  submitLabel: string
  onSubmit: (data: Entry) => void
}

export default function EditEntryForm({
  submitLabel,
  onSubmit,
  ...initialData
}: Props) {
  const [formData, setFormData] = useState<Entry>(initialData)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="form-group">
        <label htmlFor="date" className="label">
          Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location_name" className="label">
          Location:
        </label>
        <input
          type="text"
          id="location"
          name="location_name"
          value={formData.location_name}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="details" className="label">
          Details:
        </label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="image_url" className="label">
          Image URL:
        </label>
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={formData.image_url || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">{submitLabel}</button>
    </form>
  )
}