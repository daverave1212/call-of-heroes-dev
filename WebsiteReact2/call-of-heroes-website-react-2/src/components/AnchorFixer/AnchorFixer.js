import './AnchorFixer.css'


// Fixes the #subsection anchors on pages
// Normally, the nav will overlap the actual div with the subsection id
// This fixes it
export default function AnchorFixer({id}) {
    return <div id={id} className="anchor-fixer"></div>
}
export function AnchorFixerLess({id}) {
    return <div id={id} className="anchor-fixer less"></div>
}