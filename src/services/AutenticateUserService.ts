/**
 * Receber o código via string - done
 * Recuperar o acess_token no github -
 * com o token as infos do usuario no github
 * Verificar se o usuario existe no DB
 * se sim = gera um token
 * se não = cria um token no Banco de Dados(DB, ou Database), gerando um token
 * Retornar o token com as infos do usuario
 */

import axios from "axios";

interface IAcessTokenResponsive{
  access_token: string
}
interface IUserResponse {
  avatar_url:string,
  login:string,
  id:number,
  name: string,
}
class AutenticateUserService {
 async execute(code: string){
  const url = 'https://github.com/login/oauth/access_token'

    const { data: acessTokenResponse } = await axios.post<IAcessTokenResponsive>(url, null,{
    params:{
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    headers :{
      Accept : "application/json"
    }
  })
  const response = await axios.get<IUserResponse>("https://api.github.com/user", {
    headers:{
      authorization: `Bearer ${acessTokenResponse.access_token}`
    }
  })

  return response.data;
}
}
export {AutenticateUserService};
