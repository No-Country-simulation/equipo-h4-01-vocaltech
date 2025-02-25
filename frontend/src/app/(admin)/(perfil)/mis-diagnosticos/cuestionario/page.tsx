import Loading from '@/app/loading';
import { FormNewContainer } from '@/components/view/Cuestionario';
import React, { Suspense } from 'react'

export default function page() {
  return (
      <div className='col-span-full'>
        <Suspense fallback={<Loading />}>
    <FormNewContainer />
    </Suspense>
    </div>
  )
}
