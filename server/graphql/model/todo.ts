import type { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { todo } from '../../db/model'

export type GetTaskInputType = {
  input: {
    taskId: string
  }
}

class ToDo {
  private db

  constructor(db: NeonHttpDatabase<Record<string, never>>) {
    this.db = db
  }

  getToDos = async () => {
    const res = await this.db
      .select()
      .from(todo)
    return res
  }

}

export default ToDo
