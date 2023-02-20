let Races = {
  "Bertle": {
    "Race": "Bertle",
    "Description": "Bertles are rabbit people.",
    "Variant": "Vulper",
    "Options": {
      "When creating your character": {
        "Either": {
          "Choose 2": [
            "Charisma",
            "Intelligence",
            "Wisdom",
            "Dexterity"
          ],
          "Choose 1": [
            "Fortitude"
          ]
        },
        "Saves": [
          "+1 Dexterity Saves"
        ]
      }
    },
    "Skills": {
      "Acrobatics": 1,
      "Perception": 1,
      "Craft": 1,
      "Animal Handling": -1,
      "Deception": -1,
      "History": -1
    },
    "Stats": {
      "Base Health": 9,
      "Movement": "7 meters",
      "Lifespan": "75 years",
      "Languages": "Common",
      "Size": "Small or Medium (your choice)"
    },
    "Language": "If your Intelligence is at least 2, you can speak 1 additional Common language.",
    "Other": "Due to the variations in Bertle species, you can choose if you want your size to be Small or Medium.",
    "Starting Abilities": {
      "~Herbivore~": {
        "A": "Passive",
        "Effect": "You can not eat meat.\nIf you do, you take take 1d12 Poison damage and have Disadvantage on all rolls for 1 hour.\nYou have 0 Defense against Poison attacks.\n"
      }
    },
    "Talents": {
      "Level 0": {
        "~Fleet Footed~": {
          "A": "Passive",
          "Effect": "You are immune to Slows (not counting Hard Terrain)."
        },
        "~Nimbleness~": {
          "A": "Passive",
          "Effect": "You can move through the spaces of enemy units (in normal conditions)."
        },
        "~Darkvision~": {
          "A": "Passive",
          "Effect": "You can see up to 12 meters away in darkness, without discerning colors."
        },
        "~Cutting Teeth~": {
          "A": "Passive",
          "Effect": "Your teeth act as natural daggers which can pierce through some materials:\nYou are able to cut rope, flesh, wood, etc (but not concrete, metal, etc).\nAttacking with your teeth takes 0.5 Action, adds Dexterity modifier and deals 1d8 + 1 Piercing damage.\nYou can only bite once per turn.\n"
        }
      },
      "Level 3": {
        "<Sprightly Shaped>": {
          "A": "Passive",
          "Effect": "Your fur is sleek, and your feet swift.\nYou gain +1 meter movement speed.\nYou have +5 on swimming rolls.\n"
        },
        "<Eyes and Ears>": {
          "A": "Passive",
          "Effect": "You gain +5 Initiative.\nYou gain +2 Perception.\nYou know the Hide maneuver permanently.\n"
        },
        "<Protruded Claws>": {
          "A": "Passive",
          "Effect": "You gain +5 on climbing rolls.\nYou become Trained in Unarmed (if you aren't already) and can do Unarmed attacks with any Stat instead of Dexterity/Fortitude.\nUnarmed attacks can do Piercing damage (if you choose so).\n"
        }
      }
    },
    "Ideas": {
      "<Skipper>": {
        "A": "Passive",
        "Effect": "You can freely jump up to 2 meters in length when moving (still uses 2 meters of your movement speed).\nDoing this allows you to freely jump over small obstacles, gaps, etc without having to roll.\n_If playing with grid, you can jump over a square and land in the next one._\n"
      },
      "<Thick Fur>": {
        "A": "Passive",
        "Effect": "You have 50% resistance to Cold damage."
      },
      "<Sidekick>": {
        "A": "1 Action",
        "Effect": "Make a melee attack against a creature with a total of +4 to the roll.\nIf you hit, you deal 1d6 damage, you can Shift 1 meter in any possible direction, and the target rolls a Fortitude save.\nIf it fails, it is stunned.\nYou can do this once per Long Rest.\n"
      },
      "<High Roller>": {
        "A": "0 Actions",
        "Effect": "Choose one:\n1. Gain Advantage on an Acrobatics roll\n2. Gain +3 meters movement this turn\nYou can do this once per Long Rest.\n"
      },
      "<Gatherer Instincts>": {
        "A": "Passive",
        "Effect": "You are no longer Vulnerable to Poison.\nYou have +5 on identifying plants, fruits, mushrooms, vegetables, etc.\n"
      }
    }
  },
  "Dragonborn": {
    "Race": "Dragonborn",
    "Variant": "Loxen",
    "Description": "Dragonborns are dragon-like humanoids.",
    "Options": {
      "When creating your character": {
        "Either": {
          "Choose 2": [
            "Charisma",
            "Intelligence",
            "Wisdom",
            "Fortitude"
          ],
          "Choose 1": [
            "Dexterity"
          ]
        },
        "Saves": [
          "+1 Fortitude Saves",
          "+1 Intelligence Saves"
        ]
      }
    },
    "Skills": {
      "Arcana": 1,
      "Athletics": 1,
      "Intimidation": 1,
      "Stealth": -1,
      "Luck": -1,
      "Nature": -1
    },
    "Stats": {
      "Base Health": 10,
      "Movement": "6 meters",
      "Lifespan": "80 years",
      "Languages": "Common"
    },
    "Language": "If your Intelligence is at least 1, you can speak 1 Draconic, the ancient language of dragons.",
    "Other": "Dragonborn have tails.",
    "Starting Abilities": {
      "~Draconic Ancestry~": {
        "A": "Special",
        "Effect": "When creating your character, choose your Dragonborn type:\nBlack\t- Acid\nBlue - Cold\nBrass\t- Fire\nBronze - Thunder\nGold - Fire\nRed - Fire\nSilver - Force\nGray - Necrotic\nWhite\t- Cold\nGreen\t- Poison\nThat becomes your Dragonborn Element.\n"
      },
      "~Dragonborn Resistance~": {
        "A": "Passive",
        "Effect": "You have 50% resistance to damage of your Dragonborn Element type."
      },
      "~Dragon's Breath~": {
        "A": "1 Action",
        "Cooldown": "Long Rest",
        "Effect": "Breathe your Dragonborn Element in a 3x1 meter line.\nMake an attack against all creatures caught in your breath.\nThe attack deals 2d8 damage of your Dragonborn Element (against their Defense).\n"
      }
    },
    "Talents": {
      "Level 0": {
        "~Breath - Cone~": {
          "A": "Special",
          "Effect": "Your Dragon's Breath now breathes in a 3 meter, 45* cone instead of a line."
        },
        "~Breath - Line~": {
          "A": "Special",
          "Effect": "Your Dragon's Breath now breathes in a 4x2 meter line."
        },
        "~Breath - Blast~": {
          "A": "Special",
          "Effect": "Your Dragon's Breath now breathes on all creatures around you instead of a line."
        }
      },
      "Level 3": {
        "<Breath Master>": {
          "A": "Passive",
          "Effect": "Your Dragon's Breath does not affect allies and it's Damage is increased by 2 (2d8 + 2)."
        },
        "<Double Breath>": {
          "A": "Passive",
          "Effect": "You can now use Dragon's Breath twice per Long Rest."
        },
        "<Flaming Jaws>": {
          "A": "0.5 Action",
          "Cooldown": "Long Rest",
          "Effect": "Leap at a target up to 4 meters away from you ignoring attacks of oportunity. The target takes 3 damage (of your Dragonborn Type) and you are healed for 3 health."
        }
      }
    }
  },
  "Dwarf": {
    "Race": "Dwarf",
    "Description": "A race of old, the ancient Dwarves are a strong and traditional people.",
    "Options": {
      "When creating your character": {
        "Either": {
          "Choose 2": [
            "Charisma",
            "Intelligence",
            "Wisdom",
            "Fortitude"
          ],
          "Choose 1": [
            "Dexterity"
          ]
        },
        "Saves": [
          "+1 Fortitude"
        ]
      }
    },
    "Skills": {
      "Athletics": 1,
      "History": 1,
      "Craft": 1,
      "Acrobatics": -1,
      "Deception": -1,
      "Stealth": -1
    },
    "Stats": {
      "Base Health": 10,
      "Movement": "5 meters",
      "Lifespan": "250 years",
      "Languages": "Common and Dwarvish"
    },
    "Weapons": "You are trained in Hand Hammers, Warhammers and Heavy Guns.",
    "Starting Abilities": {
      "~Dwarf Resting~": {
        "A": "Passive",
        "Effect": "You need 12 hours of sleep instead of 8 per day to function normally.\nYour movement speed can't be reduced below 5 meters.\n",
        "Notes": "Hard Terrain still takes 2 meters of movement for 1 meter of Hard Terrain."
      },
      "~Dwarven Resilience~": {
        "A": "Reaction",
        "Effect": "Reroll a save roll.\nYou can do this once per Long Rest.\n"
      }
    },
    "Talents": {
      "Level 0": {
        "~Stone-like Bones~": {
          "A": "Passive",
          "Effect": "Your bones are tough as rock.\nYou take half as much damage from falling and from traps which deal physical damage.\nYou also get +1 on Fortitude saves.\n"
        },
        "~Darkvision~": {
          "A": "Passive",
          "Effect": "You can see up to 12 meters away in darkness, without discerning colors."
        },
        "~Runesmith~": {
          "A": "Passive",
          "Effect": "You permanently know 1 spell from the Amateur Spell List.\nYou can identify what language most texts are written in by analyzing them.\nYour Arcana skill increases by 1.\n"
        }
      },
      "Level 3": {
        "<Resilient Ancestry>": {
          "A": "Passive",
          "Effect": "Your Extra Health Pool increases by 10.\nWhen rerolling a save with Dwarven Resilience, add +3 to the roll.\n"
        },
        "<Adapted Resting>": {
          "A": "Passive",
          "Effect": "You gain +5 maximum Health.\nYou now only need to sleep 8 hours per day.\n"
        },
        "<Skill of Trade>": {
          "A": "Reaction",
          "Effect": "Your Charisma increases by 1 (up to a maximum of 3).\nYou can get free shelter and food in inns and taverns (if you would normally be able to pay for them).\nYou gain an extra +5 to Investigation rolls when checking stone walls, doors, statues, etc.\n"
        }
      }
    }
  },
  "Elf": {
    "Race": "Elf",
    "Description": "A race in tune with both nature and magic, the elves highly praise intelligence and knowledge, as well as 'refined' arts of combat.",
    "Options": {
      "When creating your character": {
        "Either": {
          "Choose 2": [
            "Charisma",
            "Intelligence",
            "Wisdom",
            "Dexterity"
          ],
          "Choose 1": [
            "Fortitude"
          ]
        },
        "Saves": [
          "+1 Dexterity",
          "+1 Intelligence"
        ]
      }
    },
    "Skills": {
      "Nature": 1,
      "Knowledge": 1,
      "Arcana": 1,
      "Athletics": -1,
      "Use Rope": -1,
      "Luck": -1
    },
    "Stats": {
      "Base Health": 9,
      "Movement": "6 meters",
      "Lifespan": "200 years",
      "Languages": "Common and Elvish"
    },
    "Weapons": "You are trained in Longbows and Longswords.",
    "Starting Abilities": {
      "~The Blade Dance~": {
        "A": "Passive",
        "Effect": "When you land the killing strike on a Worthy Enemy, you reset your movement this turn and don't provoke attacks of oportunity this turn."
      }
    },
    "Talents": {
      "Level 0": {
        "~Meditation~": {
          "A": "4 Hours",
          "Effect": "Instead of sleeping for 8 hours, you can meditate for 4 hours and achieve the same result.\nWhile meditating, all checks you perform are done at -5.\t\n"
        },
        "~Arcane Veins~": {
          "A": "Passive",
          "Effect": "You permanently know 2 spells from the Amateur Spell List."
        },
        "~Darkvision~": {
          "A": "Passive",
          "Effect": "You can see up to 12 meters away in darkness, without discerning colors."
        }
      },
      "Level 3": {
        "<Mana Tap>": {
          "A": "0 Actions",
          "Range": "3 meters",
          "Cooldown": "Long Rest",
          "Cost": "1 Charge",
          "Effect": "Try to Silence a nearby enemy (Intelligence save)."
        },
        "<Natual Swiftness>": {
          "A": "0 Actions",
          "Effect": "Gain +4 Movement this turn and you avoid Attacks of Oportunity.\nYou can use this once per Long Rest.\n"
        },
        "<Landsperson>": {
          "A": "Special",
          "Effect": "Choose any land specialty ability from Coven of the Land Druid specialization and learn it permanently."
        }
      }
    }
  },
  "Gnome": {
    "Race": "Gnome",
    "Variant": "Hobbit or Halfling",
    "Description": "Gnomes are the little people, generally regarded as peaceful, curious and creative.",
    "Options": {
      "When creating your character": {
        "Either": {
          "Choose 2": [
            "Charisma",
            "Intelligence",
            "Wisdom",
            "Dexterity"
          ],
          "Choose 1": [
            "Fortitude"
          ]
        },
        "Saves": [
          "+1 Dexterity",
          "+1 Charisma"
        ]
      }
    },
    "Skills": {
      "Luck": 1,
      "Stealth": 1,
      "Perception": 1,
      "Athletics": -1,
      "Intimidation": -1,
      "Biology": -1
    },
    "Stats": {
      "Base Health": 8,
      "Movement": "5 meters",
      "Lifespan": "A gnome dies when overwhelmed by stress or depression",
      "Languages": "Common",
      "Size": "If your Fortitude is 2 or more, your size is Medium. Otherwise, it's Small"
    },
    "Weapons": "You are trained in Daggers, Slings and Hand Crossbows.",
    "Starting Abilities": {
      "~Inherited Tastes~": {
        "A": "Passive",
        "Effect": "You don't have a sense of taste, but your eyes perceive colors sharper than other races."
      },
      "~Lucky~": {
        "A": "Reaction",
        "Cooldown": "Long Rest",
        "Effect": "After a creature within 30 meters of you makes a d20 roll, you can add or subtract your Luck Skill from that roll."
      }
    },
    "Talents": {
      "Level 0": {
        "~Catch Me If You Can~": {
          "A": "0 Actions",
          "Effect": "This turn you don't trigger attacks of oportunity.\nYou can do this once per Long Rest.\nAlso, passively, your movement speed increases by 1 meter.\n"
        },
        "~Darkvision~": {
          "A": "Passive",
          "Effect": "You can see up to 12 meters away in darkness, without discerning colors."
        },
        "~Oh, My Tongue!~": {
          "A": "Passive",
          "Effect": "You now have a sense of taste. Congratulations!\nYou can detect whether something is poisonous by licking it without being affected by that poison.\nYou have 50% resistance to Acid and Poison.\n"
        }
      },
      "Level 3": {
        "<Quick to Act>": {
          "A": "Passive",
          "Effect": "You gain maximum Initiative every encounter."
        },
        "<Luckier>": {
          "A": "Passive",
          "Effect": "You can use Lucky twice per Long Rest."
        },
        "<Environmentalist>": {
          "A": "Passive",
          "Effect": "You can move normally through Hard Terrain.\nYou permanently learn 2 Spells from the Druid Spell List.\n"
        }
      }
    }
  },
  "Hollow": {
    "Race": "Hollow",
    "Description": "Hollows are revenants of people who suffered an unworthy or untimely death and who's job as a mortal is not finished.\nLike a ghost, a Hollow's pursuit is so strong that their soul refused to leave the mortal plane, and has come back into their own body to finish what they started.\nA hollow is an undead, yet not considered necessarily unholy.\nAs a Hollow, you might have been revived by the god you follow, or simply your feeling of purpose was so strong that your soul did not leave your body when you died.\nA Hollow always has a goal, usually started when they were alive.\nOr, you might have gotten your goal when you died, such as exacting revenge on the person who killed you.\nMost of the time, hollows are devoid of emotions.\nMany common emotions they used to have are now numbed.\nThey might retain emotions they particularily had when they were alive, such as love (if, for example, they had someone they loved very much)\nThe primary emotion they feel is the one that drives them to their goal.\nIn following their goal, a Hollow might be unusually hopeful or perseverent.\nThe worst emotions a hollow can feel are uselessness and hopelessness.\nSometimes, being hollow comes with partial amnesia.\nA Hollow might forget certain aspects of their past life, such as forgetting some skills or who some people were, where they lived, sometimes even what their name is, in which case a Hollow will come up with a name to represent them, based on what they know.\nAfter achieving their goal, a hollow usually feels complete, unless another goal arises.\nThen, it's the Hollow's choice what it wants to do - roam until their body becomes too rotten to continue and finally release their soul, or kill themselves, as their life's purpose was fulfilled.\n",
    "Other": "Choose which race you were prior to your death.\nThis is only for aesthetics and storytelling purposes.\n",
    "Options": {
      "When creating your character": {
        "Either": {
          "Choose 2": [
            "Charisma",
            "Intelligence",
            "Wisdom"
          ],
          "Choose 1": [
            "Fortitude",
            "Dexterity"
          ]
        },
        "Saves": [
          "+1 Wisdom",
          "+1 Fortitude"
        ]
      }
    },
    "Skills": {
      "Athletics": -1,
      "Luck": -1,
      "Nature": -1,
      "Persuasion": -1,
      "Animal Handling": -1
    },
    "Stats": {
      "Base Health": 7,
      "Movement": "6 meters",
      "Lifespan": "1 to 20 years as a Hollow",
      "Languages": "Any languages specific to your past life race (including the ones given by the \"If your Intelligence is at least...\" condition)",
      "Size": "The size of your past life race"
    },
    "Starting Abilities": {
      "~Undeath~": {
        "A": "Passive",
        "Effect": "You have Advantage to rolls against Diseases.\nYou have 50% vulnerability to Fire damage and to attacks done with silver weapons.\nYou do not require food to survive, but you do require 8 hours of sleep per day, water and air.\nYou are considered Undead.\n"
      },
      "~Valiant~": {
        "A": "Passive",
        "Cooldown": "Long Rest",
        "Effect": "When you drop to 0 Health, you can still take your next turn without penalty.\nAfter your next turn, you fall unconscious.\nYou also fall unconscious in that time if you take damage again.\n"
      }
    },
    "Talents": {
      "Level 0": {
        "~Darkvision~": {
          "A": "Passive",
          "Effect": "You can see up to 12 meters away in darkness, without discerning colors."
        },
        "~Sense Souls~": {
          "A": "0 Actions",
          "Cooldown": "Long Rest",
          "Effect": "You know the locations of any living creatures within 15 meters that are not obstructed by thick materials.\n",
          "Notes": "The more obstructed the space between you and living creatures is, the fainter you feel it. 1 meter of obstruction completely hides the creatures."
        },
        "~Beating Heart~": {
          "A": "Passive",
          "Effect": "You slow down the decaying of your body and increase your life span by up to 100 years.\nYou can stay unconscious for up to 1 week before dying.\nYour maximum health also increases by 3.\n"
        }
      },
      "Level 3": {
        "<Out of Body Release>": {
          "A": "0 Actions",
          "Cooldown": "Long Rest",
          "Effect": "Your soul temporarily exits your body, leaving your body motionless to the ground.\nWhile outside your body, the soul can't do anything except perceive.\nYou can return to your body for 0 Actions on your turn.\nWhile outside your body, you have +3 on Perception, Stealth and Luck.\nIf more than 1 minute outside the body passes, your soul instantly re-enters the body.\n"
        },
        "<Kindled>": {
          "A": "Passive",
          "Effect": "You are no longer vulnerable to Fire damage.\nAfter every worthy encounter, if your health is below 25% and you are conscious, heal back to 25% Health.\n"
        },
        "<Painless Revenge>": {
          "A": "0 Actions",
          "Cooldown": "Long Rest",
          "Effect": "Choose an enemy near you.\nThat enemy performs an attack on you.\nIf you survive the attack, you gain 1 Action which you can use to attack or cast spells on that enemy.\n"
        }
      }
    }
  },
  "Human": {
    "Race": "Human",
    "Description": "Humans are probably the most versatile of races, and that comes with its own advantages and disadvantages.",
    "Options": {
      "When creating your character": {
        "Either": {
          "Choose 2": [
            "Charisma",
            "Intelligence",
            "Wisdom",
            "Dexterity",
            "Fortitude"
          ]
        }
      }
    },
    "Other": "You start with 2 extra Skill Points, and you also get +1 in two Skills of choice.",
    "Stats": {
      "Base Health": 8,
      "Movement": "6 meters",
      "Lifespan": "80 years",
      "Languages": "Common",
      "Size": "Normal"
    },
    "Language": "If your Intelligence is at least 1, you know one additional Common language.",
    "Starting Abilities": {
      "~Human Vigilence~": {
        "A": "Passive",
        "Effect": "Whenever you make a Skill Check, instead of rolling, you can automatically have 7 + your skill modifiers for that check."
      },
      "~Human Diversity~": {
        "A": "Special",
        "Effect": "Choose any other race.\nGain the first starting ability choice from that race.\n",
        "Notes": "You can't pick the Dragonborn choice, because you don't have a breath attack and it wouldn't apply."
      }
    },
    "Talents": {
      "Level 3": {
        "<Master of the World>": {
          "A": "Passive",
          "Effect": "Increase any stat by 1 (up to +3)."
        }
      }
    }
  },
  "Orc": {
    "Race": "Orc",
    "Description": "Tribal in nature, though not stupid.\nOrc societies are highly based on honor and strength.\nMany orcs are also in tune with nature or spirits, allowing them to be both powerful and cunning.\nUnlike orcs in traditional fantasy, Orcs in Call of Heroes are not necessarily vile and reckless.\nOrcs are leaders and hunters by nature, but will also be lead by someone stronger or who can indeed lead better than them.\nEven in a more peaceful tribe, the most charismatic, witty and strong orc will be the leader.\nOrcs are also driven by control (over territory, goods, etc).\nMany of them wish to be in control - they don't like other people doing things for them, unless they are sure they can do it better.\nFor this reason, many orcs make a living without help.\nThey build their own houses, hunt their own food or pillage for both the good of the tribe and their own.\n",
    "Variant": "Ogre",
    "Options": {
      "When creating your character": {
        "Either": {
          "Choose 2": [
            "Charisma",
            "Wisdom",
            "Dexterity",
            "Fortitude"
          ],
          "Choose 1": [
            "Intelligence"
          ]
        },
        "Saves": [
          "+1 Fortitude"
        ]
      }
    },
    "Other": "You start with 1 extra known maneuver.",
    "Skills": {
      "Athletics": 1,
      "Monstrology": 1,
      "Intimidation": 1,
      "Knowledge": -1,
      "Arcana": -1,
      "Persuasion": -1
    },
    "Stats": {
      "Base Health": 11,
      "Movement": "6 meters",
      "Lifespan": "80 years",
      "Languages": "Common and Orcish",
      "Size": "Normal"
    },
    "Language": "If your Intelligence is at least 2, you can speak an additional Wild Language.",
    "Weapons": "You are trained in Hand Axes and Battle Axes.",
    "Starting Abilities": {
      "~Boiling Blood~": {
        "A": "0 Actions",
        "Cooldown": "Long Rest",
        "Effect": "Lose half of your current health.\nIncrease the original damage of your next attack by 50%.\n",
        "Notes": "Extra abilities over that attack are not increased."
      },
      "~Battle Anguish~": {
        "A": "Negative Passive",
        "Effect": "Whevener you drop to 0 Health, your maximum Health permanently decreases by 1."
      }
    },
    "Talents": {
      "Level 0": {
        "~Fierceness~": {
          "A": "Passive",
          "Effect": "You can use any weapon with Fortitude (instead of Dexterity, in some cases)."
        },
        "~Adaptability~": {
          "A": "Passive",
          "Effect": "You can have your Fortitude as your Main Stat, even if your class says otherwise."
        },
        "~Beast Rider~": {
          "A": "Passive",
          "Effect": "You are trained in Riding and Exotic Riding (you can ride exotic mounts, such as wolves).\nYou also have such an exotic mount of your choice, if the DM accepts it.\nYou gain +2 in Animal Handling.\n",
          "Notes": "This mount is a non-combat pet. It does not participate in combat."
        },
        "~Darkvision~": {
          "A": "Passive",
          "Effect": "You can see up to 12 meters away in darkness, without discerning colors."
        }
      },
      "Level 3": {
        "<Bloodthirst>": {
          "A": "0 Actions",
          "Cost": "1 Charge",
          "Cooldown": "Long Rest",
          "Effect": "Gain 0.5 Actions this turn."
        },
        "<Savage Attacks>": {
          "A": "0 Actions",
          "Cooldown": "Long Rest",
          "Effect": "Use after you land an attack.\nRoll and add one other damage die from the attacks' damage dice to the damage roll.\n"
        }
      }
    }
  }
}

export default Races