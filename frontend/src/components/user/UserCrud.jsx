import React, { Component } from 'react';
import Main from '../templates/Main'
import axios from 'axios'
import TextField from '../../components/TextField'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
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

export default class UserCrud extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        if (!this.isValidData()) {
            return;
        }

        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                const message = {text: 'Registro salvo com sucesso com o ID #' + resp.data.id, type: 'success', show: true}
                this.setState({ user: initialState.user, list, message })
            })
    }

    isValidData() {
        if (this.state.user.name.length === 0) {
            const message = {text: "O campo 'Nome' é de preenchimento obrigatório", type: 'danger', show: true}
            this.setState({message});
            return false;
        }

        if (this.state.user.email.length === 0) {
            const message = {text: "O campo 'Email' é de preenchimento obrigatório", type: 'danger', show: true}
            this.setState({message});
            return false;
        }

        return true;
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        add && list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <TextField class="col-12 col-md-6"
                        label="Nome"
                        name="name"
                        id="name"
                        required={true}
                        value={this.state.user.name}
                        onChange={e => this.updateField(e)}
                        placeholder="Digite o nome..." />

                    <TextField class="col-12 col-md-6"
                        label="E-mail"
                        type="email"
                        name="email"
                        required={true}
                        id="name"
                        value={this.state.user.email}
                        onChange={e => this.updateField(e)}
                        placeholder="Digite o e-mail..." />
                </div>
                <div className={`row ml-1 ${this.state.message.show ? '' : 'd-none'}`}>
                    <div className={"alert alert-" + this.state.message.type}>{this.state.message.text}</div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            onClick={e => this.save(e)}>Salvar</button>
                        <button
                            className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
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
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
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
                {this.renderForm()}
                {this.renderList()}
            </Main>
        )
    }
}