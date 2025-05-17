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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Reset success message when form is edited after submission
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div>
      {/* Success message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Pesan Anda berhasil dikirim! Terima kasih telah menghubungi kami.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Name input with icon */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-marine-blue/60" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Lengkap" 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 p-3 font-sans focus:ring-2 focus:ring-marine-blue/30 focus:border-marine-blue transition-all"
              required
            />
          </div>
          
          {/* Email input with icon */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-marine-blue/60" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 p-3 font-sans focus:ring-2 focus:ring-marine-blue/30 focus:border-marine-blue transition-all"
              required
            />
          </div>
        </div>
        
        {/* Phone input with icon */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-marine-blue/60" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nomor Telepon" 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 p-3 font-sans focus:ring-2 focus:ring-marine-blue/30 focus:border-marine-blue transition-all"
            required
          />
        </div>
        
        {/* Subject input with icon */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-marine-blue/60" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
            </svg>
          </div>
          <input 
            type="text" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subjek" 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 p-3 font-sans focus:ring-2 focus:ring-marine-blue/30 focus:border-marine-blue transition-all"
            required
          />
        </div>
        
        {/* Message textarea with icon */}
        <div className="relative">
          <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
            <svg className="h-5 w-5 text-marine-blue/60" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
          </div>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Pertanyaan" 
            rows="5" 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 p-3 font-sans focus:ring-2 focus:ring-marine-blue/30 focus:border-marine-blue transition-all"
            required
          ></textarea>
        </div>
        
        {/* Submit button with loading state */}
        <div className="flex justify-end mt-2">
          <MarineButton 
            type="submit" 
            variant="primary"
            size="lg"
            className="rounded-xl px-8 shadow-md hover:shadow-lg"
            loading={isSubmitting}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
          </MarineButton>
        </div>
      </form>
    </div>
  );
}
