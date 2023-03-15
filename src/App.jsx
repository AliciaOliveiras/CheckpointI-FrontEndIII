import { useState } from 'react'
import './App.css'

/* [{
  titulo: "",
  categoria:"",
  data:"",
  descricao:"";
}] */

function App() {

  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const[categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  const[listaTarefas, setListaTarefas] = useState([]);

  function addTarefa(event){
    event.preventDefault();

/*     if(titulo === "" || categoria === "" || data === "" || descricao === ""){
      alert("Preencha todas as informações corretamente")
      return
    }  */

    if(titulo.length < 5){
      alert("Tamanho do título inválido. Adicione mais caracteres.")
      return
    }

    if(categoria === ""){
      alert("Marque uma das categorias disponíveis.")
      return
    }

    if(data === ""){
      alert("Selecione uma data para sua tarefa.")
      return
    }

    console.log(data)

    if(descricao.length < 10){
      alert("Descrição nula ou muito pequena, dê mais detalhes.")
      return
    }

    if(id){
      const copiaListaTarefas = [...listaTarefas];
      const index = copiaListaTarefas.findIndex((tarefa) => tarefa.id === id);

      copiaListaTarefas[index].titulo = titulo
      copiaListaTarefas[index].categoria = categoria
      copiaListaTarefas[index].data = data
      copiaListaTarefas[index].descricao = descricao

    } else {
          setListaTarefas([
      ...listaTarefas, 
      {
      id: Date.now(),
      titulo: titulo,
      categoria: categoria,
      data: data.split('-').reverse().join('/'),
      descricao:descricao,
    }
   ]);
  }

   setId("")
   setTitulo("")
   setCategoria("")
   setData("")
   setDescricao("")
  }

  function excluirTarefa(id){
    if (confirm("Deseja realmente apagar a tarefa?")){
      const result = listaTarefas.filter((tarefa) => tarefa.id !== id);
      setListaTarefas(result);
    }
  }

  function editarDados(tarefa){
    setId(tarefa.id);
    setTitulo(tarefa.titulo);
    setCategoria(tarefa.categoria);
    setData(tarefa.data.split('-').reverse().join('/'));
    setDescricao(tarefa.descricao)
  }

  return (
    <div className="container">
      <div className='left'>
      <form className='form' onSubmit={addTarefa}>
        
        <h4>Cadastrar Tarefa</h4>

        <input  
        value={titulo} 
        onChange={(event) => setTitulo(event.target.value)}
        placeholder="Título"
        className='titulo'
        />

        <select
        value={categoria}
        onChange={(event) => setCategoria(event.target.value)}
        placeholder="Categoria"
        className='categoria'
        >
          <option value="" disabled>Categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Lazer">Lazer</option>
          <option value="Prioridades">Prioridades</option>
          <option value="Outros">Outros</option>
        </select>

        <input type="date"
        value={data}
        onChange={(event) => setData(event.target.value)}
        placeholder="Data"
        className="data"
        />

        <textarea name="descricao" placeholder="Descrição"
        value={descricao}
        onChange={(event) => setDescricao(event.target.value)}
        className="descricao"
        ></textarea>

        <input className='salvar' type="submit" value={id ? "Salvar Alterações" : "Cadastrar Nova Tarefa"} />
      </form>
      </div>

      <div className='right'>
        <div className='bottom'>
        <h1>Minhas Tarefas</h1>
        <h3 className='total'>Total: {listaTarefas.length} </h3>
        </div>

      {
        listaTarefas.length > 0 ? (

         <ul id='lista'>
          {listaTarefas.map((tarefa) => (
            <li className='item' key={tarefa.id}>
             <h3 id='titulo'>{tarefa.titulo}</h3>
             <p id='categoria'>Categoria: {tarefa.categoria}</p>
             <p id='descricao'>{tarefa.descricao}</p>
             <h3 id='data'>{tarefa.data.split('-').reverse().join('/')}</h3>

             <img 
             id='excluir' 
             onClick={() => excluirTarefa(tarefa.id)}
             src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png" />

             <img 
             id='editar'
             onClick={() => editarDados(tarefa)}
             src="https://www.saocristovao.se.gov.br/icons/edit.png" />

            </li>
            ))}
         </ul>
      ) : (
        <p className='noTask'>Nenhuma tarefa cadastrada.</p>
      )}
      </div>
    </div>
    )
  }


export default App;
