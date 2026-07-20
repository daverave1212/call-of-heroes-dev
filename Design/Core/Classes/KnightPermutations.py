


EASY = 1
MEDIUM = 2
HARD = 3

def toString(num):
    if num == EASY:
        return 'easy'
    if num == MEDIUM:
        return 'medium'
    if num == HARD:
        return 'hard'
    return num

effects = {
    "Protection": HARD,
    "Movement": EASY,
    "Status": MEDIUM,
    'Heal': HARD,
    'Damage': EASY,
    'AoE': MEDIUM,
}

effectOrder = list(effects.keys())

print()

def getPrevious(effect):
    i = effectOrder.index(effect) - 1
    if i < 0:
        i = 5
    return effectOrder[i]

def getNext(effect):
    i = effectOrder.index(effect) + 1
    if i > 5:
        i = 0
    return effectOrder[i]
    
def getPlus(effect, positions):
    i = effectOrder.index(effect)
    i = (i + positions) % 6
    return effectOrder[i]

def listExcept(l, items):
    return [item for item in l if item not in items]

def getResultWithPositions(positions, order=None):
    global effectOrder
    if order != None:
        effectOrder = order
        
    result = [{
        "name": effect,
        "previous": getPrevious(effect),
        "next": getNext(effect),
        "empowerment": effects[getPrevious(effect)],
        'also': getPlus(effect, positions),
        'alsoPower': effects[getPlus(effect, positions)]
    } for effect in effectOrder]
    return result

def printEffect(eff):
    print(f'\t{eff["name"]} ({toString(eff["empowerment"])} power): {eff["also"]} ({toString(eff["alsoPower"])} effect)')

def printResults(positions):
    print(f'\nWith {positions}')
    result = getResultWithPositions(positions)
    for eff in result:
        printEffect(eff)

def printResult(result, optimality):
    print(f'\nWith {optimality}')
    for eff in result:
        printEffect(eff)

from itertools import permutations

def all_permutations(lst):
    return list(permutations(lst))
    
def getEffectOptimality(eff):
    diff = eff['empowerment'] - eff['alsoPower']
    return abs(diff)

def getResultOptimality(result):
    sumSoFar = 0
    for eff in result:
        sumSoFar += getEffectOptimality(eff)
    return sumSoFar

def getRWCOrder(rwc):
    result = rwc['result']
    return [eff['name'] for eff in result]

def hasEffectFollowingEffect(resultWithCfg, eff1, eff2):
    order = getRWCOrder(resultWithCfg)
    i1 = order.index(eff1)
    i2 = order.index(eff2)
    if i1 + 1 == i2 or (i1 + 1 == 6 and i2 == 0):
        return True
    return False

orderPermutations = all_permutations(effectOrder)
resultPermutations = []

for permutation in orderPermutations:
    effectOrder = permutation
    for positions in range(2, 5):
        result = getResultWithPositions(positions)
        resultPermutations.append({
            'result': result,
            'positions': positions
        })

resultsWithConfig = []
for rwc in resultPermutations:
    result = rwc['result']
    optimality = getResultOptimality(result)
    resultsWithConfig.append({
        'optimality': optimality,
        'result': result,
        'positions': rwc['positions']
    })

resultsWithConfig.sort(key=lambda obj: obj['optimality'])

# print([r['optimality'] for r in resultsWithConfig])

filteredResults = [
    r for r in resultsWithConfig
    if r['optimality'] == 0 and r['positions'] == 2
]

print(f'{len(filteredResults)} results')
for resultWithConfig in filteredResults:
    opt = resultWithConfig['optimality']

    result = resultWithConfig['result']
    positions = resultWithConfig['positions']
    
    order = getRWCOrder(resultWithConfig)
    # print(order)
    # print(hasEffectFollowingEffect(resultWithConfig, 'Movement', 'Damage'))
    
    printResult(result, f'Optimality={opt} Positions=+{positions}')


#               TESTING

# newOrder = None
# positions = 3
# newResult = getResultWithPositions(positions, newOrder)
# optimality = getResultOptimality(newResult)
# printResult(newResult, f'Optimality={optimality} with +{positions}')


    
    







