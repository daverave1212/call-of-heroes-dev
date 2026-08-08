
// Run this as a standalone script

const nDice = 3
const successChance = 33.333


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// 1 is inclusive, 7 is exclusive
function d6(nDice=1) {
  let sum = 0
  for (let i = 1; i <= nDice; i++) {
      sum += randomInt(1, 7)    
  }
  return sum; 
}
function percentChance01(percent) {
    if (percentChance(percent)) {
        return 1
    }
    return 0
}
function percentChance(percent) {
  return Math.random() * 100 < percent;
}


function rollSuccessDice(nDice, successChance) {
    let sum = 0
    for (let i = 1; i <= nDice; i++) {
        sum += percentChance01(successChance)
    }
    return sum
}
function rollCheck01(nDice, successChance, dc) {
    const result = rollSuccessDice(nDice, successChance)
    if (result >= dc) {
        return 1
    }
    return 0
}
const N_SIMULATIONS = 10000
function simulateSuccessDice(nDice, successChance, dc) {
    let total = 0
    for (let i = 1; i <= N_SIMULATIONS; i++) {
        const res = rollCheck01(nDice, successChance, dc)
        total += res
    }
    const average = total / N_SIMULATIONS
    return average
}
function simulateCheckD6PlusBonusPercent(nDice, bonus, dc) {
    let total = 0
    for (let i = 1; i <= N_SIMULATIONS; i++) {
        const res = d6(nDice) + bonus
        if (res >= dc) {
            total += 1
        }
    }
    return total / N_SIMULATIONS * 100
}
function printSimulation(nDice, requiredDice, dc) {
    const chance = requiredDice.length / 6 * 100
    const averageChanceToPass = simulateSuccessDice(nDice, chance, dc)
    console.log(`Dice: ${nDice}\t Success On: [${requiredDice}]\t DC: ${dc}\t Success Chance = ${(averageChanceToPass * 100).toFixed(2)}%`)
}

function getSimulationResultsObj(nDice, requiredDice, dc) {
    const chance = requiredDice.length / 6 * 100
    const averageChanceToPass = simulateSuccessDice(nDice, chance, dc)
    return {
        Dice: nDice,
        'Success On': `[${requiredDice}]`,
        DC: dc,
        'Success Chance': `${(averageChanceToPass * 100).toFixed(2)}%`
    }
}
function getSimulationResultsObjWithDCs(nDice, requiredDice, dcs) {
    const chance = requiredDice.length / 6 * 100
    const tableRow = {
        Dice: nDice,
        'Success On': `[${requiredDice}]`,
    }
    for (const dc of dcs) {
        const averageChanceToPass = simulateSuccessDice(nDice, chance, dc)
        tableRow[`DC ${dc} % Pass`] = `${(averageChanceToPass * 100).toFixed(2)}%`
    }
    return tableRow
}
function getSimD6ObjWithDCs(nDice, bonus, dcs) {
    const tableRow = {
        'd6': nDice + 'd6',
        Bonus: bonus,
    }
    for (const dc of dcs) {
        const averagePassChance = simulateCheckD6PlusBonusPercent(nDice, bonus, dc)
        tableRow[`DC ${dc} % Pass`] = averagePassChance.toFixed(2) + '%'
    }
    return tableRow
}

function printTable(arrayOfObjects, gap = 4) {
  if (!Array.isArray(arrayOfObjects) || arrayOfObjects.length === 0) return;

  // Extract column headers from the first object
  const headers = Object.keys(arrayOfObjects[0]);

  // Calculate the maximum required width for each column
  const columnWidths = headers.map(header => {
    const maxContentLength = arrayOfObjects.reduce((max, obj) => {
      const valueStr = String(obj[header] ?? "");
      return Math.max(max, valueStr.length);
    }, 0);

    return Math.max(header.length, maxContentLength);
  });

  // String of spaces used to separate columns
  const columnSpacing = " ".repeat(gap);

  // Helper to pad a cell string and apply the gap
  const formatRow = (values) =>
    values
      .map((val, index) => String(val ?? "").padEnd(columnWidths[index], " "))
      .join(columnSpacing);

  // Print Header Row
  console.log(formatRow(headers));

  // Print Object Rows
  arrayOfObjects.forEach(obj => {
    const rowValues = headers.map(header => obj[header]);
    console.log(formatRow(rowValues));
  });
  console.log('')
}

const EASY = 1
const MEDIUM = 2
const HARD = 3

console.log(`   Dice Pool: 5 and 6`)
printTable([
    getSimulationResultsObjWithDCs(1, [5, 6], [1, 2, 3]),
    getSimulationResultsObjWithDCs(2, [5, 6], [1, 2, 3]),
    getSimulationResultsObjWithDCs(3, [5, 6], [1, 2, 3]),
    getSimulationResultsObjWithDCs(4, [5, 6], [1, 2, 3]),
    getSimulationResultsObjWithDCs(5, [5, 6], [1, 2, 3]),
    getSimulationResultsObjWithDCs(6, [5, 6], [1, 2, 3]),
    getSimulationResultsObjWithDCs(7, [5, 6], [1, 2, 3]),
])

















