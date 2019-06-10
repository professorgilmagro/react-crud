import React, { Component } from 'react';
import Main from '../templates/Main'
import axios from 'axios'
import { Link } from 'react-router-dom'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Lista de usuários cadastrados'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: [],
    message: {
        show: false,
        text: '',
        type: 'success'
    }
}

export default class List extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        add && list.unshift(user)
        return list
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderList() {
        return (
            <div className="table-responsive">
                <div className="col-12">
                    <Link to="/users/create" className="btn btn-primary pull-right mb-3">
                        <i className="fa fa-user-plus "></i> Novo
                    </Link>
                </div>

                <table className="table mt-4 table-striped table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderListRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    renderListRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link to={`/users/edit/${user.id}`} className="btn btn-warning" >
                            <i className="fa fa-pencil "></i>
                        </Link>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderList()}
            </Main>
        )
    }
}