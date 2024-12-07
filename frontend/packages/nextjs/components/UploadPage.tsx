import React, { useState } from 'react';

interface UploadFormData {
  link: string;
  metadata: string;
  additionalLinks: string[];
}

const UploadPage: React.FC = () => {
  const [formData, setFormData] = useState<UploadFormData>({
    link: '',
    metadata: '',
    additionalLinks: ['']
  });
  
  const [errors, setErrors] = useState<Partial<UploadFormData>>({});
  const [focusedField, setFocusedField] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Partial<UploadFormData> = {};
    
    if (!formData.link.trim()) {
      newErrors.link = 'Subgraph Endpoint is required';
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
      console.log('Form submitted:', formData);
      setFormData({
        link: '',
        metadata: '',
        additionalLinks: ['']
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof UploadFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleAdditionalLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.additionalLinks];
    newLinks[index] = value;
    setFormData(prev => ({
      ...prev,
      additionalLinks: newLinks
    }));
  };

  const addNewLink = () => {
    setFormData(prev => ({
      ...prev,
      additionalLinks: [...prev.additionalLinks, '']
    }));
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalLinks: prev.additionalLinks.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#8fffad]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Upload to <span className="text-[#8fffad]">zkOS</span>
        </h1>
        
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#8fffad]/50">
          {/* Subtle glow on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8fffad] to-[#4AA8FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg" />
          
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

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className={`transform transition-all duration-200 ${focusedField === 'link' ? 'scale-[1.02]' : ''}`}>
                <label className="block text-[#8fffad] mb-2 text-sm font-medium">
                  Subgraph Endpoint *
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8fffad] to-[#4AA8FF] opacity-10 blur group-hover:opacity-50 transition-opacity duration-200 rounded-lg" />
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('link')}
                    onBlur={() => setFocusedField('')}
                    className="relative w-full px-4 py-3 bg-black border border-[#8fffad]/30 rounded-lg focus:outline-none focus:border-[#8fffad] text-[#4AA8FF] placeholder-[#4AA8FF]/50 transition-all duration-200"
                    placeholder="Enter subgraph link"
                  />
                </div>
                {errors.link && (
                  <p className="mt-2 text-red-400 text-sm flex items-center">
                    <span className="mr-1">×</span>
                    {errors.link}
                  </p>
                )}
              </div>

              <div className={`transform transition-all duration-200 ${focusedField === 'metadata' ? 'scale-[1.02]' : ''}`}>
                <label className="block text-[#8fffad] mb-2 text-sm font-medium">
                  Metadata *
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8fffad] to-[#4AA8FF] opacity-10 blur group-hover:opacity-50 transition-opacity duration-200 rounded-lg" />
                  <input
                    type="text"
                    name="metadata"
                    value={formData.metadata}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('metadata')}
                    onBlur={() => setFocusedField('')}
                    className="relative w-full px-4 py-3 bg-black border border-[#8fffad]/30 rounded-lg focus:outline-none focus:border-[#8fffad] text-[#4AA8FF] placeholder-[#4AA8FF]/50 transition-all duration-200"
                    placeholder="Enter metadata"
                  />
                </div>
                {errors.metadata && (
                  <p className="mt-2 text-red-400 text-sm flex items-center">
                    <span className="mr-1">×</span>
                    {errors.metadata}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#8fffad] mb-2 text-sm font-medium">
                  Additional Links
                </label>
                <div className="space-y-3">
                  {formData.additionalLinks.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2 group">
                      <div className="relative flex-1">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8fffad] to-[#4AA8FF] opacity-10 blur group-hover:opacity-50 transition-opacity duration-200 rounded-lg" />
                        <input
                          type="text"
                          value={link}
                          onChange={(e) => handleAdditionalLinkChange(index, e.target.value)}
                          className="relative w-full px-4 py-3 bg-black border border-[#8fffad]/30 rounded-lg focus:outline-none focus:border-[#8fffad] text-[#4AA8FF] placeholder-[#4AA8FF]/50 transition-all duration-200"
                          placeholder="Enter additional link"
                        />
                      </div>
                      {formData.additionalLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLink(index)}
                          className="px-3 py-1 text-red-400 hover:text-red-300 transition-colors font-bold text-2xl hover:scale-110 transform duration-200"
                          title="Remove link"
                        >
                          ×
                        </button>
                      )}
                      {index === formData.additionalLinks.length - 1 && (
                        <button
                          type="button"
                          onClick={addNewLink}
                          className="px-3 py-1 text-[#8fffad] hover:text-[#8fffad]/80 transition-colors font-bold text-2xl hover:scale-110 transform duration-200"
                          title="Add new link"
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-[#8fffad]/10 to-[#4AA8FF]/10 text-[#8fffad] rounded-lg border border-[#8fffad]/30 hover:bg-gradient-to-r hover:from-[#8fffad]/20 hover:to-[#4AA8FF]/20 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98]"
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