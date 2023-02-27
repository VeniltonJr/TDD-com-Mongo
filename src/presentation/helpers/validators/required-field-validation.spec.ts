import { MissingParamError } from "../../errors"
import { RequiredFieldsValidation } from "./required-fields-validation"

const makeSut = (): RequiredFieldsValidation => {
  return new RequiredFieldsValidation('field')
}

describe ('RequiredField Validation', () => {

  test ('deve retornar um MissingParamError se a validacao falhar', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test ('nao deve retornar nada se a validacao funcionar', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})