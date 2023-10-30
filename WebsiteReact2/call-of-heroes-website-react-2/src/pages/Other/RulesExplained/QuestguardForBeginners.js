import PageH2 from "../../../components/PageH2/PageH2";
import PageH3 from "../../../components/PageH3/PageH3";
import { SideMenuFromRuleSection } from "../../../components/SideMenu/SideMenu";
import Page from "../../../containers/Page/Page";
import { questguardForBeginners } from "./rulesTableOfContents";

import rulesData from '../../../databases/RulesDicts.json'
import RulesPageDefault from "../../../components/Rules/RulesPageDefault";

export default function QuestguardForBeginners({}) {
    return (
        <div>
            {/* <SideMenuFromRuleSection ruleSection={rulesData["A. Questguard for Beginners"]}/> */}
            <RulesPageDefault title="A. Questguard for Beginners"/>
        </div>
    )
}