import React, { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewEntry } from '../apis/entries'
import { EntryData } from "../../models/entries";

const AddEntry = () => {
  const [entry, setEntry] = useState<EntryData>({ date: '', location_name: '', details: '', image_url: ''})
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addNewEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries']})
      setEntry({ date: '', location_name: '', details: '', image_url: ''})
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value as string });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...entry,
      id: 0
    });
  };

  return (
    <div className="add-entry-section">
      <h2 className="add-entry-title">Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input 
            id="date" 
            type="date" 
            name="date" 
            value={entry.date} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="location_name">Location</label>
          <input 
            id="location_name" 
            type="text" 
            name="location_name" 
            placeholder="Enter location name" 
            value={entry.location_name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="details">Details</label>
          <textarea 
            id="details" 
            name="details" 
            placeholder="Share your travel experience..." 
            value={entry.details} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            id="image_url"
            type="text"
            name="image_url"
            placeholder="Add an image URL (optional)"
            value={entry.image_url}
            onChange={handleChange}
          />
        </div>

        <button className="add-button" type="submit">
          Add Entry
        </button>
      </form>
    </div>
  );
}

export default AddEntry;