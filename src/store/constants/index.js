import keyMirror from 'fbjs/lib/keyMirror';


const ActionTypes = keyMirror({

	STORE_EMPLOYEES: 'STORE_EMPLOYEES',
	EMPLOYEE_COUNT:'EMPLOYEE_COUNT',
	EMPLOYEE_FAVOURITE_COUNT:'EMPLOYEE_FAVOURITE_COUNT'
});

export default ActionTypes;