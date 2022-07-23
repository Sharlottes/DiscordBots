import { Schema, Document, model } from 'mongoose'

export interface IAccount {
  userId: string
  password: string
  email?: string
  id: string
}

interface IAccountDocument extends IAccount, Omit<Document, 'id'> { }

const accountSchema = new Schema<IAccountDocument>(
  {
    userId: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'accounts',
  },
)

export default model<IAccountDocument>('Account', accountSchema)