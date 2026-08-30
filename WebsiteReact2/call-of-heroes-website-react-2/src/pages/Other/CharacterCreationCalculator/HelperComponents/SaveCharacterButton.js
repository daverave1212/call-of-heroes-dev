import { showToast } from "../../../../services/dom/toaster";
import { generateUniqueId } from "../../../../utils";
import { useMyCharactersDB, getCurrentCharacterFromLocalStorage, NO_CHARACTER_ID, setCurrentCharacterId } from "../CharacterData";

export function SaveCharacterButton({ className, style, id }) {

    let [myCharacters, saveMyCharacters] = useMyCharactersDB('CharacterCreationCalculator.SaveCharacterButton');

    async function saveCharacter() {
        const currentCharacter = getCurrentCharacterFromLocalStorage();
        const existingCharacterIndex = myCharacters.findIndex(char => char.id == currentCharacter.id);
        const willAddNewCharacter = currentCharacter.id == NO_CHARACTER_ID || existingCharacterIndex == -1;
        const newMyCharacters = [...myCharacters];
        if (willAddNewCharacter) {
            if (currentCharacter.id == NO_CHARACTER_ID) {
                const uniqueID = generateUniqueId();
                currentCharacter.id = uniqueID;
                setCurrentCharacterId(uniqueID);
            }
            newMyCharacters.push(currentCharacter);
        } else {
            newMyCharacters[existingCharacterIndex] = currentCharacter;
        }
        const wasSaveSuccessful = await saveMyCharacters(newMyCharacters);
        if (wasSaveSuccessful) {
            showToast('Character saved successfully!', 'green');
        }
    }

    return (
        <div className={`center-content margin-top-1 ${className}`} style={style} id={id}>
            <button onClick={saveCharacter}>Save Hero</button>
        </div>
    );
}
