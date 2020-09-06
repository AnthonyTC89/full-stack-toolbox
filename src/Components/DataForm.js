import React, { useState } from 'react';
import axios from 'axios';
import LoadingGif from './LoadingGif';
import './DataForm.css';

const defaultInputForm = {
  text: '',
};

const DataForm = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputForm, setInputForm] = useState(defaultInputForm);

  const handleChange = (e) => {
    e.persist();
    setInputForm((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    setMessage(null);
    try {
      const res = await axios.post('/api/data/', inputForm);
      setMessage(res.statusText);
    } catch (err) {
      setMessage('error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="data-form" onSubmit={handleSubmit}>
      {loading ? <LoadingGif /> : null}
      {message == null ? null : <small className="small-message">{message}</small>}
      <input
        className="form-control input-login"
        name="text"
        placeholder="text"
        value={inputForm.text}
        onChange={handleChange}
        required
      />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default DataForm;
