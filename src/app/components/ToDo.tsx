import { GetTodosDocument } from '@/graphql/generated/graphql'
import { getClient } from '@/lib/apollo/apolloClient'

export async function ToDo() {
  const { data } = await getClient().query({ query: GetTodosDocument })
  return (
    <div>
      <div>data:{JSON.stringify(data)}</div>
    </div>
  )
}
