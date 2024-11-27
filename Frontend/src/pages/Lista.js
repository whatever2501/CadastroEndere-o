import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null); // Inicializando com null

  // Função para buscar os usuários
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('./usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Erro ao carregar os usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  // Função para editar o usuário
  const editarUsuario = (usuario) => {
    console.log('Editando usuário:', usuario);
    setUsuarioEditando({ ...usuario}); 

  };
  useEffect(() => {
    console.log('usuarioEditando atualizado:', usuarioEditando);
  }, [usuarioEditando]);
 
  const salvarEdicao = async () => {
    try {
      const response = await fetch(`./usuarios/${usuarioEditando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioEditando),
      });

      if (response.ok) {
        // Atualiza a lista de usuários após a edição
        const updatedUsuarios = usuarios.map((user) =>
          user.id === usuarioEditando.id ? usuarioEditando : user
        );
        setUsuarios(updatedUsuarios);
        setUsuarioEditando(null); // Fecha o formulário de edição
      } else {
        console.error('Erro ao salvar a edição');
      }
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
    }
  };

  // Função para atualizar o campo do usuário sendo editado
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEditando((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container" style={{ marginTop: '3em' }}>
      <h1 style={{ textAlign: 'center' }}>Lista de Usuários</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>CEP</th>
            <th>Logradouro</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.cep}</td>
                <td>{usuario.logradouro}</td>
                <td>{usuario.bairro}</td>
                <td>{usuario.cidade}</td>
                <td>{usuario.estado}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => editarUsuario(usuario)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Nenhum usuário cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {usuarioEditando && (
        <Container>
          <h2>Editar Usuário</h2>
          <form>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={usuarioEditando.nome}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>CPF</label>
              <input
                type="text"
                name="cpf"
                value={usuarioEditando.cpf}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>CEP</label>
              <input
                type="text"
                name="cep"
                value={usuarioEditando.cep}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Logradouro</label>
              <input
                type="text"
                name="logradouro"
                value={usuarioEditando.logradouro}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Bairro</label>
              <input
                type="text"
                name="bairro"
                value={usuarioEditando.bairro}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Cidade</label>
              <input
                type="text"
                name="cidade"
                value={usuarioEditando.cidade}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <input
                type="text"
                name="estado"
                value={usuarioEditando.estado}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button type="button" onClick={salvarEdicao} className="btn btn-success">
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setUsuarioEditando(null)}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          </form>
        </Container>
      )}
    </div>
  );
};

export default ListarUsuarios;
