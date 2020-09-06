import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import updateData from '../redux/actions/updateData';
import LoadingGif from './LoadingGif';

const DataList = ({ data, changeData }) => {
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
      changeData(res.data);
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
        {data.map((text) => (
          <li key={uuidv4()} className="list-group-item">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

DataList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  changeData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  changeData: (data) => dispatch(updateData(data)),
});

const DataListWrapper = connect(mapStateToProps, mapDispatchToProps)(DataList);

export default DataListWrapper;
