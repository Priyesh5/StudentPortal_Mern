import React, { Component } from 'react';
import DataGridComponent from './DataGridComponent';
import SecureCallService from '../services/securecallservice';
import CreateStudentComponent from './CreateStudentComponent';
import {Link} from 'react-router-dom';
import SearchComponent from './SearchComponent';

class StudentServiceComponent extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            student: {Username:'',StudentName: '',University: 'Select University', Course: 'Select Course',Year: 'Select Year', Fees: 0},
            students:[],
            option: 'University',
            search: '',
            checkUniversity: true,
            checkCourse: false,
            error: false,
            update: false
        };
        // define an instancve of HTTP Service
        this.serv = new SecureCallService();
        this.token = ''; 
    }
    
    

    handleSave=(student)=>{
        console.log(this.state.University);
        if(this.state.student.University === "Select University" || this.state.student.Course === "Select Course" || this.state.student.Year === "Select Year"){
            alert("Invalid option selected");
        }
        else{
            if(this.state.update === true)    {
                this.serv.putStudent(student, this.token)
                .then((response)=>{
                    alert(`Data Updated ${response.data.data}`);
                    this.loadData();
                }).catch((error)=>{
                    console.log(`Error Occured ${error}`);
                });
                this.state.update = false;
                this.setState({student: {Username: '', StudentName: '', University: 'Amravati', Course: 'IT',Year: 'First Year', Fees: 0}});
            }
            else {
                console.log(student);
                this.serv.postStudent(student, this.token)
                .then((response)=>{
                    if(response.data.data === "Cannot add more than 50")    {
                        alert('Cannot add students more than 50');
                    }
                    else{
                        alert(`Data Inserted`);
                        console.log(`Data Inserted ${JSON.parse(response.data.data)}`);
                        this.loadData();
                    }
                }).catch((error)=>{
                    alert('Error occured');
                    console.log(`Error Occured ${error}`);
                });
            }
            this.props.history.push('/portal/displayStudents');
        }
    }
    // the method that has calls to all heavy operations or external async calls
    componentDidMount=()=>{
        let tk = sessionStorage.getItem('token');
        if(tk !== null)    {
            this.token = tk;
            this.loadData();
        }
        else{
            this.props.history.push('/login');
        }
    }
    loadData=()=>{
        this.serv.getStudents(this.token)
        .then((response)=>{
            console.log(response.data.data);
            if(response.data.statusCode === 401)    {
                this.props.history.push('/login');
            }
            this.setState({'students': response.data.data});
        })
        .catch((error)=>{            
            console.log(`Error Occured ${error}`);
        });
    }

    updateRecord(s){       
        this.setState({student: s});
        this.state.update = true;
        console.log("history " + this.props.history);
        this.props.history.push('/portal/createStudent');
    }


    deleteRecord(id)  {
        this.serv.deleteStudent(id, this.token)
            .then((response)=>{
                alert(`Data Deleted ${response.data.data}`);
                this.loadData();
            }).catch((error)=>{
                console.log(`Error Occured ${error}`);
            });
    }

    searchString(evt)  {
        this.setState({search: evt.target.value});
    }

    selectOption(evt)  {
        this.setState({option: evt.target.value});
        if(evt.target.value === "University")   {
            this.setState({checkUniversity: true});
            this.setState({checkCourse: false});
        }
        if(evt.target.value === "Course")   {
            this.setState({checkUniversity: false});
            this.setState({checkCourse: true});
        }

    }


    searchRecords() {
        this.serv.searchStudents(this.state.search, this.state.option, this.token)
        .then((response)=> {
            if(response.data.statusCode === 404)    {
                let student = [{
                    Username:'',
                    StudentName: '',
                    University: '',
                    Course: '',
                    Year: '',
                    Fees: ''
                }, response.data.statusCode];
                this.setState({students: student});
            }
            else{
            this.setState({students: response.data.data});
            }
        }).catch((error)=>{
            console.log(`Error Occured ${error}`);
        });
        
    }

    onEveryCharCheck(evt)    {
        if(evt.target.value === '') {
            this.loadData();
        }
    }

    logOut()    {
        sessionStorage.clear();
        this.props.history.push('/login');
    }

    render() {
         let styleSearch = {float: 'right', 'margin-right': 40};
         if(this.props.match.params.param === "createStudent") {
             
            return(
                <div className="container">
                
                <div style={{float: 'right', marginLeft: '60%'}}>
                <button className="btn btn-primary" onClick={this.logOut.bind(this)}>Log out</button>
                </div>
                <h2 style={{float: 'left'}}>Student Application Portal</h2>
                <table className="table">
                  <thead>
                  <tr>
                  <td>
                            <Link to='/portal/displayStudents'>
                            <input type="button" value="Display Data" className="btn btn-primary"/>
                            </Link>                        </td>
                        <td>
                            <Link to="/portal/createStudent">
                            <input type="button" value="Add Student" className="btn btn-primary"/>
                            </Link>
                        </td>
                        <td>
                            <Link to="/portal/searchStudent">
                            <input type="button" value="Search Student" className="btn btn-primary"/>
                            </Link>
                        </td>
                     </tr>
                  </thead>
                </table>
                <hr/>
                <CreateStudentComponent saveData={this.handleSave.bind(this)} updateValues={this.state.student} update={this.state.update}></CreateStudentComponent>
                </div>
            )
         }
         else if(this.props.match.params.param === "searchStudent") { 
            return(
                <div className="container">
                <div style={{float: 'right', marginLeft: '60%'}}>
                <button className="btn btn-primary" onClick={this.logOut.bind(this)}>Log out</button>
                </div>
                <h2 style={{float: 'left'}}>Student Application Portal</h2>
                <table className="table">
                  <thead>
                  <tr>
                        <td>
                            <Link to='/portal/displayStudents'>
                            <input type="button" value="Display Data" className="btn btn-primary"/>
                            </Link>                        </td>
                        <td>
                            <Link to="/portal/createStudent">
                            <input type="button" value="Add Student" className="btn btn-primary"/>
                            </Link>
                        </td>
                        <td>
                            <Link to="/portal/searchStudent">
                            <input type="button" value="Search Student" className="btn btn-primary"/>
                            </Link>
                        </td>
                     </tr>
                  </thead>
                </table>
                <hr/>
                <SearchComponent></SearchComponent>
                </div>
            )
         }
        return (
            <div className="container">
                <div style={{float: 'right', marginLeft: '60%'}}>
                <button className="btn btn-primary" onClick={this.logOut.bind(this)}>Log out</button>
                </div>
                <h2 style={{float: 'left'}}>Student Application Portal</h2>
                <table className="table">
                  <thead>
                  <tr>
                  <td>
                            <Link to='/portal/displayStudents'>
                            <input type="button" value="Display Data" className="btn btn-primary"/>
                            </Link>                        </td>
                        <td>
                            <Link to="/portal/createStudent">
                            <input type="button" value="Add Student" className="btn btn-primary"/>
                            </Link>
                        </td>
                        <td>
                            <Link to="/portal/searchStudent">
                            <input type="button" value="Search Student" className="btn btn-primary"/>
                            </Link>
                        </td>
                     </tr>
                  </thead>
                </table>
                <hr/>
                    <DataGridComponent dataSource={this.state.students} updateRow={this.updateRecord.bind(this)} deleteRow={this.deleteRecord.bind(this)}></DataGridComponent>
            </div>
        );
    }
}

export default StudentServiceComponent;