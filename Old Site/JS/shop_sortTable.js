function sortTableByName(table) {
    const getNameFromRow = row => row.children[0].children[0].innerText
    const compareByNameAscending = (a, b) => getNameFromRow(a) > getNameFromRow(b) ? 1 : -1
    const compareByNameDescending = (a, b) => getNameFromRow(a) < getNameFromRow(b) ? 1 : -1

    let dataSort = table.getAttribute('data-sort-name')
    let rows = null
    if (dataSort == null || dataSort == 'descending') {
       table.setAttribute('data-sort-name', 'ascending')
       rows = Array.from(table.querySelectorAll('tr')).slice(1).sort(compareByNameAscending)
    } else if (dataSort == 'ascending') {
       table.setAttribute('data-sort-name', 'descending')
       rows = Array.from(table.querySelectorAll('tr')).slice(1).sort(compareByNameDescending)
    }
    for (let row of rows) row.remove()
    for (let row of rows) table.appendChild(row)    
 }

 function sortTableByPrice(table) {
    const getPriceFromRow = row => parseInt(row.children[1].children[0].innerText)
    const compareByPriceAscending = (a, b) => getPriceFromRow(a) - getPriceFromRow(b)
    const compareByPriceDescending = (a, b) => getPriceFromRow(b) - getPriceFromRow(a)


    let dataSort = table.getAttribute('data-sort-price')
    let rows = null
    if (dataSort == null || dataSort == 'descending') {
       table.setAttribute('data-sort-price', 'ascending')
       rows = Array.from(table.querySelectorAll('tr')).slice(1).sort(compareByPriceAscending)
    } else if (dataSort == 'ascending') {
       table.setAttribute('data-sort-price', 'descending')
       rows = Array.from(table.querySelectorAll('tr')).slice(1).sort(compareByPriceDescending)
    }
    for (let row of rows) row.remove()
    for (let row of rows) table.appendChild(row)     
 }
 
 document.querySelectorAll('table th:nth-child(2)').forEach(th => {
    th.addEventListener('click', function(){
       sortTableByPrice(this.parentNode.parentNode.parentNode)
    })
 })
 document.querySelectorAll('table th:nth-child(1)').forEach(th => {
    th.addEventListener('click', function(){
       sortTableByName(this.parentNode.parentNode.parentNode)
    })
 })