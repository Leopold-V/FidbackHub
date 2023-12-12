import { ChangeEvent, MouseEvent, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { sendFeedback } from '../services/feedback.service';
import { feedbackType, feedbackTypeType } from '../types';
import { Button } from './Button';

// TO TEST API KEY : OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg==

const FormHeader = () => {
  return (<div className={` text-white rounded-t
      w-full flex items-center justify-center relative space-x-2 py-4`}>
    <img className="h-12 w-auto" src="../../public/Logo.svg" alt="logo" />
    <h1 className="text-center font-semibold text-base text-indigo-500">Fidbackhub</h1>
  </div>);
}

export const Form = ({
  setloading
}: {
  setloading: (loading: boolean) => void;
}) => {
  const [values, setvalues] = useState<feedbackType>({
    title: '',
    type: 'Bug report',
    description: '',
    author_email: '',
  });
  const [apikey, setapikey] = useState<string>('');
  const [error, seterror] = useState('');
  const [success, setsuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeApikey = (e: ChangeEvent<HTMLInputElement>) => {
    setapikey(e.target.value)
  }

  const html2Image = async (canvasElement: HTMLHtmlElement) => {
    const rep = await htmlToImage.toPng(canvasElement);
    console.log(rep);
    return rep;
  };

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    setsuccess(false);
    seterror('');
    try {
      const metadata = {
        userAgent: window.navigator.userAgent,
        resolutionWidth: window.screen.width,
        resolutionHeight: window.screen.height,
        //@ts-ignore
        os: window.navigator.oscpu,
      };
      //@ts-ignore
      const canvasElement: any = document.getElementById('fidbackhub_editor_content');
      console.log(canvasElement);
      
      const imageBase64 = await html2Image(canvasElement);
      await sendFeedback(values, imageBase64, metadata, apikey);
      setvalues({
        title: '',
        type: 'Bug report',
        description: '',
        author_email: '',
      });
      setsuccess(true);
    } catch (error: any) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div
      className={`z-10 shadow-lg flex flex-col flex-grow items-center self-end pb-6 m-2 text-gray-800 bg-gray-50 rounded`}
    >
      <FormHeader />
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
          <div className="w-full flex flex-col items-center space-y-1">
            <label htmlFor="title">Api key</label>
            <input
              type="text"
              name="apikey"
              id="apikey"
              value={apikey}
              className="w-full text-sm rounded-md duration-150 bg-opacity-25 pl-2 py-2 leading-5 placeholder-gray-500 focus:placeholder-gray-600 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
              onChange={handleChangeApikey}
              placeholder="Your project api key"
            />
          </div>
          {error && (
            <div>
              <p className="text-red-500 text-sm font-semibold text-center">{error}</p>
            </div>
          )}
          {success && (
            <div>
              <p className="text-green-500 text-sm font-semibold text-center">Feedback successfully sent !</p>
            </div>
          )}
        </div>
        <Button type="submit">Send!</Button>
      </form>
    </div>
  );
};

const listType: feedbackTypeType[] = ['Bug report', 'Feature request', 'General feedback'];

const SelectInput = ({
  handleChange,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <label htmlFor="type">Type</label>
      <select
        id="type"
        name="type"
        className="mt-2 block w-full bg-white rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-sm"
        defaultValue="Bug report"
        onChange={handleChange}
      >
        {listType.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};
