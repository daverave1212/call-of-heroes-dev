

const capitalizeEachWord = str => str.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
const highlight = dom => dom ? dom.classList.add('auto-complete-list--highlighted') : null
const unhighlight = dom => dom ? dom.classList.remove('auto-complete-list--highlighted') : null
const createLi = (content, index, clickListener) => {
    let li = document.createElement('li')
    li.innerText = content
    li.setAttribute('data-index', index)
    if (clickListener) li.addEventListener('click', (e) => {
        e.stopPropagation()
        clickListener(li)
    })
    return li
}


export class AutoCompleter {

    autoCompleteList
    currentHighlightedIndex = 0
    isOpen = false
    
    __generateAutoCompleteList() {
        this.autoCompleteList = document.createElement('ul')
        this.autoCompleteList.classList.add('auto-complete-list')
        this.autoCompleteList.classList.add('auto-complete-list--hidden')
    }

    __getHighlightedElement() {
        return this.autoCompleteList.children[this.currentHighlightedIndex]
    }

    constructor(parent, input, tagList) {
        this.parent = parent
        this.input = input
        this.tagList = tagList

        document.body.addEventListener('click', () => this.close())

        this.__generateAutoCompleteList()
        parent.appendChild(this.autoCompleteList)

        input.addEventListener('click', e => {
            e.stopPropagation()
            this.updateList()
            this.open()
        })
        input.addEventListener('keydown', e => {
            console.log(e.keyCode)
            switch (e.keyCode) {
                case 40: this.cursorDown(); break       // ArrowKeyDown
                case 38: this.cursorUp(); break         // ArrowKeyDown
                case 27: this.close(); break            // Escape
                case 13: this.enter(); break            // Enter
                case 8:
                    this.open()
                    this.updateList()
                    break
                default: setTimeout(() => {this.updateList()}, 100)
            }
            //let char = String.fromCharCode(e.keyCode)
        })
    }

    enter() {
        let chosen = this.__getHighlightedElement()
        this.input.toLowerCase() = chosen.innerText.toLowerCase()
        this.close()
    }

    updateList() {
        const upperCasedString = capitalizeEachWord(string)
        const filterTagListByString = string => this.tagList.filter(tag => tag.includes(string) || tag.includes(upperCasedString))
        const regenerateList = newAutoCompleteList => {
            this.autoCompleteList.innerHTML = ''
            for (let i = 0; i < newAutoCompleteList.length; i++) {
                this.autoCompleteList.appendChild(createLi(newAutoCompleteList[i], i, (self) => {
                    let index = parseInt(self.getAttribute('data-index'))
                    this.unhighlightCurrentlyHighlighted()
                    this.currentHighlightedIndex = index
                    highlight(this.autoCompleteList.children[this.currentHighlightedIndex])
                    this.input.value = self.innerText
                    this.close()
                }))
            }
        }
        let newList = filterTagListByString(this.input.value)
        regenerateList(newList)
        let highlightedLi = this.autoCompleteList.children[this.currentHighlightedIndex]
        highlight(highlightedLi)
    }

    cursorDown() {
        this.unhighlightCurrentlyHighlighted()
        this.currentHighlightedIndex++
        if (this.currentHighlightedIndex >= this.autoCompleteList.children.length) {
            this.currentHighlightedIndex = 0
        }
        highlight(this.autoCompleteList.children[this.currentHighlightedIndex])
        this.autoCompleteList.scrollTop = this.autoCompleteList.children[this.currentHighlightedIndex].offsetTop
    }


    cursorUp() {
        this.unhighlightCurrentlyHighlighted()
        this.currentHighlightedIndex--
        if (this.currentHighlightedIndex < 0) {
            this.currentHighlightedIndex = this.autoCompleteList.children.length - 1
        }
        highlight(this.autoCompleteList.children[this.currentHighlightedIndex])
        this.autoCompleteList.scrollTop = this.autoCompleteList.children[this.currentHighlightedIndex].offsetTop
    }

    open(){
        this.autoCompleteList.classList.remove('auto-complete-list--hidden')
        this.isOpen = true
    }

    close(){
        this.autoCompleteList.classList.add('auto-complete-list--hidden')
        this.isOpen = false
    }
    
    unhighlightCurrentlyHighlighted() {
        unhighlight(this.__getHighlightedElement())
    }

}
