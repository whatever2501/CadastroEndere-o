import {React, useState} from 'react';
import { Button, Container, Form, FormGroup, Input, Label,Row,Col  } from 'reactstrap';


const Cadastro = () => {

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
  }); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const clearEndereco = () => {
    setFormData({
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
  };

  const handleCepBlur = async () => {
    const { cep } = formData;

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          alert('CEP não encontrado.');
          clearEndereco();
        } else {
          setFormData({
            ...formData,
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



  return (
  
    <Container style={{marginTop:'3em'}} >
      <h1 style={{  textAlign: 'center'}}
          className="text-center">Cadastro Endereço</h1>
   <br></br>
   <Form>
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="nome">Nome</Label>
        <Input type="text" name="nome" id="nome" value={formData.nome} onChange={handleInputChange} autoComplete="nome" />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="cpf">CPF</Label>
        <Input type="text" name="cpf" id="cpf" autoComplete="cpf" />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md={4}>
      <FormGroup>
        <Label for="cep">CEP</Label>
        <Input  value={formData.cep} onChange={handleInputChange} onBlur={handleCepBlur} type="text" name="cep" id="cep" autoComplete="cep" maxLength="8" />
      </FormGroup>
    </Col>
    <Col md={8}>
      <FormGroup>
        <Label for="logradouro">Logradouro</Label>
        <Input value={formData.logradouro} onChange={handleInputChange} type="text" name="logradouro" id="logradouro" autoComplete="logradouro" />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="bairro">Bairro</Label>
        <Input value={formData.bairro} onChange={handleInputChange} type="text" name="bairro" id="bairro" autoComplete="bairro" />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="cidade">Cidade</Label>
        <Input value={formData.cidade} onChange={handleInputChange} type="text" name="cidade" id="cidade" autoComplete="cidade" />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="estado">Estado</Label>
        <Input value={formData.estado} onChange={handleInputChange} type="text" name="estado" id="estado" autoComplete="estado" />
      </FormGroup>
    </Col>
  </Row>
  <Button color="success">Salvar</Button>
</Form>
    
    
    </Container>

  );
};

export default Cadastro;
