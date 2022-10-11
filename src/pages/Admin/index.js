import {useState} from 'react'
import auth from '../../fireAuth'
import {signOut} from 'firebase/auth'
import './admin.css'

export default function Admin(){
  const [tarefaInput, setTarefaInput] = useState('')

  function handleRegister(e){
    e.preventDefault()
    alert('clicou')
  }

  async function handleLogout(){
    await signOut(auth)
  }


  return(
    <div className='admin-container'>
      <h1>Minhas tarefas</h1>

      <form className = 'form' onSubmit={handleRegister}>
        <textarea 
        placeholder= 'digite sua tarefa'
        value={tarefaInput}
        onChange = {(e)=>setTarefaInput(e.target.value)}
        />
        <button className='btn-register' type='submit'>Registrar Tarefa</button>
      </form>

      <article className='list'>
        <p>JS e React</p>

        <div>
          <button>Editar</button>
          <button className='btn-delete'>Concluir</button>
        </div>
      </article>

      <button className='btn-logout' onClick={handleLogout}>Sair</button>
    </div>
  )
}