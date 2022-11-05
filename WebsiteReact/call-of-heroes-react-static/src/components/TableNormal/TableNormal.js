
import './TableNormal.css'
import React from 'react'

export default function TableNormal({ children, columns, type }) {

    if (type == null)
        type = 'normal'

    const tableTypeClass = type == 'info'? 'table--info': 'table--normal'

    return (
        <div className='table-normal-container-wrapper'>
            <div className='table-normal-container'>
                <div className='table-normal__header-row-container'>
                    <table className={tableTypeClass} cellSpacing="0"> <tbody>
                        <tr>{ columns.map(col => ( <th>{ col }</th> )) }</tr>
                    </tbody> </table>
                </div>

                <div className='table-normal-wrapper'>
                    <table className={tableTypeClass} cellSpacing="0" css='border: solid red 3px'>
                        <tbody>{children}</tbody>
                    </table>
                </div>
            </div>
        </div>
        
    )
}