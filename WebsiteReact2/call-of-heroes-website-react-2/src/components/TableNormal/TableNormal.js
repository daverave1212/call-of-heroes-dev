
import './TableNormal.css'
import React from 'react'

export default function TableNormal({ children, columns, type, tableWrapperClass }) {

    if (type == null)
        type = 'normal'

    const tableTypeClass = 
        type == 'info'? 'table--info':
        type == 'info-reverse'? 'table--info-reverse':
        'table--normal'
    tableWrapperClass = tableWrapperClass == null? 'table-normal-wrapper' : tableWrapperClass

    return (
        <div className='table-normal-container-wrapper'>
            <div className='table-normal-container'>
                <div className='table-normal__header-row-container'>
                    <table className={tableTypeClass} cellSpacing="0"><tbody>
                        <tr>{ columns.map((col, i) => ( <th key={i}>{ col }</th> )) }</tr>
                    </tbody></table>
                </div>

                <div className={tableWrapperClass}>
                    <table className={tableTypeClass} cellSpacing="0">
                        <tbody>{children}</tbody>
                    </table>
                </div>
            </div>
        </div>
        
    )
}