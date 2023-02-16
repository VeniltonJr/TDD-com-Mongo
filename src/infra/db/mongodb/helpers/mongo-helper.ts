import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string) {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  }
}