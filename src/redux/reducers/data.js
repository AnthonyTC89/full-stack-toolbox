const defaultData = [];

const data = (state = defaultData, { type, inData }) => {
  switch (type) {
    case 'UPDATE_NAVBAR':
      return inData;
    default:
      return state;
  }
};

export default data;
