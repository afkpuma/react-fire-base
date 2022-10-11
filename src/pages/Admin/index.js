import {useState, useEffect} from 'react'
import auth from '../../fireAuth'
import {signOut} from 'firebase/auth'
import db from '../../fireStore'
import {addDoc, collection} from  'firebase/firestore';

import './admin.css'

export default function Admin(){
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})

  useEffect(()=>{
    async function loadTarefas(){
      const userDetail = localStorage.getItem('@detailUser')
      setUser(JSON.parse(userDetail))
    }
    loadTarefas()
  },[])

  async function handleRegister(e){
    e.preventDefault()
    
    if(tarefaInput === ''){
      alert('digite sua tarefa')
      return;
    }
    await addDoc(collection(db, 'tarefas'),{
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
    .then(()=>{
      console.log('tarefa registrada')
      setTarefaInput('')
    })
    .catch((error)=>{
      console.log('erro' + error)
    })
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