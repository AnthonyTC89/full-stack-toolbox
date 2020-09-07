const defaultData = [];

const data = (state = defaultData, { type, inData }) => {
  switch (type) {
    case 'UPDATE_DATA':
      return inData;
    case 'DELETE_DATA':
      return state.filter((item, index) => index !== inData);
    case 'ADD_DATA':
      return [...state, inData];
    default:
      return state;
  }
};

export default data;
