import { getNumberPartsString } from "../../utils";

export function GrayFractionText({ value, reduceFontSize = true, includePlus = false }) {
    let { sign, left, right } = getNumberPartsString(value, { includeDotOnRight: true });
    const fontSize = reduceFontSize ? '0.55em' : '';
    const graySpanStyle = { color: '#BBBBBB', fontSize };

    const signText = sign == '-' ?
        '-'
        : value == 0 ?
            ''
            : includePlus ?
                '+'
                :
                '';

    return <span>
        {signText}{left}<span style={graySpanStyle}>{right}</span>
    </span>;
}
