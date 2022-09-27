import React, {Component} from "react";

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state={
            users:[],
            modalTitle:"",
            Id:0,
            UserName:"",
            IsAdmin:"",
            Password:"",
        }
    }

    render() {
        return(
            <div>
                <form className="form">
                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" />
                        <label className="form-label" for="form2Example1">Username</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" />
                        <label className="form-label" for="form2Example2">Password</label>
                    </div>

                    <button type="button" className="btn btn-light btn-block mb-4"><a href="/home">Log in</a></button>

                    <div className="text-center">
                        <p>Not a member? <a href="/register">Register</a></p>
                    </div>
                </form>
            </div>
        )
    }
}