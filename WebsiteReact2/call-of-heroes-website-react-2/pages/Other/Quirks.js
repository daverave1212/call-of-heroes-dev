import { TDSleek1, TDSleek3 } from "../../components/TableNormal/TDSleek";
import Column from "../../components/TwoColumns/Column";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Page from "../../containers/Page/Page";

export default function Quirks() {
    return <Page title="Quirks">

        <TwoColumns>
            <Column style={{padding: '2px', border: 'solid black 2px'}}>
                <TDSleek1>Positive Quirks</TDSleek1>
                <TDSleek3>Something</TDSleek3>
                <TDSleek3>Something else</TDSleek3>
            </Column>
            <Column style={{padding: '2px', border: 'solid black 2px'}}>
                <TDSleek1>Positive Quirks</TDSleek1>
                <TDSleek3>Something</TDSleek3>
                <TDSleek3>Something else</TDSleek3>
            </Column>
        </TwoColumns>

    </Page>
}