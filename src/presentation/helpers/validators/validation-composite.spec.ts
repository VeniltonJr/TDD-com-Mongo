import { MissingParamError } from "../../errors"
import { Validation } from "../../protocols/validation"
import { ValidationComposite } from "./validation-composite"

const makeValidation = (): Validation => {
  class ValidationStub implements Validation{
    validate (imput: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {

  test('deve retornar o mesmo erro que qualquer validation que falhar', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValue(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('deve retornar o primeiro erro se mais de um validation que falhar', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValue(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValue(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

})