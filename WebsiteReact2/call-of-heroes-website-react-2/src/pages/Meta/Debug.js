import BookSpell from "../../components/Spell/BookSpell";
import Column from "../../components/TwoColumns/Column";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Page from "../../containers/Page/Page";
import { getSpellByName } from "../../utils";


export default function Debug() {
    return <Page>
        
        <TwoColumns className="padding-top-4">
            <Column>
                <BookSpell spell={getSpellByName('Pocket Sand')}/>
            </Column>
            <Column>
            
            </Column>
        </TwoColumns>

    </Page>
}