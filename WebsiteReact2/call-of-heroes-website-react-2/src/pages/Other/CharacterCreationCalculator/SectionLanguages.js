import { useEffect } from "react";
import Selector from "../../../components/Selector/Selector";
import { getAllLanguages, getRace, splitArrayEvenly, useLocalStorageState } from "../../../utils";
import { QGTitle1 } from "../../Tools/TitleGenerator";
import { useConstTotalStats } from "./MyCharacter";
import { useLanguages, useSectionRaceName } from "./CharacterData";


function LanguageSelector({ language, isSelected, onClick }) {
    return (
        <Selector
            name={language}
            src={`/Icons/UI/Languages/${language}.png`}
            isSelected={isSelected}
            onClick={onClick}
        />
    )
}



export default function SectionLanguages() {

    let [selectedLanguages, setSelectedLanguages] = useLanguages()
    let [selectedRaceName] = useSectionRaceName()
    let { 2: intelligence, 4: charisma } = useConstTotalStats()

    const nTotalLanguages = 1 + Math.max(intelligence, charisma)
    const nRemainingLanguages = nTotalLanguages - selectedLanguages.length
    const raceLanguageDescription = getRace(selectedRaceName)?.Language
    const languageNames = Object.keys(getAllLanguages())
    const languageColumns = splitArrayEvenly(languageNames, 3)

    function onLanguageClick(lang) {
        let newSelectedLanguages = []
        if (selectedLanguages.includes(lang)) {
            newSelectedLanguages = selectedLanguages.filter(l => l != lang)
        } else {
            newSelectedLanguages = [...selectedLanguages, lang]
        }
        setSelectedLanguages(newSelectedLanguages)
    }

    return (
        <div>
            <div className="center-content">
                <QGTitle1 text="Languages" height={60}/>
            </div>
            <div className="center-content center-text">
                <p>{ raceLanguageDescription }</p>
                { (nRemainingLanguages > 0) && (
                    <div className="center-content" style={{width: '100%'}}>
                        <div className="warning-toaster">Pick { (nRemainingLanguages) } more language{nRemainingLanguages > 1? 's': ''}. You should have {nTotalLanguages} (1 + {intelligence >= charisma ? 'Intelligence': 'Charisma'})</div>
                    </div>
                ) }
            </div>
            <div className="flex-row gap-half margin-top-1">
                <div className="flex-column gap-half" style={{flex: 1}}>
                    { languageColumns[0].map(lang => <LanguageSelector language={lang} isSelected={selectedLanguages.includes(lang)} onClick={() => onLanguageClick(lang)}/>) }
                </div>
                <div className="flex-column gap-half" style={{flex: 1}}>
                    { languageColumns[1].map(lang => (<LanguageSelector language={lang} isSelected={selectedLanguages.includes(lang)} onClick={() => onLanguageClick(lang)}/>)) }
                </div>
                <div className="flex-column gap-half" style={{flex: 1}}>
                    { languageColumns[2].map(lang => <LanguageSelector language={lang} isSelected={selectedLanguages.includes(lang)} onClick={() => onLanguageClick(lang)}/>) }
                </div>
            </div>
        </div>
    )
}