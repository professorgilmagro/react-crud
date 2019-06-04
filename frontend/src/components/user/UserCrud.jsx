import React, { Component } from 'react';
import Main from '../templates/Main'
import axios from 'axios'
import TextField from '../templates/TextField'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'PUT' : 'POST'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method]({ url, user })
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
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
                    <TextField col="12" colMd="6"
                        label="nome"
                        name="name"
                        id="name"
                        value={this.state.user.name}
                        onChange={e => this.updateField(e)}
                        placeholder="Digite o nome..." />

                    <TextField col="12" colMd="6"
                        label="email"
                        type="email"
                        name="email"
                        id="name"
                        value={this.state.user.email}
                        onChange={e => this.updateField(e)}
                        placeholder="Digite o e-mail..." />
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                Cadastro de usuário
            </Main>
        )
    }
}