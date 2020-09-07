import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import updateData from '../redux/actions/updateData';
import deleteData from '../redux/actions/deleteData';
import LoadingGif from './LoadingGif';
import './DataList.css';

const DataList = ({ data, updatingData, deletingData }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const getData = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/data');
      if (res.data.length === 0) {
        setMessage("You don't have data");
      }
      updatingData(res.data);
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

  const handleDelete = async (index) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.delete(`api/data/${index}`);
      setMessage(res.statusText);
      deletingData(index);
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

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="data-list">
      {loading ? <LoadingGif /> : null}
      {message == null ? null : <small className="small-message">{message}</small>}
      <ul className="list-group">
        {data.map((text, index) => (
          <li key={uuidv4()} className="list-group-item">
            {text}
            <IconButton
              edge="end"
              aria-label="delete"
              color="secondary"
              disabled={loading}
              onClick={() => handleDelete(index)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

DataList.propTypes = {
  data: PropTypes.array.isRequired,
  updatingData: PropTypes.func.isRequired,
  deletingData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  updatingData: (inData) => dispatch(updateData(inData)),
  deletingData: (inData) => dispatch(deleteData(inData)),
});

const DataListWrapper = connect(mapStateToProps, mapDispatchToProps)(DataList);

export default DataListWrapper;
