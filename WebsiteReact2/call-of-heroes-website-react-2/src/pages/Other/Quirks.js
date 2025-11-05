import PageH2 from "../../components/PageH2/PageH2";
import PageH3 from "../../components/PageH3/PageH3";
import Spell from "../../components/Spell/Spell";
import { TDSleek1, TDSleek3 } from "../../components/TableNormal/TDSleek";
import Column from "../../components/TwoColumns/Column";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Page from "../../containers/Page/Page";
import { spellsFromObject } from "../../utils";
import { QGTitle1 } from "../Tools/TitleGenerator";
import quirks from "./../../databases/Other/Quirks.json"

export default function Quirks() {
    return <Page>

        <QGTitle1 text={"Quirks"} height={60}/>
        <p>{quirks.Description}</p>

        <PageH2>Quirk Guidelines</PageH2>
        <p>{quirks['Quest Master Tips']}</p>

        <TwoColumns>
            <Column>
                <PageH3>Positive</PageH3>
                { spellsFromObject(quirks.Positive).map(q => (
                    <Spell spell={{...q, IsSubspell: true}}/>
                )) }
            </Column>
            <Column>
                <PageH3>Negative</PageH3>
                { spellsFromObject(quirks.Negative).map(q => (
                    <Spell spell={{...q, IsSubspell: true}}/>
                )) }
            </Column>
        </TwoColumns>

    </Page>
}