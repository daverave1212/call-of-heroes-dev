
import fs from 'fs'


async function getFetchHTML(url) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
        const response = await fetch(url)
    
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
    
        const html = await response.text()
    
        return html
    } catch (e) {
        console.error('There was a problem with the fetch operation:', e);
    }
}
async function saveFetchHTML(url, fileName) {
    const html = await getFetchHTML(url)
    fs.writeFileSync(fileName, html, 'utf-8')
}
function findAllOccurrences(str, toFind) {

    if (str == null || toFind == null) {
        console.error('ERROR: null str given to findAllOccurrences')
        return []
    }

    const indices = [];
    let startIndex = 0;
  
    while ((startIndex = str.indexOf(toFind, startIndex)) !== -1) {
      indices.push(startIndex);
      startIndex += toFind.length;  // Move to the next index after the found occurrence
    }
  
    return indices;
}
function findContinuations(str, findBy, continueUntil) {
    const indices = findAllOccurrences(str, findBy)
    const foundContinuations = []
    for (const index of indices) {
        const findFrom = index + findBy.length
        const findEnd = str.indexOf(continueUntil, findFrom)
        const foundContinuation = str.substring(findFrom, findEnd)
        foundContinuations.push(foundContinuation)
    }
    return foundContinuations
}
function getAllGameUrlsFromHTMLPage(html) {
    const FIND_BY = '<a   href="/rpgitem/'
    const gameUrls = findContinuations(html, FIND_BY, '"')
    return gameUrls.map(localPath => 'https://rpggeek.com/rpgitem/' + localPath)
}

function getPublishersFromGamePage(html) {
    const FIND_BY = '"href":"\\/rpgpublisher\\/'
    const publisherUrls = findContinuations(html, FIND_BY, '"')
        .map(url => url.split('\\').join(''))
    return publisherUrls
}

async function saveAllGames() {
    let allGames = []
    for (let i = 1; i <= 50; i++) {
        const page = await getFetchHTML('https://rpggeek.com/search/rpgitem/page/' + i + '?advsearch=1&q=&include%5Brpgdesignerid%5D=&include%5Brpgpublisherid%5D=&geekitemname=&range%5Byearpublished%5D%5Bmin%5D=2019&range%5Byearpublished%5D%5Bmax%5D=2024&colfiltertype=&searchuser=&propertyids%5B0%5D=2108&B1=Search')
        const gameLinks = getAllGameUrlsFromHTMLPage(page)
        allGames = [...allGames, ...gameLinks]
    }

    fs.writeFileSync('all-games.json', JSON.stringify(allGames, null, 2), 'utf-8')
}

async function saveAllPublishers() {
    const allGames = JSON.parse(fs.readFileSync('all-games.json', 'utf-8'))
    const foundPublishers = {}
    
    for (let i = 0; i < allGames.length; i++) {
        const url = allGames[i]
        console.log(`At game ${i}/${allGames.length}`)
        const page = await getFetchHTML(url)
        const publishers = getPublishersFromGamePage(page)
        for (const publisher of publishers) {
            if (foundPublishers[publisher] == null) {
                foundPublishers[publisher] = 0
            }
            foundPublishers[publisher]++
        }
    }

    fs.writeFileSync('publishers.json', JSON.stringify({foundPublishers: foundPublishers}, null, 2), 'utf-8')
    
    const publishersDict = JSON.parse(fs.readFileSync('publishers.json', 'utf-8')).foundPublishers
    const publishersArray = Object.keys(publishersDict).map(name => ({publisher: name, nGames: publishersDict[name]}))
    const publishersSorted = publishersArray
        .sort((a, b) => b.nGames - a.nGames)
        .map(pub => ({...pub, url: 'https://rpggeek.com/rpgpublisher/' + pub.publisher}))

    fs.writeFileSync('publishers-sorted.json', JSON.stringify(publishersSorted, null, 2), 'utf-8')
}


async function main() {

    const publishers = JSON.parse(fs.readFileSync('publishers-sorted.json', 'utf-8'))
    for (let i = 0; i < publishers.length; i++) {
        console.log(`At ${i}/${publishers.length}`)
        const publisher = publishers[i]
        const rpggeekPage = await getFetchHTML(publisher.url)
        const officialUrls = findContinuations(rpggeekPage, 'rel="nofollow noopener noreferrer" target="_blank">', '&')
        if (officialUrls.length > 0) {
            publisher.officialUrl = officialUrls[0]
        }
    }

    fs.writeFileSync('publishers-finished.json', JSON.stringify(publishers, null, 2), 'utf-8')

}

main()