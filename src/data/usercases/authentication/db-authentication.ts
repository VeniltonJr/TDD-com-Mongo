import { AuthenticationModel, Authentication, LoadAccountByEmailRepository, HashCompare, Encrypter, UpdateAccessTokenRepository } from "./db-authentication-protocols"

export class DbAuthentication implements Authentication{
  
  private readonly loadAccountRepository: LoadAccountByEmailRepository
  private readonly hashCompare: HashCompare
  private readonly encrypter:Encrypter
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  
  constructor(loadAccountRepository: LoadAccountByEmailRepository, hashCompare: HashCompare, encrypter:Encrypter, updateAccessTokenRepository: UpdateAccessTokenRepository) {
    this.loadAccountRepository = loadAccountRepository
    this.hashCompare = hashCompare
    this.encrypter = encrypter
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }
  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountRepository.load(authentication.email)
    if (account){
      const isValid = await this.hashCompare.compare(authentication.password, account.password)
      if(isValid){
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}