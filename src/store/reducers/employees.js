import ActionTypes from '../constants';

const initialState = {
  totalEmployees: [],
};


const Employees = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_EMPLOYEES:
      return Object.assign({}, state, {
        totalEmployees: [...action.payload],
      });

    case ActionTypes.CREATE_EMPLOYEE :

      return Object.assign({},state,{
        totalEmployees:[...action.payload]
      })
      
    default:
      return state;
  }
};

export default Employees;