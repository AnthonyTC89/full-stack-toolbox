import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingGif from './LoadingGif';
import addData from '../redux/actions/addData';
import './DataForm.css';

const defaultInputForm = {
  text: '',
};

const DataForm = ({ addingData }) => {
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
      addingData(inputForm.text);
      setInputForm(defaultInputForm);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      } else if (err.message) {
        setMessage(err.message);
      } else {
        setMessage('error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="data-form" onSubmit={handleSubmit}>
      {loading ? <LoadingGif /> : null}
      <input
        className="form-control data-input"
        name="text"
        placeholder="text"
        value={inputForm.text}
        onChange={handleChange}
        required
      />
      <button className="btn btn-primary" disabled={loading} type="submit">
        Submit
      </button>
      {message == null ? null : <small className="small-message">{message}</small>}
    </form>
  );
};

DataForm.propTypes = {
  addingData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addingData: (inData) => dispatch(addData(inData)),
});

const DataFormWrapper = connect(null, mapDispatchToProps)(DataForm);

export default DataFormWrapper;
