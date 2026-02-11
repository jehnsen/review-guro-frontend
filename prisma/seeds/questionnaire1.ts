import { QuestionCategory as QC, Difficulty as D } from '@prisma/client';
import { q, SeedQuestion } from './types';

export const questionnaire1: SeedQuestion[] = [
  // ============================================================
  // VERBAL ABILITY — 40 questions (12 EASY, 20 MEDIUM, 8 HARD)
  // ============================================================

  // --- VERBAL EASY (12) ---
  // #1 (existing)
  q(QC.VERBAL_ABILITY, D.EASY, 'Choose the word that is most similar in meaning to "BENEVOLENT".', ['Hostile', 'Kind', 'Indifferent', 'Cruel'], 1, 'Benevolent means kind and generous. The most similar word is "Kind".'),
  // #2 (existing)
  q(QC.VERBAL_ABILITY, D.EASY, 'Identify the correctly spelled word:', ['Occassion', 'Occasion', 'Ocasion', 'Occation'], 1, 'The correct spelling is "Occasion" with two "c"s and one "s".'),
  // #3
  q(QC.VERBAL_ABILITY, D.EASY, 'Choose the word that is most similar in meaning to "DILIGENT".', ['Lazy', 'Hardworking', 'Careless', 'Slow'], 1, 'Diligent means showing careful and persistent effort. "Hardworking" is the closest synonym.'),
  // #4
  q(QC.VERBAL_ABILITY, D.EASY, 'Choose the word that is OPPOSITE in meaning to "ABUNDANT".', ['Plentiful', 'Scarce', 'Ample', 'Sufficient'], 1, 'Abundant means existing in large quantities. Its opposite is "Scarce," meaning insufficient in quantity.'),
  // #5
  q(QC.VERBAL_ABILITY, D.EASY, 'Which of the following sentences is grammatically correct?', ['She don\'t like apples.', 'She doesn\'t likes apples.', 'She doesn\'t like apples.', 'She don\'t likes apples.'], 2, 'The correct form uses "doesn\'t" (does not) with the base form of the verb "like." Third person singular subjects use "doesn\'t."'),
  // #6
  q(QC.VERBAL_ABILITY, D.EASY, 'Identify the correctly spelled word:', ['Recieve', 'Receive', 'Recieve', 'Receeve'], 1, 'The correct spelling is "Receive." Remember the rule: "i before e except after c."'),
  // #7
  q(QC.VERBAL_ABILITY, D.EASY, 'Choose the word that best completes the sentence: "The teacher _____ the students to study harder for the exam."', ['encouraged', 'discouraging', 'encourage', 'encourages'], 0, 'The sentence is in the past tense, so the correct form is "encouraged."'),
  // #8
  q(QC.VERBAL_ABILITY, D.EASY, 'Choose the word that is most similar in meaning to "AMPLE".', ['Tiny', 'Sufficient', 'Narrow', 'Limited'], 1, 'Ample means enough or more than enough. "Sufficient" is the closest synonym.'),
  // #9
  q(QC.VERBAL_ABILITY, D.EASY, 'Choose the word that is OPPOSITE in meaning to "BRAVE".', ['Courageous', 'Bold', 'Cowardly', 'Fearless'], 2, 'Brave means ready to face danger. Its opposite is "Cowardly," meaning lacking courage.'),
  // #10
  q(QC.VERBAL_ABILITY, D.EASY, 'Which word is misspelled?', ['Necessary', 'Accomodate', 'Separate', 'Definitely'], 1, '"Accomodate" is misspelled. The correct spelling is "Accommodate" with double "c" and double "m."'),
  // #11
  q(QC.VERBAL_ABILITY, D.EASY, 'Choose the correct word to complete: "Neither the teacher _____ the students were late."', ['or', 'and', 'nor', 'but'], 2, '"Neither" is always paired with "nor." The correct expression is "Neither...nor."'),
  // #12
  q(QC.VERBAL_ABILITY, D.EASY, 'What does the word "CANDID" mean?', ['Dishonest', 'Truthful and straightforward', 'Secretive', 'Timid'], 1, 'Candid means truthful and straightforward; frank. It describes someone who speaks openly and honestly.'),

  // --- VERBAL MEDIUM (20) ---
  // #13
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the word that best completes the analogy: DOCTOR is to PATIENT as LAWYER is to _____.', ['Judge', 'Client', 'Court', 'Law'], 1, 'A doctor serves a patient, just as a lawyer serves a client. Both describe a professional-to-recipient relationship.'),
  // #14
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the word that is most similar in meaning to "METICULOUS".', ['Careless', 'Thorough', 'Quick', 'Ordinary'], 1, 'Meticulous means showing great attention to detail; very careful and precise. "Thorough" is the closest synonym.'),
  // #15
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the word that is OPPOSITE in meaning to "ELOQUENT".', ['Articulate', 'Inarticulate', 'Fluent', 'Persuasive'], 1, 'Eloquent means fluent and persuasive in speech. Its opposite is "Inarticulate," meaning unable to express ideas clearly.'),
  // #16
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Which sentence uses the correct verb tense?', ['He has went to the store.', 'He has gone to the store.', 'He has going to the store.', 'He has go to the store.'], 1, 'The present perfect tense requires "has" + past participle. The past participle of "go" is "gone."'),
  // #17
  q(QC.VERBAL_ABILITY, D.MEDIUM, '"The pen is mightier than the sword" means:', ['Pens are more expensive than swords.', 'Writing and communication are more powerful than violence.', 'Swords are outdated weapons.', 'Writers earn more than soldiers.'], 1, 'This proverb means that written words and ideas have greater influence and power than military force or violence.'),
  // #18
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the word that best completes the analogy: BIRD is to NEST as HORSE is to _____.', ['Barn', 'Stable', 'Ranch', 'Pen'], 1, 'A bird lives in a nest, just as a horse lives in a stable. Both describe an animal and its dwelling.'),
  // #19
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the correct sentence:', ['The committee have reached their decision.', 'The committee has reached its decision.', 'The committee have reached its decision.', 'The committee has reached their decision.'], 1, '"Committee" is a collective noun treated as singular in standard usage, so it takes "has" and "its."'),
  // #20
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'What does the word "PRAGMATIC" mean?', ['Idealistic', 'Dealing with things realistically and practically', 'Emotional', 'Theoretical'], 1, 'Pragmatic means dealing with things sensibly and realistically, in a way that is based on practical rather than theoretical considerations.'),
  // #21
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the word that is OPPOSITE in meaning to "FRUGAL".', ['Thrifty', 'Extravagant', 'Economical', 'Careful'], 1, 'Frugal means sparing or economical with money. Its opposite is "Extravagant," meaning spending freely and excessively.'),
  // #22
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Which of the following is the correct use of "affect" and "effect"?', ['The new policy will effect our schedule.', 'The new policy will affect our schedule.', 'The new policy will be an affect on our schedule.', 'The affect of the policy is clear.'], 1, '"Affect" is typically used as a verb meaning to influence. "Effect" is typically a noun meaning result. The policy will "affect" (influence) the schedule.'),
  // #23
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the word that best completes the sentence: "Despite the _____ weather, the outdoor event proceeded as planned."', ['pleasant', 'inclement', 'beautiful', 'wonderful'], 1, '"Inclement" means unpleasant or harsh (especially weather). The word "despite" indicates a contrast, so the weather must be unfavorable.'),
  // #24
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the word that best completes the analogy: CHAPTER is to BOOK as VERSE is to _____.', ['Song', 'Poem', 'Story', 'Music'], 1, 'A chapter is a section of a book, just as a verse is a section of a poem.'),
  // #25
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Which sentence contains a dangling modifier?', ['Walking through the park, the flowers were beautiful.', 'Walking through the park, I noticed the beautiful flowers.', 'I noticed the beautiful flowers while walking through the park.', 'The flowers in the park are beautiful.'], 0, '"Walking through the park, the flowers were beautiful" has a dangling modifier because it implies the flowers were walking. The correct subject should be a person.'),
  // #26
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'What does the word "UBIQUITOUS" mean?', ['Rare and unusual', 'Found everywhere', 'Hard to understand', 'Completely hidden'], 1, 'Ubiquitous means present, appearing, or found everywhere. It describes something that seems to be in all places at once.'),
  // #27
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the word that is most similar in meaning to "TENACIOUS".', ['Weak', 'Persistent', 'Timid', 'Flexible'], 1, 'Tenacious means holding firmly to something; persistent and determined. "Persistent" is the closest synonym.'),
  // #28
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Which of the following sentences uses the subjunctive mood correctly?', ['I wish I was taller.', 'I wish I were taller.', 'I wish I am taller.', 'I wish I be taller.'], 1, 'The subjunctive mood uses "were" instead of "was" after "wish" for hypothetical situations. "I wish I were taller" is correct.'),
  // #29
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the correct sentence:', ['Each of the students have their own book.', 'Each of the students has his or her own book.', 'Each of the students have his or her own book.', 'Each of the students has their own books.'], 1, '"Each" is a singular pronoun and takes the singular verb "has" and the singular pronoun "his or her."'),
  // #30
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'What does the idiom "to burn the midnight oil" mean?', ['To waste resources', 'To work or study late into the night', 'To start a fire at night', 'To lose sleep due to worry'], 1, '"To burn the midnight oil" means to work or study late into the night, originating from when oil lamps were used for light.'),
  // #31
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the word that is OPPOSITE in meaning to "LETHARGIC".', ['Sluggish', 'Drowsy', 'Energetic', 'Inactive'], 2, 'Lethargic means lacking energy; sluggish and apathetic. Its opposite is "Energetic," meaning showing great activity and vitality.'),
  // #32
  q(QC.VERBAL_ABILITY, D.MEDIUM, 'Choose the word that best completes the analogy: PAINTER is to BRUSH as WRITER is to _____.', ['Paper', 'Pen', 'Book', 'Desk'], 1, 'A painter uses a brush as a primary tool, just as a writer uses a pen as a primary tool.'),

  // --- VERBAL HARD (8) ---
  // #33
  q(QC.VERBAL_ABILITY, D.HARD, 'Choose the word that is most similar in meaning to "OBSEQUIOUS".', ['Rebellious', 'Servile', 'Dominant', 'Independent'], 1, 'Obsequious means excessively compliant or obedient in a servile manner. "Servile" is the closest synonym.'),
  // #34
  q(QC.VERBAL_ABILITY, D.HARD, 'Which sentence is punctuated correctly?', ['The CEO, who was recently hired said the company would expand.', 'The CEO who was recently hired, said the company would expand.', 'The CEO, who was recently hired, said the company would expand.', 'The CEO who was recently hired said, the company would expand.'], 2, 'A non-restrictive clause (additional, non-essential information) must be set off by commas on both sides. "who was recently hired" needs commas before and after.'),
  // #35
  q(QC.VERBAL_ABILITY, D.HARD, 'What does the word "SYCOPHANT" mean?', ['A person who gives honest criticism', 'A person who flatters to gain advantage', 'A person who avoids social interaction', 'A person who speaks eloquently'], 1, 'A sycophant is a person who acts obsequiously toward someone important in order to gain advantage; a flatterer.'),
  // #36
  q(QC.VERBAL_ABILITY, D.HARD, 'Choose the word that best completes the sentence: "The professor\'s _____ explanation confused even the brightest students in class."', ['lucid', 'abstruse', 'transparent', 'elementary'], 1, '"Abstruse" means difficult to understand; obscure. Since the explanation confused the students, it was abstruse.'),
  // #37
  q(QC.VERBAL_ABILITY, D.HARD, 'Choose the word that is OPPOSITE in meaning to "EPHEMERAL".', ['Fleeting', 'Transient', 'Permanent', 'Brief'], 2, 'Ephemeral means lasting for a very short time. Its opposite is "Permanent," meaning lasting or intended to last indefinitely.'),
  // #38
  q(QC.VERBAL_ABILITY, D.HARD, 'Which of the following uses "whom" correctly?', ['Whom is calling?', 'To whom should I address this letter?', 'Whom wants to go to the party?', 'Whom is the new employee?'], 1, '"Whom" is used as the object of a preposition or verb. "To whom should I address this letter?" uses "whom" correctly as the object of "to."'),
  // #39
  q(QC.VERBAL_ABILITY, D.HARD, '"The company\'s decision to downsize was a Pyrrhic victory." What does "Pyrrhic victory" mean?', ['A decisive and total victory', 'A victory won at too great a cost', 'A victory achieved through cunning', 'A victory that was unexpected'], 1, 'A Pyrrhic victory is a victory that inflicts such a devastating toll on the victor that it is tantamount to defeat. Named after King Pyrrhus of Epirus.'),
  // #40
  q(QC.VERBAL_ABILITY, D.HARD, 'Choose the word that best completes the analogy: CACOPHONY is to SOUND as LABYRINTH is to _____.', ['Simplicity', 'Path', 'Maze', 'Music'], 1, 'Cacophony is a harsh, discordant mixture of sounds. A labyrinth is a complicated, irregular network of paths. The analogy is "unpleasant/complex version is to base concept." Cacophony is to sound as labyrinth is to path.'),

  // ============================================================
  // NUMERICAL ABILITY — 40 questions (12 EASY, 20 MEDIUM, 8 HARD)
  // ============================================================

  // --- NUMERICAL EASY (12) ---
  // #41 (existing)
  q(QC.NUMERICAL_ABILITY, D.EASY, 'What is 15% of 200?', ['25', '30', '35', '40'], 1, '15% of 200 = (15/100) × 200 = 0.15 × 200 = 30'),
  // #42
  q(QC.NUMERICAL_ABILITY, D.EASY, 'What is the sum of 247 and 358?', ['595', '605', '615', '585'], 1, '247 + 358 = 605. Add the ones (7+8=15, carry 1), tens (4+5+1=10, carry 1), and hundreds (2+3+1=6).'),
  // #43
  q(QC.NUMERICAL_ABILITY, D.EASY, 'What is 3/4 expressed as a decimal?', ['0.25', '0.50', '0.75', '0.80'], 2, '3/4 = 3 ÷ 4 = 0.75'),
  // #44
  q(QC.NUMERICAL_ABILITY, D.EASY, 'If a notebook costs ₱25, how much will 8 notebooks cost?', ['₱175', '₱200', '₱225', '₱250'], 1, '₱25 × 8 = ₱200'),
  // #45
  q(QC.NUMERICAL_ABILITY, D.EASY, 'What is the next number in the sequence: 5, 10, 15, 20, __?', ['22', '23', '25', '30'], 2, 'The sequence increases by 5 each time. 20 + 5 = 25.'),
  // #46
  q(QC.NUMERICAL_ABILITY, D.EASY, 'What is 1,000 minus 387?', ['613', '623', '633', '713'], 0, '1,000 - 387 = 613. Borrow from the thousands place and subtract.'),
  // #47
  q(QC.NUMERICAL_ABILITY, D.EASY, 'What is the value of 6²?', ['12', '36', '18', '24'], 1, '6² = 6 × 6 = 36'),
  // #48
  q(QC.NUMERICAL_ABILITY, D.EASY, 'If you have ₱500 and spend ₱175, how much change do you have?', ['₱225', '₱275', '₱325', '₱375'], 2, '₱500 - ₱175 = ₱325'),
  // #49
  q(QC.NUMERICAL_ABILITY, D.EASY, 'What is 50% of 84?', ['34', '42', '44', '48'], 1, '50% of 84 = 84 ÷ 2 = 42'),
  // #50
  q(QC.NUMERICAL_ABILITY, D.EASY, 'Simplify the fraction 12/16.', ['2/3', '3/4', '4/5', '6/8'], 1, '12/16 can be simplified by dividing both numerator and denominator by 4: 12÷4 = 3, 16÷4 = 4. So 12/16 = 3/4.'),
  // #51
  q(QC.NUMERICAL_ABILITY, D.EASY, 'A dozen eggs costs ₱96. How much does one egg cost?', ['₱6', '₱8', '₱10', '₱12'], 1, 'A dozen = 12 eggs. ₱96 ÷ 12 = ₱8 per egg.'),
  // #52
  q(QC.NUMERICAL_ABILITY, D.EASY, 'What is 25 × 4?', ['75', '90', '100', '125'], 2, '25 × 4 = 100'),

  // --- NUMERICAL MEDIUM (20) ---
  // #53 (existing)
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'If a product costs ₱500 and is discounted by 20%, what is the sale price?', ['₱300', '₱350', '₱400', '₱450'], 2, 'Discount = 20% of ₱500 = ₱100. Sale price = ₱500 - ₱100 = ₱400'),
  // #54
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'What is the ratio of 45 to 60 in simplest form?', ['3:4', '2:3', '4:5', '9:12'], 0, '45:60 → divide both by 15 → 3:4'),
  // #55
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'A worker earns ₱550 per day. How much does he earn in 22 working days?', ['₱10,100', '₱11,000', '₱12,100', '₱13,200'], 2, '₱550 × 22 = ₱12,100'),
  // #56
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'If 3x + 7 = 22, what is the value of x?', ['3', '5', '7', '15'], 1, '3x + 7 = 22 → 3x = 22 - 7 → 3x = 15 → x = 5'),
  // #57
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'What is the average of 78, 85, 92, 88, and 77?', ['82', '84', '86', '88'], 1, 'Average = (78 + 85 + 92 + 88 + 77) ÷ 5 = 420 ÷ 5 = 84'),
  // #58
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'A car travels 240 km using 30 liters of fuel. What is the fuel consumption rate in km per liter?', ['6 km/L', '8 km/L', '10 km/L', '12 km/L'], 1, 'Fuel consumption = 240 km ÷ 30 L = 8 km/L'),
  // #59
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'If an item is bought for ₱800 and sold for ₱1,000, what is the percentage profit?', ['20%', '25%', '30%', '35%'], 1, 'Profit = ₱1,000 - ₱800 = ₱200. Percentage profit = (200/800) × 100 = 25%'),
  // #60
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'What is the next number in the sequence: 3, 6, 12, 24, __?', ['30', '36', '48', '60'], 2, 'Each number is multiplied by 2. 24 × 2 = 48.'),
  // #61
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'A rectangular room is 8 meters long and 5 meters wide. What is its area?', ['26 m²', '30 m²', '40 m²', '45 m²'], 2, 'Area = length × width = 8 × 5 = 40 m²'),
  // #62
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'If 2/5 of a number is 30, what is the number?', ['60', '75', '80', '90'], 1, '2/5 × n = 30 → n = 30 × 5/2 = 75'),
  // #63
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'A student scored 85, 90, 78, and 92 on four tests. What score must she get on the fifth test to have an average of 87?', ['85', '87', '90', '95'], 2, 'Total needed = 87 × 5 = 435. Current total = 85 + 90 + 78 + 92 = 345. Fifth score = 435 - 345 = 90.'),
  // #64
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'What is 0.125 expressed as a fraction in lowest terms?', ['1/4', '1/8', '1/6', '1/10'], 1, '0.125 = 125/1000 = 1/8 (dividing numerator and denominator by 125).'),
  // #65
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'A shirt originally priced at ₱1,200 is on sale for 30% off. How much is the discount?', ['₱300', '₱360', '₱400', '₱420'], 1, 'Discount = 30% of ₱1,200 = 0.30 × 1,200 = ₱360'),
  // #66
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'If the perimeter of a square is 64 cm, what is the length of one side?', ['8 cm', '12 cm', '16 cm', '32 cm'], 2, 'Perimeter of a square = 4 × side. So side = 64 ÷ 4 = 16 cm.'),
  // #67
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'A man walks at 5 km/h for 3 hours. How far does he walk?', ['8 km', '12 km', '15 km', '18 km'], 2, 'Distance = Speed × Time = 5 km/h × 3 h = 15 km'),
  // #68
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'What number is 40% more than 150?', ['190', '200', '210', '220'], 2, '40% of 150 = 60. So 150 + 60 = 210.'),
  // #69
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'If a pipe can fill a tank in 6 hours, what fraction of the tank is filled in 2 hours?', ['1/4', '1/3', '1/2', '2/3'], 1, 'In 2 hours, the pipe fills 2/6 = 1/3 of the tank.'),
  // #70
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'Convert 2.5 kilometers to meters.', ['250 m', '2,500 m', '25,000 m', '25 m'], 1, '1 kilometer = 1,000 meters. So 2.5 km = 2.5 × 1,000 = 2,500 m.'),
  // #71
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'If Maria is twice as old as Juan and their combined age is 36, how old is Maria?', ['12', '18', '24', '30'], 2, 'Let Juan = x. Maria = 2x. x + 2x = 36 → 3x = 36 → x = 12. Maria = 2(12) = 24.'),
  // #72
  q(QC.NUMERICAL_ABILITY, D.MEDIUM, 'A store sells 3 pens for ₱45. How much would 10 pens cost?', ['₱120', '₱135', '₱150', '₱165'], 2, 'Price per pen = ₱45 ÷ 3 = ₱15. Cost of 10 pens = ₱15 × 10 = ₱150.'),

  // --- NUMERICAL HARD (8) ---
  // #73 (existing)
  q(QC.NUMERICAL_ABILITY, D.HARD, 'A train travels 120 km in 2 hours. If it increases its speed by 20%, how long will it take to travel 180 km?', ['2 hours', '2.5 hours', '3 hours', '3.5 hours'], 1, 'Original speed = 120km/2h = 60 km/h. New speed = 60 + (20% of 60) = 72 km/h. Time = 180/72 = 2.5 hours.'),
  // #74
  q(QC.NUMERICAL_ABILITY, D.HARD, 'A sum of money doubles itself in 8 years at simple interest. What is the rate of interest per annum?', ['10%', '12.5%', '15%', '20%'], 1, 'If the sum doubles, the interest earned equals the principal. SI = P, so P = P × R × 8/100 → 100 = 8R → R = 12.5%.'),
  // #75
  q(QC.NUMERICAL_ABILITY, D.HARD, 'Two workers can complete a job in 12 days working together. If Worker A can do it alone in 20 days, how many days would Worker B take alone?', ['25 days', '28 days', '30 days', '35 days'], 2, 'Combined rate = 1/12. A\'s rate = 1/20. B\'s rate = 1/12 - 1/20 = (5-3)/60 = 2/60 = 1/30. B takes 30 days alone.'),
  // #76
  q(QC.NUMERICAL_ABILITY, D.HARD, 'A merchant mixes 20 kg of rice at ₱40/kg with 30 kg of rice at ₱50/kg. What is the average price per kg of the mixture?', ['₱44', '₱46', '₱48', '₱50'], 1, 'Total cost = (20 × 40) + (30 × 50) = 800 + 1,500 = ₱2,300. Total weight = 50 kg. Average price = 2,300/50 = ₱46/kg.'),
  // #77
  q(QC.NUMERICAL_ABILITY, D.HARD, 'If the compound interest on a sum of ₱10,000 for 2 years at 10% per annum is:', ['₱2,000', '₱2,100', '₱2,200', '₱2,500'], 1, 'CI = P(1 + r/100)^n - P = 10,000(1.1)² - 10,000 = 10,000(1.21) - 10,000 = 12,100 - 10,000 = ₱2,100.'),
  // #78
  q(QC.NUMERICAL_ABILITY, D.HARD, 'A boat travels 24 km upstream in 6 hours and 24 km downstream in 3 hours. What is the speed of the current?', ['1 km/h', '2 km/h', '3 km/h', '4 km/h'], 1, 'Upstream speed = 24/6 = 4 km/h. Downstream speed = 24/3 = 8 km/h. Speed of current = (8-4)/2 = 2 km/h.'),
  // #79
  q(QC.NUMERICAL_ABILITY, D.HARD, 'In how many ways can 5 people be seated in a row of 5 chairs?', ['25', '60', '120', '625'], 2, 'This is a permutation problem: 5! = 5 × 4 × 3 × 2 × 1 = 120.'),
  // #80
  q(QC.NUMERICAL_ABILITY, D.HARD, 'A cylindrical tank has a radius of 7 meters and a height of 10 meters. What is its volume? (Use π = 22/7)', ['1,540 m³', '1,078 m³', '770 m³', '440 m³'], 0, 'Volume = πr²h = (22/7) × 7² × 10 = (22/7) × 49 × 10 = 22 × 70 = 1,540 m³.'),

  // ============================================================
  // ANALYTICAL ABILITY — 30 questions (9 EASY, 15 MEDIUM, 6 HARD)
  // ============================================================

  // --- ANALYTICAL EASY (9) ---
  // #81 (existing)
  q(QC.ANALYTICAL_ABILITY, D.EASY, 'Complete the sequence: 2, 4, 6, 8, __', ['9', '10', '11', '12'], 1, 'This is a sequence of even numbers increasing by 2. The next number is 10.'),
  // #82
  q(QC.ANALYTICAL_ABILITY, D.EASY, 'Which number does NOT belong in the group: 3, 6, 9, 11, 15?', ['6', '9', '11', '15'], 2, '3, 6, 9, and 15 are all multiples of 3. 11 is not a multiple of 3, so it does not belong.'),
  // #83
  q(QC.ANALYTICAL_ABILITY, D.EASY, 'If January 1 is a Monday, what day of the week is January 8?', ['Sunday', 'Monday', 'Tuesday', 'Wednesday'], 1, 'January 8 is exactly 7 days after January 1. Since a week has 7 days, January 8 is also a Monday.'),
  // #84
  q(QC.ANALYTICAL_ABILITY, D.EASY, 'Complete the pattern: A, C, E, G, __', ['H', 'I', 'J', 'K'], 1, 'The pattern skips every other letter of the alphabet: A(B)C(D)E(F)G(H)I. The next letter is I.'),
  // #85
  q(QC.ANALYTICAL_ABILITY, D.EASY, 'If all cats are animals, and Whiskers is a cat, then:', ['Whiskers might be an animal.', 'Whiskers is definitely an animal.', 'Whiskers is not an animal.', 'We cannot determine if Whiskers is an animal.'], 1, 'Since all cats are animals and Whiskers is a cat, Whiskers must definitely be an animal. This is a straightforward syllogism.'),
  // #86
  q(QC.ANALYTICAL_ABILITY, D.EASY, 'What comes next in the sequence: 1, 4, 9, 16, __?', ['20', '23', '25', '28'], 2, 'These are perfect squares: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25. The next number is 25.'),
  // #87
  q(QC.ANALYTICAL_ABILITY, D.EASY, 'Which word does NOT belong in the group: Apple, Mango, Carrot, Banana?', ['Apple', 'Mango', 'Carrot', 'Banana'], 2, 'Apple, Mango, and Banana are fruits. Carrot is a vegetable, so it does not belong.'),
  // #88
  q(QC.ANALYTICAL_ABILITY, D.EASY, 'If you face north and turn 90 degrees to the right, which direction are you facing?', ['South', 'East', 'West', 'North'], 1, 'Turning 90 degrees to the right (clockwise) from north brings you to face east.'),
  // #89
  q(QC.ANALYTICAL_ABILITY, D.EASY, 'Complete the sequence: 100, 90, 80, 70, __', ['50', '55', '60', '65'], 2, 'The sequence decreases by 10 each time. 70 - 10 = 60.'),

  // --- ANALYTICAL MEDIUM (15) ---
  // #90 (existing)
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'If all roses are flowers and some flowers are red, which statement must be true?', ['All roses are red', 'Some roses are red', 'All flowers are roses', 'None of the above must be true'], 3, 'We cannot conclude any of the first three statements with certainty from the given information.'),
  // #91
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'What is the next number in the sequence: 2, 6, 18, 54, __?', ['108', '126', '162', '180'], 2, 'Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162.'),
  // #92
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'In a code language, if FISH is written as EHRG, how is BIRD written?', ['AHQC', 'CHSE', 'AKPB', 'CKPE'], 0, 'Each letter is shifted one position backward in the alphabet: B→A, I→H, R→Q, D→C. So BIRD = AHQC.'),
  // #93
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?', ['Father', 'Uncle', 'Grandfather', 'Brother'], 1, 'A is the brother of B. B is the sister of C, so A and C are siblings. C is the father of D. Therefore, A is D\'s uncle.'),
  // #94
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'Which number should replace the question mark? 8, 11, 15, 20, 26, ?', ['31', '32', '33', '34'], 2, 'The differences are: 3, 4, 5, 6, 7. The next difference is 7. So 26 + 7 = 33.'),
  // #95
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'Statement: All teachers are graduates. Some graduates are engineers. Conclusion: Some teachers are engineers. Is this conclusion valid?', ['Definitely valid', 'Probably valid', 'Definitely invalid', 'Cannot be determined'], 3, 'The conclusion cannot be determined from the given statements. While all teachers are graduates, the graduates who are engineers may or may not include any teachers. The conclusion is possible but not certain.'),
  // #96
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'Which number does NOT belong in the series: 121, 144, 169, 200, 225?', ['144', '169', '200', '225'], 2, 'The series should be consecutive perfect squares: 11²=121, 12²=144, 13²=169, 14²=196, 15²=225. The number 200 does not belong because it is not a perfect square; it should be 196.'),
  // #97
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'A man is facing west. He turns 135 degrees clockwise. Which direction is he now facing?', ['North', 'North-West', 'North-East', 'South-East'], 2, 'Using compass bearings: West = 270°. Turning 135° clockwise: 270° + 135° = 405°. Subtract 360°: 405° - 360° = 45°, which corresponds to North-East.'),
  // #98
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'If "REASON" is coded as 5-18-1-19-15-14 (R=18, E=5, A=1, S=19, O=15, N=14), what is the code for "BRAIN"?', ['2-18-1-9-14', '2-18-1-9-13', '3-18-1-9-14', '2-19-1-9-14'], 0, 'Using the position of each letter in the alphabet: B=2, R=18, A=1, I=9, N=14. So BRAIN = 2-18-1-9-14.'),
  // #99
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'Five friends — Ana, Ben, Cara, Dan, and Eve — are sitting in a row. Ana is next to Ben. Cara is at one end. Dan is not next to Eve. If Cara is at the left end and Ben is in the middle, who is at the right end?', ['Ana', 'Dan', 'Eve', 'Cannot be determined'], 2, 'Cara is at position 1 (left end). Ben is at position 3 (middle). Ana must be next to Ben, so Ana is at position 2 or 4. Dan is not next to Eve. If Ana is at position 2: remaining are Dan and Eve at positions 4 and 5. If Dan is at 4, Eve is at 5 — Dan and Eve are next to each other (violates rule). So Dan is at 5 and Eve is at 4. But then Eve is next to Ben (pos 3), and Dan at 5 is next to Eve at 4 — again violates the rule. If Ana is at position 4: remaining are Dan and Eve at positions 2 and 5. Dan at 2 and Eve at 5 means they are not adjacent. So positions: Cara-Dan-Ben-Ana-Eve. Eve is at the right end.'),
  // #100
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'What is the next letter in the sequence: Z, X, V, T, __?', ['S', 'R', 'Q', 'P'], 1, 'The sequence goes backward in the alphabet skipping one letter each time: Z(Y)X(W)V(U)T(S)R. The next letter is R.'),
  // #101
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'Statement: "If it rains, the ground gets wet. The ground is wet." Which conclusion is valid?', ['It rained.', 'It might have rained.', 'It did not rain.', 'The ground is always wet.'], 1, 'The ground being wet does not necessarily mean it rained — something else could have caused it (e.g., a sprinkler). However, it is possible that it rained. This is the fallacy of affirming the consequent.'),
  // #102
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'Which number does NOT belong: 2, 3, 5, 7, 9, 11?', ['3', '5', '9', '11'], 2, '2, 3, 5, 7, and 11 are all prime numbers. 9 is not prime (9 = 3 × 3), so it does not belong.'),
  // #103
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'In a family, there are six members: A, B, C, D, E, and F. A and B are married. C is the son of A. D is the daughter of B. E is the brother of C. F is the mother of B. How is F related to C?', ['Mother', 'Aunt', 'Grandmother', 'Sister'], 2, 'A and B are married. C is their son. F is the mother of B. Therefore F is the grandmother of C.'),
  // #104
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM, 'Complete the series: AZ, BY, CX, DW, __?', ['EV', 'EU', 'FV', 'EX'], 0, 'The first letter goes forward (A, B, C, D, E) and the second letter goes backward (Z, Y, X, W, V). The next pair is EV.'),

  // --- ANALYTICAL HARD (6) ---
  // #105 (existing)
  q(QC.ANALYTICAL_ABILITY, D.HARD, 'In a certain code, COMPUTER is written as DPNQVUFS. How is KEYBOARD written in that code?', ['LFZCPBSE', 'LFZCPBSD', 'KEZBOARD', 'KFZCPBSE'], 0, 'Each letter is shifted one position forward in the alphabet. K→L, E→F, Y→Z, B→C, O→P, A→B, R→S, D→E.'),
  // #106
  q(QC.ANALYTICAL_ABILITY, D.HARD, 'If the day after tomorrow is Saturday, what day was it three days before yesterday?', ['Sunday', 'Monday', 'Tuesday', 'Wednesday'], 0, 'If the day after tomorrow is Saturday, then tomorrow is Friday, and today is Thursday. Yesterday was Wednesday. Three days before yesterday: Wednesday - 3 = Sunday.'),
  // #107
  q(QC.ANALYTICAL_ABILITY, D.HARD, 'What is the next number in the sequence: 1, 1, 2, 3, 5, 8, 13, __?', ['18', '20', '21', '26'], 2, 'This is the Fibonacci sequence where each number is the sum of the two preceding numbers: 8 + 13 = 21.'),
  // #108
  q(QC.ANALYTICAL_ABILITY, D.HARD, 'A cube is painted red on all faces, then cut into 27 smaller cubes of equal size. How many smaller cubes have exactly two painted faces?', ['6', '8', '12', '16'], 2, 'In a 3×3×3 cube: Corner cubes (3 painted faces) = 8, Edge cubes (2 painted faces) = 12, Face center cubes (1 painted face) = 6, Center cube (0 painted faces) = 1. Cubes with exactly 2 painted faces = 12.'),
  // #109
  q(QC.ANALYTICAL_ABILITY, D.HARD, 'Statement 1: All managers are leaders. Statement 2: All leaders are decision-makers. Statement 3: Some decision-makers are risk-takers. Which conclusion is definitely true?', ['All managers are decision-makers.', 'All managers are risk-takers.', 'Some leaders are risk-takers.', 'All decision-makers are managers.'], 0, 'From Statement 1: All managers are leaders. From Statement 2: All leaders are decision-makers. Therefore, all managers are decision-makers (transitive relationship). The other conclusions cannot be definitively drawn.'),
  // #110
  q(QC.ANALYTICAL_ABILITY, D.HARD, 'A clock shows 3:15. What is the angle between the hour and minute hands?', ['0°', '7.5°', '15°', '22.5°'], 1, 'At 3:15, the minute hand is at the 3 (90°). The hour hand has moved past 3 by 15 minutes: 3 hours = 90°, plus 15/60 × 30° = 7.5°. So the hour hand is at 97.5°. The angle between them = 97.5° - 90° = 7.5°.'),

  // ============================================================
  // GENERAL INFORMATION — 30 questions (9 EASY, 15 MEDIUM, 6 HARD)
  // ============================================================

  // --- GENERAL INFORMATION EASY (9) ---
  // #111 (existing)
  q(QC.GENERAL_INFORMATION, D.EASY, 'Who is the national hero of the Philippines?', ['Andres Bonifacio', 'Jose Rizal', 'Emilio Aguinaldo', 'Apolinario Mabini'], 1, 'Dr. Jose Rizal is recognized as the national hero of the Philippines for his peaceful advocacy for reforms.'),
  // #112
  q(QC.GENERAL_INFORMATION, D.EASY, 'What is the longest river in the Philippines?', ['Pasig River', 'Cagayan River', 'Pampanga River', 'Agusan River'], 1, 'The Cagayan River (also called Rio Grande de Cagayan) in northern Luzon is the longest river in the Philippines at approximately 505 km.'),
  // #113
  q(QC.GENERAL_INFORMATION, D.EASY, 'How many regions does the Philippines currently have?', ['15', '16', '17', '18'], 2, 'The Philippines has 17 administrative regions, including the National Capital Region (NCR) and the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM).'),
  // #114
  q(QC.GENERAL_INFORMATION, D.EASY, 'What is the Philippine national flower?', ['Sampaguita', 'Orchid', 'Sunflower', 'Rose'], 0, 'The Sampaguita (Jasminum sambac) was declared the national flower of the Philippines on February 1, 1934.'),
  // #115
  q(QC.GENERAL_INFORMATION, D.EASY, 'What branch of government is responsible for making laws in the Philippines?', ['Executive', 'Legislative', 'Judicial', 'Administrative'], 1, 'The Legislative branch, composed of the Senate and the House of Representatives (Congress), is responsible for making laws.'),
  // #116
  q(QC.GENERAL_INFORMATION, D.EASY, 'Independence Day in the Philippines is celebrated on what date?', ['June 12', 'July 4', 'August 21', 'November 30'], 0, 'Philippine Independence Day is celebrated on June 12, commemorating the declaration of independence from Spain in 1898.'),
  // #117
  q(QC.GENERAL_INFORMATION, D.EASY, 'What is the largest island in the Philippines?', ['Mindanao', 'Luzon', 'Samar', 'Palawan'], 1, 'Luzon is the largest island in the Philippines with an area of approximately 109,965 km².'),
  // #118
  q(QC.GENERAL_INFORMATION, D.EASY, 'Who wrote the Philippine national anthem "Lupang Hinirang"?', ['Jose Palma', 'Julian Felipe', 'Juan Luna', 'Marcelo del Pilar'], 1, 'Julian Felipe composed the music of the Philippine national anthem. Jose Palma wrote the Spanish lyrics.'),
  // #119
  q(QC.GENERAL_INFORMATION, D.EASY, 'What is the currency of the Philippines?', ['Peso', 'Dollar', 'Rupee', 'Ringgit'], 0, 'The Philippine Peso (₱) is the official currency of the Philippines.'),

  // --- GENERAL INFORMATION MEDIUM (15) ---
  // #120 (existing)
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'What is the capital city of the Philippines?', ['Quezon City', 'Manila', 'Cebu City', 'Davao City'], 1, 'Manila is the capital city of the Philippines, though Quezon City was the capital from 1948-1976.'),
  // #121
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'Republic Act No. 6713 is also known as:', ['Anti-Graft and Corrupt Practices Act', 'Code of Conduct and Ethical Standards for Public Officials and Employees', 'Administrative Code of 1987', 'Civil Service Law'], 1, 'RA 6713 is the "Code of Conduct and Ethical Standards for Public Officials and Employees," enacted on February 20, 1989.'),
  // #122
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'Under the 1987 Philippine Constitution, how long is the term of the President?', ['4 years', '5 years', '6 years', '7 years'], 2, 'Under the 1987 Constitution, the President serves a single term of six years with no re-election.'),
  // #123
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'What historical event is commemorated on the "EDSA People Power Revolution"?', ['The fall of the Spanish regime', 'The peaceful overthrow of the Marcos dictatorship in 1986', 'Philippine independence from America', 'The founding of the Katipunan'], 1, 'The EDSA People Power Revolution of February 1986 was a peaceful civilian-military uprising that overthrew President Ferdinand Marcos.'),
  // #124
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'Which article of the 1987 Philippine Constitution covers the Bill of Rights?', ['Article II', 'Article III', 'Article IV', 'Article V'], 1, 'Article III of the 1987 Philippine Constitution is the Bill of Rights, which enumerates the fundamental rights of Filipino citizens.'),
  // #125
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'Who was the first President of the Philippine Republic?', ['Manuel L. Quezon', 'Emilio Aguinaldo', 'Jose P. Laurel', 'Sergio Osmeña'], 1, 'Emilio Aguinaldo was the first President of the Philippine Republic (First Philippine Republic), proclaimed on January 23, 1899.'),
  // #126
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'What is the highest mountain in the Philippines?', ['Mount Pulag', 'Mount Apo', 'Mount Pinatubo', 'Mount Mayon'], 1, 'Mount Apo, located in Davao del Sur, is the highest mountain in the Philippines at 2,954 meters above sea level.'),
  // #127
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'RA 6713 requires public officials and employees to file a Statement of Assets, Liabilities, and Net Worth (SALN). When must it be filed?', ['Every month', 'Every year on or before April 30', 'Every two years', 'Only upon entering government service'], 1, 'Under RA 6713, public officials and employees must file their SALN on or before April 30 of every year.'),
  // #128
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'Which body has the power to declare the existence of a state of war in the Philippines?', ['The President alone', 'The Supreme Court', 'Congress (by a vote of 2/3 of both Houses)', 'The Armed Forces of the Philippines'], 2, 'Under the 1987 Constitution, Congress has the sole authority to declare the existence of a state of war by a vote of two-thirds of both Houses in joint session.'),
  // #129
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'The Kartilya ng Katipunan was written by:', ['Andres Bonifacio', 'Emilio Jacinto', 'Jose Rizal', 'Apolinario Mabini'], 1, 'The Kartilya ng Katipunan, the guide for the moral and civic duties of Katipunan members, was written by Emilio Jacinto.'),
  // #130
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'What type of government does the Philippines have?', ['Federal Republic', 'Constitutional Monarchy', 'Unitary Presidential Constitutional Republic', 'Parliamentary Republic'], 2, 'The Philippines has a unitary presidential constitutional republic form of government, where the President is both head of state and head of government.'),
  // #131
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'Which Philippine province is known as the "Rice Granary of the Philippines"?', ['Pampanga', 'Nueva Ecija', 'Tarlac', 'Pangasinan'], 1, 'Nueva Ecija is known as the "Rice Granary of the Philippines" due to its vast rice paddies and being the top rice-producing province.'),
  // #132
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'The Commission on Audit (COA) belongs to which category of constitutional bodies?', ['Executive Department', 'Independent Constitutional Commission', 'Legislative Agency', 'Judicial Body'], 1, 'The Commission on Audit is one of the three independent Constitutional Commissions, along with the Civil Service Commission and the Commission on Elections.'),
  // #133
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'What treaty ended the Spanish-American War and ceded the Philippines to the United States?', ['Treaty of Paris 1898', 'Treaty of Tordesillas', 'Treaty of Manila', 'Treaty of Versailles'], 0, 'The Treaty of Paris, signed on December 10, 1898, ended the Spanish-American War. Spain ceded the Philippines, Guam, and Puerto Rico to the United States for $20 million.'),
  // #134
  q(QC.GENERAL_INFORMATION, D.MEDIUM, 'Under RA 6713, which of the following is a prohibited act for public officials?', ['Attending official conferences', 'Receiving gifts with a value exceeding the prescribed limit', 'Participating in community programs', 'Filing leave applications'], 1, 'RA 6713 prohibits public officials from soliciting or receiving gifts of value in connection with their official duties beyond the limits prescribed by law.'),

  // --- GENERAL INFORMATION HARD (6) ---
  // #135
  q(QC.GENERAL_INFORMATION, D.HARD, 'What is the "Regalian Doctrine" in Philippine law?', ['All citizens are equal before the law.', 'All lands of the public domain belong to the State.', 'The President has supreme executive power.', 'Congress has the power to create laws.'], 1, 'The Regalian Doctrine, enshrined in the 1987 Constitution, states that all lands of the public domain, waters, minerals, coal, petroleum, and other natural resources belong to the State.'),
  // #136
  q(QC.GENERAL_INFORMATION, D.HARD, 'Who among the following served as President of the Philippine Commonwealth?', ['Emilio Aguinaldo', 'Manuel L. Quezon', 'Diosdado Macapagal', 'Ramon Magsaysay'], 1, 'Manuel L. Quezon was the first President of the Philippine Commonwealth, serving from 1935 until his death in exile in 1944.'),
  // #137
  q(QC.GENERAL_INFORMATION, D.HARD, 'The writ of amparo in the Philippines is a remedy available to any person whose right to life, liberty, and security is violated or threatened by an unlawful act of a public official. When was it promulgated by the Supreme Court?', ['2005', '2007', '2009', '2011'], 1, 'The Rule on the Writ of Amparo was promulgated by the Supreme Court on September 25, 2007, and took effect on October 24, 2007.'),
  // #138
  q(QC.GENERAL_INFORMATION, D.HARD, 'Under the Philippine Constitution, what is the minimum age requirement to be elected as a Senator?', ['25 years old', '30 years old', '35 years old', '40 years old'], 2, 'Under Section 3, Article VI of the 1987 Constitution, a Senator must be at least 35 years of age on the day of the election.'),
  // #139
  q(QC.GENERAL_INFORMATION, D.HARD, 'The "Malolos Constitution" of 1899 was drafted during the presidency of:', ['Jose Rizal', 'Emilio Aguinaldo', 'Andres Bonifacio', 'Manuel Quezon'], 1, 'The Malolos Constitution, the first republican constitution in Asia, was drafted during the presidency of Emilio Aguinaldo and was promulgated on January 21, 1899.'),
  // #140
  q(QC.GENERAL_INFORMATION, D.HARD, 'Section 1 of Article XI of the 1987 Philippine Constitution states that "Public office is a public _____."', ['right', 'privilege', 'trust', 'duty'], 2, 'Article XI, Section 1 states: "Public office is a public trust. Public officers and employees must at all times be accountable to the people."'),

  // ============================================================
  // CLERICAL ABILITY — 30 questions (9 EASY, 15 MEDIUM, 6 HARD)
  // ============================================================

  // --- CLERICAL EASY (9) ---
  // #141 (existing)
  q(QC.CLERICAL_ABILITY, D.EASY, 'Arrange the following names in alphabetical order: Cruz, Bautista, Dela Cruz, Aquino', ['Aquino, Bautista, Cruz, Dela Cruz', 'Aquino, Bautista, Dela Cruz, Cruz', 'Bautista, Aquino, Cruz, Dela Cruz', 'Cruz, Dela Cruz, Bautista, Aquino'], 0, 'In alphabetical order: Aquino, Bautista, Cruz, Dela Cruz. "D" comes after "C".'),
  // #142
  q(QC.CLERICAL_ABILITY, D.EASY, 'Which of the following is spelled correctly?', ['Goverment', 'Government', 'Govermnent', 'Governmant'], 1, 'The correct spelling is "Government." It contains "govern" + "ment."'),
  // #143
  q(QC.CLERICAL_ABILITY, D.EASY, 'Compare the following numbers: 4587 and 4578. Are they the same or different?', ['Same', 'Different — the last two digits are swapped', 'Different — the first digit is different', 'Different — one has an extra digit'], 1, '4587 and 4578 differ in the last two digits: 87 vs 78. The digits are transposed.'),
  // #144
  q(QC.CLERICAL_ABILITY, D.EASY, 'Which of the following names should be filed FIRST alphabetically?', ['Santos, Maria', 'Santos, Ana', 'Santos, Carmen', 'Santos, Elena'], 1, 'When last names are the same, alphabetize by first name. Ana comes before Carmen, Elena, and Maria. So "Santos, Ana" is filed first.'),
  // #145
  q(QC.CLERICAL_ABILITY, D.EASY, 'Identify the correctly spelled word:', ['Committe', 'Commitee', 'Committee', 'Comittee'], 2, 'The correct spelling is "Committee" — double "m," double "t," double "e."'),
  // #146
  q(QC.CLERICAL_ABILITY, D.EASY, 'Compare: "Department of Education" vs. "Department of Eductaion." Are they identical?', ['Yes, they are identical', 'No, the second has a misspelling', 'No, the first has a misspelling', 'Both are misspelled'], 1, 'The second phrase misspells "Education" as "Eductaion" — the letters "a" and "t" are transposed.'),
  // #147
  q(QC.CLERICAL_ABILITY, D.EASY, 'Which code corresponds to the number 7 in this key: 1=A, 2=B, 3=C, 4=D, 5=E, 6=F, 7=G, 8=H, 9=I?', ['F', 'G', 'H', 'I'], 1, 'According to the key, the number 7 corresponds to the letter G.'),
  // #148
  q(QC.CLERICAL_ABILITY, D.EASY, 'Arrange in alphabetical order: Reyes, Garcia, Lim, Tan', ['Garcia, Lim, Reyes, Tan', 'Garcia, Lim, Tan, Reyes', 'Lim, Garcia, Reyes, Tan', 'Reyes, Garcia, Lim, Tan'], 0, 'In alphabetical order: Garcia (G), Lim (L), Reyes (R), Tan (T).'),
  // #149
  q(QC.CLERICAL_ABILITY, D.EASY, 'Compare the two codes: ABC-1234 and ABC-1234. Are they the same?', ['Same', 'Different — the letters differ', 'Different — the numbers differ', 'Different — the format differs'], 0, 'Both codes are ABC-1234, which are identical.'),

  // --- CLERICAL MEDIUM (15) ---
  // #150 (existing)
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'Find the error in this address: 123 Main St., Quezon City, Metro Manilla, 1100', ['Incorrect street number', 'Misspelled "Manilla"', 'Incorrect ZIP code', 'No error'], 1, 'The correct spelling is "Manila" with one "L", not "Manilla".'),
  // #151
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'Arrange in alphabetical order: De Leon, De Guzman, Del Rosario, De Castro', ['De Castro, De Guzman, De Leon, Del Rosario', 'De Castro, De Leon, De Guzman, Del Rosario', 'De Guzman, De Castro, De Leon, Del Rosario', 'Del Rosario, De Castro, De Guzman, De Leon'], 0, 'Alphabetize by what follows "De/Del": Castro, Guzman, Leon, Rosario. Note: "Del" is treated as a unit. So the order is De Castro, De Guzman, De Leon, Del Rosario.'),
  // #152
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'Compare the following pairs and identify which is DIFFERENT: (A) 8923-4567 / 8923-4567, (B) MNOP-7890 / MNOP-7890, (C) XYZ-1234 / XYZ-1243, (D) ABCD-5678 / ABCD-5678', ['Pair A', 'Pair B', 'Pair C', 'Pair D'], 2, 'Pair C is different: XYZ-1234 vs XYZ-1243 — the last two digits are transposed (34 vs 43).'),
  // #153
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'In a filing system, under which letter would "Philippine National Bank" be filed?', ['B (for Bank)', 'N (for National)', 'P (for Philippine)', 'It depends on the system'], 2, 'In standard filing rules, organizations are filed by the first word of their name. "Philippine National Bank" is filed under P.'),
  // #154
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'Which of the following sentences has a typographical error?', ['The meeting is scheduled for March 15, 2025.', 'Please submit your report by Friady.', 'The office is located on the second floor.', 'Employees must wear proper identification.'], 1, '"Friady" is a typographical error. The correct spelling is "Friday."'),
  // #155
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'Using the code: A=1, B=2, C=3... Z=26, what is the code for "CIVIL"?', ['3-9-22-9-12', '3-9-22-12-9', '3-9-21-9-12', '3-9-22-9-11'], 0, 'C=3, I=9, V=22, I=9, L=12. So CIVIL = 3-9-22-9-12.'),
  // #156
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'How should the following be filed alphabetically? (1) San Juan, Pedro (2) San Jose, Maria (3) Santiago, Jose (4) San Miguel, Ana', ['2, 1, 4, 3', '1, 2, 4, 3', '2, 1, 3, 4', '1, 2, 3, 4'], 0, 'Filing by surname: San Jose (Jo), San Juan (Ju), San Miguel (Mi), Santiago (Sa). The correct order is 2, 1, 4, 3.'),
  // #157
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'Compare: Employee ID "EMP-2024-00847" and "EMP-2024-00847". Are they the same?', ['Same', 'Different — year is different', 'Different — last digits are different', 'Different — prefix is different'], 0, 'Both Employee IDs are "EMP-2024-00847" — they are identical.'),
  // #158
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'Which word is misspelled in this memo? "All personel are required to attend the mandatory seminar on workplace safety."', ['personel', 'mandatory', 'seminar', 'workplace'], 0, '"Personel" is misspelled. The correct spelling is "personnel" with double "n" and ending in "el."'),
  // #159
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'In alphabetical filing, which comes first?', ['MacArthur', 'Mabini', 'Macapagal', 'Mabasa'], 3, 'Alphabetical order: Mabasa (M-A-B-A), Mabini (M-A-B-I), MacArthur (M-A-C-A), Macapagal (M-A-C-A-P). "Mabasa" comes first because after "Mab," "a" comes before "i."'),
  // #160
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'If documents are numbered as follows: DOC-001, DOC-002, DOC-003... what is the document number for the 47th document?', ['DOC-047', 'DOC-47', 'DOC-0047', 'DOC-470'], 0, 'Following the 3-digit numbering pattern (DOC-001, DOC-002, ...), the 47th document is DOC-047.'),
  // #161
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'Which pair of names is NOT identical? (A) Villanueva, Rosa M. / Villanueva, Rosa M. (B) Gonzales, Roberto P. / Gonzalez, Roberto P. (C) Mendoza, Carlo J. / Mendoza, Carlo J. (D) Ramos, Andrea L. / Ramos, Andrea L.', ['Pair A', 'Pair B', 'Pair C', 'Pair D'], 1, 'Pair B is not identical: "Gonzales" vs "Gonzalez" — the last letter differs (s vs z).'),
  // #162
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'In a file coding system where the first two letters represent the department (HR=Human Resources, FN=Finance, IT=Information Technology), what department does the code "FN-2024-0892" belong to?', ['Human Resources', 'Finance', 'Information Technology', 'Administration'], 1, 'The prefix "FN" stands for Finance in the coding system.'),
  // #163
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'Proofread this sentence: "The goverment agency will release the new memorandum on Wenesday." How many errors are there?', ['1', '2', '3', '4'], 1, 'There are 2 errors: "goverment" should be "government" and "Wenesday" should be "Wednesday."'),
  // #164
  q(QC.CLERICAL_ABILITY, D.MEDIUM, 'Arrange the following file numbers in ascending order: F-109, F-98, F-1001, F-87', ['F-87, F-98, F-109, F-1001', 'F-1001, F-109, F-98, F-87', 'F-87, F-109, F-98, F-1001', 'F-98, F-87, F-109, F-1001'], 0, 'In ascending numerical order: 87, 98, 109, 1001. So the order is F-87, F-98, F-109, F-1001.'),

  // --- CLERICAL HARD (6) ---
  // #165
  q(QC.CLERICAL_ABILITY, D.HARD, 'A government office uses the filing code format: [Dept]-[Year]-[Month]-[Sequence]. Which of these codes is filed LAST chronologically?', ['ADM-2024-03-0045', 'ADM-2024-11-0012', 'ADM-2023-12-0089', 'ADM-2024-06-0078'], 1, 'Filed chronologically: 2023-12 (C), 2024-03 (A), 2024-06 (D), 2024-11 (B). ADM-2024-11-0012 comes last.'),
  // #166
  q(QC.CLERICAL_ABILITY, D.HARD, 'Compare the following sets of data and determine how many discrepancies exist:\nSet A: Juan M. Santos, 09-15-1985, EMP-4521\nSet B: Juan M. Santos, 09-15-1985, EMP-4512', ['0', '1', '2', '3'], 1, 'There is 1 discrepancy: the employee number differs — EMP-4521 vs EMP-4512 (last two digits are transposed).'),
  // #167
  q(QC.CLERICAL_ABILITY, D.HARD, 'In a cross-referencing system, Document A references B and C. Document B references D. Document C references D and E. How many documents are directly or indirectly connected to Document A?', ['2', '3', '4', '5'], 2, 'Document A connects to B and C (directly). B connects to D. C connects to D and E. Unique documents connected: B, C, D, E = 4 documents.'),
  // #168
  q(QC.CLERICAL_ABILITY, D.HARD, 'Using the code: Vowels are replaced by the next vowel (A→E, E→I, I→O, O→U, U→A) and consonants remain unchanged, encode "MANILA".', ['MENOLE', 'MENOLA', 'MENULE', 'MINOLA'], 0, 'Apply the rule to each letter: M→M (consonant), A→E (next vowel), N→N (consonant), I→O (next vowel), L→L (consonant), A→E (next vowel). Result: MENOLE.'),
  // #169
  q(QC.CLERICAL_ABILITY, D.HARD, 'A clerk must process documents in this priority: (1) Urgent & Confidential, (2) Urgent, (3) Confidential, (4) Regular. If five documents arrive: Doc A (Regular), Doc B (Urgent), Doc C (Urgent & Confidential), Doc D (Confidential), Doc E (Urgent), what is the correct processing order?', ['C, B, E, D, A', 'B, C, E, D, A', 'C, E, B, D, A', 'B, E, C, D, A'], 0, 'Following priority: (1) Doc C (Urgent & Confidential), (2) Doc B and Doc E (both Urgent — process in arrival order: B then E), (3) Doc D (Confidential), (4) Doc A (Regular). Order: C, B, E, D, A.'),
  // #170
  q(QC.CLERICAL_ABILITY, D.HARD, 'Examine the following entries for errors:\nEntry 1: Reyes, Maria C. — Brgy. 42, San Fernando, Pampanga — 2000\nEntry 2: Reyes, Maria C. — Brgy. 42, San Fernado, Pampanga — 2000\nHow many discrepancies exist between Entry 1 and Entry 2?', ['0', '1', '2', '3'], 1, 'There is 1 discrepancy: "San Fernando" vs "San Fernado" — the letter "n" is missing in "Fernando" in Entry 2.'),
];
