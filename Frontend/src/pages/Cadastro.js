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
  const [erroCPF, setErroCPF] = useState(false);
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
  
    if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos
  
    // Verifica se o CPF é uma sequência de números iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
  
    // Valida o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    // Valida o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpf') {
      // Formatar o CPF e validar
      const cpfFormatado = formatarCPF(value);
      setFormData({ ...formData, cpf: cpfFormatado });
      setErroCPF(!validarCPF(cpfFormatado));
    } 
    if(name === 'cep'){
      const cepFormatado = formatarCEP(value)
      setFormData({ ...formData, cep: cepFormatado });
    }
      else {
      setFormData({ ...formData, [name]: value });
  }};
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
    const cepForm =  cep.replace(/[^\d]/g, '')

    if (cepForm.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepForm}/json/`);
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
      alert('Digite um CEP válido com 8 sdígitos.');
      clearEndereco();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (erroCPF) {
      alert('CPF inválido!');
      return;
    }
    // Envia os dados para o backend
    try {
      const response = await fetch('./usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuário cadastrado com sucesso:', data);
      } else {
        console.error('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro de comunicação com o backend:', error);
    }
  };

  return (
  
    <Container style={{marginTop:'3em'}} >
      <h1 style={{  textAlign: 'center'}}
          className="text-center">Cadastro Endereço</h1>
   <br></br>
   <Form  onSubmit={handleSubmit}>
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
        <Input value={formData.cpf} onChange={handleInputChange} type="text" name="cpf" id="cpf" autoComplete="cpf" />
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
  <Button color="success" type="submit" className="btn btn-primary">Salvar</Button>
</Form>
    
    
    </Container>

  );
};

export default Cadastro;
