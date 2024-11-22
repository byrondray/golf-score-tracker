// import { QueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { type ApiRoutes } from '../../../../golf-app-api/my-app/src/app'
import { hc } from 'hono/client'
import { useEffect } from 'react'

export const client = hc<ApiRoutes>('/')

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

async function fetchCourse() {
  const c = await client.api.courses.$get()
  const d = await c.json()
  console.log(d)
}

function Index() {
  useEffect(() => {
    async function fetchData() {
      await fetchCourse()
    }
    fetchData()
  })
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
