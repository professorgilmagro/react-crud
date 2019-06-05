import React from 'react';
import Main from '../templates/Main'

export default props =>
    <Main icon="home" title="Início" subtitle="Projeto React: Cadastro de usuários">
        <div className="display-4">Bem vindo!</div>
        <hr />
        <p className="mb-0">
            Sistema para exemplificar um sistema de cadastro desenvolvido em React:
            </p>
            <ol className="mt-2">
                <li>JSON Server</li>
                <li>React Router</li>
                <li>Routes</li>
                <li>Components</li>
                <li>Fragment</li>
                <li>Bootstrap</li>
                <li>Responsible template</li>
            </ol>
    </Main>