import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { sendFeedback } from '../services/feedback.service';

export const Form = ({ apiKey }: { apiKey: string }) => {
  const [values, setvalues] = useState({
    title: '',
    description: '',
    author_email: '',
  });
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      await sendFeedback(values, apiKey);
    } catch (error: any) {
      console.log(error);
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center space-y-4 mt-4 h-full w-full text-sm"
    >
      <div className="space-y-3 w-3/4">
        <div className="w-full flex flex-col items-center space-y-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={values.title}
            className="w-full text-xs rounded-md border duration-200 bg-opacity-25 py-2 leading-5 placeholder-gray-500 focus:placeholder-gray-600 outline-none focus:ring-1"
            onChange={handleChange}
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col items-center space-y-1">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={values.description}
            className="w-full text-xs rounded-md border duration-200 bg-opacity-25 py-2 leading-5 placeholder-gray-500 focus:placeholder-gray-600 outline-none focus:ring-1"
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
        <div className="flex flex-col items-center space-y-1">
          <label htmlFor="author">Email</label>
          <input
            type="email"
            name="author_email"
            id="author_email"
            value={values.author_email}
            className="w-full text-xs rounded-md border duration-200 bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none focus:ring-1"
            onChange={handleChange}
            placeholder="Author email"
          />
        </div>
        {error && (
          <div>
            <p className="text-red-500 text-xs font-semibold text-center">{error}</p>
          </div>
        )}
      </div>
      <button type="submit" disabled={loading}>
        Send!
      </button>
    </form>
  );
};
