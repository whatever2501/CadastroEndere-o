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
  const deletarUsuario = async (id) => {
    try {
      const response = await fetch(`./usuarios/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Atualiza a lista de usuários após a exclusão
        const updatedUsuarios = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(updatedUsuarios);
      } else {
        console.error('Erro ao excluir o usuário');
      }
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
    }
  };

  const clearEndereco = () => {
    setUsuarioEditando({
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
  };

  const handleCepBlur = async () => {
    const { cep } = usuarioEditando;
    const cepForm =  cep.replace(/[^\d]/g, '')
    
    if (cepForm.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepForm}/json/`);
        const data = await response.json();

        if (data.erro) {
          alert('CEP não encontrado.');
          clearEndereco();
        } else {
          setUsuarioEditando({
            ...usuarioEditando,
            logradouro: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || '',
          });
        }
      } catch (error) {
        alert('Erro ao buscar o CEP.');
        clearEndereco();
      }
    } else {
      alert('Digite um CEP válido com 8 dígitos.');
      clearEndereco();
    }
  };
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
  const formatarCEP = (cep) =>{
    cep =  cep.replace(/[^\d]/g, '')
    if (cep.length > 8) {
      cep = cep.slice(0, 8); // Limita a 8 dígitos
    }
    return cep
      .replace(/(\d{5})(\d{3})$/, '$1-$2')
   
  };
  const formatarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
  
    if (cpf.length > 11) {
      cpf = cpf.slice(0, 11); // Limita a 11 dígitos
    }
  
    // Adiciona os pontos e traço conforme o padrão
    return cpf
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };
  // Função para atualizar o campo do usuário sendo editado
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === 'cpf'){
      const cpfFormatado = formatarCPF(value)
      setUsuarioEditando((prev) => ({ ...prev, [name]: cpfFormatado }));
    }
    else if(name === 'cep'){
      const cepFormatado = formatarCEP(value)
      setUsuarioEditando((prev) => ({ ...prev, [name]: cepFormatado }));
    }
    else{
    setUsuarioEditando((prev) => ({ ...prev, [name]: value }));
    
  }};

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
                  <button style={{marginLeft:"0.5em"}}
                    className="btn btn-danger"
                    onClick={() => deletarUsuario(usuario.id)}
                  >
                   Excluir
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
                onBlur={handleCepBlur} 
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
