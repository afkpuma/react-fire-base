// configurando as rotas no App.js
import { BrowserRouter } from 'react-router-dom'
//Pegando a rota do folder Routes
import RoutesApp  from './routes'
export default function App(){
  return(
    <BrowserRouter>
    <RoutesApp/>
    </BrowserRouter>
  )
}