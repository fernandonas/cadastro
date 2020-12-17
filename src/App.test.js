import React from 'react'
import ListaDeNomes from './Componentes/ListaDeNomes/ListaDeNomes'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

it('Verifica se existe o nome "Nome Inicial" no componente "App".', () => {
  //Renderiza o componente.
  render(<App />)

  //Busca pelo nome.
  const nome = screen.getByText(/Nome Inicial/) // OBS: screen recebe o componente renderizado

  //Verifica se o nome foi renderizado.
  expect(nome).toBeInTheDocument()
})

it('Verifica se existe uma propriedade "name" com o valor "nome".', () => {
  //Renderiza o componente.
  render(<App />)

  //Busca o input text no componente.
  const inputText = screen.getByRole("textbox")

  //Verifica se o input text tem a propriedade "name" com o valor "nome".
  expect(inputText).toHaveAttribute('name', 'nome')
})

it('Verifica se existe um campo de texto com a propriedade "placeholder" com o valor "Digite um nome...".', () => {
  //Renderiza o componente.
  render(<App />)

  //Busca o input text no componente.
  const inputText = screen.getByRole("textbox")

  //Verifica se o input text tem a propriedade "placeholder" com o valor "Digite um nome...".
  expect(inputText).toHaveAttribute('placeholder', 'Digite um nome...')
})

it('Simula o cadastro de um nome.', () => {
  //Renderiza o componente.
  render(<App />)

  //Busca o input text no componente.
  const inputText = screen.getByRole("textbox")

  //Insere texto no input
  fireEvent.change(inputText, { target: { value: 'Novo Nome' } })

  //Verifica se o valor do campo text é "Novo Nome"
  expect(inputText.value).toEqual('Novo Nome')

  //Busca pelo botao no componente renderizado - Aqui esta buscando pelo data-testId
  const button = screen.getByTestId('enviar') 

  //Simula o click no botão.
  fireEvent.click(button)

  //Busca pelo nome que foi inserido.
  const nomes = screen.getByText(/Novo Nome/)

  //Verifica se o nome foi inserido.
  expect(nomes).toBeInTheDocument()
})

it('Verifica se existe um h5 com a frase "Nomes Listados".', () => {
  //mock das states
  let nomes = ['Nome']
  let setNomes = jest.fn()

  //Renderiza o componente
  render(<ListaDeNomes nomes={nomes} setNomes={setNomes} />)

  //Busca o texto na tag h5
  const texto = screen.getByRole("heading", { level: 5 }).innerHTML

  //Verifica se o texto retornado é Nomes Listados
  expect(texto).toEqual('Nomes Listados')
})

it('Verifica se a função setNomes foi chamada.', () => {
  //Mock das states
  let nomes = ['Fernando']
  let setNomes = jest.fn()

  //Renderiza o componente.
  render(<ListaDeNomes nomes={nomes} setNomes={setNomes} />)

  //Busca pelo botão no componente renderizado;
  const button = screen.getByTestId('enviar')

  //Simula o click no botão.
  fireEvent.click(button)

  //Verifica se a função setNome foi chamada
  expect(setNomes).toHaveBeenCalled()
})

it('Caso o nome já esteja cadastrado deve exibir um alerta com a mensagem "Nome já cadastrado".', () => {
  //Mock das states
  let nomes = ['Fernando']
  let setNomes = jest.fn()

  //Mock do alert
  jest.spyOn(window, 'alert').mockImplementation(() => { });

  //Renderiza o componente.
  render(<ListaDeNomes nomes={nomes} setNomes={setNomes} />)

  //Busca o input text no componente.
  const inputText = screen.getByRole("textbox")

  //Insere texto no input
  fireEvent.change(inputText, { target: { value: 'Fernando' } })

  //Verifica se o valor do campo text é o valor digitado
  expect(inputText.value).toEqual('Fernando')

  //Busca pelo botao no componente renderizado;
  const button = screen.getByTestId('enviar')

  //Simula o click no botão.
  fireEvent.click(button)

  //Verifica se a mensagem "Nome já cadastrado" foi exibida no alert
  expect(window.alert).toBeCalledWith("Nome já cadastrado")

  //Verifica se a função setNome não foi chamada.
  expect(setNomes).not.toHaveBeenCalled()
})