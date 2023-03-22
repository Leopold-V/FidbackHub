import { ChangeEvent, MouseEvent, useState } from 'react';
import { motion } from 'framer-motion'
import { sendFeedback } from '../services/feedback.service';
import { Button } from './Button';

const card = () => ({
  open: { opacity: 1, height: 500, width: 384, clipPath: 'circle(100%)' },
  closed: { opacity: 0, height: 0, width: 200, clipPath: 'circle(40%)' },
});

export const Form = ({ apiKey, open }: { apiKey: string, open: boolean }) => {
  const [values, setvalues] = useState({
    title: '',
    type: 'Bug Report',
    description: '',
    author_email: '',
  });
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <motion.div
    animate={open ? 'open' : 'closed'}
    variants={card()}
    initial={false}
    className={`shadow-lg flex flex-col items-center px-3 w-96`}
  >
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center space-y-4 mt-6 w-full h-full text-gray-800 bg-gray-50"
    >
      <div className="space-y-3 w-3/4">
        <div className="w-full flex flex-col items-center space-y-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={values.title}
            className="w-full text-sm rounded-md duration-150 bg-opacity-25 pl-2 py-2 leading-5 placeholder-gray-500 focus:placeholder-gray-600 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
            onChange={handleChange}
            placeholder="Title"
          />
        </div>
        <SelectInput handleChange={handleChange} />
        <div className="flex flex-col items-center space-y-1">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            className="w-full text-sm rounded-md duration-150 bg-opacity-25 pl-2 py-2 leading-5 placeholder-gray-500 focus:placeholder-gray-600 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
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
            className="w-full text-sm rounded-md duration-150 bg-opacity-25 pl-2 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
            onChange={handleChange}
            placeholder="Author email"
          />
        </div>
        {error && (
          <div>
            <p className="text-red-500 text-sm font-semibold text-center">{error}</p>
          </div>
        )}
      </div>
      <Button type="submit" disabled={loading}>
        Send!
      </Button>
    </form>
    </motion.div>
  );
};

const listType = ['Bug report', 'Feature request', 'General feedback'];

const SelectInput = ({ handleChange }: { handleChange: any }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <label htmlFor="type">
        Type
      </label>
      <select
        id="type"
        name="type"
        className="mt-2 block w-full bg-white rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-sm"
        defaultValue="Bug report"
        onChange={handleChange}
      >
        {listType.map((type) => <option>{type}</option>)}
      </select>
    </div>
  )
}