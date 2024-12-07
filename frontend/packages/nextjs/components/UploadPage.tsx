import React, { useState } from 'react';

interface UploadFormData {
  link: string;
  metadata: string;
  additionalInfo?: string;
}

const UploadPage: React.FC = () => {
  const [formData, setFormData] = useState<UploadFormData>({
    link: '',
    metadata: '',
    additionalInfo: ''
  });
  
  const [errors, setErrors] = useState<Partial<UploadFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<UploadFormData> = {};
    
    if (!formData.link.trim()) {
      newErrors.link = 'Link is required';
    }
    
    if (!formData.metadata.trim()) {
      newErrors.metadata = 'Metadata is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Reset form after submission
      setFormData({
        link: '',
        metadata: '',
        additionalInfo: ''
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof UploadFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        {/* Terminal window */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#8fffad]/20">
          {/* Terminal header */}
          <div className="bg-gray-900/50 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
              Upload Subgraph
            </div>
          </div>

          {/* Form content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Link Input */}
              <div>
                <label className="block text-[#8fffad] mb-2 text-sm font-medium">
                  Link *
                </label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-black border ${
                    errors.link ? 'border-red-500' : 'border-[#8fffad]/30'
                  } rounded focus:outline-none focus:border-[#8fffad] text-white`}
                  placeholder="Enter subgraph link"
                />
                {errors.link && (
                  <p className="mt-1 text-red-500 text-sm">{errors.link}</p>
                )}
              </div>

              {/* Metadata Input */}
              <div>
                <label className="block text-[#8fffad] mb-2 text-sm font-medium">
                  Metadata *
                </label>
                <input
                  type="text"
                  name="metadata"
                  value={formData.metadata}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-black border ${
                    errors.metadata ? 'border-red-500' : 'border-[#8fffad]/30'
                  } rounded focus:outline-none focus:border-[#8fffad] text-white`}
                  placeholder="Enter metadata"
                />
                {errors.metadata && (
                  <p className="mt-1 text-red-500 text-sm">{errors.metadata}</p>
                )}
              </div>

              {/* Additional Information Input */}
              <div>
                <label className="block text-[#8fffad] mb-2 text-sm font-medium">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black border border-[#8fffad]/30 rounded focus:outline-none focus:border-[#8fffad] text-white resize-none h-32"
                  placeholder="Enter any additional information (optional)"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#8fffad]/10 text-[#8fffad] rounded border border-[#8fffad]/30 hover:bg-[#8fffad]/20 transition-colors duration-200"
              >
                Upload Subgraph
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;