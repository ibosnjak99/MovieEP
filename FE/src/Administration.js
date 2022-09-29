import React, {Component} from "react";
import { variables } from "./Variables";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";

export class Administration extends Component {

    constructor(props) {
        super(props);

        this.state={
            users:[],
            modalTitle:"",
            Id:0,
            UserName:"",
            Role:"",
            Password:"",
        }
    }

    notifyAddSuccess = () => {
        toast.success('Successfully added');
    }

    notifyUpdateSuccess = () => {
        toast.success('Successfully updated');
    }

    notifyDeleteSuccess = () => {
        toast.success('Successfully deleted');
    }

    notifyError = () => {
        toast.error('Something went wrong');
    }

    refreshList(){
        fetch(variables.API_URL + 'users')
        .then(response => response.json())
        .then(data => {
            this.setState({users:data});
        })
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        toast.error('Something went wrong');
      }

    componentDidMount = () => {
        this.refreshList();
    }

    changeUserName = (e) => {
        this.setState({UserName: e.target.value});
    }

    changeRole = (e) => {
        this.setState({Role: e.target.value});
    }

    addClick = () => {
        this.setState({
            modalTitle:"Add user",
            Id: 0,
            UserName: "",
            Role: "",
        })
    }

    editClick = (user) => {
        this.setState({
            modalTitle:"Edit user",
            Id: user.Id,
            UserName: user.UserName,
            Role: user.Role,
        })
    }

    updateClick(){
        fetch(variables.API_URL + 'users', {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id: this.state.Id,
                UserName: this.state.UserName,
                Role: this.state.Role,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            this.notifyUpdateSuccess();
            this.refreshList();
        },(error)=>{
            this.notifyError();
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'users/'+ id, {
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.notifyDeleteSuccess();
            this.refreshList();
        },(error)=>{
            this.notifyError();
        })
        }
    }

    render() {
        const {
            users,
            modalTitle,
            Id,
            UserName,
            Role,
        } = this.state;

        return(
            <div>
                <ToastContainer position='bottom-right' hideProgressBar />
                <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
                    <ul className='navbar-nav'>
                        <li className='nav-item- m-1'>
                        <NavLink className='btn btn-light btn-outline-primary' to='/administration'>
                            Administration
                        </NavLink>
                        </li>
                        <li className='nav-item- m-1'>
                        <NavLink className='btn btn-light btn-outline-primary' to='/movies'>
                            Movies
                        </NavLink>
                        </li>
                    </ul>
                </nav>
                <button type="button"
                        className="btn btn-dark m-3 float-left"
                        onClick={() => this.logout()}
                        >
                            <a href="/" class="logout">
                                Log out
                            </a>
                    </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th width="33%">
                                UserName
                            </th>
                            <th  width="33%">
                                Role
                            </th>
                            <th width="33%">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>
                            <tr key={user.Id}>
                                <td>{user.UserName}</td>
                                <td>{user.Role}</td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        style={{marginRight: 1 + 'em'}}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(user)}
                                        >
                                            Edit
                                    </button>
                                    <button type="button" 
                                        className="btn btn-danger"
                                        onClick={() => {this.deleteClick(user.Id)}}
                                        >
                                            Delete
                                    </button>
                                    </td>
                            </tr>)}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">UserName</span>
                                <input type="text" className="form-control"
                                value={UserName}
                                onChange={this.changeUserName} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Role</span>
                                <select name="role" id="role"
                                value={Role}
                                onChange={this.changeRole} >
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                </select>
                            </div>

                                {Id !== 0 ?
                                    <button type="button"
                                    className="btn btn-primary float-end"
                                    onClick={() => this.updateClick()}
                                    >
                                        Update
                                    </button>    
                                : null}
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}