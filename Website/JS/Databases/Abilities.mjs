let Abilities = {
  "Awe": {
    "A": "0 Actions",
    "Range": "3 meters",
    "Effect": "Instantly heal or damage a target for 1d4.\nYou can do this once per Long Rest.\nSome other Cleric spells will cast Awe for free.\n"
  },
  "Eternal Bindings": {
    "A": "0 Actions or Reaction",
    "Cost": "1 Charge",
    "Effect": "A creature within 3 meters makes a Wisdom save.\nIf it fails, cast Awe on it.\nIt becomes magically bound to an object within 3 meters of it and can't willingly move more than 3 meters away from that object.\nIt rolls the save again at the start each of their turn to escape the binding.\nLasts up to 1 minute.\n",
    "isTalent": true
  },
  "Heavy Burden": {
    "A": "0 Actions",
    "Cost": "1 Charge.",
    "Effect": "A creature within 3 meters makes a Wisdom save.\nIf it fails, cast Awe on it and it is Crippled.\n",
    "isTalent": true
  },
  "Repentance": {
    "A": "0.5 Actions",
    "Cost": "50% of your maximum health",
    "Range": "1 meter (touch)",
    "Cooldown": "Long Rest",
    "Effect": "Restore 50% of an ally's maximum health.",
    "isTalent": true
  },
  "Let There Be Light": {
    "A": "Passive",
    "Effect": "Grasp now casts Awe 2 times instead of 1.\nYou can also split your Grasp to target 2 targets (1 Awe each).\n",
    "isTalent": true
  },
  "Let There Be Darkness": {
    "A": "0.5 Actions",
    "Cost": "1 Charge",
    "Range": "6 meters to margin",
    "Effect": "You create a 4x4 meter area of magical partial darkness.\nFor all units there (except you) it counts as difficult terrain.\nAll attacks done from and towards units in the area have Partial Cover.\n",
    "isTalent": true
  },
  "Divine Message": {
    "A": "10 minutes",
    "Cost": "1 Charge",
    "Cooldown": "24 Hours (in game)",
    "Effect": "You pray for 10 minutes to get an answer to a question from your god(s).\nSet a real life timer of 10 minutes (time in which you can do anything out of the game).\nWhen the timer expires, you can ask the DM one question consisting of maximum 3 words (e.g. 'Is sword cursed?').\nThe answer you will get will consist of maximum 3 words.\nThe DM can choose not to answer, to answer falsely or say something completely different. The gods' wills are unknowable.\n",
    "isTalent": true
  },
  "Disembodiment": {
    "A": "2 hours",
    "Requirement": "True Necromancy",
    "Effect": "You are able to ever improve your minion by mix and matching parts from other corpses.\nEvery time you use this ability, you must consume a fresh corpse from a Worthy enemy (maximum 2 hours after death) and you irreversably sacrifice something.\nEach of these effects has a limited number of uses\n- +1 Maximum Health, but your highest Skill decreases by 2 (5 uses)\n- +1 Defense for either you or your minion, but -2 maximum number of prepared spells (2 uses)\n- +1 Spell DC, but -1 to all Saves (1 use)\n- +2 uses of Awe per Long Rest, but -1 maximum Charge (1 use)\n",
    "isTalent": true
  },
  "Druidcraft": {
    "A": "Depends",
    "Effect": "You can create harmless sensory effects or tiny weather effects (6 meters range).\nYou can massively speed up the growth of small plants (touch range).\nYou can slightly soothe physical pains (with no combat effect) (touch range).\nYou can attempt to communicate simple ideas with animals and plants (3 meters range).\nYou have +3 on rolls for identifying plants.\nYou can do these even while Shapeshifted.\n"
  },
  "Shapeshift": {
    "A": "1 Action",
    "Cost": "1 Charge",
    "Effect": "Pick an animal from the Animal Pets and Shapeshift Animals list and instantly transform into it.\nYou gain that animal's Fortitude and Dexterity saves.\nApply any other modifiers (except for base Stats) from that animal.\nYou also gain its exact abilities.\nAttacking while Shapeshifted has the same attack bonus, damage, weapon effect, etc as your normal attacking weapon.\nSo, while Shapeshifted, you can perform normal *melee* weapon attacks as if you were not Shapeshifted.\nWhile Shapeshifted, you can do any maneuvers you know. You can't cast spells.\nHealth: When you Shapeshift, if the animal has more total health than you, add the difference to your health.\nIf it has less, subtract the difference.\nWhen Shapeshift ends, subtract back whatever health you added, or add back whatever health you subtracted.\nWhen you end Shapeshift, if your health would be 0 or less, it stays at 1.\nShapeshift ends if you drop to 0 Health, and you go Unconscious.\nAt first, you can't choose innately swimming or flying animals.\nFrom level 4, you can transform into innately swimming animals.\nFrom level 8, you can transform into innately flying animals.\n",
    "Notes": "You can't make attacks with ranged weapons while Shapeshifted (obviously).\nYou choose what items you keep on you when Shapeshifting, and those items are 'merged' into your new form.\nYou can turn back into your humanoid form for 0 Actions (on your turn).\n"
  },
  "Old Ritualist": {
    "A": "10 minutes",
    "Cooldown": "Long Rest",
    "Effect": "Gain 1 Charge.\nThe Old Ritual must be performed outdoors, in a safe, uncorrupted place untouched by regular folk.\n",
    "Downside": "You permanently lose the Shapeshift ability, and you can never choose Talents that improve Shapeshift.",
    "isTalent": true
  },
  "Lycanthropy": {
    "A": "Passive",
    "Effect": "During the night (24:00 to 6:00) you can Shapeshift into a Lycanthrope (see Lycanthrope form).\nA Lycanthrope is a \n",
    "isTalent": true
  },
  "Animal Companion": {
    "A": "Passive",
    "Effect": "You have an animal pet that can fight alongside you!\nYour animal has stats depending on its species.\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\n- Health: Half of yours\n- Movement: 6 meters\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\nYour pet can make normal Skill Checks using your Skill bonuses, or its own, using its special Stats.\nYour pet will not stray more than 30 meters away from you in hostile territory.\nOn your turn, you can command it to move, but it can't take its own Actions.\nYou and your pet share the same Actions on a turn.\n(ex: If you have 1 Action, your pet can use 0.5 Actions to attack and you can use 0.5 Actions to attack too, or your pet spends 1 Action and you skip your Actions, etc.)\nAll pets have the Pet Attack ability:\n<Pet Attack> : 0.5 Actions\nThe pet melee attacks a target.\nThe attack has + your Main Stat.\nThe attack deals 1d6 + your Main Stat - 1 (can't be lower than 1d6 - 1).\nYou can do this once per turn.\nSome abilities may say 'Perform a Pet Attack'. In that case, ignore the once-per-turn.\n",
    "isTalent": true
  },
  "Forest Friend": {
    "A": "Passive",
    "Effect": "You have a Pixie companion, a very small humanoid with wings.\nThe Pixie has 20 Armor and always stays with you.\nIf the Pixie goes more than 10 meters away from you, it becomes unsummoned (you can summon it back with a 5 minute ritual).\nYou can command the Pixie simple instructions for 0 Actions, like 'go there' or 'pick up that object'.\nThe Pixie has Charisma, Wisdom and Intelligence equal to yours, but its Dexterity is 0 and its Strength is -10.\nDecide with your DM whether you or the DM controls the Pixie roleplay-wise.\nHave fun!        \n",
    "isTalent": true
  },
  "Treesposition": {
    "A": "Passive",
    "Effect": "Touch a large or larger piece of wood and choose one of the following:\n1. Teleport near another large or larger piece of wood within 6 meters.\n2. Partially enter the piece of wood, becoming camouflaged. You have +5 Stealth until you exit back to your normal space.\nYou can stay like that for up to 1 hour.\nYou can do this once per day for free, or for 1 Charge.\nYou benefit from Cover while inside a tree.\n",
    "isTalent": true
  },
  "Copy Cat": {
    "A": "Passive",
    "Effect": "You can now use Shapeshift to also transform into other people.\nWhen you want to do this, roll a Deception check.\nThis check determines how close you get to the form of that person (20 or more means a perfect copy).\nThis copy just mimicks the body of the person, not the voice or personality or clothes.\nYour Fortitude and Dexterity also change to that person's stats, but not your Health, Armor, Charges, etc.\nYour Fortitude and Dexterity skill bonuses and Saves change to exactly equal to your new stats.\nYour Intelligence, Wisdom and Charisma skill bonuses, Stats and Saves stay the same as your normal ones.\nThis shapeshift ends if you get Crowd Controlled (other than Slow).\nYou can only copy a person once per day.\n",
    "isTalent": true
  },
  "Stone of Summoning": {
    "A": "Special",
    "Effect": "You take a pilgrimage of 7 days alone outdoors, in a safe, uncorrupted place untouched by regular folk.\nAfter this time, you transform a piece of natural rock into a summoning portal, by aligning it, other natural elements around it and decorating it according to the stars.\nChoose an ally within 100 kilometers of the stone. That ally will know when you are trying to summon them.\nBy you spending 3 Charges, you and a willing ally can spend 1 Hour summoning that willing ally to the location of the stone if that ally is within 100 kilometers of the stone.\nYou can summon an ally once a week.\nYou can take a new pilgrimage once a year.\n",
    "Notes": "For an ally to be summoned, it must have a clear state of mind and it must focus together with the caster for 1 hour.",
    "isTalent": true
  },
  "Innervate": {
    "A": "0.5 Actions",
    "Cost": "1 Charge",
    "Range": "6 meters",
    "Effect": "Heal an ally for 3 Health and it regains 1 Charge.\n",
    "Downside": "Can not be cast on other Druids.",
    "isTalent": true
  },
  "Slay": {
    "A": "0 Actions",
    "Cost": "1 Charge",
    "Effect": "Your next attack has the following effect:\nIf the target has 50% of less Health, deal 1d12 extra damage.\nIf it has more, try to Snare it (Wisdom save).\n"
  },
  "Tumble": {
    "A": "0 Actions",
    "Cooldown": "Long Rest",
    "Effect": "Move 1 meter in any direction, without triggering attacks of oportunity."
  },
  "Wicked Slayer": {
    "A": "Passive",
    "Effect": "Your weapon attacks and thrown spells against Monstrosities, Celestials and Unholy creatures have +1.\nYour attacks are always treated as Magical or Silver for the purpose of some effects.\n"
  },
  "Mage Slayer": {
    "A": "Reaction",
    "Cost": "1 Charge",
    "Effect": "Use when an enemy casts a spell.\nTry to Silence it and prevent that spell (Wisdom save).\n"
  },
  "Giant Slayer": {
    "A": "Passive",
    "Effect": "Weapon attacks and thrown spells deal +1 damage against Large or larger targets.\nEnemies don't gain flanking bonus when attacking you.\n"
  },
  "Manking Slayer": {
    "A": "Passive",
    "Effect": "Against Humanoids, Slay both deals the extra damage and tries to Snare it, no matter the health."
  },
  "Flare Shot": {
    "A": "Reaction or 0 Actions",
    "Cost": "1 Charge",
    "Range": "15 meters",
    "Effect": "Quickly shoot a flare at a target point.\nThe area around the flare lights up in a 6 meter radius, creating normal light.\nWhen cast, all allies in the area are cleared of Stun, Fear or Cripple.\nAllies in the area have Advantage on rolls against Fear.\nThe flare lasts 1 minute.\n",
    "isTalent": true
  },
  "Night Senses": {
    "A": "0 Actions",
    "Cost": "1 Charge",
    "Effect": "For 1 Hour, you gain the following:\nYour party has Dark Vision (15 meter range).\nYour party has Advantage on rolls against Blinding.\nYour party has +2 meter movement speed.\n",
    "isTalent": true
  },
  "Watcher Form": {
    "A": "1 Action",
    "Cost": "1 Charge",
    "Cooldown": "Long Rest",
    "Effect": "You take on a special form, called a Watcher Form.\nYour body becomes engulfed in a magical aura (you choose its color), your eyes glow, and you can gain other aesthetics-only body transformations (customize it with your DM).\nWhile in this form, your first weapon attack (or thrown spell) deals +4 damage once per turn, you gain +2 to all saves and +2 to your Save DC and +3 to Intimidation and Arcana.\nAlso, when you cast a spell (before you do), you can instantly dash 3 meters, ignoring attacks of oportunity, and going through enemies and small obstacles or medium gaps.\nLasts up to 1 minute.\n",
    "isTalent": true
  },
  "Combo Set": {
    "A": "Passive",
    "Effect": "You gain Quickfire, Guard Breaker and Tumblestrike.",
    "isTalent": true
  },
  "Quickfire": {
    "A": "0 Actions",
    "Cost": "1 Charge",
    "Effect": "Perform an attack with a (loaded if it has to be) 1-Handed weapon.\nThis attack does not trigger attacks of oportunity and can be used in melee range without penalty if it's a ranged weapon.\n",
    "isTalent": true
  },
  "Guard Breaker": {
    "A": "Passive",
    "Effect": "Your Slash, Smash and Pierce attacks ignore target's resistances to that damage type (not immunity, however).",
    "isTalent": true
  },
  "Tumblestrike": {
    "A": "Passive",
    "Effect": "After you Tumble, your next weapon attack or thrown spell has Advantage on the damage roll.",
    "isTalent": true
  },
  "Second Animal Companion": {
    "A": "Passive",
    "Effect": "You have one more Animal Companion, aside from the one you get from your Beastmaster Companion.\nThis Animal Companion obeys the same rules as the regular one.\nOn a turn, you can do one Pet Attack for each pet.\n",
    "isTalent": true
  },
  "Exotic Trainer": {
    "A": "Passive",
    "Effect": "Instead of your normal pets, you can choose from the Exotic list of pets.",
    "isTalent": true
  },
  "Magic Mastery": {
    "A": "0 Actions",
    "Cost": "1 Charge",
    "Effect": "The next ability you use that has the cost of 1 Action now costs 0.5 Actions.\nThis is considered a maneuver.\n"
  },
  "Master Specialization": {
    "A": "Passive",
    "Effect": "Choose a class. You also have access to that class's Spell List!",
    "isTalent": true
  },
  "Shadow Clone": {
    "A": "0 Actions",
    "Cost": "1 Charge",
    "Range": "6 meters",
    "Effect": "You create an illusion of yourself at a target location.\nThe illusion has 1 Health and 1 Armor and it fails all saves.\nYou can control what the illusion does at will.\nLasts up to 10 minutes.\n",
    "isTalent": true
  },
  "Momentum Magic": {
    "A": "Passive",
    "Effect": "After an encounter, you can roll 1d20 and add your Main Stat.\nIf you rolled a total of or over 20, you gain 1 Charge.\nYou can succeed this once per Long Rest (you can try multiple times, but after you succeed once, you need to Long Rest to do it again).\n",
    "isTalent": true
  },
  "Vanishing Book": {
    "A": "Special",
    "Effect": "You gain +1 in Stealth and Sleight of Hand.\nFor 0 Actions, you can instantly vanish you Spell Book, or make it reappear in your hand.\nYou can only vanish it every 10 minutes.\n",
    "isTalent": true
  },
  "Arcane Focus": {
    "A": "Passive",
    "Effect": "Your Spell Book becomes replaced with an item called Arcane Focus.\nAn Arcane Focus is an item of your choice. It can be an amulet, a sword, a cape, etc.\nAs long as you have the Arcane Focus on you, it counts as if you are holding the Spell Book without occupying your hand.\n",
    "isTalent": true
  },
  "Artificer - Magic Weapon": {
    "A": "5 minutes",
    "Cost": "1 Charge",
    "Effect": "Choose one a type of weapon, and choose 2 of the following effects:\no +2 damage\no Damage is converted to Fire/Cold/Shock (choose one)\no +2 meters move speed\no +5 health while wielding it\nYou can only have 1 Magic Weapon created at a time.\nThe Magic Weapon is automatically destroyed after 2 hours.\n",
    "isTalent": true
  },
  "Artificer - Spellcraft": {
    "A": "5 minutes",
    "Cost": "1 Charge",
    "Effect": "You are able to create a custom spell which you hold prepared until your next Long Rest.\nChoose any 2 spells you can cast.\nThose spells combine into one, and both effects are cast at the same time.\nThis custom spell costs the combined number of Charges and the Actions for it are the combined Actions minus 0.5 Actions.\nYou know and have this spell prepared until your next Long Rest.\nMagic Mastery now also allows you to cast 1.5 Action spells for 1 Action.\n",
    "Notes": "Example - if one spell takes 0.5 Actions and the other 1 Action, the custom spell will take 1 Action.\nYou can customize what the custom spell looks like (for aesthetics only).\nYou can still cast those 2 spells separately.\n",
    "isTalent": true
  },
  "Divine Sense": {
    "A": "1 Action",
    "Cost": "1 Charge",
    "Effect": "You know the locations and types of all Holy, Unholy and Celestial creatures or things within 15 meters, unless the path to them is obstructed by thick or dense walls or magic.\nYou can do this once per rest without using a Charge.\n"
  },
  "Lay on Hands": {
    "A": "1 Action",
    "Effect": "You have a pool of Holy 8 points.\nUsing an action, you can expend up to Holy 8 points to heal a creature for the same amount.\nYour pool resets to 8 points on Long Rests.\n"
  },
  "Divine Smite": {
    "A": "0 Actions",
    "Cost": "2 Charges",
    "Effect": "Add 2d8 True damage to a melee damage roll.\nYou can only use Divine Smite once per turn.\n"
  },
  "Pledge of Conquest": {
    "A": "Special",
    "Cooldown": "Lifetime",
    "Effect": "Ask a party member to join your cause and pledge his/her honor to you.\nIf it accepts, it gains access to all of your prepared spells and can use Lay on Hands from your own pool of Holy points.\nAlso, Oath of Conquest gives you 2 Holy points when that ally  drops a worthy enemy to 0 Health.\n",
    "Notes": "The ally does not need to have those spells prepared.\nYou can only have one character who pledged for you.\n",
    "isTalent": true
  },
  "Retribution": {
    "A": "Special",
    "Effect": "You permanently lose Lay on Hands, but your maximum number of Charges you can have is increased by 1.",
    "isTalent": true
  },
  "Fury Smite": {
    "A": "0 Actions",
    "Cost": "5 Holy points",
    "Effect": "After a weapon attack, deal 50% of the damage done (as True damage) to all creatures around target (except you).",
    "isTalent": true
  },
  "Divine Reach": {
    "A": "0 Actions",
    "Effect": "You empower yourself to make your weapon send fiery waves.\nFor the next 1 minute, your melee attacks have exactly 2 meters range and can deal Fire damage instead.\nYou can do this once per Long Rest.\nAlso, passively, you can always apply smites to ranged attacks, no matter if Divine Reach is active or not.\n",
    "Notes": "Alternatively, if it makes sense for your character, the DM might allow it to deal Cold or Shock damage instead of Fire. Talk to your DM about this.",
    "isTalent": true
  },
  "Divine Blast": {
    "A": "1 Action",
    "Range": "12 meters",
    "Effect": "Make a Spell attack against a target and consume any number of Holy points. The attack deals damage equal to twice the number of holy points consumed.",
    "isTalent": true
  },
  "Shielding Hand": {
    "A": "Reaction",
    "Cost": "1 Charge",
    "Effect": "Use after an ally takes damage. After that ally takes damage, it gains a shield of Temporary Health equal to half of the damage taken. The shield lasts up to 1 minute.",
    "isTalent": true
  },
  "Focused Smites": {
    "A": "0 Actions",
    "Cost": "1 Charge",
    "Effect": "For 1 minute, your weapon attacks deal extra True damage and whenever you hit with a weapon attack, heal an ally within 6 meters.\nBonus Damage and Heal: 1 for 1-Handed weapons, 2 for 2-Handed weapons.\n",
    "isTalent": true
  },
  "Divine Rain": {
    "A": "0.5 Actions",
    "Cost": "1 Charge",
    "Cooldown": "Long Rest",
    "Effect": "If you would drop to 0 Health until the start of your next turn, you remain instead at 1 Health.\nWhen this happens, divine rays smite all enemies within 2 meters of you, and they all take 1d6 True damage.\n",
    "isTalent": true
  },
  "Reckoning": {
    "A": "1 Action",
    "Cost": "1 Charge",
    "Range": "6 meters",
    "Effect": "Make a spell attack on a target which does 2d10 Force damage.\nThe target must also make a Fortitude save.\nIf it fails, it is pushed away from you until the distance between you and the target is 6 meters.\nIf it stops in a wall or another enemy, it takes another 1d8 Force damage.\n",
    "isTalent": true
  },
  "Consacrated Zone": {
    "A": "0.5 Actions",
    "Cost": "1 Charge",
    "Effect": "The area in a 5 meter diameter circle around you becomes Consacrated.\nIf an enemy attempts to leave the area, it must succeed a Charisma save.\nIf it fails, it takes 1d10 True damage and loses 2 meters of movement.\nThe enemy can attempt to escape as many times on the same turn.\nNotes: The zone lasts up to 1 minute and can be cancelled for 0 Actions or Reaction.\n",
    "isTalent": true
  },
  "Ambush": {
    "A": "Passive",
    "Effect": "If you are hiding (with Hide), your next attack deals 1d4 damage.\nWhen doing this, you can also spend as many charges as you want (and can).\nThat attack gains 1d6 + 1 damage more for each Charge spent.\nThis can only happen once per turn.\n"
  },
  "Lockpick": {
    "A": "Passive",
    "Effect": "You are trained in Lock Picking."
  },
  "Hide": {
    "A": "Reaction",
    "Cooldown": "Once per encounter",
    "Effect": "When you would roll Initiative, you can instead roll Stealth.\nIf you succeed, you become Hidden.\nWhile Hidden, you can unhide and start your turn whenever you like (even before or after a creature does something).\nIf you started your turn during another creature's turn, that creature resumes its turn after your turn ends.\nAfter that, you take your turn when you normally would, next rounds.\n",
    "Notes": "You become unhidden at the end of the round if you don't take your turn by then.\nThe Stealth check is made againt the highest enemy Passive Perception, which is their Perception + 10.\n"
  },
  "Payback Shot": {
    "A": "0.5 Actions",
    "Cost": "3 Gold Tokens after cast",
    "Effect": "Try to Stun an adjacent unit (Dexterity save).\nYour DC for this try is increased by your number of Gold Tokens, up to +5.\n",
    "isTalent": true
  },
  "Arcane Trickster": {
    "A": "Passive",
    "Effect": "You can now cast spells!\nYou permanently know 3 spells from the following spell list:\nAcid Burst  : 0.5 Actions\nBurning Breath  : 0.5 Actions\nConjure Ammo  : 1 Action\nControl Flames  : 1 Action\nControl Water  : 1 Action\nFlameblade  : 0 Actions\nLight  : 1 Action\nMagic Missiles  : 1 Action\nMastery  : 1 Action\nPrestidigitation  : 1 Action\nChaining Grasp  : 0 Actions\nCharming Word  : 1 Action\nCure Poison  : 1 Action\nDistort Vision  : 1 Action\nFake Sound  : 0.5 Action\nMage Hand  : 0 Actions\nUnlock  : 1 Action\nShadow Clone  : 0 Actions\nEncode Thoughts  : 1 Action (Level 4)\nInvisibility  : 1 Action (Level 4)\nLevitate  : 1 Action (Level 4)\nSense Magic  : 0 Actions (Level 4)\nSpider Climb  : 1 Action (Level 4)\nWhen you level up, you can change one of these abilities with another from the same list.\nYou learn 1 additional ability at Levels 3, 5, 7 and 9.\n",
    "isTalent": true
  },
  "Way of Fooling": {
    "A": "Passive",
    "Effect": "Your Charisma is increased by 2, (up to a maximum of 4).",
    "isTalent": true
  },
  "Take Out": {
    "A": "1 Action",
    "Cost": "1 Charge",
    "Effect": "Try to put an adjacent target to Sleep for 1 minute (Dexterity save).\nIf you succeed, you gain the Action back.\n",
    "Downside": "You must be hiding to use Take Out, and the target must be Isolated.\nThis ability unhides you!\n",
    "isTalent": true
  },
  "Poison Master": {
    "A": "1 hour",
    "Cost": "1 Charge",
    "Effect": "Using ingredients costing 35 Gold, you are able to create a few drops of Drinkable Poison.\nSomeone ingesting them takes 1d12 Poison damage instantly.\nCombining multiple instances of Drinkable Poison increases its damage by 1d12 for each Drinkable Poison combined.\nThe poison loses its effect after 48 hours.\n",
    "isTalent": true
  },
  "Shadowstep": {
    "A": "0.5 Actions",
    "Cooldown": "Long Rest",
    "Effect": "If you are covered in shadow, choose another point covered in shadow up to 6 meters away.\nInstantly teleport to that place.\n",
    "Notes": "This is considered a Spell.",
    "isTalent": true
  },
  "Cheap Tricks": {
    "A": "0 Actions",
    "Cost": "2 Charges",
    "Range": "3 meters",
    "Effect": "Try to Blind a target for 2 turns.",
    "Notes": "A Blinded target's attacks have Hard Cover and its targets' saves have +4.",
    "isTalent": true
  },
  "Whiplash": {
    "A": "0 Actions",
    "Cooldown": "Long Rest, otherwise it costs 1 Charge",
    "Effect": "Throw a whiplash at a grabbable point within 6 meters.\nPull yourself to a target point.\n",
    "Notes": "Requires a Whiplash item, which can be bought for 100 gold.",
    "isTalent": true
  },
  "Animal Spirit": {
    "A": "Special",
    "Effect": "Choose one of the 4 animal spirits. You gain an Ability and a bonus to a Skill Check depending on your Spirit Animal.\nBear - You gain Bear's Roar and +2 to Athletics.\nWolf - You gain Wolf's Leap and +2 to Intimidation.\nEagle - You gain Eagle's Sight and +2 to Perception.\nOwl - You gain Owl's Foresight and +2 to Knowledge.\n"
  },
  "Bear's Roar": {
    "A": "1 Action",
    "Cooldown": "Long Rest",
    "Effect": "Try to Cripple all enemies within 2 meters of you (Charisma save).\nEach enemy that got Crippled takes 1d6 Psychic damage.\n"
  },
  "Wolf's Leap": {
    "A": "0.5 Actions",
    "Cooldown": "Long Rest",
    "Effect": "Leap at a target up to 3 meters away.\nThe target takes 1d6 Bleed damage at the end of each of your turns for 1 minute.\n"
  },
  "Eagle's Sight": {
    "A": "Passive",
    "Effect": "You have Maximum Initiative every encounter.\nAll your ranged attacks have an extra 3 meters range.\nYour spell DC is increased by 1.\n"
  },
  "Owl's Foresight": {
    "A": "Reaction",
    "Cooldown": "Long Rest",
    "Effect": "Use when an enemy casts a spell (non-naturally).\nThe spell is cancelled and the enemy loses the Action for it.\n"
  },
  "Reincarnation": {
    "A": "1 Action",
    "Cooldown": "1 week",
    "Effect": "Stabilize an unconscious creature or revive a creature that died recently (12 hours maximum).\nThis puts the creature at 1 Health.\nYou can do this on yourself if you are dead (still uses 1 Action if in an encounter).\n",
    "isTalent": true
  },
  "Spirit Draw": {
    "A": "Reaction",
    "Effect": "An ally can spend 1 Charge and 1 Action to draw in a part of your soul, with your permission.\nThat ally can try to cast Spirit Strike once and use your spirit animal Ability once.\nLasts until either of you cancel it, or until either's next Rest.\nAn ally can't draw your soul more than once per Long Rest.\n",
    "isTalent": true
  },
  "Spirit Companion": {
    "A": "1 Action",
    "Cost": "8 Health",
    "Effect": "You summon your spirit animal into the material world.\nIt has the following stats:\n- Health: 1 or 6 if Bear\n- Defense: 8\n- Movement: 6 or 9 if Wolf\n- Stats and skills: Like yours\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\nYour pet gets unsummoned if it moves more than 30 meters away from you.\nOn your turn, you can command it to move, but it can't take its own Actions.\nYou and your pet share the same Actions on a turn.\nIf your spirit animal dies, you can always summon it back.\nThe spirit animal stays in the material world for up to 10 minutes.\nYou also gain the following abilities (Pet Attack and Wargsight).\n",
    "Notes": "If you have 1 Action, your pet can use 0.5 Actions to attack and you can use 0.5 Actions to attack too, or your pet spends 1 Action and you skip your Actions, etc.\n",
    "isTalent": true
  },
  "Pet Attack": {
    "A": "0.5 Actions",
    "Effect": "The pet melee attacks a target.\nThe attack deals 1d10 + (Your Main Stat) Force damage.\nYou can do this once per turn.\n",
    "isTalent": true
  },
  "Wargsight": {
    "A": "Channeled",
    "Effect": "While channeling, you can act and sense through your pet's body, but you can't control yourself.\n",
    "isTalent": true
  },
  "Mind Link": {
    "A": "0 Actions",
    "Cost": "1 Charge",
    "Effect": "Establish a mind connection with a willing ally.\nFor 4 hours, you can talk to eachother telepathically.\n",
    "isTalent": true
  },
  "Dream Walk": {
    "A": "Channeled",
    "Cost": "1 Charge",
    "Range": "6 meters",
    "Effect": "Choose a sleeping target you can see.\nIt makes a Wisdom save with Disadvantage.\nIf it fails, you can alter their dream to your liking.\nThe target wakes up if they die in the dream, or the DM might have the target make another save for waking up later.\n",
    "isTalent": true
  },
  "Far Sight": {
    "A": "Reaction",
    "Cost": "1 Charge",
    "Effect": "Gain +3 on any Wisdom skill check (before you roll).",
    "Notes": "You can stack this as many times as you like for the same roll.",
    "isTalent": true
  },
  "Voodoo Magic": {
    "A": "1 Action",
    "Cost": "1 Charge",
    "Range": "6 meters",
    "Effect": "A non-epic target makes a Wisdom save.\nIf it fails, for its next 2 turns, you can choose that enemy's actions as long as it would seem reasonable to that enemy (decide with your DM).\n",
    "Notes": "For example, you can make a goblin run or recklessly attack one of your party members. But you can't make a guard jump off a cliff, because that's not what it would normally do.",
    "isTalent": true
  },
  "Incorporeal Form": {
    "A": "1 Action",
    "Cost": "1 Charge",
    "Effect": "You become a bodyless soul for up to 8 hours and enter a willing ally.\nWhile inside the ally's body, you can communicate with them mentally, and only they can see you.\nYou can slightly peek outside of their body, and move your arms, upper body and head as if you were a ghost originating from that ally's body.\no You can't move yourself, but you always move with that ally.\no You can't do any physical actions (because you are basically a ghost and can't touch anything or anyone).\no You can cast spells as normal. \no You follow your own Initiative in combat.\no You can't take damage from external sources, but you feel every body sensation that ally feels.\nYou can freely exit their body and revert back to your physical self using 1 Action.\n",
    "isTalent": true
  },
  "Life Tap": {
    "A": "0 Actions",
    "Cost": "6 Health",
    "Effect": "Gain 1 Charge.",
    "Notes": "You can exceed 2 Charges with this.\nThese Charges go away if you don't use them until the next Long Rest.\n"
  },
  "Fey Patron": {
    "A": "Passive",
    "Effect": "Your lord is a higher fey creature.\nThe first time you choose a Race talent, get one more from the same level.\n",
    "Notes": "Yes, you will have 2 Race Talents of the same level.\nLore-wise, the Fey Patron enhances you magically, mutates your arcane flow and transforms you into an unordinarily adapted person.\n"
  },
  "Celestial Patron": {
    "A": "Passive",
    "Effect": "Your lord is a celestial being, who lives in a higher plane. You gain Life Cycle.",
    "Notes": "The gift of Life Cycle is granted to you by your patron. Use it well. Withhold the balance."
  },
  "Life Cycle": {
    "A": "0.5 Actions",
    "Cost": "6 Health",
    "Effect": "Heal a creature for up to 10 Health from their remaining Extra Health Pool."
  },
  "Demon Patron": {
    "A": "Passive",
    "Effect": "Your lord is a powerful demon.\nYou gain Soul Drain.\n",
    "Notes": "Through every soul drained, your demon lord feeds, and in return, grants you even more power."
  },
  "Soul Drain": {
    "A": "0.5 Actions",
    "Cost": "1 Charge",
    "Range": "12 meters",
    "Effect": "Deal 6 Dark damage to a creature.\nIf it dies, you get the Charge back and heal for 3 Health.\n"
  },
  "Old God Patron": {
    "A": "Passive",
    "Effect": "Your lord is an old, slumbering god.\nYou can pick a Racial Ability from any other race and have it permanently.\n",
    "Notes": "Eldritch thoughts flow through your mind, infecting you with strange abilities acquired in unfathomable ways."
  },
  "Shapeshifting Weapon": {
    "A": "0 Actions",
    "Cooldown": "Once per turn",
    "Effect": "Instantly change the type of weapon of your Hexblade.",
    "isTalent": true
  },
  "Hexstaff": {
    "A": "Passive",
    "Effect": "Your ~Hexblade~ Ability is changed and now has the following effect:\nAfter you attack with a weapon, your next spell has +1 DC and deals +1d4 damage.\n",
    "isTalent": true
  },
  "Doublehex": {
    "A": "Passive",
    "Effect": "You now have 1 more Hexblade Weapon, of any kind. The same patron or another one is possessing your second weapon.\nAt any time, you can vanish or resummon either weapon.\nYou must wait at least 5 minutes (for each weapon separately) after resummoning a weapon to vanish it again.\n",
    "isTalent": true
  },
  "Tongues": {
    "A": "Passive",
    "Effect": "You can speak all Common languages.",
    "isTalent": true
  },
  "Impmaster": {
    "A": "Special",
    "Effect": "When you get this Talent, gain 2 Skill Points.",
    "isTalent": true
  },
  "Advanced Flank": {
    "A": "Passive",
    "Effect": "When you flank-attack an enemy, or an ally flank-attacks an enemy with you, the flank damage bonus is +2/+4 (1-Handed/2-Handed)."
  },
  "Master Positioner": {
    "A": "Passive",
    "Effect": "You permanently know all maneuvers.",
    "isTalent": true
  },
  "Melee Pile": {
    "A": "0 Actions",
    "Cost": "1 Charge.",
    "Effect": "All Medium or smaller enemies within 2 meters of you are pulled to their closest points to you.",
    "isTalent": true
  },
  "Weaponmaster": {
    "A": "Passive",
    "Effect": "When you get this, choose one weapon type.\nYou have that weapon effect too, no matter what weapon you are using.\n"
  },
  "Protect the Meek": {
    "A": "Reaction",
    "Cooldown": "Encounter",
    "Effect": "When an ally within 3 meters of you is targeted by a ranged attack, you become its target instead.",
    "isTalent": true
  },
  "Bashing Charge": {
    "A": "1 Action",
    "Cost": "1 Charge.",
    "Effect": "Move 3 meters in a straight line, then choose a target near you.\nThat target takes 1d8 damage and try to Stun the target (Fortitude save).\n",
    "isTalent": true
  },
  "Heartbeat Trance": {
    "A": "0 Actions",
    "Cost": "1 Charge.",
    "Effect": "Take 2d6 damage.\nEnter a Heart Trance until the end of your next turn.\nWhile in Heart Trance, you take 50% less damage from Fire, Frost, Necrotic and Thunder damage and you have +3 on Acrobatics and Intimidation rolls.\nWhen Heart Trance ends, heal for 2d6.\n",
    "isTalent": true
  },
  "Rage Trance": {
    "A": "0 Actions",
    "Cost": "1 Charge.",
    "Effect": "Take 2d6 damage.\nUntil the end of your next turn, you are immune to stuns, slows, snares, cripples and being knocked prone.\nYour attacks while in Rage Trance have an extra +1 damage to all attacks and you have +3 on Athletics.\nWhen Rage Trance ends, heal for 2d6.\n",
    "isTalent": true
  },
  "Battle Trance": {
    "A": "0 Actions",
    "Cost": "1 Charge.",
    "Effect": "Take 2d6 damage.\nEnter a Battle Trance that lasts until the end of your next turn.\nYou gain a protective shield around you which absorbs up to 4 + Your Level physical damage.\nWhen Rage Trance ends, heal for 2d6, and the shield fades.\n",
    "isTalent": true
  },
  "Recoil Shot": {
    "A": "0 Actions",
    "Cost": "1 Charge",
    "Range": "2 meters",
    "Effect": "Dash up to 2 meters away from the target.\nTry to push the target 2 meters away (Fortitude save).\n",
    "Notes": "This does not trigger attacks of oportunity.",
    "isTalent": true
  },
  "Harpoon": {
    "A": "1 Action",
    "Cost": "1 Charge",
    "Range": "6 meters",
    "Effect": "Make a ranged attack that deals 2d12 + 4 damage (against Defense).\nThe target makes a Dexterity save.\nIf it fails, it is pulled to you.\nOtherwise, you are pulled to it.\n",
    "Notes": "Requires a Harpoon, which can be bought for 50 Gold.",
    "isTalent": true
  },
  "Precise Weapon": {
    "A": "1 hour",
    "Effect": "Choose any weapon you have and make it Precise.\nThe weapon's scaling becomes +3/+6 (1-Handed/2-Handed) instead of scaling with a Stat.\nThe wielder of the weapon is also immune to Cripple.\n",
    "Notes": "Making another weapon Precise makes the previous back to how it was.\nRequires to be at a forge.\n",
    "isTalent": true
  },
  "Herbivore": {
    "A": "Passive",
    "Effect": "You can not eat meat.\nIf you do, you take take 1d12 Poison damage and have Disadvantage on all rolls for 1 hour.\nYou have 0 Defense against Poison attacks.\n"
  },
  "Fleet Footed": {
    "A": "Passive",
    "Effect": "You are immune to Slows (not counting Hard Terrain).",
    "isTalent": true
  },
  "Nimbleness": {
    "A": "Passive",
    "Effect": "You can move through the spaces of enemy units (in normal conditions).",
    "isTalent": true
  },
  "Darkvision": {
    "A": "Passive",
    "Effect": "You can see up to 12 meters away in darkness, without discerning colors.",
    "isTalent": true
  },
  "Cutting Teeth": {
    "A": "Passive",
    "Effect": "Your teeth act as natural daggers which can pierce through some materials:\nYou are able to cut rope, flesh, wood, etc (but not concrete, metal, etc).\nAttacking with your teeth takes 0.5 Action, adds Dexterity modifier and deals 1d8 + 1 Piercing damage.\nYou can only bite once per turn.\n",
    "isTalent": true
  },
  "Sprightly Shaped": {
    "A": "Passive",
    "Effect": "Your fur is sleek, and your feet swift.\nYou gain +1 meter movement speed.\nYou have +5 on swimming rolls.\n"
  },
  "Eyes and Ears": {
    "A": "Passive",
    "Effect": "You gain +5 Initiative.\nYou gain +2 Perception.\nYou know the Hide maneuver permanently.\n"
  },
  "Protruded Claws": {
    "A": "Passive",
    "Effect": "You gain +5 on climbing rolls.\nYou become Trained in Unarmed (if you aren't already) and can do Unarmed attacks with any Stat instead of Dexterity/Fortitude.\nUnarmed attacks can do Piercing damage (if you choose so).\n"
  },
  "Draconic Ancestry": {
    "A": "Special",
    "Effect": "When creating your character, choose your Dragonborn type:\nBlack\t- Acid\nBlue - Cold\nBrass\t- Fire\nBronze - Thunder\nGold - Fire\nRed - Fire\nSilver - Force\nGray - Necrotic\nWhite\t- Cold\nGreen\t- Poison\nThat becomes your Dragonborn Element.\n"
  },
  "Dragonborn Resistance": {
    "A": "Passive",
    "Effect": "You have 50% resistance to damage of your Dragonborn Element type."
  },
  "Dragon's Breath": {
    "A": "1 Action",
    "Cooldown": "Long Rest",
    "Effect": "Breathe your Dragonborn Element in a 3x1 meter line.\nMake an attack against all creatures caught in your breath.\nThe attack deals 2d8 damage of your Dragonborn Element (against their Defense).\n"
  },
  "Breath - Cone": {
    "A": "Special",
    "Effect": "Your Dragon's Breath now breathes in a 3 meter, 45* cone instead of a line.",
    "isTalent": true
  },
  "Breath - Line": {
    "A": "Special",
    "Effect": "Your Dragon's Breath now breathes in a 4x2 meter line.",
    "isTalent": true
  },
  "Breath - Blast": {
    "A": "Special",
    "Effect": "Your Dragon's Breath now breathes on all creatures around you instead of a line.",
    "isTalent": true
  },
  "Breath Master": {
    "A": "Passive",
    "Effect": "Your Dragon's Breath does not affect allies and it's Damage is increased by 2 (2d8 + 2)."
  },
  "Double Breath": {
    "A": "Passive",
    "Effect": "You can now use Dragon's Breath twice per Long Rest."
  },
  "Flaming Jaws": {
    "A": "0.5 Action",
    "Cooldown": "Long Rest",
    "Effect": "Leap at a target up to 4 meters away from you ignoring attacks of oportunity. The target takes 3 damage (of your Dragonborn Type) and you are healed for 3 health."
  },
  "Dwarf Resting": {
    "A": "Passive",
    "Effect": "You need 12 hours of sleep instead of 8 per day to function normally.\nYour movement speed can't be reduced below 5 meters.\n",
    "Notes": "Hard Terrain still takes 2 meters of movement for 1 meter of Hard Terrain."
  },
  "Dwarven Resilience": {
    "A": "Reaction",
    "Effect": "Reroll a save roll.\nYou can do this once per Long Rest.\n"
  },
  "Stone-like Bones": {
    "A": "Passive",
    "Effect": "Your bones are tough as rock.\nYou take half as much damage from falling and from traps which deal physical damage.\nYou also get +1 on Fortitude saves.\n",
    "isTalent": true
  },
  "Runesmith": {
    "A": "Passive",
    "Effect": "You permanently know 1 spell from the Amateur Spell List.\nYou can identify what language most texts are written in by analyzing them.\nYour Arcana skill increases by 1.\n",
    "isTalent": true
  },
  "Resilient Ancestry": {
    "A": "Passive",
    "Effect": "Your Extra Health Pool increases by 10.\nWhen rerolling a save with Dwarven Resilience, add +3 to the roll.\n"
  },
  "Adapted Resting": {
    "A": "Passive",
    "Effect": "You gain +5 maximum Health.\nYou now only need to sleep 8 hours per day.\n"
  },
  "Skill of Trade": {
    "A": "Reaction",
    "Effect": "Your Charisma increases by 1 (up to a maximum of 3).\nYou can get free shelter and food in inns and taverns (if you would normally be able to pay for them).\nYou gain an extra +5 to Investigation rolls when checking stone walls, doors, statues, etc.\n"
  },
  "The Blade Dance": {
    "A": "Passive",
    "Effect": "When you land the killing strike on a Worthy Enemy, you reset your movement this turn and don't provoke attacks of oportunity this turn."
  },
  "Meditation": {
    "A": "4 Hours",
    "Effect": "Instead of sleeping for 8 hours, you can meditate for 4 hours and achieve the same result.\nWhile meditating, all checks you perform are done at -5.\t\n",
    "isTalent": true
  },
  "Arcane Veins": {
    "A": "Passive",
    "Effect": "You permanently know 2 spells from the Amateur Spell List.",
    "isTalent": true
  },
  "Mana Tap": {
    "A": "0 Actions",
    "Range": "3 meters",
    "Cooldown": "Long Rest",
    "Cost": "1 Charge",
    "Effect": "Try to Silence a nearby enemy (Intelligence save)."
  },
  "Natual Swiftness": {
    "A": "0 Actions",
    "Effect": "Gain +4 Movement this turn and you avoid Attacks of Oportunity.\nYou can use this once per Long Rest.\n"
  },
  "Landsperson": {
    "A": "Special",
    "Effect": "Choose any land specialty ability from Coven of the Land Druid specialization and learn it permanently."
  },
  "Inherited Tastes": {
    "A": "Passive",
    "Effect": "You don't have a sense of taste, but your eyes perceive colors sharper than other races."
  },
  "Lucky": {
    "A": "Reaction",
    "Cooldown": "Long Rest",
    "Effect": "After a creature within 30 meters of you makes a d20 roll, you can add or subtract your Luck Skill from that roll."
  },
  "Catch Me If You Can": {
    "A": "0 Actions",
    "Effect": "This turn you don't trigger attacks of oportunity.\nYou can do this once per Long Rest.\nAlso, passively, your movement speed increases by 1 meter.\n",
    "isTalent": true
  },
  "Oh, My Tongue!": {
    "A": "Passive",
    "Effect": "You now have a sense of taste. Congratulations!\nYou can detect whether something is poisonous by licking it without being affected by that poison.\nYou have 50% resistance to Acid and Poison.\n",
    "isTalent": true
  },
  "Quick to Act": {
    "A": "Passive",
    "Effect": "You gain maximum Initiative every encounter."
  },
  "Luckier": {
    "A": "Passive",
    "Effect": "You can use Lucky twice per Long Rest."
  },
  "Environmentalist": {
    "A": "Passive",
    "Effect": "You can move normally through Hard Terrain.\nYou permanently learn 2 Spells from the Druid Spell List.\n"
  },
  "Undeath": {
    "A": "Passive",
    "Effect": "You have Advantage to rolls against Diseases.\nYou have 50% vulnerability to Fire damage and to attacks done with silver weapons.\nYou do not require food to survive, but you do require 8 hours of sleep per day, water and air.\nYou are considered Undead.\n"
  },
  "Valiant": {
    "A": "Passive",
    "Cooldown": "Long Rest",
    "Effect": "When you drop to 0 Health, you can still take your next turn without penalty.\nAfter your next turn, you fall unconscious.\nYou also fall unconscious in that time if you take damage again.\n"
  },
  "Sense Souls": {
    "A": "0 Actions",
    "Cooldown": "Long Rest",
    "Effect": "You know the locations of any living creatures within 15 meters that are not obstructed by thick materials.\n",
    "Notes": "The more obstructed the space between you and living creatures is, the fainter you feel it. 1 meter of obstruction completely hides the creatures.",
    "isTalent": true
  },
  "Beating Heart": {
    "A": "Passive",
    "Effect": "You slow down the decaying of your body and increase your life span by up to 100 years.\nYou can stay unconscious for up to 1 week before dying.\nYour maximum health also increases by 3.\n",
    "isTalent": true
  },
  "Out of Body Release": {
    "A": "0 Actions",
    "Cooldown": "Long Rest",
    "Effect": "Your soul temporarily exits your body, leaving your body motionless to the ground.\nWhile outside your body, the soul can't do anything except perceive.\nYou can return to your body for 0 Actions on your turn.\nWhile outside your body, you have +3 on Perception, Stealth and Luck.\nIf more than 1 minute outside the body passes, your soul instantly re-enters the body.\n"
  },
  "Kindled": {
    "A": "Passive",
    "Effect": "You are no longer vulnerable to Fire damage.\nAfter every worthy encounter, if your health is below 25% and you are conscious, heal back to 25% Health.\n"
  },
  "Painless Revenge": {
    "A": "0 Actions",
    "Cooldown": "Long Rest",
    "Effect": "Choose an enemy near you.\nThat enemy performs an attack on you.\nIf you survive the attack, you gain 1 Action which you can use to attack or cast spells on that enemy.\n"
  },
  "Human Vigilence": {
    "A": "Passive",
    "Effect": "Whenever you make a Skill Check, instead of rolling, you can automatically have 7 + your skill modifiers for that check."
  },
  "Human Diversity": {
    "A": "Special",
    "Effect": "Choose any other race.\nGain the first talent (left-most, first row, aka Level 1 Race Talent) from that race.\n",
    "Downside": "You can't pick the Dragonborn Talent.",
    "isTalent": true
  },
  "Master of the World": {
    "A": "Passive",
    "Effect": "Increase any stat by 1 (up to +3)."
  },
  "Boiling Blood": {
    "A": "0 Actions",
    "Cooldown": "Long Rest",
    "Effect": "Lose half of your current health.\nIncrease the original damage of your next attack by 50%.\n",
    "Notes": "Extra abilities over that attack are not increased."
  },
  "Battle Anguish": {
    "A": "Negative Passive",
    "Effect": "Whevener you drop to 0 Health, your maximum Health permanently decreases by 1."
  },
  "Fierceness": {
    "A": "Passive",
    "Effect": "You can use any weapon with Fortitude (instead of Dexterity, in some cases).",
    "isTalent": true
  },
  "Adaptability": {
    "A": "Passive",
    "Effect": "You can have your Fortitude as your Main Stat, even if your class says otherwise.",
    "isTalent": true
  },
  "Beast Rider": {
    "A": "Passive",
    "Effect": "You are trained in Riding and Exotic Riding (you can ride exotic mounts, such as wolves).\nYou also have such an exotic mount of your choice, if the DM accepts it.\nYou gain +2 in Animal Handling.\n",
    "Notes": "This mount is a non-combat pet. It does not participate in combat.",
    "isTalent": true
  },
  "Bloodthirst": {
    "A": "0 Actions",
    "Cost": "1 Charge",
    "Cooldown": "Long Rest",
    "Effect": "Gain 0.5 Actions this turn."
  },
  "Savage Attacks": {
    "A": "0 Actions",
    "Cooldown": "Long Rest",
    "Effect": "Use after you land an attack.\nRoll and add one other damage die from the attacks' damage dice to the damage roll.\n"
  }
}

export default Abilities