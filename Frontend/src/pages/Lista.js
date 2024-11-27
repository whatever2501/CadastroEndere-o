import {React, useState,useEffect } from 'react';
import {Container } from 'reactstrap';

const Lista = () => {

  const [usuarios, setUsuarios] = useState([]);

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



  return (
    <Container style={{marginTop:'3em'}} >
      <h1 style={{  textAlign: 'center'}}
          className="text-center">Endereços</h1>
          <br></br>
          <div className="container" style={{ marginTop: '3em' }}>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Nenhum usuário cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
    </div>
      
    </Container>
  );
};


export default Lista;