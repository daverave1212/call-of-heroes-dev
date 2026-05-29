export default {
    domain: 'http://localhost:3000',
    repoPath: '../call-of-heroes-website-react-2',
    //E:\Work\GitHub\Call of Heroes Design\_repo\call-of-heroes-dev\WebsiteReact2\call-of-heroes-website-react-2\src
    errorsToIgnore: [
        'Warning: Each child in a list should have a unique "key" prop.',
        'Warning: validateDOMNesting',  // <p> inside <p>
        'letterHeight=' // Error from generating title font text (works but not sure why it throws an error)
    ],
    warningsToNotIgnore: [
        'No routes matched location'
    ]
}