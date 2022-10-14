import { useState, useEffect } from 'react'
import auth from '../../fireAuth'
import { signOut } from 'firebase/auth'
import db from '../../fireStore'
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc } from 'firebase/firestore';

import './admin.css'

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})
  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem('@detailUser')
      setUser(JSON.parse(userDetail))

      if (userDetail) {
        const data = JSON.parse(userDetail);
        const tarefaRef = collection(db, 'tarefas')
        const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid))
        onSnapshot(q, (snapshot) => {
          let lista = []
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefas: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })
          
          console.log(lista)
          setTarefas(lista)
        })
      }
    }
    loadTarefas()
  }, [])

  async function handleRegister(e) {
    e.preventDefault()

    if (tarefaInput === '') {
      alert('digite sua tarefa')
      return;
    }
    await addDoc(collection(db, 'tarefas'), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
      .then(() => {
        console.log('tarefa registrada')
        setTarefaInput('')
      })
      .catch((error) => {
        console.log('erro' + error)
      })
  }

  async function handleLogout() {
    await signOut(auth)
  }

  async function deleteTarefa(id){
    const docRef = doc(db, 'tarefas', id)
    await deleteDoc(docRef)
  }


  return (
    <div className='admin-container'>
      <h1>Minhas tarefas</h1>

      <form className='form' onSubmit={handleRegister}>
        <textarea
          placeholder='digite sua tarefa'
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />
        <button className='btn-register' type='submit'>Registrar Tarefa</button>
      </form>

      {tarefas.map((item) => (
      <article key={item.id} className="list">
        <p>{item.tarefas}</p>

        <div>
          <button>Editar</button>
          <button onClick={ () => deleteTarefa(item.id)} className="btn-delete">Concluir</button>
        </div>
      </article>
      ))}

      <button className='btn-logout' onClick={handleLogout}>Sair</button>
    </div>
  )
}