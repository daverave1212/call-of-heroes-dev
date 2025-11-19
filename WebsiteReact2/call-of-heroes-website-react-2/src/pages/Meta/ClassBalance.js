import { generateClassPowerLevelTable } from "../../components/InsertableTemplates/RaceClassComponents";
import TableNormal from "../../components/TableNormal/TableNormal";
import Page from "../../containers/Page/Page";
import { last } from "../../utils";
import { ClassesBase, ClassesPremium } from "../Other/AllRacesAndClasses";


export default function ClassBalance() {

    const allClasses = {...ClassesBase, ...ClassesPremium}

    const allClassesBalanceTables = Object.keys(allClasses).map(className => ({ className, table: generateClassPowerLevelTable(allClasses[className])}))
    const classPowersWithLevel = allClassesBalanceTables.map(({className, table}) => ({
        className,
        totalPowerByLevels: table.rows.map(({key, value}) => last(value))
    }))
    console.log({allClassesBalanceTables, classPowersWithLevel})
    
    const headers = ['', ...Object.keys(allClasses)]
    const rowNames = allClassesBalanceTables[0].table.rows.map(({key, value}) => key)

    const rows = rowNames.map((rowName, i) => [rowName, ...(classPowersWithLevel.map(({className, totalPowerByLevels}) => totalPowerByLevels[i]))])

    console.log({rows})

    return <Page>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <TableNormal columns={headers}>
            { rows.map(row => (<tr>
                { row.map(value => <td>{value}</td>) }
            </tr>)) }
        </TableNormal>
    </Page>
}