
// Run this as a standalone script

const nDice = 3
const successChance = 33.333


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function d6() {
  return randomInt(1, 7); // 1 is inclusive, 7 is exclusive
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

function printTable(arrayOfObjects, gap = 2) {
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
}

const results = [
    getSimulationResultsObj(1, [6], 1),
    getSimulationResultsObj(2, [6], 1),
    getSimulationResultsObj(3, [6], 1),
    getSimulationResultsObj(4, [6], 1),
    getSimulationResultsObj(5, [6], 1),
    getSimulationResultsObj(6, [6], 1),
    getSimulationResultsObj(7, [6], 1),

    getSimulationResultsObj(2, [6], 2),
    getSimulationResultsObj(2, [6], 2),
    getSimulationResultsObj(3, [6], 2),
    getSimulationResultsObj(4, [6], 2),
    getSimulationResultsObj(5, [6], 2),
    getSimulationResultsObj(6, [6], 2),
    getSimulationResultsObj(7, [6], 2),

    getSimulationResultsObj(2, [6], 3),
    getSimulationResultsObj(2, [6], 3),
    getSimulationResultsObj(3, [6], 3),
    getSimulationResultsObj(4, [6], 3),
    getSimulationResultsObj(5, [6], 3),
    getSimulationResultsObj(6, [6], 3),
    getSimulationResultsObj(7, [6], 3),
]

printTable(results, 4)

















