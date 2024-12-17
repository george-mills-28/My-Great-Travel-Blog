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

<<<<<<< HEAD
  return (
    <div className="add-entry-section">
      <h2 className="add-entry-title">Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
=======
return (
  <div className="add-entry-container">
    <div className="add-entry-form">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
>>>>>>> 7245d9d (Uploading what i have left)
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

<<<<<<< HEAD
        <div className="form-group">
=======
        <div className="form-field">
>>>>>>> 7245d9d (Uploading what i have left)
          <label htmlFor="location_name">Location</label>
          <input 
            id="location_name" 
            type="text" 
            name="location_name" 
<<<<<<< HEAD
            placeholder="Enter location name" 
=======
            placeholder="Location name" 
>>>>>>> 7245d9d (Uploading what i have left)
            value={entry.location_name} 
            onChange={handleChange} 
            required 
          />
        </div>

<<<<<<< HEAD
        <div className="form-group">
=======
        <div className="form-field">
>>>>>>> 7245d9d (Uploading what i have left)
          <label htmlFor="details">Details</label>
          <textarea 
            id="details" 
            name="details" 
<<<<<<< HEAD
            placeholder="Share your travel experience..." 
=======
            placeholder="Details of your travels" 
>>>>>>> 7245d9d (Uploading what i have left)
            value={entry.details} 
            onChange={handleChange} 
            required 
          />
        </div>

<<<<<<< HEAD
        <div className="form-group">
=======
        <div className="form-field">
>>>>>>> 7245d9d (Uploading what i have left)
          <label htmlFor="image_url">Image URL</label>
          <input
            id="image_url"
            type="text"
            name="image_url"
<<<<<<< HEAD
            placeholder="Add an image URL (optional)"
=======
            placeholder="Image URL (optional)"
>>>>>>> 7245d9d (Uploading what i have left)
            value={entry.image_url}
            onChange={handleChange}
          />
        </div>

<<<<<<< HEAD
        <button className="add-button" type="submit">
          Add Entry
        </button>
      </form>
    </div>
  );
=======
        <button className="add-entry-button" type="submit">Add Entry</button>
      </form>
    </div>
  </div>
);
>>>>>>> 7245d9d (Uploading what i have left)
}

export default AddEntry;