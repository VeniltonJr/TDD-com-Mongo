import { Validation } from '../../protocols/validation'
import { MissingParamError } from '../../errors'

export class RequiredFieldsValidation implements Validation{
  
  private readonly fieldName: string

  constructor(fieldName: string){
    this.fieldName = fieldName
  }

  validate (imput: any): Error {
    if (!imput[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}