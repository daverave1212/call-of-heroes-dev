
import PageH2 from '../../components/PageH2/PageH2'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import magicFonts from '../../databases/SpellFonts.json'
import { spellsFromObject } from '../../utils'
import { QGTitle1 } from '../Tools/TitleGenerator'


export default function MagicFonts() {

    const magicFontNames = Object.keys(magicFonts)

    return <Page>

        <QGTitle1 text={"Magic Fonts"}/>

        { magicFontNames.map(fontName => (
            <>
                <PageH2>{fontName}</PageH2>
                <ManySpells spells={spellsFromObject(magicFonts[fontName])} shouldSort={false}/>
            </>
        )) }

    </Page>

}