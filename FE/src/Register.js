import React, {Component} from "react";
import { variables } from "./Variables";

export class Register extends Component {

    constructor(props) {
        super(props);

        this.state={
            users:[],
            Id:0,
            UserName:"",
            IsAdmin:"",
            Password:"",
        }
    }

    refreshList(){
        fetch(variables.API_URL + 'users')
        .then(response => response.json())
        .then(data => {
            this.setState({users:data});
        })
    }

    changeUsername = (e) => {
        this.setState({UserName: e.target.value});
    }

    changePassword = (e) => {
        this.setState({Password: e.target.value});
    }

    register(){
        this.setState({
            Id: 0,
            UserName: "",
            IsAdmin: "",
            Password: "",
        })
        fetch(variables.API_URL + 'users', {
            method:'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserName: this.state.UserName,
                Password: this.state.Password,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            this.refreshList();
        },(error)=>{
            console.log(error);
        })
    }

    signUpClick = () => {
        this.setState({
            Id: 0,
            UserName: "",
            IsAdmin: "",
            Password: "",
        })
    }

    render() {
        return(
            <div>
                <form class="form">
                    <div class="form-outline mb-4">
                        <input type="email" id="form2Example1" class="form-control" onChange={this.changeUsername}/>
                        <label class="form-label" for="form2Example1">Username</label>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="form2Example2" class="form-control" onChange={this.changePassword}/>
                        <label class="form-label" for="form2Example2">Password</label>
                    </div>

                    <button 
                        type="button"
                         class="btn btn-light btn-block mb-4"
                         onClick={() => this.register()}>
                            <a href="/home">
                                Sign up
                                </a>
                        </button>

                    <div class="text-center">
                        <p>Back to log in: <a href="/login">Log in</a></p>
                    </div>
                </form>
            </div>
        )
    }
}