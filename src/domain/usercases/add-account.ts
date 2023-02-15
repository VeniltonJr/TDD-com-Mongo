import { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount{
  add (acount: AddAccountModel): AccountModel
}
