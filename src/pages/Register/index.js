import { useState } from 'react'
import {Link} from 'react-router-dom'
import auth from '../../fireAuth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleRegister(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await createUserWithEmailAndPassword(auth, email, password)
    }else{
      alert('Preencha todos os campos')
    }

    
  }

  return (
    <div className='home-container'>
      <h1>Cadastra-se</h1>
      <span>Crie sua conta</span>

      <form className='form' onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Digite seu email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input          
          type='password'
          placeholder='***'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>Cadastrar</button>

      </form>
      
      <Link className='button-link' to='/'>
        Ja possui uma conta? Faça o login
      </Link>
    </div>
  )
}