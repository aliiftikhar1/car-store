"use client";
import { useState, useEffect } from 'react';

export default function FaqPage() {
  const [questions, setQuestions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ comp_id: '', question: '', answer: '' });
  const [editId, setEditId] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchQuestions();
    fetchCompanies();
  }, []);

  const fetchQuestions = async () => {
    const res = await fetch('/api/faqs');
    const data = await res.json();
    setQuestions(data);
  };

  const fetchCompanies = async () => {
    const res = await fetch('/api/company');
    const data = await res.json();
    setCompanies(data);
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/faqs/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setEditId(null);
    } else {
      await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    }
    setFormData({ comp_id: '', question: '', answer: '' });
    fetchQuestions();
    setShowForm(false); // Hide form after submission
  };

  const handleEdit = (question) => {
    setFormData({ comp_id: question.comp_id, question: question.question, answer: question.answer });
    setEditId(question.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/faqs/${id}`, {
      method: 'DELETE',
    });
    fetchQuestions();
  };

  const filteredQuestions = selectedCompany
    ? questions.filter((question) =>
        question.comp_id === selectedCompany.id && question.question.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Slider functions
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(companies.length / companiesToShow()) - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(companies.length / companiesToShow()) - 1 ? 0 : prevIndex + 1
    );
  };

  const companiesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        return 4; // Large screens
      } else if (window.innerWidth >= 768) {
        return 2; // Medium screens
      } else {
        return 1; // Small screens
      }
    }
    return 4; // Default to 4 companies per view in SSR or large screens
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  // Debugging: Log values
  console.log('Companies Length:', companies.length);
  console.log('Current Index:', currentIndex);
  console.log('Companies to Show:', companiesToShow());

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">FAQ Management</h1>

      {/* Plus Icon for showing the form */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <span className='text-white font-bold hover:scale-110'>+</span>
        </button>
      </div>

      {/* Form for adding/editing FAQ */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Select Company</label>
            <select
              value={formData.comp_id}
              onChange={(e) => setFormData({ ...formData, comp_id: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.com_title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Question</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Question"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Answer</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Answer"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editId ? 'Update Question' : 'Add Question'}
          </button>
        </form>
      )}

      {/* Company Slider */}
      <div className="relative flex justify-between items-center w-full px-4 mb-6">
        <button
          onClick={handlePrevious}
          className="text-white p-2 absolute z-50 bg-yellow-400 left-5 rounded-full hover:scale-110 transition duration-300"
        >
          <span className='text-white font-bold hover:scale-110'>&#10094;</span>
        </button>
        <button
          onClick={handleNext}
          className="text-white p-2 absolute z-50 bg-yellow-400 right-5 rounded-full hover:scale-110 transition duration-300"
        >
          <span className='text-white font-bold hover:scale-110'>&#10095;</span>
        </button>
        <div className="relative overflow-hidden rounded-lg w-full">
          <div
            className="flex transition-transform duration-700 space-x-4 ease-in-out py-10"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Updated transform calculation
          >
            {companies.map((company, index) => (
              <div
                key={index}
                className={`flex-shrink-0 cursor-pointer`}
                style={{ flexBasis: `${100 / companiesToShow()}%` }}
                onClick={() => handleCompanyClick(company)}
              >
                <div className={`bg-white rounded-lg hover:shadow-lg hover:shadow-white border-2 hover:border-gray-600 border-gray-500 transition duration-300 transform hover:-translate-y-2 h-full flex flex-col ${
                  selectedCompany && selectedCompany.id === company.id
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-white hover:bg-gray-100'
                }`}>
                  <div className="relative pb-56 flex-shrink-0">
                    <img
                      src={`https://couponri.com/uploads/${company.comp_logo}`}
                      alt={company.com_title}
                      className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      {company.com_title}
                    </h3>
                    <p className="text-sm text-gray-700">{company.comp_description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Search and List */}
      {selectedCompany && (
        <>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ul className="space-y-4">
            {filteredQuestions.map((question) => (
              <li key={question.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 mt-1"><strong>Question:</strong> {question.question}</p>
                    <p className="text-gray-700 mt-1"><strong>Answer:</strong> {question.answer}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(question)}
                      className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
