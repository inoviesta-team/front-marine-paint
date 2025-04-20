import React, { useState } from 'react';
import MarineButton from '@components/ui/MarineButton';

export default function MarineContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    // For now let's just show an alert
    alert('Formulir berhasil dikirim! Terima kasih.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" 
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nama Lengkap" 
        className="w-full bg-gray-200 rounded p-3 font-mono"
        required
      />
      <input 
        type="email" 
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email" 
        className="w-full bg-gray-200 rounded p-3 font-mono"
        required
      />
      <input 
        type="tel" 
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Nomor Telepon" 
        className="w-full bg-gray-200 rounded p-3 font-mono"
        required
      />
      <input 
        type="text" 
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subjek" 
        className="w-full bg-gray-200 rounded p-3 font-mono"
        required
      />
      <textarea 
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Pertanyaan" 
        rows="5" 
        className="w-full bg-gray-200 rounded p-3 font-mono"
        required
      ></textarea>
      
      <div className="flex justify-center">
        <MarineButton type="submit" variant="primary">
          Submit
        </MarineButton>
      </div>
    </form>
  );
}
