import React from 'react'
import Navbar from './_components/Navbar'

function Dashboardpage({ children }: any) {
    return (
        <div>
            <Navbar />
            <div className='pt-16 mx-5 md:mx-20 lg:mx-36'>
                {children}
            </div>
        </div>
    )
}

export default Dashboardpage
