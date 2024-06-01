from random import randint


MIG = 3
DEX = 3
STAT = 3

def d(num):
    return randint(1, num)



def punch():
    result = d(4) + 1
    if result == 4:
        result += DEX
    return result + STAT

def cleaver():
    result = d(6)
    if result == 6:
        result += d(6)
    return result + STAT
    
def club():
    result = d(8) - 1
    return result + STAT
    
def dagger():
    result = d(4)
    if result >= 3:
        result += d(6)
    return result + STAT
    


def flail():
    res = d(8)
    if res < 4:
        res = 4
    return res - 1 + STAT
    
def hand_axe():
    res = d(10) - 2
    return res + STAT


def hammer():
    res = d(6)
    return res + STAT
    
def mace():
    res = d(6)
    return res + STAT
    
def rapier():
    res = d(4) + d(4) - 1
    return res + STAT

def sickle():
    res = 1 + MIG + DEX - 3
    return res + STAT

def scimitar():
    res = d(6)
    if res == 1:
        res = d(8)
    if res == 1:
        res = d(10)
    if res == 1:
        res = d(12)
    return res + STAT
    
def spear():
    res = d(6)
    return res + STAT
    
def shortsword():
    res = d(6) + 1
    return res + STAT
    
def whip():
    res = d(4) + d(4) - 1
    return res + STAT
    
    
    


def greatclub():
    res = d(4) + d(4) + d(4) + d(4)
    return res + STAT
def warhammer():
    res = d(8) + d(8) + 1
    return res + STAT
def heavy_mace():
    res = d(4) + d(4) + 6
    return res + STAT
def longsword():
    res = d(12)
    if res == 12:
        res += randint(2, 10)
    return res + 4 + STAT
def greatsword():
    d1 = d(6)
    d2 = d(6)
    d3 = d(6)
    sixes = [d for d in [d1,d2,d3] if d == 6]
    res = d1 + d2 + d3 + sum(sixes)
    return res + STAT
def ultra_greatsword():
    res = d(20)
    if res == 20:
        res += d(20)
    return res + 1 + STAT
def quarterstaff():
    res = d(8) + 6
    return res + STAT
def battle_axe():
    res = d(10) + d(10)
    return res + STAT
def scythe():
    res = d(8) + d(8) + MIG
    return res + STAT
def pike():
    res = d(12) + 3
    return res + STAT
def halberd():
    res = d(10) + d(10) - 1
    return res + STAT
def katana():
    d1 = d(4)
    d23 = d(6) + d(8)
    res = d1 + d23
    if d1 == 4:
        res += d(10)
    return res + STAT
def trident():
    res = d(6) + d(6) + d(6) + 0.66 * d(4)
    return res + STAT
def pickaxe():
    res = d(8) + 5 + 0.66 * d(6)
    return res + STAT
    
    
    


def javelin():
    res = d(12) + 1
    return res + STAT
def bow():
    res = d(8)
    if res == 8:
        res += d(8)
    return res + 3 + STAT
def heavy_crossbow():
    res = d(8) + d(8)
    return res + STAT
def heavy_gun():
    res = d(4) + d(4) + d(4) + d(4) - 1
    return res + STAT




def boomerang():
    res = d(12) - 4
    if res == 12:
        res += d(12) - 4 + STAT
    return res + STAT
def sling():
    res = (1 + STAT) * 3 / 2
    return res
def light_crossbow():
    res = d(4)
    if res == 4:
        res += d(4)
    return res + STAT
def handgun():
    res = d(10)
    return res
def blowgun():
    res = d(6) - 1
    return res + STAT

    
    

def find_average(func):
    result = sum([func() for _ in range(10000)]) / 10000
    return result


elements = {}
element_stars = {}
def start_averaging():
    global elements
    global element_stars
    elements = {}
    element_stars = {}

def print_average(func, star=None):
    name = func.__name__
    n_spaces = 12 - len(name)
    spaces = ' ' * n_spaces
    average = find_average(func)
    elements[name] = average
    if star is not None:
        element_stars[name] = star

def print_all_averages():
    elements_list = [key for key in elements]
    elements_list_sorted = sorted(elements_list, key=lambda k: elements[k])
    for key in elements_list_sorted:
        nspaces = 12 - len(key)
        spaces = ' ' * nspaces
        text = f'{key}:{spaces}{elements[key]}'
        if key in element_stars:
            text += ' ' + element_stars[key]
        print(text)


start_averaging()
print_average(punch)
print_average(cleaver)
print_average(club, '*')
print_average(dagger)
print_average(flail)
print_average(hand_axe, '* (heal)')
print_average(hammer)
print_average(mace, '* (CC)')
print_average(rapier, '* (mobility)')
print_average(sickle)
print_average(scimitar)
print_average(spear, '* (range)')
print_average(shortsword)
print_average(whip, '* (situational damage')
print_all_averages()

print('')
print('')

start_averaging()
print_average(boomerang)
print_average(sling)
print_average(light_crossbow)
print_average(handgun)
print_average(blowgun)
print_all_averages()

print('')
print('')

start_averaging()
print_average(javelin)
print_average(bow)
print_average(heavy_crossbow)
print_average(heavy_gun)
print_all_averages()

print('')
print('')

start_averaging()
print_average(greatclub, '* (CC)')
print_average(warhammer, '* (breaking)')
print_average(heavy_mace)
print_average(longsword)
print_average(greatsword)
print_average(ultra_greatsword)
print_average(quarterstaff, '* (defense)')
print_average(battle_axe, '* (heal)')
print_average(scythe)
print_average(pike, '* (range)')
print_average(halberd)
print_average(katana)
print_average(trident)
print_average(pickaxe)
print_all_averages()