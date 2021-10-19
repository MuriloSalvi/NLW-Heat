import {Request,Response} from 'express'
import {AutenticateUserService} from '../services/AutenticateUserService'

class AuthenticateUserController{
  async handle(req: Request,res:Response){
    const {code} = req.body
    const service = new AutenticateUserService();
    const result = await service.execute(code)

    return res.json(result)
  }
}

export { AuthenticateUserController }