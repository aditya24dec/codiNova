import React from 'react';
import EmployeeHomeBase from './_base';
import EmployeeHomeRender from './_render'
import {connect} from 'react-redux';


class EmployeeHome extends EmployeeHomeBase {

    render(){
       return EmployeeHomeRender.call(this,this.state,this.props)
    }
}

const mapStateToProps = state => ({
    employees: state.employees.totalEmployees,
  });
  
export default connect(mapStateToProps)(EmployeeHome);