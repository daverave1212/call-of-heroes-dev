
import { assert } from '../../utils'
import './TableNormal.css'
import React from 'react'

export default function TableNormal({ children, columns, onClickOnColumn, type, tableWrapperClass, style, hasBorder }) {

    if (type == null)
        type = 'normal'
    if (hasBorder == null)
        hasBorder = true

    const tableTypeClass = 
        type == 'info'? 'table--info':
        type == 'info-reverse'? 'table--info-reverse':
        'table--normal'
    tableWrapperClass = tableWrapperClass == null? 'table-normal-wrapper' : tableWrapperClass

    function onClick(whatColumn) {
        if (onClickOnColumn != null) {
            onClickOnColumn(whatColumn)
        }
    }

    return (
        <div className='table-normal-container-wrapper'>
            <div className={`table-normal-container ${hasBorder? '' : 'table-normal-container--no-border'}`}>
                <div className='table-normal__header-row-container'>
                    <table className={tableTypeClass} cellSpacing="0"><tbody>
                        { columns != null && columns.length > 0 && (
                            <tr>{ columns.map((col, i) => ( <th key={i} onClick={() => onClick(col)}>{ col }</th> )) }</tr>
                        ) }
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