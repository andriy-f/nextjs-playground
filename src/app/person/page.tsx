import React from 'react'

import PersonForm from '@/features/person/PersonForm'

const Page: React.FC = () => {
    return (
        <div className='max-w-lg ml-auto mr-auto pt-12'>
            <h1 className='text-3xl text-center'>Formik samples</h1>
            <PersonForm />
        </div>
    )
}

export default Page