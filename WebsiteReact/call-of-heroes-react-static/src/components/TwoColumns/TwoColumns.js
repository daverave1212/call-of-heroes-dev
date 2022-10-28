
import './TwoColumns.css'
import React from 'react'

export default function TwoColumns({ children }) {

    return (
        <div className='two-columns'>
            { children }
        </div>
    )
}