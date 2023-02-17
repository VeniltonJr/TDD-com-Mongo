import { MongoClient, Collection, ObjectId } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string) {
    this.client = await MongoClient.connect(url)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any, _id: ObjectId): AccountModel => {
    const id = String(_id)
    return {
      ...collection,
      id
    }
  }
}
