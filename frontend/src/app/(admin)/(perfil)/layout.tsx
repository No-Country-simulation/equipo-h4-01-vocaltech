import React, { ReactNode } from 'react'
import LeftSidebar from './components/LeftSidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-12 gap-8">
        <LeftSidebar />
    {children}
    </div>
</div>
  )
}
