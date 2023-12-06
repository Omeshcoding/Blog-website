import React, { useState, useRef, useEffect } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef(null);
  const storeDataEl = useRef(null);
  const emailEl = useRef(null);
  const nameEl = useRef(null);

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, []);

  const handleCommentSubmission = () => {
    // e.preventDefault();
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: email } = emailEl.current;
    const { value: name } = nameEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !email || !name) {
      setError(true);
    }
    const commentObj = { name, email, comment, slug };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name', name);
      localStorage.removeItem('email', email);
    }
    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white rounded-lg text-black shadow-lg pb-12 p-8 mb-8 lg:mr-6">
      <h3 className="text-xl font-semibold border-b pb-4 mb-4">CommentsForm</h3>
      <div className="grid grid-col-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="w-full -none shadow-sm rounded-lg p-4 focus:ring-2 outline-none focus:ring-gray-100 bg-gray-300 text-gray-700"
          name="comment"
          placeholder="Comment"
        />
      </div>
      <div className="grid grid-col-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          ref={nameEl}
          type="text"
          className="w-full -none shadow-sm rounded-lg  py-2 px-4 focus:ring-2 outline-none focus:ring-gray-100  bg-gray-300 text-gray-700"
          name="name"
          placeholder="Name"
        />

        <input
          ref={emailEl}
          type="text"
          placeholder="Email"
          name="email"
          className="py-2 px-4 bg-gray-300 rounded-lg focus:ring outline-none shadow-sm focus:ring-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-col-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="text-gray-100 relative">
          <input
            type="checkbox"
            name="storeData"
            id="storeData"
            ref={storeDataEl}
            value="true"
          />
          {/* <span className="absolute w-6 h-6 bg-red-600 top-0 left-0 "></span> */}
          <label
            htmlFor="storeData"
            className="ml-2 text-gray-500 cursor-pointer
          "
          >
            Save my email and name for next time I comment
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-600">All fields are required</p>}
      <div className="mt-8">
        <button
          type="button"
          className="transition duration-500 ease gradient-style gradient-hover py-2 px-8 rounded-full text-gray-100 font-small text-lg hover:bg-indigo-500 hover: cursor-pointer"
          onClick={handleCommentSubmission}
        >
          {/* {!showSuccessMessage ? 'Post Comment' : 'Posting Comment...'} */}
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-md float-right font-semibold mt-2 text-green-500">
            Commment submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
