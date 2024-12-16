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

return ( <form onSubmit={handleSubmit}>
  <label htmlFor="date">Date</label>
  <input id="date" type="date" name="date" value={entry.date} onChange={handleChange} required />

  <label htmlFor="location_name">Location</label>
  <input id="location_name" type="text" name="location_name" placeholder="Location name" value={entry.location_name} onChange={handleChange} required />

  <label htmlFor="details">Details</label>
  <textarea id="details" name="details" placeholder="Details of your travels" value={entry.details} onChange={handleChange} required />

  <label htmlFor="image_url">Image URL</label>
      <input
        id="image_url"
        type="text"
        name="image_url"
        placeholder="Image URL (optional)"
        value={entry.image_url}
        onChange={handleChange}
      />

  <button className="add-button" type="submit">Add Entry</button>
  </form>
  );
}

export default AddEntry;