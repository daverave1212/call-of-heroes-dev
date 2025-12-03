import { useLocation } from "react-router-dom";
import { getPageHashFromLocation, addAbilityOrOpenPopup, useLocalStorageState } from "../../../utils";
import Abilities from "../Abilities";
import { TAB_NAMES } from "./CharacterCreationCalculator";
import ManySmallStats from "../../../components/SmallStat/ManySmallStats";
import { useState } from "react";
import Page from "../../../containers/Page/Page";
import { useCCCTabs } from "./SectionBasicAbilities";
import MagicFonts from "../MagicFonts";
import { useAllSpellsMetadata, useSelectedAbilityNames } from "./CharacterData";
import { selectSpellWithPopup } from "./SectionClass";



export default function SectionMagicFonts({ openPopup }) {

    const isCharacterCreationPage = openPopup != null

    let { 2: tabName } = useCCCTabs()

    if (tabName != 'Magic Fonts') {
        return <div></div>
    }

    const [didUnlockThisPage, setDidUnlockThisPage] = useState(false)
    const [spellNames, setSpellNames] = useSelectedAbilityNames()
    const [spellsMetadata] = useAllSpellsMetadata()
    

    if (!didUnlockThisPage) {
        return <Page hasNoMargins={isCharacterCreationPage}>
            <div className="flex column center-content center-text gap-1 margin-top-4 margin-bottom-4">
                <h2 className="home-font">Do you have access to Magic Fonts?</h2>
                <p style={{maxWidth: '70%'}}>You can only view this page if your character has access to magic fonts (e.g. if you're a Wizard, or got a certain Talent or Feat that explicitly allows you to get Magic Fonts).</p>
                <button onClick={() => setDidUnlockThisPage(true)}>Yes</button>
            </div>
        </Page>
    }
    

    return (
        <Page hasNoMargins={isCharacterCreationPage}>
            <MagicFonts
                selectedSpellNames={spellNames}
                onSpellClick={(spell, metadata) => selectSpellWithPopup({
                    spell,
                    metadata,
                    spellNames,
                    setSpellNames,
                    openPopup
                })}
                spellsMetadata={spellsMetadata}
            />

        </Page>
    )

}