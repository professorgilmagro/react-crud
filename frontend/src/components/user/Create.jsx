import React, { Component } from 'react';
import Main from '../templates/Main'
import axios from 'axios'
import TextField from '../../components/TextField'
import {Link} from 'react-router-dom'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir'
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

export default class Create extends Component {

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

        if (!this.isValidData()) {
            return;
        }

        axios.post(baseUrl, user)
            .then(resp => {
                const message = {text: 'Registro salvo com sucesso com o ID #' + resp.data.id, type: 'success', show: true}
                this.setState({ user: initialState.user, message })
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
                        <Link
                            className="btn btn-secondary ml-2"
                            to="/users/list">Cancelar</Link>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}