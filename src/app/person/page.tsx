import React from 'react'

import FormikWithCustomComponents from '@/app/person/FormikWithCustomComponents'

const Page: React.FC = () => {
    return (
        <div className='max-w-lg ml-auto mr-auto pt-12'>
            <h1 className='text-3xl text-center'>Formik samples</h1>
            <FormikWithCustomComponents />
        </div>
    )
}

export default Page