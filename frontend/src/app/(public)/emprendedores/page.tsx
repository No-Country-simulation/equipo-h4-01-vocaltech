import React from 'react'

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
  return (
    <div>page</div>
  )
}
