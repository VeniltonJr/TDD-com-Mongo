import { Validation } from '../../protocols/validation'
import { InvalidParamError } from '../../errors'

export class CompareFieldsValidation implements Validation{
  
  private readonly fieldName: string
  private readonly fieldToCompareName: string

  constructor(fieldName: string, fieldToCompareName: string){
    this.fieldName = fieldName
    this.fieldToCompareName = fieldToCompareName
  }

  validate (imput: any): Error {
    if (imput[this.fieldName] !== imput[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}