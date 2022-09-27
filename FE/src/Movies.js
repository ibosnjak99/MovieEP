import React, {Component} from "react";
import { variables } from "./Variables";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export class Movies extends Component {

    constructor(props) {
        super(props);

        this.state={
            movies:[],
            modalTitle:"",
            Id:0,
            Name:"",
            Genre:"",
            ReleaseYear:"",
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
        fetch(variables.API_URL + 'movies')
        .then(response => response.json())
        .then(data => {
            this.setState({movies:data});
        })
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        toast.error('Something went wrong');
      }

    componentDidMount = () => {
        this.refreshList();
    }

    changeName = (e) => {
        this.setState({Name: e.target.value});
    }

    changeGenre = (e) => {
        this.setState({Genre: e.target.value});
    }

    changeReleaseYear = (e) => {
        this.setState({ReleaseYear: e.target.value});
    }

    addClick = () => {
        this.setState({
            modalTitle:"Add movie",
            Id: 0,
            Name: "",
            Genre: "",
            ReleaseYear: 0,
        })
    }

    editClick = (mov) => {
        this.setState({
            modalTitle:"Edit movie",
            Id: mov.Id,
            Name: mov.Name,
            Genre: mov.Genre,
            ReleaseYear: mov.ReleaseYear
        })
    }

    createClick(){
        fetch(variables.API_URL + 'movies', {
            method:'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name: this.state.Name,
                Genre: this.state.Genre,
                ReleaseYear: this.state.ReleaseYear,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            this.notifyAddSuccess();
            this.refreshList();
        },(error)=>{
            console.log(error);
            this.notifyError();
        })
    }

    updateClick(){
        fetch(variables.API_URL + 'movies', {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id: this.state.Id,
                Name: this.state.Name,
                Genre: this.state.Genre,
                ReleaseYear: `${this.state.ReleaseYear}`,
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
        fetch(variables.API_URL+'movies/'+ id, {
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
            movies,
            modalTitle,
            Id,
            Name,
            Genre,
            ReleaseYear
        } = this.state;

        return(
            <div>
                <ToastContainer position='bottom-right' hideProgressBar />
                <button type="button"
                    className="btn btn-primary m-3 float-left"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                        Add Movie
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th width="25%">
                                Name
                            </th>
                            <th width="25%">
                                Genre
                            </th>
                            <th width="25%">
                                Release year
                            </th>
                            <th width="25%">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(mov =>
                            <tr key={mov.Id}>
                                <td>{mov.Name}</td>
                                <td>{mov.Genre}</td>
                                <td>{mov.ReleaseYear}</td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        style={{marginRight: 1 + 'em'}}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(mov)}
                                        >
                                            Edit
                                    </button>
                                    <button type="button" 
                                        className="btn btn-danger"
                                        onClick={() => {this.deleteClick(mov.Id)}}
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
                                <span className="input-group-text">Name</span>
                                <input type="text" className="form-control"
                                value={Name}
                                onChange={this.changeName} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Genre</span>
                                <input type="text" className="form-control"
                                value={Genre}
                                onChange={this.changeGenre} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Release Year</span>
                                <input type="number" className="form-control"
                                value={ReleaseYear}
                                onChange={this.changeReleaseYear} />
                            </div>

                                {Id === 0 ?
                                    <button type="button"
                                    className="btn btn-primary float-end"
                                    onClick={() => this.createClick()}
                                    >
                                        Create
                                    </button>    
                                : null}

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