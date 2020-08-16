let Classes = {
  "Cleric": {
    "Class": "Cleric",
    "Description": "Clerics are people attuned to a certain god.",
    "Options": {
      "When creating your character": {
        "Choose 2": [
          "Charisma",
          "Intelligence",
          "Wisdom",
          "Dexterity",
          "Fortitude"
        ],
        "Saves": [
          "+2 Wisdom Saves",
          "+2 Charisma Saves"
        ]
      }
    },
    "Skills": {
      "Religion": 1,
      "Luck": 1,
      "Persuasion": 1,
      "Biology": -1,
      "Investigation": -1,
      "Deception": -1
    },
    "Stats": {
      "Base Health": 5
    },
    "Language": "If your Intelligence is at least 2, choose one Higher or Common language you can speak.",
    "Level Up": {
      "Every Level": [
        "+5 Health",
        "+1 Skill Point",
        "+1 extra known Spell or Maneuver",
        "+1 extra maximum Charge"
      ],
      "Other": "At levels 2, 4, 6, 8 and 10, you gain a Talent from your chosen specialization.\nAt levels 3, 5, 7 and 9 you gain 1 extra Charge and a Talent from your race.\n"
    },
    "Spellcasting": {
      "Main Stat": "Choose between Wisdom or Charisma. This is your Main Stat.",
      "Spell DC": "10 + (Main Stat)",
      "Charges": {
        "Amount": 3,
        "Regain": "You regain all Charges back when you Long Rest."
      },
      "Change": "You can change your known Spells (not Talents) when taking a long rest inside a temple of your god.",
      "Other": "All Cleric-specific abilities are considered spells (unless stated otherwise).",
      "Number of known maneuvers": "1 + Your Intelligence",
      "Number of known spells": "3 + Your Intelligence",
      "Spell List": [
        "Tower Shield Training",
        "Improvised Attack",
        "Dash",
        "Hide",
        "Defend",
        "Push",
        "Shift",
        "Bull Rush",
        "Taunt",
        "Grapple",
        "Hamstring",
        "Lightweight Strike",
        "Wait",
        "Shank",
        "Control Flames",
        "Quicksand",
        "Crackling Lightning",
        "Flameblade",
        "Fire Enchantment",
        "Dispel Magic",
        "Light",
        "Encode Thoughts",
        "Disenchantment",
        "Bonfire",
        "Cleansing Flames",
        "Detect Poison and Disease",
        "Eldritch Blast",
        "Fire Bolt",
        "Guidance",
        "Hollow Touch",
        "Light",
        "Mastery",
        "Mind Blast",
        "Purify Food and Drink",
        "Resistance",
        "Thaumaturgy",
        "Thunder Clap",
        "Chaining Grasp",
        "Absorb Element",
        "Animate Dead",
        "Charming Word",
        "Cure Wounds",
        "Cure Poison",
        "Cure Disease",
        "Feather Fall",
        "Radiant Smite",
        "Blinding Smite",
        "Cleansing Smite",
        "Curse of Pain",
        "Curse of Weakness",
        "Deathfire Bolt",
        "Distort Vision",
        "Flash",
        "Mending",
        "Shield Element",
        "Turn Undead",
        "Wild Heart",
        "Heat Metal",
        "Water Walk",
        "Conceal Magic",
        "Eldritch Steed",
        "Invisibility",
        "Levitate",
        "Magic Prison",
        "Spare the Dying"
      ]
    },
    "Starting Abilities": {
      "~Awe~": {
        "A": "0 Actions",
        "Range": "3 meters",
        "Effect": "Instantly heal or damage a target for 1d4.\nYou can do this once per Long Rest.\nSome other Cleric spells will cast Awe for free.\n"
      }
    },
    "Other Ability Mentions": "The first time you choose a cleric domain (specialization), you must choose between two abilities.\nFor example, for Battle Cleric, you have to choose either March Ahead or Piety.\nChoose wisely...\n",
    "Specializations": {
      "Description": "At Level 1, you can choose your specialization.",
      "Choices": [
        "Battle Cleric, where you become devoted to either Peace or War (or both) and pursue either of those",
        "Beacon Cleric, a keeper of the light or darkness, whose power draws from flame or shadow...",
        "Life Cleric, a balancer between life and death; your very fate hangs in this balance"
      ]
    },
    "Specs": {
      "Battle Cleric": {
        "Description": "Battle clerics specialize in conditions of war. You must choose your side",
        "Starting Abilities": {
          "~Chains~": {
            "A": "1 Action",
            "Cost": "1 Charge",
            "Range": "6 meters",
            "Cooldown": "Long Rest",
            "Effect": "Cast Awe on a target 2 times (for free).\nTry to Paralyze it for 1 minute.\nSubtract one of the rolled Awe dice from the target's save.\n"
          }
        },
        "Choose your side": "Battle Cleric!\nPick only one of the following two abilities!\n",
        "Abilities": {
          "~March Ahead~": {
            "A": "0 Actions",
            "Cooldown": "Long Rest",
            "Effect": "All allies can move 3 extra meters on their next turn (and you too).\n"
          },
          "~Piety~": {
            "A": "Passive",
            "Effect": "Casting Awe yourself (manually, the actual Ability) now does 2d4 instead of 1d4."
          }
        },
        "Talents": {
          "Level 2": {
            "<Eternal Bindings>": {
              "A": "0 Actions or Reaction",
              "Cost": "1 Charge",
              "Effect": "A creature within 3 meters makes a Wisdom save.\nIf it fails, cast Awe on it.\nIt becomes magically bound to an object within 3 meters of it and can't willingly move more than 3 meters away from that object.\nIt rolls the save again at the start each of their turn to escape the binding.\nLasts up to 1 minute.\n",
              "isTalent": true
            },
            "<Heavy Burden>": {
              "A": "0 Actions",
              "Cost": "1 Charge.",
              "Effect": "A creature within 3 meters makes a Wisdom save.\nIf it fails, cast Awe on it and it is Crippled.\n",
              "isTalent": true
            },
            "<Repentance>": {
              "A": "0.5 Actions",
              "Cost": "50% of your maximum health",
              "Range": "1 meter (touch)",
              "Cooldown": "Long Rest",
              "Effect": "Restore 50% of an ally's maximum health.",
              "isTalent": true
            }
          }
        }
      },
      "Beacon Cleric": {
        "Description": "As a cleric, you become a devotee of darkness or/and light.",
        "Starting Abilities": {
          "~Grasp~": {
            "A": "0.5 Actions",
            "Range": "12 meters (you don't need line of sight)",
            "Cooldown": "Long Rest",
            "Effect": "Cast Awe on the target.\nThat target does not benefit from partial cover for 1 minute.\n"
          }
        },
        "Choose your side": "Beacon Cleric!\\nPick only one of the following two abilities!",
        "Abilities": {
          "~Radiance~": {
            "A": "Passive",
            "Effect": "At all times, you radiate light in a 3 meter radius.\nYou can turn this on and off at will.\nIf you have full health, Awe damage and healing is 1d6.\n"
          },
          "~Twilight~": {
            "A": "Passive",
            "Effect": "You have Dark Vision.\nYou are immune to being Blinded.\nIf you have 50% or less health, Awe damage and healing is 1d6.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Let There Be Light>": {
              "A": "Passive",
              "Effect": "Grasp now casts Awe 2 times instead of 1.\nYou can also split your Grasp to target 2 targets (1 Awe each).\n",
              "isTalent": true
            },
            "<Let There Be Darkness>": {
              "A": "0.5 Actions",
              "Cost": "1 Charge",
              "Range": "6 meters to margin",
              "Effect": "You create a 4x4 meter area of magical partial darkness.\nFor all units there (except you) it counts as difficult terrain.\nAll attacks done from and towards units in the area have Partial Cover.\n",
              "isTalent": true
            },
            "<Repentance>": {
              "A": "0.5 Actions",
              "Cost": "50% of your maximum health",
              "Range": "1 meter (touch)",
              "Cooldown": "Long Rest",
              "Effect": "Restore 50% of an ally's maximum health.",
              "isTalent": true
            }
          }
        }
      },
      "Life Cleric": {
        "Description": "You are a worshipper of life and/or death. Seek their balance, and seek balance within yourself.\\nYou have a Second Soul character, which is essentially another toned-down character you play.",
        "Starting Abilities": {
          "~Second Soul~": {
            "A": "Special",
            "Effect": "You have another character beside you: your 'minion'.\nPrepared Spells and Maneuvers: (Your Level / 2) + its Intelligence (at least 1) spells from the Amateur spell list\nSkill Points: 1 + Your Level + its Intelligence. It can use it to acquire Training in weapons or Skill bonuses\nYou share the same Actions and Charges between yourselves.\nEx: If you used 0.5 Actions on your turn, your minion has 0.5 Actions left to use on its turn.\n",
            "Other": {
              "Health": "Determined by your minion's nature",
              "Defense": 3,
              "Movement": "5 meters (land)",
              "Stats": "Assign the numbers (-1, 0, 1, 1, 2) in any order",
              "Saves and Skills": "Respective to Stats",
              "Languages": "Common and one more Usual or Wild language that makes sense for it",
              "Initiative Bonus": "The minion rolls initiative separately with a +0 modifier"
            }
          }
        },
        "Choose your side": "Life Cleric!\\nPick only one of the following two abilities!",
        "Abilities": {
          "~True Necromancy~": {
            "A": "Passive",
            "Effect": "Your minion is a reanimated humanoid, whose soul is compelled to stay in this plane until its purpose is met.\nCome up with a story about why you have an Undead minion and why your god allowed this or gave him or her to you.\nAwe dice increases by 1 tier when healing yourself (or your minion).\nYour minion shares the same Health pool with you.\n"
          },
          "~Celestial Follower~": {
            "A": "Passive",
            "Effect": "Your minion is a Celestial being, whose task is to protect, guide or follow you until its purpose is met.\nYour Celestial follower can be a humanoid or animal in appearance (it can't fly) and is sentient.\nCome up with a story about why you have a Celestial follower, and why your god allowed this or gave him or her to you.\nYour minion's max Health is always half of your max Health.\n",
            "Notes": "If it's animal-shaped and you want to use the rules for weapon attacks, just pretend the minion bites or scratches or something like that, but apply normal weapon rules."
          }
        },
        "Talents": {
          "Level 2": {
            "<Divine Message>": {
              "A": "10 minutes",
              "Cost": "1 Charge",
              "Cooldown": "24 Hours (in game)",
              "Effect": "You pray for 10 minutes to get an answer to a question from your god(s).\nSet a real life timer of 10 minutes (time in which you can do anything out of the game).\nWhen the timer expires, you can ask the DM one question consisting of maximum 3 words (e.g. 'Is sword cursed?').\nThe answer you will get will consist of maximum 3 words.\nThe DM can choose not to answer, to answer falsely or say something completely different. The gods' wills are unknowable.\n",
              "isTalent": true
            },
            "<Disembodiment>": {
              "A": "2 hours",
              "Requirement": "True Necromancy",
              "Effect": "You are able to ever improve your minion by mix and matching parts from other corpses.\nEvery time you use this ability, you must consume a fresh corpse from a Worthy enemy (maximum 2 hours after death) and you irreversably sacrifice something.\nEach of these effects has a limited number of uses\n- +1 Maximum Health, but your highest Skill decreases by 2 (5 uses)\n- +1 Defense for either you or your minion, but -2 maximum number of prepared spells (2 uses)\n- +1 Spell DC, but -1 to all Saves (1 use)\n- +2 uses of Awe per Long Rest, but -1 maximum Charge (1 use)\n",
              "isTalent": true
            },
            "<Repentance>": {
              "A": "0.5 Actions",
              "Cost": "50% of your maximum health",
              "Range": "1 meter (touch)",
              "Cooldown": "Long Rest",
              "Effect": "Restore 50% of an ally's maximum health.",
              "isTalent": true
            }
          }
        }
      }
    }
  },
  "Druid": {
    "Class": "Druid",
    "Description": "Druids are protectors of the nature and master shapeshifters.",
    "Options": {
      "When creating your character": {
        "Choose 2": [
          "Charisma",
          "Wisdom",
          "Dexterity",
          "Fortitude"
        ],
        "Saves": [
          "+2 Wisdom Saves",
          "+2 Fortitude Saves"
        ]
      }
    },
    "Skills": {
      "Nature": 1,
      "Survival": 1,
      "Animal Handling": 1,
      "Persuasion": -1,
      "History": -1,
      "Deception": -1
    },
    "Stats": {
      "Base Health": 9
    },
    "Language": "If your Intelligence is at least 1, you know Druidic, the secret and ancient language of Druids.\nIf your Intelligence is at least 2, choose one Common, Wild or Elemental language you can speak.\n",
    "Level Up": {
      "Every Level": [
        "+5 Health",
        "+1 Skill Point",
        "+1 extra known Spell or Maneuver",
        "+1 extra maximum Charge"
      ],
      "Other": "At levels 2, 4, 6, 8 and 10, you gain a Talent from your chosen specialization.\nAt levels 3, 5, 7 and 9 you gain 1 extra Charge and a Talent from your race.\n"
    },
    "Spellcasting": {
      "Main Stat": "Wisdom",
      "Spell DC": "10 + (Main Stat)",
      "Charges": {
        "Amount": 3,
        "Regain": "You regain all Charges back when you Long Rest."
      },
      "Change": "You can change your known Spells (not Talents) when taking a long rest at a safe place, uncorrupted and untouched by regular folk.",
      "Other": "All Druid-specific abilities are considered spells (unless stated otherwise).",
      "Number of known maneuvers": "1 + Your Intelligence",
      "Number of known spells": "3 + Your Intelligence",
      "Spell List": [
        "Highlander Technique",
        "Improvised Attack",
        "Dash",
        "Hide",
        "Defend",
        "Push",
        "Shift",
        "Bull Rush",
        "Taunt",
        "Grapple",
        "Hamstring",
        "Lightweight Strike",
        "Wait",
        "Shank",
        "Acid Burst",
        "Bonfire",
        "Cleansing Flames",
        "Control Flames",
        "Control Water",
        "Control Earth",
        "Detect Poison and Disease",
        "Fire Bolt",
        "Guidance",
        "Land Breach",
        "Mastery",
        "Purify Food and Drink",
        "Resistance",
        "Quicksand",
        "Thunder Clap",
        "Water Sphere",
        "Feather Fall",
        "Water Walk",
        "Absorb Element",
        "Alarm",
        "Charming Word",
        "Cure Wounds",
        "Cure Poison",
        "Cure Disease",
        "Fog Cloud",
        "Distort Vision",
        "Fairy Fire",
        "Fake Sound",
        "Influence Beast",
        "Barkskin",
        "Shield Element",
        "Shadow Clone",
        "Speak With Animals",
        "Speak With Plants",
        "Water Sphere",
        "Wild Heart",
        "Web",
        "Crackling Lightning",
        "Water Walk",
        "Fire Ball",
        "Invisibility",
        "Spider Climb",
        "Spare the Dying",
        "Wild Steed"
      ]
    },
    "Starting Abilities": {
      "~Druidcraft~": {
        "A": "Depends",
        "Effect": "You can create harmless sensory effects or tiny weather effects (6 meters range).\nYou can massively speed up the growth of small plants (touch range).\nYou can slightly soothe physical pains (with no combat effect) (touch range).\nYou can attempt to communicate simple ideas with animals and plants (3 meters range).\nYou have +3 on rolls for identifying plants.\nYou can do these even while Shapeshifted.\n"
      },
      "~Animal Attack~": {
        "A": "1 Action",
        "Effect": "Make a melee attack against a creature for 2d8 + Animal's Strength or Dexterity.\n"
      },
      "~Shapeshift~": {
        "A": "1 Action",
        "Cost": "1 Charge",
        "Effect": "Pick an animal from the Animal Pets and Shapeshift Animals list and instantly transform into it.\nYou gain that animal's Fortitude and Dexterity saves.\nApply any other modifiers (except for base Stats) from that animal.\nYou also gain its exact abilities.\nWhile Shapeshifted, you can do Animal Attack.\nWhile Shapeshifted, you can do any maneuvers you know. You can't cast spells.\nWhen you Shapeshift, your Health stays the same, unless the animal states it has a bonus/minus to Health.\nWhen Shapeshift ends, subtract back whatever health you added, or add back whatever health you subtracted.\nWhen you end Shapeshift, if your health would be 0 or less, it stays at 1.\nShapeshift ends if you drop to 0 Health, and you go Unconscious.\nAt first, you can't choose innately swimming or flying animals.\nFrom level 4, you can transform into innately swimming animals.\nFrom level 8, you can transform into innately flying animals.\n",
        "Notes": "You can't make attacks with ranged weapons while Shapeshifted (obviously).\nYou choose what items you keep on you when Shapeshifting, and those items are 'merged' into your new form.\nYou can turn back into your humanoid form for 0 Actions (on your turn).\n"
      }
    },
    "Specializations": {
      "Description": "At Level 1, you can choose your coven (Specialization). A coven is a spiritual path you adhere to, and whose culture you represent.",
      "Choices": [
        "Coven of the Old Ways, using the old magic, worshipping old gods and drawing power from the sun, the moon and the stars",
        "Coven of the Wild, where your true fey or animalistic nature takes shape!",
        "Coven of the Wicked, where nature-infused eldritch magic overcomes your mind, body and soul",
        "Coven of the Land, a protector of the flora and fauna specific to your chosen domain"
      ]
    },
    "Specs": {
      "Coven of the Old Ways": {
        "Description": "You worship the sun, the moon and the stars, for only they can truly guide your path.\nPagan Druids believe no one has the right to dictate someone else's spiritual path.\nAs a Pagan Druid, you oppose fanaticism, opressors and stupidity.\nPagan Druids worship no god, but they do acknowledge their power and they heavily respect nature and the earth.\nA Pagan Druid gains the power through not black, nor white eldritch magic.\nThe suggested alignment for Pagan Druids is True Neutral.\n# - Skulls\n# - Runes and Symbols\n# - Elements\n# - choose a symbol for yourself\n# - Coven (not only ofr duirds, but yk witchcraft n shit)\n# - Rely on components, scrying\n# - Casts diviner magic\n# - Has the 'swap' die roll mechanic\n# - Can force die rerolls\n# - These are in the form of rituals\n# - Ex: name a round. In that round, ...\n",
        "Starting Abilities": {
          "~Day Night Cycle~": {
            "A": "Passive",
            "Effect": "Instead of knowing one set of spells, as normal, you know two: one for the moon, and one for the sun.\nThe Moon spells can only be used at night (from end of dusk until start of dawn).\nThe Sun spells can only be used at day (from start of dawn until end of dusk).\nThe Sun spell set and the Moon spell set can not contain any of the same spell.\nWhenever you learn a new spell, choose to put it either in the Sun spell set or the Moon spell set.\n",
            "Notes": "So, in total, you know twice as many spells.",
            "Downside": "Once you prepare a spell for Day or Night, you can no longer assign it to the other one. Ever."
          },
          "~Moonsun Fire~": {
            "A": "0.5 Actions",
            "Cost": "1 Charge",
            "Range": "6 meters",
            "Effect": "A target within 6 meters makes a Wisdom save.\nIf it fails, it takes 1d8 + 1 Fire and is Crippled (if day) or Force damage and is Silenced (if night).\nIf you use this at night, you can't use it until day, and vice versa.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Old Ritualist>": {
              "A": "10 minutes",
              "Cooldown": "Long Rest",
              "Effect": "Gain 1 Charge.\nThe Old Ritual must be performed outdoors, in a safe, uncorrupted place untouched by regular folk.\n",
              "Downside": "You permanently lose the Shapeshift ability, and you can never choose Talents that improve Shapeshift.",
              "isTalent": true
            },
            "<Lycanthropy>": {
              "A": "Passive",
              "Effect": "During the night (24:00 to 6:00) you can Shapeshift into a Lycanthrope (see Lycanthrope form).\nA Lycanthrope is a \n",
              "isTalent": true
            },
            "<Animal Companion>": {
              "A": "Passive",
              "Effect": "You have an animal pet that can fight alongside you!\nYour animal has stats depending on its species.\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\n- Health: Half of yours\n- Movement: 6 meters\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\nYour pet can make normal Skill Checks using your Skill bonuses, or its own, using its special Stats.\nYour pet will not stray more than 30 meters away from you in hostile territory.\nOn your turn, you can command it to move, but it can't take its own Actions.\nYou and your pet share the same Actions on a turn.\n(ex: If you have 1 Action, your pet can use 0.5 Actions to attack and you can use 0.5 Actions to attack too, or your pet spends 1 Action and you skip your Actions, etc.)\nAll pets have the Pet Attack ability:\n  <Pet Attack> : 0.5 Actions\n  The pet melee attacks a target.\n  The attack deals 1d10 + Main Stat.\n  You can do this once per turn.\n  Some abilities may say 'Perform a Pet Attack'. In that case, ignore the once-per-turn.\n",
              "isTalent": true
            }
          }
        }
      },
      "Coven of the Wild": {
        "Description": "You are heavily in touch with nature and with strange creatures, uncommon to the normal folk.",
        "Starting Abilities": {
          "~Wild Shape~": {
            "A": "Passive",
            "Effect": "When you use Shapeshift, you can transform into a combination of 2 animals.\nYou take the highest stat from both animals, and you have access to both of their abilities.\n",
            "Notes": "For example, you could transform into a combination of Bird of Prey and Bear, resulting in a kind of Owlbear, with a lot of health and a lot of Armor! Be creative!\nThe animal size is either the larger or the smaller of the two.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Forest Friend>": {
              "A": "Passive",
              "Effect": "You have a Pixie companion, a very small humanoid with wings.\nThe Pixie has 20 Armor and always stays with you.\nIf the Pixie goes more than 10 meters away from you, it becomes unsummoned (you can summon it back with a 5 minute ritual).\nYou can command the Pixie simple instructions for 0 Actions, like 'go there' or 'pick up that object'.\nThe Pixie has Charisma, Wisdom and Intelligence equal to yours, but its Dexterity is 0 and its Strength is -10.\nDecide with your DM whether you or the DM controls the Pixie roleplay-wise.\nHave fun!        \n",
              "isTalent": true
            },
            "<Treesposition>": {
              "A": "Passive",
              "Effect": "Touch a large or larger piece of wood and choose one of the following:\n1. Teleport near another large or larger piece of wood within 6 meters.\n2. Partially enter the piece of wood, becoming camouflaged. You have +5 Stealth until you exit back to your normal space.\nYou can stay like that for up to 1 hour.\nYou can do this once per day for free, or for 1 Charge.\nYou benefit from Cover while inside a tree.\n",
              "isTalent": true
            },
            "<Copy Cat>": {
              "A": "Passive",
              "Effect": "You can now use Shapeshift to also transform into other people.\nWhen you want to do this, roll a Deception check.\nThis check determines how close you get to the form of that person (20 or more means a perfect copy).\nThis copy just mimicks the body of the person, not the voice or personality or clothes.\nYour Fortitude and Dexterity also change to that person's stats, but not your Health, Armor, Charges, etc.\nYour Fortitude and Dexterity skill bonuses and Saves change to exactly equal to your new stats.\nYour Intelligence, Wisdom and Charisma skill bonuses, Stats and Saves stay the same as your normal ones.\nThis shapeshift ends if you get Crowd Controlled (other than Slow).\nYou can only copy a person once per day.\n",
              "isTalent": true
            }
          }
        }
      },
      "Coven of the Wicked": {
        "Description": "Witch druids use eldritch magic of the nature to bend reality in an unseen way, cast curses and dispell magic.\nHowever, this comes at a price, usually of its own sanity and control over the powers.\nWiccan Druids believe no one has the right to dictate someone else's spiritual path.\nAs a Wiccan Druid, you oppose fanaticism, opressors and stupidity.\nWiccan Druids worship no god, but they do acknowledge their power and they heavily respect nature and the earth.\nA Wiccan Druid gains the power through not black, nor white eldritch magic.\nThe suggested alignment for Wiccan Druids is True Neutral.\n",
        "Starting Abilities": {
          "~Witchcraft~": {
            "A": "Passive (Special)",
            "Effect": "You have 0 Witch points.\nAll Druid-class-abilities (except Druidcraft) generate 1 Witch point.\nAll non-Druid-class-abilities that use at least 1 Charge remove 1 Witch point.\n",
            "Downside": "For every extra Witch point you have over 3, you take 1 damage on every short rest instead of healing.",
            "Notes": "You can't have less than 0 Witch points. You can simply use Charges to remove Witch points in between Long Rests."
          },
          "~Livid Curse~": {
            "A": "0 Actions",
            "Range": "6 meters",
            "Cooldown": "1 turn",
            "Effect": "A creature makes a Wisdom save.\nIf it fails, it has -2 on all saves for 1 Hour (does not stack with other similar debuffs).\n"
          },
          "~Dispelling Ritual~": {
            "A": "5 minutes",
            "Effect": "Dispells all negative debuffs, poisons, paralyzes, minor curses from allies attending the ritual.\nAfter that, in the next encounter, after the first time an enemy casts a spell (non-naturally), it rolls a Charisma save.\nIf it fails, it is Silenced.\n"
          },
          "~Black Charm~": {
            "A": "1 Action",
            "Cost": "2 Charges",
            "Range": "6 meters",
            "Effect": "A creature that can see and hear you makes a Wisdom save.\nIf it fails it is Charmed for 1 turn.\nWhen the Charm ends (at the end of its turn), it takes 4d4 psychic damage.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Old Ritualist>": {
              "A": "10 minutes",
              "Cooldown": "Long Rest",
              "Effect": "Gain 1 Charge.\nThe Old Ritual must be performed outdoors, in a safe, uncorrupted place untouched by regular folk.\n",
              "Downside": "You permanently lose the Shapeshift ability, and you can never choose Talents that improve Shapeshift.",
              "isTalent": true
            },
            "<Stone of Summoning>": {
              "A": "Special",
              "Effect": "You take a pilgrimage of 7 days alone outdoors, in a safe, uncorrupted place untouched by regular folk.\nAfter this time, you transform a piece of natural rock into a summoning portal, by aligning it, other natural elements around it and decorating it according to the stars.\nChoose an ally within 100 kilometers of the stone. That ally will know when you are trying to summon them.\nBy you spending 3 Charges, you and a willing ally can spend 1 Hour summoning that willing ally to the location of the stone if that ally is within 100 kilometers of the stone.\nYou can summon an ally once a week.\nYou can take a new pilgrimage once a year.\n",
              "Notes": "For an ally to be summoned, it must have a clear state of mind and it must focus together with the caster for 1 hour.",
              "isTalent": true
            },
            "<Animal Companion>": {
              "A": "Passive",
              "Effect": "You have an animal pet that can fight alongside you!\nYour animal has stats depending on its species.\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\n- Health: Half of yours\n- Movement: 6 meters\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\nYour pet can make normal Skill Checks using your Skill bonuses, or its own, using its special Stats.\nYour pet will not stray more than 30 meters away from you in hostile territory.\nOn your turn, you can command it to move, but it can't take its own Actions.\nYou and your pet share the same Actions on a turn.\n(ex: If you have 1 Action, your pet can use 0.5 Actions to attack and you can use 0.5 Actions to attack too, or your pet spends 1 Action and you skip your Actions, etc.)\nAll pets have the Pet Attack ability:\n  <Pet Attack> : 0.5 Actions\n  The pet melee attacks a target.\n  The attack deals 1d10 + Main Stat.\n  You can do this once per turn.\n  Some abilities may say 'Perform a Pet Attack'. In that case, ignore the once-per-turn.\n",
              "isTalent": true
            }
          }
        }
      },
      "Coven of the Land": {
        "Description": "The Druid of the Land is a guardian of its own domain. Be it a lush forest, a snowy mountain or a rocky cave, the Druid of the Land knows its own ways.",
        "Starting Abilities": {
          "~Circle of the Land~": {
            "A": "Passive",
            "Effect": "You know 2 more spells permanently from your Druid spell list.\nWhen you transform into an animal native to your domain, heal for 1d4 health.\n"
          }
        },
        "Abilities": {
          "~Raise Wall~": {
            "A": "0.5 actions",
            "Range": "6 meters to margin",
            "Cooldown": "Long Rest, or none for 1 Charge",
            "Effect": "You raise a wall of stone, dirt or other such material from the ground, 1x2x2 (1 meter thick, 2 wide, 2 tall).\n",
            "Notes": "You can instantly crumble the wall in your turn by using 0 Actions.\nYou can do it for free once per Long Rest. Then, it costs 1 Charge each use.\n"
          },
          "~Wild Roots~": {
            "A": "1 Action",
            "Cost": "1 Charge",
            "Effect": "Roots spawn from your position (next to you).\nThe roots can move up to 5 meters right now, and you control how the roots move.\nRoots can pass through enemies, and all enemies they pass through must make a Dexterity save.\nIf they fail, they are Snared and take 1d6 damage.\n"
          },
          "~Storm~": {
            "A": "0 Actions",
            "Cost": "1 Charge",
            "Range": "6 meters to margin",
            "Effect": "Target a 4x4x4 meter area within 6 meters and create a storm of water, air, or any other such material there.\nCreatures inside the sand storm are Blinded and the sand storm acts as hard terrain.\nLasts 1 minute.\n"
          },
          "~Endurance~": {
            "A": "Passive",
            "Effect": "You are used to living in harsh environments.\nYou gain +1 on Fortitude, Dexterity and Wisdom saves and +4 to your maximum health.\nYou gain +1 in Survival and Stealth.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Old Ritualist>": {
              "A": "10 minutes",
              "Cooldown": "Long Rest",
              "Effect": "Gain 1 Charge.\nThe Old Ritual must be performed outdoors, in a safe, uncorrupted place untouched by regular folk.\n",
              "Downside": "You permanently lose the Shapeshift ability, and you can never choose Talents that improve Shapeshift.",
              "isTalent": true
            },
            "<Innervate>": {
              "A": "0.5 Actions",
              "Cost": "1 Charge",
              "Range": "6 meters",
              "Effect": "Heal an ally for 3 Health and it regains 1 Charge.\n",
              "Downside": "Can not be cast on other Druids.",
              "isTalent": true
            },
            "<Animal Companion>": {
              "A": "Passive",
              "Effect": "You have an animal pet that can fight alongside you!\nYour animal has stats depending on its species.\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\n- Health: Half of yours\n- Movement: 6 meters\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\nYour pet can make normal Skill Checks using your Skill bonuses, or its own, using its special Stats.\nYour pet will not stray more than 30 meters away from you in hostile territory.\nOn your turn, you can command it to move, but it can't take its own Actions.\nYou and your pet share the same Actions on a turn.\n(ex: If you have 1 Action, your pet can use 0.5 Actions to attack and you can use 0.5 Actions to attack too, or your pet spends 1 Action and you skip your Actions, etc.)\nAll pets have the Pet Attack ability:\n  <Pet Attack> : 0.5 Actions\n  The pet melee attacks a target.\n  The attack deals 1d10 + Main Stat.\n  You can do this once per turn.\n  Some abilities may say 'Perform a Pet Attack'. In that case, ignore the once-per-turn.\n",
              "isTalent": true
            }
          }
        }
      }
    }
  },
  "Hunter": {
    "Class": "Hunter",
    "Description": "You are a hunter, tracker, always on your toes. No matter your foe, be it a beast, a vampire or a dragon, you know best how to deal with it.",
    "Options": {
      "When creating your character": {
        "Choose 2": [
          "Wisdom",
          "Dexterity",
          "Fortitude"
        ],
        "Saves": [
          "+3 Dexterity Saves"
        ]
      }
    },
    "Skills": {
      "Nature": 1,
      "Stealth": 1,
      "Perception": 1,
      "Religion": -1,
      "History": -1,
      "Performance": -1
    },
    "Stats": {
      "Base Health": 6
    },
    "Language": "If your Intelligence is at least 1, choose one Common or Wild language you can speak.",
    "Level Up": {
      "Every Level": [
        "+5 Health",
        "+1 Skill Point",
        "+1 extra known Spell or Maneuver",
        "+1 extra maximum Charge"
      ],
      "Other": "At levels 2, 4, 6, 8 and 10, you gain a Talent from your chosen specialization.\nAt levels 3, 5, 7 and 9 you gain 1 extra Charge and a Talent from your race.\n"
    },
    "Spellcasting": {
      "Main Stat": "Choose between Wisdom or Charisma. This is your Main Stat.",
      "Spell DC": "10 + (Main Stat)",
      "Charges": {
        "Amount": 3,
        "Regain": "You regain all Charges back when you Long Rest."
      },
      "Change": "You can change your known Spells (not Talents) when taking a long rest outdoors.",
      "Number of known maneuvers": "1 + Your Intelligence",
      "Number of known spells": "Your Level",
      "Spell List": [
        "Double Greatweapon Fighting",
        "Highlander Technique",
        "Duelist Technique",
        "Improvised Attack",
        "Dash",
        "Hide",
        "Defend",
        "Push",
        "Shift",
        "Bull Rush",
        "Taunt",
        "Grapple",
        "Hamstring",
        "Lightweight Strike",
        "Wait",
        "Shank",
        "Conjure Ammo",
        "Detect Poison and Disease",
        "Land Breach",
        "Flameblade",
        "Light",
        "Purify Food and Drink",
        "Sense Magic",
        "Flash",
        "Mastery",
        "Chaining Grasp",
        "Absorb Element",
        "Alarm",
        "Charming Word",
        "Cure Poison",
        "Fairy Fire",
        "Fake Sound",
        "Influence Beast",
        "Barkskin",
        "Sense Magic",
        "Speak With Animals",
        "Wild Heart",
        "Wild Steed",
        "Magic Prison"
      ]
    },
    "Starting Abilities": {
      "~Slay~": {
        "A": "0 Actions",
        "Cost": "1 Charge",
        "Effect": "Your next attack has the following effect:\nIf the target has 50% of less Health, deal 1d12 extra damage.\nIf it has more, try to Snare it (Wisdom save).\n"
      },
      "~Tumble~": {
        "A": "0 Actions",
        "Cooldown": "Long Rest",
        "Effect": "Move 1 meter in any direction, without triggering attacks of oportunity."
      }
    },
    "Abilities": {
      "~Wicked Slayer~": {
        "A": "Passive",
        "Effect": "Your weapon attacks and thrown spells against Monstrosities, Celestials and Unholy creatures have +1.\nYour attacks are always treated as Magical or Silver for the purpose of some effects.\n"
      },
      "~Mage Slayer~": {
        "A": "Reaction",
        "Cost": "1 Charge",
        "Effect": "Use when an enemy casts a spell.\nTry to Silence it and prevent that spell (Wisdom save).\n"
      },
      "~Giant Slayer~": {
        "A": "Passive",
        "Effect": "Weapon attacks and thrown spells deal +1 damage against Large or larger targets.\nEnemies don't gain flanking bonus when attacking you.\n"
      },
      "~Manking Slayer~": {
        "A": "Passive",
        "Effect": "Against Humanoids, Slay both deals the extra damage and tries to Snare it, no matter the health."
      }
    },
    "Specializations": {
      "Description": "At Level 1, you can choose your specialization.",
      "Choices": [
        "Draven, a tracker and hunter of beats and men, never lost and never without purpose",
        "Warden, a potent user of fast and practical magic to use against foes, and with allies",
        "Beastmaster, a pack hunter, who finds friends in even the most ruthless of beasts"
      ]
    },
    "Specs": {
      "Draven": {
        "Description": "lorem",
        "Starting Abilities": {
          "~Tracker~": {
            "A": "Passive",
            "Effect": "o You can more easily track creatures.\nWhen you try to track a creature, your roll for that try gains +3.\nIf you succeed, you may learn about its size, how many of them there are, if it's injured or roughly how far away it is.\no Your party can't get lost in the wild except by magical means\no You (and your pets) are unaffected by Rough Terrain.\n"
          },
          "~Hunter's Mark~": {
            "A": "0 Actions",
            "Cost": "1 Charge",
            "Range": "12 meters",
            "Cooldown": "Long Rest",
            "Effect": "Choose and mark a target.\nYour single target attacks and thrown spells against the marked target have the damage dice increased by 1 tier.\nWhen the target with the mark dies, you can use your Reaction to freely move the mark to another enemy.\n",
            "Notes": "Ex: instead of 2d6, an attack would be 2d8.\nD12's don't increase, they stay d12.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Animal Companion>": {
              "A": "Passive",
              "Effect": "You have an animal pet that can fight alongside you!\nYour animal has stats depending on its species.\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\n- Health: Half of yours\n- Movement: 6 meters\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\nYour pet can make normal Skill Checks using your Skill bonuses, or its own, using its special Stats.\nYour pet will not stray more than 30 meters away from you in hostile territory.\nOn your turn, you can command it to move, but it can't take its own Actions.\nYou and your pet share the same Actions on a turn.\n(ex: If you have 1 Action, your pet can use 0.5 Actions to attack and you can use 0.5 Actions to attack too, or your pet spends 1 Action and you skip your Actions, etc.)\nAll pets have the Pet Attack ability:\n<Pet Attack> : 0.5 Actions\nThe pet melee attacks a target.\nThe attack has + your Main Stat.\nThe attack deals 1d6 + your Main Stat - 1 (can't be lower than 1d6 - 1).\nYou can do this once per turn.\nSome abilities may say 'Perform a Pet Attack'. In that case, ignore the once-per-turn.\n",
              "isTalent": true
            },
            "<Flare Shot>": {
              "A": "Reaction or 0 Actions",
              "Cost": "1 Charge",
              "Range": "15 meters",
              "Effect": "Quickly shoot a flare at a target point.\nThe area around the flare lights up in a 6 meter radius, creating normal light.\nWhen cast, all allies in the area are cleared of Stun, Fear or Cripple.\nAllies in the area have Advantage on rolls against Fear.\nThe flare lasts 1 minute.\n",
              "isTalent": true
            },
            "<Night Senses>": {
              "A": "0 Actions",
              "Cost": "1 Charge",
              "Effect": "For 1 Hour, you gain the following:\nYour party has Dark Vision (15 meter range).\nYour party has Advantage on rolls against Blinding.\nYour party has +2 meter movement speed.\n",
              "isTalent": true
            }
          }
        }
      },
      "Warden": {
        "Description": "Lorem :)",
        "Starting Abilities": {
          "~Warden~": {
            "A": "Passive",
            "Effect": "When creating your character, you can choose 2 more spells to know permanently from the Mage or Cleric spells list.\nYou also gain +1 in Arcana, Luck and Knowledge, and your Spell DC is increased by 2.\nSlay is replaced by Quick Magic. Quick Magic is considered a Spell.\n"
          },
          "~Quick Magic~": {
            "A": "0 Actions",
            "Cost": "1 or more Charges",
            "Cooldown": "Turn",
            "Effect": "Spend any number of Charges.\nChoose one of the following effects, then apply the exact same effect for each Charge spent:\n- Instantly deal 1d6 Fire, Frost or Shock damage to a target, and permanently reduce its Armor by 1 (3 meter range).\n- Instantly heal a target for 1d6 (3 meter range).\n- Instantly dash 3 meters, ignoring attacks of oportunity, and going through enemies and small obstacles or medium gaps.\n",
            "Notes": "You can do this once per turn."
          }
        },
        "Talents": {
          "Level 2": {
            "<Animal Companion>": {
              "A": "Passive",
              "Effect": "You have an animal pet that can fight alongside you!\nYour animal has stats depending on its species.\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\n- Health: Half of yours\n- Movement: 6 meters\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\nYour pet can make normal Skill Checks using your Skill bonuses, or its own, using its special Stats.\nYour pet will not stray more than 30 meters away from you in hostile territory.\nOn your turn, you can command it to move, but it can't take its own Actions.\nYou and your pet share the same Actions on a turn.\n(ex: If you have 1 Action, your pet can use 0.5 Actions to attack and you can use 0.5 Actions to attack too, or your pet spends 1 Action and you skip your Actions, etc.)\nAll pets have the Pet Attack ability:\n<Pet Attack> : 0.5 Actions\nThe pet melee attacks a target.\nThe attack has + your Main Stat.\nThe attack deals 1d6 + your Main Stat - 1 (can't be lower than 1d6 - 1).\nYou can do this once per turn.\nSome abilities may say 'Perform a Pet Attack'. In that case, ignore the once-per-turn.\n",
              "isTalent": true
            },
            "<Watcher Form>": {
              "A": "1 Action",
              "Cost": "1 Charge",
              "Cooldown": "Long Rest",
              "Effect": "You take on a special form, called a Watcher Form.\nYour body becomes engulfed in a magical aura (you choose its color), your eyes glow, and you can gain other aesthetics-only body transformations (customize it with your DM).\nWhile in this form, your first weapon attack (or thrown spell) deals +4 damage once per turn, you gain +2 to all saves and +2 to your Save DC and +3 to Intimidation and Arcana.\nAlso, when you cast a spell (before you do), you can instantly dash 3 meters, ignoring attacks of oportunity, and going through enemies and small obstacles or medium gaps.\nLasts up to 1 minute.\n",
              "isTalent": true
            },
            "<Combo Set>": {
              "A": "Passive",
              "Effect": "You gain Quickfire, Guard Breaker and Tumblestrike.",
              "isTalent": true
            },
            "<Quickfire>": {
              "A": "0 Actions",
              "Cost": "1 Charge",
              "Effect": "Perform an attack with a (loaded if it has to be) 1-Handed weapon.\nThis attack does not trigger attacks of oportunity and can be used in melee range without penalty if it's a ranged weapon.\n",
              "isTalent": true
            },
            "<Guard Breaker>": {
              "A": "Passive",
              "Effect": "Your Slash, Smash and Pierce attacks ignore target's resistances to that damage type (not immunity, however).",
              "isTalent": true
            },
            "<Tumblestrike>": {
              "A": "Passive",
              "Effect": "After you Tumble, your next weapon attack or thrown spell has Advantage on the damage roll.",
              "isTalent": true
            }
          }
        }
      },
      "Beastmaster": {
        "Description": "Lawrrremm!!!",
        "Starting Abilities": {
          "~Animal Companion~": {
            "A": "Passive",
            "Effect": "You have an animal pet that can fight alongside you!\nYour animal has stats depending on its species.\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\n- Health: Half of yours\n- Movement: 6 meters\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\nYour pet can make normal Skill Checks using your Skill bonuses, or its own, using its special Stats.\nYour pet will not stray more than 30 meters away from you in hostile territory.\nOn your turn, you can command it to move, but it can't take its own Actions.\nYou and your pet share the same Actions on a turn.\n(ex: If you have 1 Action, your pet can use 0.5 Actions to attack and you can use 0.5 Actions to attack too, or your pet spends 1 Action and you skip your Actions, etc.)\nAll pets have the Pet Attack ability:\n<Pet Attack> : 0.5 Actions\nThe pet melee attacks a target.\nThe attack has + your Main Stat.\nThe attack deals 1d6 + your Main Stat - 1 (can't be lower than 1d6 - 1).\nYou can do this once per turn.\nSome abilities may say 'Perform a Pet Attack'. In that case, ignore the once-per-turn.\n"
          },
          "~Tag Team~": {
            "A": "0 Actions",
            "Cost": "1 Charge",
            "Effect": "Gain 0.5 Actions this turn which you can only use on pet attacks or abilities.\nYour pet also gains +3 meter movement this turn.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Second Animal Companion>": {
              "A": "Passive",
              "Effect": "You have one more Animal Companion, aside from the one you get from your Beastmaster Companion.\nThis Animal Companion obeys the same rules as the regular one.\nOn a turn, you can do one Pet Attack for each pet.\n",
              "isTalent": true
            },
            "<Exotic Trainer>": {
              "A": "Passive",
              "Effect": "Instead of your normal pets, you can choose from the Exotic list of pets.",
              "isTalent": true
            }
          }
        }
      }
    }
  },
  "Mage": {
    "Class": "Mage",
    "Description": "Mages are powerful spellcasters who gain their powers through either study or ust pure talent.",
    "Options": {
      "When creating your character": {
        "Choose 2": [
          "Charisma",
          "Intelligence",
          "Wisdom",
          "Dexterity",
          "Fortitude"
        ],
        "Saves": [
          "+2 Charisma Saves",
          "+2 Intelligence Saves"
        ]
      }
    },
    "Skills": {
      "Arcana": 1,
      "Knowledge": 1,
      "History": 1,
      "Athletics": -1,
      "Acrobatics": -1,
      "Survival": -1
    },
    "Stats": {
      "Base Health": 3
    },
    "Language": "You speak one extra Common language of choice.\nIf your Intelligence is at least 2, choose one more Higher or Common language you can speak.\n",
    "Level Up": {
      "Every Level": [
        "+5 Health",
        "+1 Skill Point",
        "+1 extra known Spell or Maneuver",
        "+1 extra maximum Charge"
      ],
      "Other": "At levels 2, 4, 6, 8 and 10, you gain a Talent from your chosen specialization.\nAt levels 3, 5, 7 and 9 you gain 1 extra Charge and a Talent from your race.\n"
    },
    "Spellcasting": {
      "Main Stat": "Choose between Intelligence, Wisdom or Charisma. This is your Main Stat.",
      "Spell DC": "10 + (Main Stat)",
      "Charges": {
        "Amount": 3,
        "Regain": "You regain all Charges back when you Long Rest."
      },
      "Change": "You can change your known Spells (not Talents) when taking a long rest.",
      "Other": "All Mage-specific abilities are considered spells (except Magic Mastery).",
      "Number of known maneuvers": "1 + Your Intelligence",
      "Number of known spells": "3 + Your Intelligence",
      "Spell List": [
        "Improvised Attack",
        "Dash",
        "Hide",
        "Defend",
        "Push",
        "Shift",
        "Bull Rush",
        "Taunt",
        "Grapple",
        "Hamstring",
        "Lightweight Strike",
        "Wait",
        "Shank",
        "Burning Breath",
        "Bonfire",
        "Control Flames",
        "Control Water",
        "Control Earth",
        "Frostbite",
        "Magic Missiles",
        "Quicksand",
        "Frost Nova",
        "Flameblade",
        "Arcane Spear",
        "Dancing Blade",
        "Unlock",
        "Water Walk",
        "Conjure Ammo",
        "Light",
        "Watcher Eye",
        "Translation",
        "Absorb Element",
        "Alarm",
        "Dispel Magic",
        "Feather Fall",
        "Fog Cloud",
        "Distort Vision",
        "Fairy Fire",
        "Fire Enchantment",
        "Flash",
        "Frost Rune",
        "Explosion Rune",
        "Fake Sound",
        "Ice Spike",
        "Flame Strike",
        "Mage Armor",
        "Mage Hand",
        "Mending",
        "Unlock",
        "Phase Orb",
        "Scorching Rays",
        "Shield Element",
        "Shadow Clone",
        "Water Sphere",
        "Force Wall",
        "Dancing Weapon",
        "Crackling Lightning",
        "Heat Metal",
        "Antimagic Rune",
        "Conceal Magic",
        "Conjure Object",
        "Encode Thoughts",
        "Fire Ball",
        "Sense Magic",
        "Invisibility",
        "Levitate",
        "Magic Prison",
        "Portal"
      ]
    },
    "Starting Abilities": {
      "~Magic Mastery~": {
        "A": "0 Actions",
        "Cost": "1 Charge",
        "Effect": "The next ability you use that has the cost of 1 Action now costs 0.5 Actions.\nThis is considered a maneuver.\n"
      }
    },
    "Specializations": {
      "Description": "At Level 1, you can choose your specialization. Every Mage can choose from the following Mage specializations",
      "Choices": [
        "Sorcerer, a born user of magic, floating with the hard to control magic itself",
        "Wizard, who became a master of magic through intense study, and carries its spells in an indispensible tome",
        "Artificer, who is dedicated to creation, research and experimentation with magical potions, scrolls and magical items!"
      ]
    },
    "Specs": {
      "Sorcerer": {
        "Description": "Lorem!!",
        "Starting Abilities": {
          "~Innate Magic~": {
            "A": "Passive",
            "Effect": "When you cast a spell, if it's different than the previous spell you casted, the previous spell becomes Exhausted.\nThis means you can't use that previous spell until your next Long Rest.\n",
            "Notes": "Examples of spell sequences - Firebolt, Firebolt, Firebolt, Magic Missile, Magic Missile, Fog"
          },
          "~Overcharge~": {
            "A": "Passive",
            "Effect": "After you cast a spell the 3rd time in a row, your next ability benefits from Magic Mastery.\nAfter this, that spell becomes Exhausted.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Master Specialization>": {
              "A": "Passive",
              "Effect": "Choose another class. You also have access to that class's Spell List!",
              "isTalent": true
            },
            "<Shadow Clone>": {
              "A": "0 Actions",
              "Cost": "1 Charge",
              "Range": "6 meters",
              "Effect": "You create an illusion of yourself at a target location.\nThe illusion has 1 Health and 1 Armor and it fails all saves.\nYou can control what the illusion does at will.\nLasts up to 10 minutes.\n",
              "isTalent": true
            },
            "<Momentum Magic>": {
              "A": "Passive",
              "Effect": "After an encounter, you can roll 1d20 and add your Main Stat.\nIf you rolled a total of or over 20, you gain 1 Charge.\nYou can succeed this once per Long Rest (you can try multiple times, but after you succeed once, you need to Long Rest to do it again).\n",
              "isTalent": true
            }
          }
        }
      },
      "Wizard": {
        "Description": "Hmm, lorem...",
        "Starting Abilities": {
          "~Spell Book~": {
            "A": "Passive",
            "Effect": "You have a special Spell Book.\nWhile holding the Spell Book, you have prepared all spells you can know (not maneuvers).\nYou can hold it in one hand without consuming actions.\n",
            "Notes": "While holding the Book, your hand counts as occupied, and you can't hold anything else in it, but you still have 1 Action per turn."
          },
          "~Magic Expertise~": {
            "A": "Passive",
            "Effect": "You can cast Level 4 spells from Level 1, and Level 8 spells from Level 4."
          }
        },
        "Talents": {
          "Level 2": {
            "<Vanishing Book>": {
              "A": "Special",
              "Effect": "You gain +1 in Stealth and Sleight of Hand.\nFor 0 Actions, you can instantly vanish you Spell Book, or make it reappear in your hand.\nYou can only vanish it every 10 minutes.\n",
              "isTalent": true
            },
            "<Master Specialization>": {
              "A": "Passive",
              "Effect": "Choose a class. You also have access to that class's Spell List!",
              "isTalent": true
            },
            "<Arcane Focus>": {
              "A": "Passive",
              "Effect": "Your Spell Book becomes replaced with an item called Arcane Focus.\nAn Arcane Focus is an item of your choice. It can be an amulet, a sword, a cape, etc.\nAs long as you have the Arcane Focus on you, it counts as if you are holding the Spell Book without occupying your hand.\n",
              "isTalent": true
            }
          }
        }
      },
      "Artificer": {
        "Description": "Losum iprem",
        "Starting Abilities": {
          "~Artificer~": {
            "A": "Special",
            "Effect": "You own a set of Artificer's Tools, with which you can create potions, scrolls and other items.\nSome of your class spells require you to use your Artificer's Tools (described below).\nIf they require you to spend Charges, those Charges become locked and can't be regained through any means, until the item created is used or destroyed.\nFor 1 Action, you can summon or vanish your Artificer's Tools.\n",
            "Notes": "Spells noted as 'Artificer:' require you to use Artificer's Tools.\nIf you ever lose your Artificer's Tools, the price for a new set is 200 gold.\nAs usual, items created this way require 0.5 Actions to use.\nArtificer potions do not count towards the potion limit cooldown.\n"
          },
          "~Artificer - Magic Scroll~": {
            "A": "5 minutes",
            "Cost": "1 Charge",
            "Effect": "Choose a spell you can cast and spend Charges for it if it requires charges.\nYou create a scroll containing that spell.\n"
          },
          "~Artificer - Magic Elixir~": {
            "A": "5 minutes",
            "Cost": "1 Charge",
            "Effect": "Choose one of the following types of potions and create it\no Elixir of Healing - Heal for 2d4 + 1.\no Elixir of Strength - Attacks with 2-Handed weapons deal +2 damage, and attacks with 1-Handed weapons deal +1 damage (1 hour).\no Elixir of Agility - Doubled movement speed and Acrobatics bonus (1 hour).\no Elixir of Intelligence - Gain 1 Charge.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Master Specialization>": {
              "A": "Passive",
              "Effect": "Choose a class. You also have access to that class's Spell List!",
              "isTalent": true
            },
            "<Artificer - Magic Weapon>": {
              "A": "5 minutes",
              "Cost": "1 Charge",
              "Effect": "Choose one a type of weapon, and choose 2 of the following effects:\no +2 damage\no Damage is converted to Fire/Cold/Shock (choose one)\no +2 meters move speed\no +5 health while wielding it\nYou can only have 1 Magic Weapon created at a time.\nThe Magic Weapon is automatically destroyed after 2 hours.\n",
              "isTalent": true
            },
            "<Artificer - Spellcraft>": {
              "A": "5 minutes",
              "Cost": "1 Charge",
              "Effect": "You are able to create a custom spell which you hold prepared until your next Long Rest.\nChoose any 2 spells you can cast.\nThose spells combine into one, and both effects are cast at the same time.\nThis custom spell costs the combined number of Charges and the Actions for it are the combined Actions minus 0.5 Actions.\nYou know and have this spell prepared until your next Long Rest.\nMagic Mastery now also allows you to cast 1.5 Action spells for 1 Action.\n",
              "Notes": "Example - if one spell takes 0.5 Actions and the other 1 Action, the custom spell will take 1 Action.\nYou can customize what the custom spell looks like (for aesthetics only).\nYou can still cast those 2 spells separately.\n",
              "isTalent": true
            }
          }
        }
      }
    }
  },
  "Paladin": {
    "Class": "Paladin",
    "Description": "Paladins are knights in shiny armor who fight for their god.",
    "Options": {
      "When creating your character": {
        "Choose 2": [
          "Charisma",
          "Wisdom",
          "Fortitude"
        ],
        "Saves": [
          "+1 Fortitude Saves",
          "+1 Charisma Saves"
        ]
      }
    },
    "Skills": {
      "Athletics": 1,
      "Religion": 1,
      "Persuasion": 1,
      "Acrobatis": -1,
      "Deception": -1,
      "Sleight of Hand": -1
    },
    "Stats": {
      "Base Health": 3
    },
    "Language": "If your Intelligence is at least 2, you can speak either Celestial or Abyssal.",
    "Level Up": {
      "Every Level": [
        "+6 Health",
        "+1 Skill Point",
        "+1 extra known Spell or Maneuver",
        "+1 extra maximum Charge"
      ],
      "Other": "At levels 2, 4, 6, 8 and 10, you gain a Talent from your chosen specialization.\nAt levels 3, 5, 7 and 9 you gain 1 extra Charge and a Talent from your race.\n"
    },
    "Spellcasting": {
      "Main Stat": "Choose between Charisma or Wisdom. This is your Main Stat.",
      "Spell DC": "10 + (Main Stat)",
      "Charges": {
        "Amount": 3,
        "Regain": "You regain all Charges back when you Long Rest."
      },
      "Change": "You can change your known Spells (not Talents) when taking a long rest inside a temple of your god.",
      "Other": "Any other specifications",
      "Number of known maneuvers and spells": "3 + Your Intelligence + Your Level",
      "Spell List": [
        "Highlander Technique",
        "Duelist Technique",
        "Tower Shield Training",
        "Improvised Attack",
        "Dash",
        "Hide",
        "Defend",
        "Push",
        "Shift",
        "Bull Rush",
        "Taunt",
        "Grapple",
        "Hamstring",
        "Lightweight Strike",
        "Wait",
        "Shank",
        "Burning Breath",
        "Cleansing Flames",
        "Detect Poison and Disease",
        "Light",
        "Purify Food and Drink",
        "Thunder Clap",
        "Flameblade",
        "Resistance",
        "Dispel Magic",
        "Light",
        "Guidance",
        "Mastery",
        "Charming Word",
        "Cure Wounds",
        "Cure Disease",
        "Radiant Smite",
        "Blinding Smite",
        "Cleansing Smite",
        "Scorching Rays",
        "Turn Undead",
        "Wild Heart",
        "Spare the Dying"
      ]
    },
    "Starting Abilities": {
      "~Divine Sense~": {
        "A": "1 Action",
        "Cost": "1 Charge",
        "Effect": "You know the locations and types of all Holy, Unholy and Celestial creatures or things within 15 meters, unless the path to them is obstructed by thick or dense walls or magic.\nYou can do this once per rest without using a Charge.\n"
      },
      "~Lay on Hands~": {
        "A": "1 Action",
        "Effect": "You have a pool of Holy 8 points.\nUsing an action, you can expend up to Holy 8 points to heal a creature for the same amount.\nYour pool resets to 8 points on Long Rests.\n"
      },
      "~Divine Smite~": {
        "A": "0 Actions",
        "Cost": "2 Charges",
        "Effect": "Add 2d8 True damage to a melee damage roll.\nYou can only use Divine Smite once per turn.\n"
      }
    },
    "Specializations": {
      "Description": "At Level 1, you can choose your oath (Specialization).\nBy choosing your oath, you dedicate yourself to a purpose; an oath is a lifestyle, not a mere choice!\n",
      "Choices": [
        "Oath of Conquest, which inspires a strong personality and desire to achieve greatness by any means necessary",
        "Oath of Devotion, dedicated to helping the unfortunate and being someone to look up to",
        "Oath of Protection, chosen by those who vow to protect and wish to become a paragon of the people"
      ]
    },
    "Specs": {
      "Conquest": {
        "Description": "Lorem! Lorem ipsum!!",
        "Starting Abilities": {
          "~Oath of Conquest~": {
            "A": "Passive",
            "Effect": "Every worthy enemy YOU drop to 0 Health grants you 2 Holy points.\nAlso, passively, you gain +2 Intimidation.\n"
          },
          "~Impose~": {
            "A": "0.5 Actions",
            "Cost": "1 Charge",
            "Range": "3 meters",
            "Effect": "Try to Fear a creature (Wisdom save). It has -2 to the save roll if it's a Humanoid or Unholy."
          }
        },
        "Talents": {
          "Level 2": {
            "<Pledge of Conquest>": {
              "A": "Special",
              "Cooldown": "Lifetime",
              "Effect": "Ask a party member to join your cause and pledge his/her honor to you.\nIf it accepts, it gains access to all of your prepared spells and can use Lay on Hands from your own pool of Holy points.\nAlso, Oath of Conquest gives you 2 Holy points when that ally  drops a worthy enemy to 0 Health.\n",
              "Notes": "The ally does not need to have those spells prepared.\nYou can only have one character who pledged for you.\n",
              "isTalent": true
            },
            "<Retribution>": {
              "A": "Special",
              "Effect": "You permanently lose Lay on Hands, but your maximum number of Charges you can have is increased by 1.",
              "isTalent": true
            },
            "<Fury Smite>": {
              "A": "0 Actions",
              "Cost": "5 Holy points",
              "Effect": "After a weapon attack, deal 50% of the damage done (as True damage) to all creatures around target (except you).",
              "isTalent": true
            },
            "<Divine Reach>": {
              "A": "0 Actions",
              "Effect": "You empower yourself to make your weapon send fiery waves.\nFor the next 1 minute, your melee attacks have exactly 2 meters range and can deal Fire damage instead.\nYou can do this once per Long Rest.\nAlso, passively, you can always apply smites to ranged attacks, no matter if Divine Reach is active or not.\n",
              "Notes": "Alternatively, if it makes sense for your character, the DM might allow it to deal Cold or Shock damage instead of Fire. Talk to your DM about this.",
              "isTalent": true
            }
          }
        }
      },
      "Devotion": {
        "Description": "Lorem, ipsum, dolor sit amet!",
        "Starting Abilities": {
          "~Oath of Devotion~": {
            "A": "Passive",
            "Effect": "You are immune to diseases and curses.\nWhen using Lay on Hands, instead of healing, you can expend 5 points to cure a minor disease or a poison.\n"
          },
          "~Divine Power~": {
            "A": "0 Actions",
            "Cost": "1 Charge",
            "Effect": "Gain 6 points of Lay on Hands."
          }
        },
        "Talents": {
          "Level 2": {
            "<Divine Blast>": {
              "A": "1 Action",
              "Range": "12 meters",
              "Effect": "Make a Spell attack against a target and consume any number of Holy points. The attack deals damage equal to twice the number of holy points consumed.",
              "isTalent": true
            },
            "<Shielding Hand>": {
              "A": "Reaction",
              "Cost": "1 Charge",
              "Effect": "Use after an ally takes damage. After that ally takes damage, it gains a shield of Temporary Health equal to half of the damage taken. The shield lasts up to 1 minute.",
              "isTalent": true
            },
            "<Focused Smites>": {
              "A": "0 Actions",
              "Cost": "1 Charge",
              "Effect": "For 1 minute, your weapon attacks deal extra True damage and whenever you hit with a weapon attack, heal an ally within 6 meters.\nBonus Damage and Heal: 1 for 1-Handed weapons, 2 for 2-Handed weapons.\n",
              "isTalent": true
            },
            "<Divine Reach>": {
              "A": "0 Actions",
              "Effect": "You empower yourself to make your weapon send fiery waves.\nFor the next 1 minute, your melee attacks have exactly 2 meters range and can deal Fire damage instead.\nYou can do this once per Long Rest.\nAlso, passively, you can always apply smites to ranged attacks, no matter if Divine Reach is active or not.\n",
              "Notes": "Alternatively, if it makes sense for your character, the DM might allow it to deal Cold or Shock damage instead of Fire. Talk to your DM about this.",
              "isTalent": true
            }
          }
        }
      },
      "Protection": {
        "Description": "Lorem. Lorem ipsum dolor sit amet.",
        "Starting Abilities": {
          "~Oath of Protection~": {
            "A": "Reaction",
            "Range": "3 meters to that ally",
            "Effect": "When an ally is attacked (after the roll), dash next to that ally.\nYou will take the damage from that attack instead of the ally.\nYou can do this twice per Long Rest.\n"
          },
          "~Stand Behind~": {
            "A": "Passive",
            "Effect": "You stand out for allies adjacent to you.\nEnemy ranged attacks against other allies adjacent to you have Partial Cover.\n",
            "Notes": "Nothing happens if an ally adjacent to you already has Partial Cover."
          }
        },
        "Talents": {
          "Level 2": {
            "<Divine Rain>": {
              "A": "0.5 Actions",
              "Cost": "1 Charge",
              "Cooldown": "Long Rest",
              "Effect": "If you would drop to 0 Health until the start of your next turn, you remain instead at 1 Health.\nWhen this happens, divine rays smite all enemies within 2 meters of you, and they all take 1d6 True damage.\n",
              "isTalent": true
            },
            "<Reckoning>": {
              "A": "1 Action",
              "Cost": "1 Charge",
              "Range": "6 meters",
              "Effect": "Make a spell attack on a target which does 2d10 Force damage.\nThe target must also make a Fortitude save.\nIf it fails, it is pushed away from you until the distance between you and the target is 6 meters.\nIf it stops in a wall or another enemy, it takes another 1d8 Force damage.\n",
              "isTalent": true
            },
            "<Consacrated Zone>": {
              "A": "0.5 Actions",
              "Cost": "1 Charge",
              "Effect": "The area in a 5 meter diameter circle around you becomes Consacrated.\nIf an enemy attempts to leave the area, it must succeed a Charisma save.\nIf it fails, it takes 1d10 True damage and loses 2 meters of movement.\nThe enemy can attempt to escape as many times on the same turn.\nNotes: The zone lasts up to 1 minute and can be cancelled for 0 Actions or Reaction.\n",
              "isTalent": true
            }
          }
        }
      }
    }
  },
  "Rogue": {
    "Class": "Rogue",
    "Description": "Rogues are masters of stealth and deception.",
    "Options": {
      "When creating your character": {
        "Choose 2": [
          "Charisma",
          "Intelligence",
          "Wisdom",
          "Dexterity"
        ],
        "Saves": [
          "+3 Dexterity Saves"
        ]
      }
    },
    "Skills": {
      "Stealth": 1,
      "Acrobatics": 1,
      "Sleight of Hand": 1,
      "Religion": -1,
      "History": -1,
      "Deception": -1
    },
    "Stats": {
      "Base Health": 3
    },
    "Language": "If your Inteligence is at least 1, you know Thieves' Cant.\nThieves' Cant is not a spoken language, but rather a set of symbols, sign language and code names for various objects, places or people.\nUse Thieves' Cant wisely!\n",
    "Level Up": {
      "Every Level": [
        "+5 Health",
        "+1 Skill Point",
        "+1 extra known Spell or Maneuver",
        "+1 extra maximum Charge"
      ],
      "Other": "At levels 2, 4, 6, 8 and 10, you gain a Talent from your chosen specialization.\nAt levels 3, 5, 7 and 9 you gain 1 extra Charge and a Talent from your race.\n"
    },
    "Spellcasting": {
      "Main Stat": "Choose between Intelligence and Charisma. This is your Main Stat.",
      "Spell DC": "10 + (Main Stat)",
      "Charges": {
        "Amount": 3,
        "Regain": "You regain all Charges back when you Long Rest."
      },
      "Change": "You can change your known Spells (not Talents) when taking a long rest inside a temple of your god.",
      "Other": "Any other specifications",
      "Number of known maneuvers": "1 + Your Intelligence + Your Level",
      "Spell List": [
        "Double Greatweapon Fighting",
        "Highlander Technique",
        "Duelist Technique",
        "Improvised Attack",
        "Dash",
        "Hide",
        "Defend",
        "Push",
        "Shift",
        "Bull Rush",
        "Taunt",
        "Grapple",
        "Hamstring",
        "Lightweight Strike",
        "Wait",
        "Shank"
      ]
    },
    "Starting Abilities": {
      "~Ambush~": {
        "A": "Passive",
        "Effect": "If you are hiding (with Hide), your next attack deals 1d4 damage.\nWhen doing this, you can also spend as many charges as you want (and can).\nThat attack gains 1d6 + 1 damage more for each Charge spent.\nThis can only happen once per turn.\n"
      },
      "~Lockpick~": {
        "A": "Passive",
        "Effect": "You are trained in Lock Picking."
      },
      "~Hide~": {
        "A": "Reaction",
        "Cooldown": "Once per encounter",
        "Effect": "When you would roll Initiative, you can instead roll Stealth.\nIf you succeed, you become Hidden.\nWhile Hidden, you can unhide and start your turn whenever you like (even before or after a creature does something).\nIf you started your turn during another creature's turn, that creature resumes its turn after your turn ends.\nAfter that, you take your turn when you normally would, next rounds.\n",
        "Notes": "You become unhidden at the end of the round if you don't take your turn by then.\nThe Stealth check is made againt the highest enemy Passive Perception, which is their Perception + 10.\n"
      }
    },
    "Other": "You automatically know the Hide maneuver.",
    "Specializations": {
      "Description": "At Level 1, you can choose your specialization.\nEvery Rogue can choose from the following Rogue specializations\n",
      "Choices": [
        "Thief, an agile-handed individual, crafty and stealthy, dexterous and silent",
        "Assassin, a person specialized in taking targets out one-on-one, through whatever means",
        "Skirmisher, an outlaw who is not afraid to engage in direct combat and apply whatever tricks necessary to get the job done"
      ]
    },
    "Specs": {
      "Thief": {
        "Description": "...lorem... ipsum...",
        "Starting Abilities": {
          "~Agile Hand~": {
            "A": "Passive",
            "Effect": "You have +2 Sleight of Hand and +2 Stealth.\nYour movement does not trigger attacks of oportunity.\n"
          },
          "~Fool's Coin~": {
            "A": "Passive",
            "Effect": "Whenever you deal damage to a worthy enemy, you can spend 1 Charge.\nIf you do, you gain Gold Tokens, an imaginary currency, equal to one of the rolled dice (you choose).\nWhen in a town or city, you convert all Gold Tokens to actual gold coins (1 Gold Token for 10 Gold) (this is done on a Long Rest).\n",
            "Notes": "Lore-wise, as a Thief you steal successfully in a city when converting tokens, while preparing and gaining momentum for it in combat.\n"
          },
          "~Backstab~": {
            "A": "Passive",
            "Effect": "When you flank an enemy, Ambush is applied."
          }
        },
        "Talents": {
          "Level 2": {
            "<Payback Shot>": {
              "A": "0.5 Actions",
              "Cost": "3 Gold Tokens after cast",
              "Effect": "Try to Stun an adjacent unit (Dexterity save).\nYour DC for this try is increased by your number of Gold Tokens, up to +5.\n",
              "isTalent": true
            },
            "<Arcane Trickster>": {
              "A": "Passive",
              "Effect": "You can now cast spells!\nYou permanently know 3 spells from the following spell list:\nAcid Burst  : 0.5 Actions\nBurning Breath  : 0.5 Actions\nConjure Ammo  : 1 Action\nControl Flames  : 1 Action\nControl Water  : 1 Action\nFlameblade  : 0 Actions\nLight  : 1 Action\nMagic Missiles  : 1 Action\nMastery  : 1 Action\nPrestidigitation  : 1 Action\nChaining Grasp  : 0 Actions\nCharming Word  : 1 Action\nCure Poison  : 1 Action\nDistort Vision  : 1 Action\nFake Sound  : 0.5 Action\nMage Hand  : 0 Actions\nUnlock  : 1 Action\nShadow Clone  : 0 Actions\nEncode Thoughts  : 1 Action (Level 4)\nInvisibility  : 1 Action (Level 4)\nLevitate  : 1 Action (Level 4)\nSense Magic  : 0 Actions (Level 4)\nSpider Climb  : 1 Action (Level 4)\nWhen you level up, you can change one of these abilities with another from the same list.\nYou learn 1 additional ability at Levels 3, 5, 7 and 9.\n",
              "isTalent": true
            },
            "<Way of Fooling>": {
              "A": "Passive",
              "Effect": "Your Charisma is increased by 2, (up to a maximum of 4).",
              "isTalent": true
            }
          }
        }
      },
      "Assassin": {
        "Description": "...LOREMIPSUM! <you died>",
        "Starting Abilities": {
          "~Isolated~": {
            "A": "Passive",
            "Effect": "When you attack an enemy, and there is no other creature adjacent to you or to that enemy (except you), the attack gains Ambush.\nIf you are already Ambushing the target, the attack gains an additional 1d6 + 1 damage.\n"
          },
          "~Planned Assassination~": {
            "A": "1 minute",
            "Cost": "1 Charge",
            "Cooldown": "Long Rest",
            "Effect": "Your next attack on that target deals +2d6 + 2 Poison damage.\nPlanned Assassination fails if your Line of Sight to the target is broken until you attack it.\n",
            "Notes": "The Charge is spent the moment you declare Planned Assassination."
          }
        },
        "Talents": {
          "Level 2": {
            "<Take Out>": {
              "A": "1 Action",
              "Cost": "1 Charge",
              "Effect": "Try to put an adjacent target to Sleep for 1 minute (Dexterity save).\nIf you succeed, you gain the Action back.\n",
              "Downside": "You must be hiding to use Take Out, and the target must be Isolated.\nThis ability unhides you!\n",
              "isTalent": true
            },
            "<Poison Master>": {
              "A": "1 hour",
              "Cost": "1 Charge",
              "Effect": "Using ingredients costing 35 Gold, you are able to create a few drops of Drinkable Poison.\nSomeone ingesting them takes 1d12 Poison damage instantly.\nCombining multiple instances of Drinkable Poison increases its damage by 1d12 for each Drinkable Poison combined.\nThe poison loses its effect after 48 hours.\n",
              "isTalent": true
            },
            "<Shadowstep>": {
              "A": "0.5 Actions",
              "Cooldown": "Long Rest",
              "Effect": "If you are covered in shadow, choose another point covered in shadow up to 6 meters away.\nInstantly teleport to that place.\n",
              "Notes": "This is considered a Spell.",
              "isTalent": true
            }
          }
        }
      },
      "Skirmisher": {
        "Description": "Loreeeem!!!",
        "Starting Abilities": {
          "~10% Luck~": {
            "A": "Passive",
            "Effect": "Once per turn, when you attack, you can also roll 1d10. If you roll 10, deal +2 damage."
          },
          "~Savagery~": {
            "A": "Passive",
            "Effect": "Attacks on creatures that have 50% or less health gain Ambush."
          },
          "~Parry~": {
            "A": "Reaction",
            "Effect": "Halve the damage of a weapon attack you receive (after the roll, before subtracting Defense)."
          }
        },
        "Talents": {
          "Level 2": {
            "<Cheap Tricks>": {
              "A": "0 Actions",
              "Cost": "2 Charges",
              "Range": "3 meters",
              "Effect": "Try to Blind a target for 2 turns.",
              "Notes": "A Blinded target's attacks have Hard Cover and its targets' saves have +4.",
              "isTalent": true
            },
            "<Whiplash>": {
              "A": "0 Actions",
              "Cooldown": "Long Rest, otherwise it costs 1 Charge",
              "Effect": "Throw a whiplash at a grabbable point within 6 meters.\nPull yourself to a target point.\n",
              "Notes": "Requires a Whiplash item, which can be bought for 100 gold.",
              "isTalent": true
            },
            "<Quickfire>": {
              "A": "0 Actions",
              "Cost": "1 Charge",
              "Effect": "Perform an attack with a (loaded if it has to be) 1-Handed weapon.\nThis attack does not trigger attacks of oportunity and can be used in melee range without penalty if it's a ranged weapon.\n",
              "isTalent": true
            }
          }
        }
      }
    }
  },
  "Shaman": {
    "Class": "Shaman",
    "Description": "Shaman are people in close attunement with the spirits.",
    "Options": {
      "When creating your character": {
        "Choose 2": [
          "Wisdom",
          "Dexterity",
          "Fortitude"
        ],
        "Saves": [
          "+2 Wisdom Saves"
        ]
      }
    },
    "Skills": {
      "Religion": 1,
      "Nature": 1,
      "Perception": 1,
      "Sleight of Hand": -1,
      "Arcana": -1,
      "History": -1
    },
    "Stats": {
      "Base Health": 7
    },
    "Language": "If your Intelligence is at least 2, choose one Common, Wild or Elemental language you can speak.",
    "Level Up": {
      "Every Level": [
        "+5 Health",
        "+1 Skill Point",
        "+1 extra known Spell or Maneuver",
        "+1 extra maximum Charge"
      ],
      "Other": "At levels 2, 4, 6, 8 and 10, you gain a Talent from your chosen specialization.\nAt levels 3, 5, 7 and 9 you gain 1 extra Charge and a Talent from your race.\n"
    },
    "Spellcasting": {
      "Main Stat": "Wisdom is your Main Stat.",
      "Spell DC": "10 + (Main Stat)",
      "Charges": {
        "Amount": 2,
        "Regain": "You regain all Charges back when you Long Rest."
      },
      "Change": "You can change your known Spells (not Talents) when taking a long rest.",
      "Number of known maneuvers": "1 + Your Intelligence",
      "Number of known spells": "2 + Your Intelligence + Your Level",
      "Other": "All Shaman-specific abilities are considered spells.",
      "Spell List": [
        "Improvised Attack",
        "Dash",
        "Hide",
        "Defend",
        "Push",
        "Shift",
        "Bull Rush",
        "Taunt",
        "Grapple",
        "Hamstring",
        "Lightweight Strike",
        "Wait",
        "Shank",
        "Acid Burst",
        "Burning Breath",
        "Bonfire",
        "Cleansing Flames",
        "Control Flames",
        "Control Water",
        "Control Earth",
        "Detect Poison and Disease",
        "Fire Bolt",
        "Guidance",
        "Hollow Touch",
        "Mastery",
        "Mind Blast",
        "Purify Food and Drink",
        "Prestidigitation",
        "Resistance",
        "Quicksand",
        "Thunder Clap",
        "Chaining Grasp",
        "Absorb Element",
        "Alarm",
        "Animate Dead",
        "Charming Word",
        "Cure Wounds",
        "Cure Poison",
        "Cure Disease",
        "Dispel Magic",
        "Feather Fall",
        "Fog Cloud",
        "Cleansing Smite",
        "Distort Vision",
        "Flash",
        "Fake Sound",
        "Influence Beast",
        "Mage Hand",
        "Scorching Rays",
        "Shadow Clone",
        "Speak With Animals",
        "Speak With Plants",
        "Turn Undead",
        "Wild Heart",
        "Dancing Weapon",
        "Crackling Lightning",
        "Heat Metal",
        "Water Walk",
        "Fire Ball",
        "Invisibility",
        "Levitate",
        "Spare the Dying",
        "Spider Climb",
        "Translation",
        "Wraithwalk"
      ]
    },
    "Other": "As a Shaman, you have a spirit animal which represents you.\nChoose one of the following spirit animals.\nYou will permanently gain the bonuses of that spirit animal.\n",
    "Starting Abilities": {
      "~Animal Spirit~": {
        "A": "Special",
        "Effect": "Choose one of the 4 animal spirits. You gain an Ability and a bonus to a Skill Check depending on your Spirit Animal.\nBear - You gain Bear's Roar and +2 to Athletics.\nWolf - You gain Wolf's Leap and +2 to Intimidation.\nEagle - You gain Eagle's Sight and +2 to Perception.\nOwl - You gain Owl's Foresight and +2 to Knowledge.\n"
      },
      "~Bear's Roar~": {
        "A": "1 Action",
        "Cooldown": "Long Rest",
        "Effect": "Try to Cripple all enemies within 2 meters of you (Charisma save).\nEach enemy that got Crippled takes 1d6 Psychic damage.\n"
      },
      "~Wolf's Leap~": {
        "A": "0.5 Actions",
        "Cooldown": "Long Rest",
        "Effect": "Leap at a target up to 3 meters away.\nThe target takes 1d6 Bleed damage at the end of each of your turns for 1 minute.\n"
      },
      "~Eagle's Sight~": {
        "A": "Passive",
        "Effect": "You have Maximum Initiative every encounter.\nAll your ranged attacks have an extra 3 meters range.\nYour spell DC is increased by 1.\n"
      },
      "~Owl's Foresight~": {
        "A": "Reaction",
        "Cooldown": "Long Rest",
        "Effect": "Use when an enemy casts a spell (non-naturally).\nThe spell is cancelled and the enemy loses the Action for it.\n"
      }
    },
    "Specializations": {
      "Description": "Lorem.",
      "Choices": [
        "Berserker, a heavy fighter, guided by the ways of the spirits, both wise and strong - a combination to fear",
        "Seer, one who can perceive beyond the eyes and ears, who can get to the root of your mind and soul",
        "Witch Doctor, a strange ally when it comes to helping, and en even stranger foe when it comes to combat"
      ]
    },
    "Specs": {
      "Berserker": {
        "Description": "LOREM IPSUUUM!!",
        "Starting Abilities": {
          "~Path of the Berserker~": {
            "A": "Passive",
            "Effect": "Your total Defense is always halved (even with buffs), rounded down, no matter what armor type you are wearing.\nYour total Health is increased by 50% (buffs, item effects and health from passive Abilities are not increased).\nYour extra Health Pool does not increase with your Health.\n"
          },
          "~Spirit Strike~": {
            "A": "0.5 Actions",
            "Range": "1 meter",
            "Effect": "A target makes a Wisdom save.\nIf it fails, deal to it 33% of its missing health as True damage.\nYou can land this once per Long Rest (but you can try multiple times). \n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Reincarnation>": {
              "A": "1 Action",
              "Cooldown": "1 week",
              "Effect": "Stabilize an unconscious creature or revive a creature that died recently (12 hours maximum).\nThis puts the creature at 1 Health.\nYou can do this on yourself if you are dead (still uses 1 Action if in an encounter).\n",
              "isTalent": true
            },
            "<Spirit Draw>": {
              "A": "Reaction",
              "Effect": "An ally can spend 1 Charge and 1 Action to draw in a part of your soul, with your permission.\nThat ally can try to cast Spirit Strike once and use your spirit animal Ability once.\nLasts until either of you cancel it, or until either's next Rest.\nAn ally can't draw your soul more than once per Long Rest.\n",
              "isTalent": true
            },
            "<Spirit Companion>": {
              "A": "1 Action",
              "Cost": "8 Health",
              "Effect": "You summon your spirit animal into the material world.\nIt has the following stats:\n- Health: 1 or 6 if Bear\n- Defense: 8\n- Movement: 6 or 9 if Wolf\n- Stats and skills: Like yours\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\nYour pet gets unsummoned if it moves more than 30 meters away from you.\nOn your turn, you can command it to move, but it can't take its own Actions.\nYou and your pet share the same Actions on a turn.\nIf your spirit animal dies, you can always summon it back.\nThe spirit animal stays in the material world for up to 10 minutes.\nYou also gain the following abilities (Pet Attack and Wargsight).\n",
              "Notes": "If you have 1 Action, your pet can use 0.5 Actions to attack and you can use 0.5 Actions to attack too, or your pet spends 1 Action and you skip your Actions, etc.\n",
              "isTalent": true
            },
            "~Pet Attack~": {
              "A": "0.5 Actions",
              "Effect": "The pet melee attacks a target.\nThe attack deals 1d10 + (Your Main Stat) Force damage.\nYou can do this once per turn.\n",
              "isTalent": true
            },
            "~Wargsight~": {
              "A": "Channeled",
              "Effect": "While channeling, you can act and sense through your pet's body, but you can't control yourself.\n",
              "isTalent": true
            }
          }
        }
      },
      "Seer": {
        "Description": "Video morituri...",
        "Starting Abilities": {
          "~Spirit Bond~": {
            "A": "1 Action",
            "Cooldown": "Long Rest",
            "Effect": "Touch an ally.\nWhenever either of you makes a Skill Check, add the higher Skill bonus from either of you instead of the normal Skill bonus.\nYou can do this once per Long Rest, and lasts until your next Long Rest.\n"
          },
          "~Mind Sight~": {
            "A": "1 Action",
            "Cost": "1 Charge",
            "Range": "15 meters",
            "Effect": "Try to Stun a target you can clearly see.\nIf you succeed, it also takes 2d6 damage, or half of that if you fail.\nThen, if you succeeded, you can then see through the target's eyes until you make another action or move.\nIf the target is unaware and it rolls 7 or less (total), it doesn't notice what just happened.\n",
            "Notes": "You can choose not to deal the damage for this ability.\nYou see more and more blurry as the target gets farther away. At 100 meters, the spell breaks.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Mind Link>": {
              "A": "0 Actions",
              "Cost": "1 Charge",
              "Effect": "Establish a mind connection with a willing ally.\nFor 4 hours, you can talk to eachother telepathically.\n",
              "isTalent": true
            },
            "<Dream Walk>": {
              "A": "Channeled",
              "Cost": "1 Charge",
              "Range": "6 meters",
              "Effect": "Choose a sleeping target you can see.\nIt makes a Wisdom save with Disadvantage.\nIf it fails, you can alter their dream to your liking.\nThe target wakes up if they die in the dream, or the DM might have the target make another save for waking up later.\n",
              "isTalent": true
            },
            "<Far Sight>": {
              "A": "Reaction",
              "Cost": "1 Charge",
              "Effect": "Gain +3 on any Wisdom skill check (before you roll).",
              "Notes": "You can stack this as many times as you like for the same roll.",
              "isTalent": true
            }
          }
        }
      },
      "Witch Doctor": {
        "Description": "Lorem, ipsum, snitel, dolor!",
        "Starting Abilities": {
          "~Spirit Guides~": {
            "A": "Special",
            "Effect": "You are in constant communion with certain spirits.\nThese spirits can be the souls of people you knew who died, spirits of other animals, etc.\nThese spirits will sometimes guide your way and aid you in your endeavors.\nAfter every Long Rest, roll 2d6 and remember what you rolled.\nThese dice are called Guide Dice.\nYou can freely consume one Guide Dice and add it to any d20 roll you or your party makes.\n"
          },
          "~Ancient Dance~": {
            "A": "10 minutes",
            "Cost": "1 Charge",
            "Effect": "With this ancient Dance you can either heal an ally, or damage a foe.\no Heal: You can heal an ally who was damaged by a certain creature.\nConsuming a bone of that creature, an organ or a cup of its blood, you can heal the ally for 3d6 Health.\no Damage: Gather and consume a piece of hair or body part of a creature.\nYou damage that creature for 3d8 + 2 Psychic damage (not against Defense).\nWith Ancient Dance, you can only heal once per Long Rest, and damage once per Long Rest.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Voodoo Magic>": {
              "A": "1 Action",
              "Cost": "1 Charge",
              "Range": "6 meters",
              "Effect": "A non-epic target makes a Wisdom save.\nIf it fails, for its next 2 turns, you can choose that enemy's actions as long as it would seem reasonable to that enemy (decide with your DM).\n",
              "Notes": "For example, you can make a goblin run or recklessly attack one of your party members. But you can't make a guard jump off a cliff, because that's not what it would normally do.",
              "isTalent": true
            },
            "<Incorporeal Form>": {
              "A": "1 Action",
              "Cost": "1 Charge",
              "Effect": "You become a bodyless soul for up to 8 hours and enter a willing ally.\nWhile inside the ally's body, you can communicate with them mentally, and only they can see you.\nYou can slightly peek outside of their body, and move your arms, upper body and head as if you were a ghost originating from that ally's body.\no You can't move yourself, but you always move with that ally.\no You can't do any physical actions (because you are basically a ghost and can't touch anything or anyone).\no You can cast spells as normal. \no You follow your own Initiative in combat.\no You can't take damage from external sources, but you feel every body sensation that ally feels.\nYou can freely exit their body and revert back to your physical self using 1 Action.\n",
              "isTalent": true
            }
          }
        }
      }
    }
  },
  "Warlock": {
    "Class": "Warlock",
    "Description": "Warlocks are people who made pacts with powerful beings.",
    "Options": {
      "When creating your character": {
        "Choose 2": [
          "Charisma",
          "Intelligence",
          "Wisdom",
          "Dexterity",
          "Fortitude"
        ],
        "Saves": [
          "+2 Charisma Saves",
          "+2 Fortitude Saves"
        ]
      }
    },
    "Skills": {
      "Religion": 1,
      "Knowledge": 1,
      "Perception": 1,
      "Stealth": -1,
      "Luck": -1,
      "Survival": -1
    },
    "Stats": {
      "Base Health": 6
    },
    "Language": "If your Intelligence is at least 2, choose one Higher language you can speak.",
    "Level Up": {
      "Every Level": [
        "+6 Health",
        "+1 Skill Point",
        "+1 extra known Spell or Maneuver",
        "At levels 1, 3, 6 and 9 you gain +1 Charge"
      ],
      "Other": "At levels 2, 4, 6, 8 and 10, you gain a Talent from your chosen specialization.\nAt levels 3, 5, 7 and 9 you gain 1 extra Charge and a Talent from your race.\n"
    },
    "Spellcasting": {
      "Main Stat": "Choose between Intelligence and Charisma. This is your Main Stat.",
      "Spell DC": "10 + (Main Stat)",
      "Charges": {
        "Amount": 1,
        "Regain": "Your charges reset after every Long Rest."
      },
      "Change": "You can change your known Spells (not Talents) when taking a long rest.",
      "Other": "Any other specifications",
      "Number of known maneuvers": "1 + Your Intelligence",
      "Number of known spells": "2 + Your Intelligence + Your Level",
      "Spell List": [
        "Improvised Attack",
        "Dash",
        "Hide",
        "Defend",
        "Push",
        "Shift",
        "Bull Rush",
        "Taunt",
        "Grapple",
        "Hamstring",
        "Lightweight Strike",
        "Wait",
        "Shank",
        "Acid Burst",
        "Burning Breath",
        "Bonfire",
        "Dancing Blade",
        "Eldritch Blast",
        "Fire Bolt",
        "Guidance",
        "Hollow Touch",
        "Flameblade",
        "Magic Missiles",
        "Mastery",
        "Mind Blast",
        "Prestidigitation",
        "Thaumaturgy",
        "Thunder Clap",
        "Arcane Spear",
        "Chaining Grasp",
        "Absorb Element",
        "Animate Dead",
        "Charming Word",
        "Cure Wounds",
        "Dispel Magic",
        "Fog Cloud",
        "Curse of Pain",
        "Curse of Weakness",
        "Deathfire Bolt",
        "Distort Vision",
        "Fake Sound",
        "Mage Armor",
        "Phase Orb",
        "Scorching Rays",
        "Turn Undead",
        "Force Wall",
        "Web",
        "Dancing Weapon",
        "Crackling Lightning",
        "Antimagic Rune",
        "Conjure Object",
        "Eldritch Steed",
        "Fire Ball",
        "Invisibility",
        "Levitate",
        "Sense Magic",
        "Spare the Dying",
        "Spider Climb",
        "Translation",
        "Portal",
        "Wraithwalk"
      ]
    },
    "Starting Abilities": {
      "~Power Tap~": {
        "A": "Depends",
        "Cooldown": "Long Rest",
        "Effect": "Cast an ability one of your Allies has (with that ability's actions and costs and your modifiers).",
        "Notes": "Does not work on Passives. The Ability must have 0, 0.5 or 1 Actions cost."
      }
    },
    "Other": "When creating your character, choose one type of being you serve. That being is called your Patron:\n- Fey Patron, a wild, outworldly being, heavily magical or in tune with nature, and often outward strange. A Fey Patron often represents an old god of nature or magic, resembled by a magical animal or humanoid.\n- Celestial Patron, a being from a divine plain. Portrayed as angels or divine spirits of life and death\n- Demon or Devil patron, a being residing in Hell, an archdevil or lord in hell\n- Old God Patron, an eldritch being of nightmare and terror, whose thoughts, form and wants are incomprehensible to most people\n",
    "Abilities": {
      "~Fey Patron~": {
        "A": "Passive",
        "Effect": "Your lord is a higher fey creature.\nThe first time you choose a Race talent, get one more from the same level.\n",
        "Notes": "Yes, you will have 2 Race Talents of the same level.\nLore-wise, the Fey Patron enhances you magically, mutates your arcane flow and transforms you into an unordinarily adapted person.\n"
      },
      "~Celestial Patron~": {
        "A": "Passive",
        "Effect": "Your lord is a celestial being, who lives in a higher plane. You gain Life Cycle.",
        "Notes": "The gift of Life Cycle is granted to you by your patron. Use it well. Withhold the balance."
      },
      "<Life Cycle>": {
        "A": "0.5 Actions",
        "Cost": "6 Health",
        "Effect": "Heal a creature for up to 10 Health from their remaining Extra Health Pool."
      },
      "~Demon Patron~": {
        "A": "Passive",
        "Effect": "Your lord is a powerful demon.\nYou gain Soul Drain.\n",
        "Notes": "Through every soul drained, your demon lord feeds, and in return, grants you even more power."
      },
      "<Soul Drain>": {
        "A": "0.5 Actions",
        "Cost": "1 Charge",
        "Range": "12 meters",
        "Effect": "Deal 6 Dark damage to a creature.\nIf it dies, you get the Charge back and heal for 3 Health.\n"
      },
      "~Old God Patron~": {
        "A": "Passive",
        "Effect": "Your lord is an old, slumbering god.\nYou can pick a Racial Ability from any other race and have it permanently.\n",
        "Notes": "Eldritch thoughts flow through your mind, infecting you with strange abilities acquired in unfathomable ways."
      }
    },
    "Specializations": {
      "Description": "At Level 1, you can choose your specialization. Every Warlock can choose from the following Warlock specializations.",
      "Choices": [
        "Hexblade, a user of both magic and a weapon infused with the power of their master",
        "Summoner, specialized in calling for aid from familiars and otherworldly beings"
      ]
    },
    "Specs": {
      "Hexblade": {
        "Description": "Ha! Lorem ipsum!!",
        "Starting Abilities": {
          "~Sentient Weapon~": {
            "A": "Special",
            "Effect": "You have a Hexblade Weapon, inside which your patron lies, either possessing the weapon, being trapped inside it or using it as a means of communication with you.\nPick any weapon type, and it becomes your Hexblade Weapon.\nYou can customize your weapon's personality, voice, the way it looks. Talk to your DM about this.\nYou are automatically considered trained in your Hexblade Weapon.\nThere is no penalty to casting spells while wielding the Hexblade Weapon.\n"
          },
          "~Hexblade~": {
            "A": "Passive",
            "Effect": "After you cast an offensive spell, your next weapon attack deals +1d4 damage.",
            "Notes": "Offensive means that it deals damage or applies hard Crowd Control (anything better than Slow and creating Hard Terrain)."
          }
        },
        "Talents": {
          "Level 2": {
            "<Shapeshifting Weapon>": {
              "A": "0 Actions",
              "Cooldown": "Once per turn",
              "Effect": "Instantly change the type of weapon of your Hexblade.",
              "isTalent": true
            },
            "<Hexstaff>": {
              "A": "Passive",
              "Effect": "Your ~Hexblade~ Ability is changed and now has the following effect:\nAfter you attack with a weapon, your next spell has +1 DC and deals +1d4 damage.\n",
              "isTalent": true
            },
            "<Doublehex>": {
              "A": "Passive",
              "Effect": "You now have 1 more Hexblade Weapon, of any kind. The same patron or another one is possessing your second weapon.\nAt any time, you can vanish or resummon either weapon.\nYou must wait at least 5 minutes (for each weapon separately) after resummoning a weapon to vanish it again.\n",
              "isTalent": true
            }
          }
        }
      },
      "Summoner": {
        "Description": "Lorem \"ipsum dolor\" sit amet.",
        "Starting Abilities": {
          "~Summon Familiar~": {
            "A": "1 Hour",
            "Effect": "You conjure a ritual using various magical materials worth 25 Gold.\nThe first time you cast this ritual, you summon a familiar which becomes yours.\nYou can choose which type of familiar you want:\n- It can take the shape of a small creature.\n- It can look spectral or look as a normal animal with a slight glow (does not radiate light).\n- You can choose what color it is if it's spectral or what color its glow is.\nAlso, choose an element which is bound to it: Fire, Water, Frost, Arcane, Thunder, Earth, Wind, Light or Darkness.\nThat becomes your Familiar Element.\nYour familiar comes with a name. Roll for your familiar name on the Familiar Name Table (or your DM will choose one for you).\nYou can communicate with your Familiar telepathically.\nThe familiar doesn't take turns on its own, but at the same time as you.\nOn your turn, your familiar can use its own movement to move, but you must spend your actions for it to take actions.\nIf your familiar goes more than 20 meters away from you, it becomes unsummoned.\nIf it dies, it becomes unsummoned.\nYou can always summon it back with this Ability.\nAfter your familiar is unsummoned, it needs 24 hours to be summonable back.\nYour familiar has the following stats:\n- Health: 8 + Your Fortitude + 2 * Your Level.\n- Defense: Your Dexterity (minimum 0)\n- Stats and Saves: Same as yours\n- Movement: Same as yours, can't fly, but it can swim at half normal speed\n"
          },
          "~Familiar Pet Attack~": {
            "A": "0.5 Actions",
            "Cooldown": "1 turn",
            "Effect": "The pet melee attacks a target.\nThe attack deals 3d4 + 1 damage (of your pet's elemental type).\n",
            "Notes": "The attack is against target's Defense."
          }
        },
        "Other": "As a summoner, you have access to special Familiar Ability.\nYou can unlock one Familiar Ability for 2 Skill Points.\nThese feats give extra abilities for your Familiar.\nThey are considered Maneuvers for you and your pet.\nWhen creating your character, you also get one of these Abilities for free.\nSome of these abilities require a certain level.\n",
        "Abilities": {
          "~Element Lash~": {
            "A": "1 Action",
            "Range": "3 meters (from your Familiar)",
            "Effect": "The closest enemy (you choose if tie) to the familiar makes a Dexterity save.\nIf it fails, it takes 4d4 + 1 damage (of your Familiar Element), or half of that if it succeeds.\n"
          },
          "~Soul Attack~": {
            "A": "1 Action",
            "Cost": "1 Charge.",
            "Range": "1 meter (from your Familiar)",
            "Effect": "Your familiar attacks a creature's soul and briefly disappears.\nIt appears back near you at the start of your next-next turn and deals 3d8 + 2 Dark damage (against Defense) but ignores half of the target's Defense.\n"
          },
          "~Meat Shield~": {
            "A": "Reaction",
            "Cooldown": "Long Rest",
            "Effect": "Passively, your pet doubles its maximum health and its size becomes Large.\nWhen you are attacked, before the attack roll, you can activate this to make your pet dash to your position and the attack will be redirected to your pet.\n",
            "Notes": "Your pet must be within 6 meters of you."
          },
          "~Seduce~": {
            "A": "0.5 Actions",
            "Cost": "1 Charge",
            "Range": "6 meters (from your Familiar)",
            "Cooldown": "Long Rest",
            "Effect": "Your familiar tries to Charm an enemy (Wisdom save).\nIf it succeeds, your familiar also becomes Stunned.\n",
            "Notes": "Nothing happens if the target is immune to being Charmed."
          },
          "~Health Funnel~": {
            "A": "0 Actions",
            "Effect": "Deal 6 damage to your Familiar, and you gain 4 Health.\nOr..\nDeal 6 damage to yourself, and your Familiar gains 4 Health.\n"
          },
          "~Camouflage Master~": {
            "A": "1 Action",
            "Cost": "1 Charge.",
            "Effect": "You and your familiar gain +5 Stealth for 10 minutes.",
            "Downside": "Requires Level 4."
          },
          "~Chain Devour Magic~": {
            "A": "0.5 Actions",
            "Cost": "1 Charge",
            "Range": "12 meters",
            "Effect": "Cast one of these two effects:\n1. Cure a crowd control, debuff, curse or poison on an ally.\n2. Your pet tries to Silence a target (Intelligence save).\nIf it succeeds, it may try again on another target and the try gains +1 more to the DC than the previous try.\n",
            "Notes": "This can happen again and again until a target succeeds.",
            "Downside": "Requires Level 4."
          },
          "~Sentience~": {
            "A": "Passive",
            "Effect": "Your familiar can speak and communicate in all languages you know.\nYour Spell DC also increases by 1 and your Maximum Health by 3.\n",
            "Downside": "Requires Level 4."
          }
        },
        "Talents": {
          "Level 2": {
            "<Tongues>": {
              "A": "Passive",
              "Effect": "You can speak all Common languages.",
              "isTalent": true
            },
            "<Impmaster>": {
              "A": "Special",
              "Effect": "When you get this Talent, gain 2 Skill Points.",
              "isTalent": true
            },
            "<Dream Walk>": {
              "A": "Channeled",
              "Cost": "1 Charge",
              "Range": "6 meters",
              "Effect": "Choose a sleeping target you can see.\nIt makes a Wisdom save with Disadvantage.\nIf it fails, you can alter their dream to your liking.\nThe target wakes up if they die in the dream, or the DM might have the target make another save for waking up later.\n",
              "isTalent": true
            }
          }
        }
      }
    }
  },
  "Warrior": {
    "Class": "Warrior",
    "Description": "Warriors are highly trained combat experts",
    "Options": {
      "When creating your character": {
        "Choose 2": [
          "Charisma",
          "Wisdom",
          "Dexterity",
          "Fortitude"
        ],
        "Saves": [
          "+2 Dexterity Saves",
          "+2 Fortitude Saves"
        ]
      }
    },
    "Skills": {
      "Athletics": 1,
      "Acrobatics": 1,
      "Survival": 1,
      "Investigation": -1,
      "Deception": -1,
      "Luck": -1
    },
    "Stats": {
      "Base Health": 7
    },
    "Language": "A true warrior speaks only the language of battle!\n(Being a warrior does not grant you other languages, except the ones you already speak.)\n",
    "Level Up": {
      "Every Level": [
        "+5 Health",
        "+1 Skill Point",
        "+1 extra known Spell or Maneuver",
        "+1 extra maximum Charge"
      ],
      "Other": "At levels 2, 4, 6, 8 and 10, you gain a Talent from your chosen specialization.\nAt levels 3, 5, 7 and 9 you gain 1 extra Charge and a Talent from your race.\n"
    },
    "Spellcasting": {
      "Main Stat": "Choose between Charisma or Wisdom. This is your Main Stat.",
      "Spell DC": "10 + (Main Stat)",
      "Charges": {
        "Amount": 3,
        "Regain": "You regain all Charges back when you Long Rest."
      },
      "Change": "You can change your known Spells (not Talents) when taking a long rest inside a temple of your god.",
      "Other": "All Warrior Abilities are considered Maneuvers.",
      "Number of known maneuvers": "2 + Your Intelligence + Your Level",
      "Spell List": [
        "Double Greatweapon Fighting",
        "Highlander Technique",
        "Duelist Technique",
        "Tower Shield Training",
        "Improvised Attack",
        "Dash",
        "Hide",
        "Defend",
        "Push",
        "Shift",
        "Bull Rush",
        "Taunt",
        "Grapple",
        "Hamstring",
        "Lightweight Strike",
        "Wait",
        "Shank"
      ]
    },
    "Starting Abilities": {
      "~Advanced Flank~": {
        "A": "Passive",
        "Effect": "When you flank-attack an enemy, or an ally flank-attacks an enemy with you, the flank damage bonus is +2/+4 (1-Handed/2-Handed)."
      }
    },
    "Specializations": {
      "Description": "At Level 1, you can choose your specialization. Every Warrior can choose from the following Warrior specializations",
      "Choices": [
        "Fighter, a person specialized in weapon fighting and body-to-body combat",
        "Battlemaster, a heavily trained and armed warrior; master yourself - master the enemy",
        "Barbarian, a crude and battle thirsty warrior, who seeks to shed blood and lives for the fight",
        "Marksman, a precise and mechanical soldier, always finding the best tactic and position; the Marksman wins the battle before it begins"
      ]
    },
    "Specs": {
      "Fighter": {
        "Description": "Lorem!",
        "Starting Abilities": {
          "~Overpower~": {
            "A": "0 Actions",
            "Cost": "1 or 2 Charge(s)",
            "Effect": "Gain 0.5 Actions (or 1 Action) more this turn.\nYou can do this once per turn.\n",
            "Notes": "If you use 1 Charge, you gain 0.5 Actions. If you use 2 Charges, you gain 1 Action."
          },
          "~Upper Hand~": {
            "A": "Passive",
            "Effect": "All attacks you make before you move in a turn count as if they are flanking.\nIf you are wielding a 1-Handed weapon, when you make an attack of opportunity, you can do 2 attacks of opportunity instead (with that weapon).\nYou have +2 in Athletics, Acrobatics and Survival.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Master Positioner>": {
              "A": "Passive",
              "Effect": "You permanently know all maneuvers.",
              "isTalent": true
            },
            "<Melee Pile>": {
              "A": "0 Actions",
              "Cost": "1 Charge.",
              "Effect": "All Medium or smaller enemies within 2 meters of you are pulled to their closest points to you.",
              "isTalent": true
            }
          },
          "Level 4": {
            "<Weaponmaster>": {
              "A": "Passive",
              "Effect": "When you get this, choose one weapon type.\nYou have that weapon effect too, no matter what weapon you are using.\n"
            }
          }
        }
      },
      "Battlemaster": {
        "Description": "Lorem? Ipsum!",
        "Starting Abilities": {
          "~Solid Defense~": {
            "A": "Passive",
            "Effect": "Whenever you are attacked (after damage), your Defense is reduced by 1.\nAfter every Long Rest, your Defense resets and is increased by +1 on top of it.\n"
          },
          "~Defense Up~": {
            "A": "0.5 Actions",
            "Cost": "1 Charge.",
            "Effect": "Increase your Defense by 2."
          },
          "~Obliterate~": {
            "A": "0 Actions",
            "Cost": "1 Charge",
            "Effect": "Deal bonus damage on top of an attack equal to your current Defense.\nReset your Defense.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Protect the Meek>": {
              "A": "Reaction",
              "Cooldown": "Encounter",
              "Effect": "When an ally within 3 meters of you is targeted by a ranged attack, you become its target instead.",
              "isTalent": true
            },
            "<Master Positioner>": {
              "A": "Passive",
              "Effect": "You permanently know all maneuvers.",
              "isTalent": true
            },
            "<Bashing Charge>": {
              "A": "1 Action",
              "Cost": "1 Charge.",
              "Effect": "Move 3 meters in a straight line, then choose a target near you.\nThat target takes 1d8 damage and try to Stun the target (Fortitude save).\n",
              "isTalent": true
            }
          },
          "Level 4": {
            "<Weaponmaster>": {
              "A": "Passive",
              "Effect": "When you get this, choose one weapon type.\nYou have that weapon effect too, no matter what weapon you are using.\n"
            }
          }
        }
      },
      "Barbarian": {
        "Description": "AAAAAAAAAAAA LOREMM!!",
        "Starting Abilities": {
          "~Onslaught~": {
            "A": "Passive",
            "Effect": "Whenever YOU kill a worthy enemy, heal for 1d6."
          },
          "~Reckless Attack~": {
            "A": "0 Actions",
            "Cost": "1 Charge.",
            "Effect": "After you land an attack, deal 2d6 damage to you and also add that damage to the attack."
          },
          "~Undying Rage~": {
            "A": "Reaction",
            "Cost": "1 Charge",
            "Cooldown": "Long Rest",
            "Effect": "Taking damage that would kill you leaves you at 1 Health instead."
          },
          "~Blood Boil~": {
            "A": "0 Actions",
            "Cost": "1 Charge.",
            "Effect": "Heal for 2d6 health."
          }
        },
        "Talents": {
          "Level 2": {
            "<Heartbeat Trance>": {
              "A": "0 Actions",
              "Cost": "1 Charge.",
              "Effect": "Take 2d6 damage.\nEnter a Heart Trance until the end of your next turn.\nWhile in Heart Trance, you take 50% less damage from Fire, Frost, Necrotic and Thunder damage and you have +3 on Acrobatics and Intimidation rolls.\nWhen Heart Trance ends, heal for 2d6.\n",
              "isTalent": true
            },
            "<Rage Trance>": {
              "A": "0 Actions",
              "Cost": "1 Charge.",
              "Effect": "Take 2d6 damage.\nUntil the end of your next turn, you are immune to stuns, slows, snares, cripples and being knocked prone.\nYour attacks while in Rage Trance have an extra +1 damage to all attacks and you have +3 on Athletics.\nWhen Rage Trance ends, heal for 2d6.\n",
              "isTalent": true
            },
            "<Battle Trance>": {
              "A": "0 Actions",
              "Cost": "1 Charge.",
              "Effect": "Take 2d6 damage.\nEnter a Battle Trance that lasts until the end of your next turn.\nYou gain a protective shield around you which absorbs up to 4 + Your Level physical damage.\nWhen Rage Trance ends, heal for 2d6, and the shield fades.\n",
              "isTalent": true
            }
          }
        }
      },
      "Marksman": {
        "Description": "Lorem ipsum dolor sit amet.",
        "Starting Abilities": {
          "~Marksmanship~": {
            "A": "Passive",
            "Effect": "YOU can flank a target from up to 6 meters away (if you, the target and the ally are on the same line).",
            "Notes": "As usual, that ally helping with your flank must right behind the target."
          },
          "~Reload~": {
            "A": "Passive",
            "Effect": "Your first regular weapon attack in an encounter deals +1 damage.\nYour second regular weapon attack in the encounter deals +3 damage.\nYour third regular weapon attack and all upcoming ones in the encounter deal -5 damage.\nYou can spend 1 Charge to 'reset' this Ability to its original state.\n"
          },
          "~Point Mark~": {
            "A": "0 Actions",
            "Cooldown": "Short Rest",
            "Range": "15 meters",
            "Effect": "Mark a point on the ground.\nAllies and you can use the mark to flank targets.\nThose attacks do benefit from Advanced Flank.\n"
          }
        },
        "Talents": {
          "Level 2": {
            "<Recoil Shot>": {
              "A": "0 Actions",
              "Cost": "1 Charge",
              "Range": "2 meters",
              "Effect": "Dash up to 2 meters away from the target.\nTry to push the target 2 meters away (Fortitude save).\n",
              "Notes": "This does not trigger attacks of oportunity.",
              "isTalent": true
            },
            "<Harpoon>": {
              "A": "1 Action",
              "Cost": "1 Charge",
              "Range": "6 meters",
              "Effect": "Make a ranged attack that deals 2d12 + 4 damage (against Defense).\nThe target makes a Dexterity save.\nIf it fails, it is pulled to you.\nOtherwise, you are pulled to it.\n",
              "Notes": "Requires a Harpoon, which can be bought for 50 Gold.",
              "isTalent": true
            },
            "<Precise Weapon>": {
              "A": "1 hour",
              "Effect": "Choose any weapon you have and make it Precise.\nThe weapon's scaling becomes +3/+6 (1-Handed/2-Handed) instead of scaling with a Stat.\nThe wielder of the weapon is also immune to Cripple.\n",
              "Notes": "Making another weapon Precise makes the previous back to how it was.\nRequires to be at a forge.\n",
              "isTalent": true
            }
          }
        }
      }
    }
  }
}

export default Classes