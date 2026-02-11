import { QuestionCategory as QC, Difficulty as D } from '@prisma/client';
import { q, SeedQuestion } from './types';

export const questionnaire5: SeedQuestion[] = [
  // =============================
  // VERBAL ABILITY (40 questions)
  // =============================

  // --- VERBAL ABILITY: EASY (12) ---

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that is most similar in meaning to "CANDID".',
    ['Deceptive', 'Honest', 'Reserved', 'Ambiguous'],
    1,
    '"Candid" means frank, open, and honest. Among the choices, "Honest" is the closest synonym.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that is most opposite in meaning to "TRANQUIL".',
    ['Peaceful', 'Turbulent', 'Serene', 'Placid'],
    1,
    '"Tranquil" means calm and peaceful. Its opposite is "Turbulent," which means chaotic or agitated.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Identify the correctly spelled word.',
    ['Acquaintence', 'Acquaintance', 'Acquantance', 'Aquaintance'],
    1,
    'The correct spelling is "Acquaintance" — note the "ai" after "qu" and the "ance" ending.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that best completes the sentence: "The manager gave a ______ speech that motivated all the employees."',
    ['boring', 'stirring', 'monotonous', 'dull'],
    1,
    '"Stirring" means exciting or inspiring, which fits the context of a speech that motivated employees.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Which sentence is grammatically correct?',
    ['She don\'t like the new policy.', 'She doesn\'t likes the new policy.', 'She doesn\'t like the new policy.', 'She don\'t likes the new policy.'],
    2,
    'With the third-person singular subject "She," the correct auxiliary is "doesn\'t" followed by the base form "like."'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that is most similar in meaning to "DILIGENT".',
    ['Lazy', 'Hardworking', 'Careless', 'Reluctant'],
    1,
    '"Diligent" means showing careful and persistent effort. "Hardworking" is the closest synonym.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'PEN is to WRITER as BRUSH is to ______.',
    ['Canvas', 'Painter', 'Color', 'Easel'],
    1,
    'A pen is a tool used by a writer; similarly, a brush is a tool used by a painter.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Which of the following words is spelled correctly?',
    ['Recomendation', 'Reccommendation', 'Recommendation', 'Recomandation'],
    2,
    'The correct spelling is "Recommendation" — one "c," two "m"s, and "-ation" ending.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that is most opposite in meaning to "GENEROUS".',
    ['Lavish', 'Bountiful', 'Stingy', 'Charitable'],
    2,
    '"Generous" means willing to give freely. Its opposite is "Stingy," meaning unwilling to spend or give.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the correct word to complete the sentence: "Each of the students ______ required to submit a report."',
    ['are', 'is', 'were', 'have been'],
    1,
    '"Each" is a singular indefinite pronoun and takes the singular verb "is." "Each of the students is required..."'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'What does the idiomatic expression "to break the ice" mean?',
    ['To cause damage', 'To start a conversation in a social setting', 'To end a friendship', 'To freeze something'],
    1,
    '"To break the ice" means to initiate conversation or ease tension in an unfamiliar social situation.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Which sentence uses the correct pronoun?',
    ['Him and I went to the office.', 'He and me went to the office.', 'He and I went to the office.', 'Him and me went to the office.'],
    2,
    'When used as subjects, the correct pronouns are "He" and "I." Therefore, "He and I went to the office" is correct.'
  ),

  // --- VERBAL ABILITY: MEDIUM (20) ---

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word that best completes the sentence: "The government\'s ______ response to the disaster was praised by international organizations."',
    ['sluggish', 'expeditious', 'negligent', 'indifferent'],
    1,
    '"Expeditious" means prompt and efficient, which fits the positive context of being praised for a quick disaster response.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'SURGEON is to SCALPEL as CARPENTER is to ______.',
    ['Wood', 'Hammer', 'House', 'Blueprint'],
    1,
    'A surgeon uses a scalpel as a primary tool; a carpenter uses a hammer as a primary tool.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "PRAGMATIC".',
    ['Idealistic', 'Practical', 'Theoretical', 'Visionary'],
    1,
    '"Pragmatic" means dealing with things in a practical, realistic way rather than following theories or ideals.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which sentence contains a grammatical error?',
    ['The committee has decided on the new policy.', 'Neither the manager nor the employees was informed.', 'The data suggest a positive trend.', 'She is one of the candidates who are qualified.'],
    1,
    'When "neither...nor" connects a singular and plural subject, the verb agrees with the nearer subject. "Employees" is plural, so the verb should be "were," not "was."'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Read the passage: "The new regulation requires all government employees to declare their assets and liabilities annually. Failure to comply may result in administrative sanctions." What is the main idea?',
    ['Government employees receive annual bonuses.', 'Asset declaration is mandatory for government employees.', 'Administrative sanctions are common in government.', 'Government employees own many assets.'],
    1,
    'The passage primarily states that government employees must declare their assets and liabilities every year, with penalties for non-compliance.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word that is most opposite in meaning to "ELOQUENT".',
    ['Articulate', 'Inarticulate', 'Fluent', 'Expressive'],
    1,
    '"Eloquent" means fluent and persuasive in speech. Its opposite is "Inarticulate," meaning unable to express ideas clearly.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which of the following sentences demonstrates correct parallel structure?',
    ['She likes hiking, to swim, and running.', 'She likes hiking, swimming, and running.', 'She likes to hike, swimming, and to run.', 'She likes hiking, swimming, and to run.'],
    1,
    'Parallel structure requires consistent grammatical forms. "Hiking, swimming, and running" are all gerunds.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What does the idiomatic expression "a blessing in disguise" mean?',
    ['A hidden curse', 'Something that seems bad but turns out to be good', 'A secret gift', 'An unexpected visitor'],
    1,
    '"A blessing in disguise" refers to something that initially appears negative but ultimately has a positive outcome.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word that best completes the sentence: "The employee\'s ______ behavior led to his termination from the agency."',
    ['exemplary', 'commendable', 'reprehensible', 'admirable'],
    2,
    '"Reprehensible" means deserving condemnation, which logically leads to termination. The other options describe positive behavior.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'FAMINE is to HUNGER as DROUGHT is to ______.',
    ['Rain', 'Thirst', 'Desert', 'Flood'],
    1,
    'Famine causes widespread hunger; drought causes widespread thirst (or water scarcity). Both are cause-and-effect relationships.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Identify the sentence with the correct use of the semicolon.',
    ['She was tired; but she continued working.', 'She was tired; she continued working.', 'She was tired; and she continued working.', 'She was tired, she continued working.'],
    1,
    'A semicolon correctly joins two independent clauses without a conjunction. "She was tired; she continued working" is correct.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "METICULOUS".',
    ['Careless', 'Thorough', 'Hasty', 'Reckless'],
    1,
    '"Meticulous" means showing great attention to detail. "Thorough" is the closest synonym.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which sentence correctly uses the subjunctive mood?',
    ['I wish I was there.', 'I wish I were there.', 'I wish I am there.', 'I wish I be there.'],
    1,
    'The subjunctive mood uses "were" after "wish" for hypothetical or contrary-to-fact situations. "I wish I were there" is correct.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Read the passage: "Republic Act No. 6713 mandates that public officials shall act with patriotism, justice, and sincerity. They must lead modest lives appropriate to their position and income." According to the passage, public officials should:',
    ['Live extravagantly to show their success', 'Maintain lifestyles consistent with their earnings', 'Focus solely on patriotism', 'Avoid interacting with the public'],
    1,
    'The passage states public officials must "lead modest lives appropriate to their position and income," meaning their lifestyle should match their earnings.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the correct word: "The report, along with the attachments, ______ submitted yesterday."',
    ['were', 'was', 'are', 'have been'],
    1,
    'The subject is "report" (singular). The phrase "along with the attachments" is a parenthetical expression and does not change the subject. The singular verb "was" is correct.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What does "to turn over a new leaf" mean?',
    ['To read a new book', 'To start behaving in a better way', 'To change jobs', 'To plant a garden'],
    1,
    '"To turn over a new leaf" means to make a fresh start or to begin acting in a better way.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the most opposite meaning of "VERBOSE".',
    ['Wordy', 'Concise', 'Lengthy', 'Detailed'],
    1,
    '"Verbose" means using more words than necessary. Its opposite is "Concise," meaning brief and to the point.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which word best completes the analogy? MANUSCRIPT is to AUTHOR as PAINTING is to ______.',
    ['Gallery', 'Critic', 'Artist', 'Museum'],
    2,
    'A manuscript is created by an author; a painting is created by an artist. Both relate a work to its creator.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the sentence that uses the correct tense consistency.',
    ['She walked to the store and buys some groceries.', 'She walks to the store and bought some groceries.', 'She walked to the store and bought some groceries.', 'She walks to the store and buy some groceries.'],
    2,
    'Tense consistency requires using the same tense throughout. "Walked" and "bought" are both past tense.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Identify the correctly spelled word.',
    ['Beauracracy', 'Bureaucracy', 'Burocracy', 'Beuracracy'],
    1,
    'The correct spelling is "Bureaucracy" — "bureau" + "cracy" (rule by offices/desks).'
  ),

  // --- VERBAL ABILITY: HARD (8) ---

  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word most similar in meaning to "OBFUSCATE".',
    ['Clarify', 'Illuminate', 'Confuse', 'Simplify'],
    2,
    '"Obfuscate" means to make unclear, confusing, or obscure. "Confuse" is the closest synonym.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Read the passage: "The principle of checks and balances ensures that no single branch of government accumulates excessive power. The legislative branch creates laws, the executive implements them, and the judiciary interprets them. Each branch can limit the powers of the others." Which of the following is the best inference from this passage?',
    ['The judicial branch is the most powerful.', 'The system prevents governmental tyranny.', 'The executive branch makes laws.', 'Checks and balances slow down governance unnecessarily.'],
    1,
    'The passage describes how each branch limits the others to prevent excessive power accumulation, which is a safeguard against tyranny.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Which sentence best demonstrates the correct use of a dangling modifier?',
    ['Walking through the park, the flowers were beautiful.', 'Walking through the park, she admired the beautiful flowers.', 'The flowers were beautiful, walking through the park.', 'Walking through the park and the flowers were beautiful.'],
    1,
    'Option B correctly attaches the modifier "Walking through the park" to the subject "she." In Option A, the modifier incorrectly attaches to "flowers."'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the correct meaning of the word "PERSPICACIOUS".',
    ['Sweating profusely', 'Having keen insight or discernment', 'Being transparent', 'Lacking confidence'],
    1,
    '"Perspicacious" means having a ready insight into and understanding of things; showing keen mental perception.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Which sentence contains a misplaced modifier?',
    ['The teacher praised the student who scored highest enthusiastically.', 'The teacher enthusiastically praised the student who scored highest.', 'Enthusiastically, the teacher praised the student who scored highest.', 'The teacher, who praised the student, scored highest.'],
    0,
    'In the first sentence, "enthusiastically" is misplaced — it seems to modify "scored highest" instead of "praised." The second and third sentences correctly place the adverb.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Read the passage: "Administrative discretion, while necessary for efficient governance, must be exercised within the bounds prescribed by law. Unbridled discretion can lead to arbitrary decision-making that undermines public trust." The author\'s primary argument is that:',
    ['Administrative discretion should be eliminated.', 'Discretion is never necessary in governance.', 'Administrative discretion must be legally constrained.', 'Public trust is impossible to maintain.'],
    2,
    'The author argues that while discretion is necessary, it must operate "within the bounds prescribed by law" — i.e., it should be legally constrained.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'EPHEMERAL is to PERMANENT as ARDUOUS is to ______.',
    ['Difficult', 'Effortless', 'Strenuous', 'Demanding'],
    1,
    '"Ephemeral" (short-lived) is the opposite of "Permanent" (lasting). Similarly, "Arduous" (difficult) is the opposite of "Effortless" (easy).'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Which of the following sentences uses "whom" correctly?',
    ['Whom is responsible for this project?', 'She is the official whom I believe is most qualified.', 'The employee whom the manager commended received a promotion.', 'Whom did you say called this morning?'],
    2,
    '"Whom" is the object form. In "The employee whom the manager commended," "whom" is the object of "commended." The manager commended whom (the employee).'
  ),

  // ===============================
  // NUMERICAL ABILITY (40 questions)
  // ===============================

  // --- NUMERICAL ABILITY: EASY (12) ---

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 3/4 + 1/8?',
    ['5/8', '7/8', '4/8', '1/2'],
    1,
    'Convert 3/4 to 6/8, then add: 6/8 + 1/8 = 7/8.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A notebook costs ₱25. How much will 12 notebooks cost?',
    ['₱250', '₱275', '₱300', '₱325'],
    2,
    '₱25 × 12 = ₱300.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 40% of 150?',
    ['45', '50', '55', '60'],
    3,
    '40% of 150 = 0.40 × 150 = 60.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If a government employee earns ₱18,000 per month, how much does he earn in a year?',
    ['₱196,000', '₱206,000', '₱216,000', '₱226,000'],
    2,
    '₱18,000 × 12 months = ₱216,000 per year.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'Simplify: 144 ÷ 12 × 3',
    ['4', '36', '12', '48'],
    1,
    'Following order of operations (left to right for multiplication and division): 144 ÷ 12 = 12, then 12 × 3 = 36.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 0.75 expressed as a fraction in lowest terms?',
    ['3/4', '7/10', '75/10', '15/20'],
    0,
    '0.75 = 75/100 = 3/4 when reduced to lowest terms.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A bag of rice weighs 25 kg. How many bags are needed for 200 kg of rice?',
    ['6', '7', '8', '9'],
    2,
    '200 ÷ 25 = 8 bags.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What number is 20% more than 50?',
    ['55', '60', '65', '70'],
    1,
    '20% of 50 = 10. So 50 + 10 = 60.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If 5 pens cost ₱75, how much do 8 pens cost?',
    ['₱100', '₱110', '₱120', '₱130'],
    2,
    'Cost per pen = ₱75 ÷ 5 = ₱15. Cost of 8 pens = ₱15 × 8 = ₱120.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is the value of 2³ + 3²?',
    ['13', '15', '17', '19'],
    2,
    '2³ = 8 and 3² = 9. Therefore 8 + 9 = 17.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A rectangular office measures 8 meters by 6 meters. What is its area?',
    ['42 sq m', '48 sq m', '54 sq m', '56 sq m'],
    1,
    'Area = length × width = 8 × 6 = 48 square meters.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'Convert 2.5 hours to minutes.',
    ['120 minutes', '130 minutes', '140 minutes', '150 minutes'],
    3,
    '2.5 hours × 60 minutes/hour = 150 minutes.'
  ),

  // --- NUMERICAL ABILITY: MEDIUM (20) ---

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A government office has a budget of ₱500,000. If 35% is allocated for salaries, how much is allocated?',
    ['₱150,000', '₱165,000', '₱175,000', '₱185,000'],
    2,
    '35% of ₱500,000 = 0.35 × ₱500,000 = ₱175,000.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If the ratio of male to female employees is 3:5 and there are 120 employees in total, how many are female?',
    ['45', '60', '72', '75'],
    3,
    'Total parts = 3 + 5 = 8. Female employees = (5/8) × 120 = 75.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'An item originally priced at ₱1,200 was first discounted by 10%, then an additional 5% off the discounted price. What is the final price?',
    ['₱1,020', '₱1,026', '₱1,008', '₱1,050'],
    1,
    'After 10% discount: ₱1,200 × 0.90 = ₱1,080. After additional 5%: ₱1,080 × 0.95 = ₱1,026.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the next number in the series: 3, 9, 27, 81, __?',
    ['162', '216', '243', '324'],
    2,
    'Each number is multiplied by 3. 81 × 3 = 243.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A car travels 240 km in 4 hours. At the same speed, how far will it travel in 7 hours?',
    ['380 km', '400 km', '420 km', '440 km'],
    2,
    'Speed = 240 ÷ 4 = 60 km/h. Distance in 7 hours = 60 × 7 = 420 km.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If a shirt costs ₱450 and the salesperson earns a 12% commission on each sale, how much commission does the salesperson earn per shirt?',
    ['₱48', '₱50', '₱54', '₱56'],
    2,
    'Commission = 12% of ₱450 = 0.12 × ₱450 = ₱54.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'Solve for x: 3x + 7 = 28',
    ['5', '6', '7', '8'],
    2,
    '3x + 7 = 28. Subtract 7: 3x = 21. Divide by 3: x = 7.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A tank can be filled in 6 hours by pipe A and 4 hours by pipe B. If both pipes are open, how long will it take to fill the tank?',
    ['2 hours', '2.4 hours', '3 hours', '3.5 hours'],
    1,
    'Rate of A = 1/6, Rate of B = 1/4. Combined = 1/6 + 1/4 = 5/12 per hour. Time = 12/5 = 2.4 hours.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A worker earns ₱650 per day. If he works 22 days in a month and saves 15% of his monthly income, how much does he save?',
    ['₱1,950', '₱2,145', '₱2,200', '₱2,350'],
    1,
    'Monthly income = ₱650 × 22 = ₱14,300. Savings = 15% × ₱14,300 = ₱2,145.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'The average score of 5 students is 82. If one student scored 70, what is the average of the remaining 4 students?',
    ['83', '84', '85', '86'],
    2,
    'Total = 5 × 82 = 410. Remaining total = 410 − 70 = 340. Average = 340 ÷ 4 = 85.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A printer can print 30 pages per minute. How many minutes will it take to print 450 pages?',
    ['12', '13', '14', '15'],
    3,
    '450 ÷ 30 = 15 minutes.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the simple interest on ₱10,000 deposited at 5% annual rate for 3 years?',
    ['₱1,000', '₱1,250', '₱1,500', '₱1,750'],
    2,
    'Simple Interest = Principal × Rate × Time = ₱10,000 × 0.05 × 3 = ₱1,500.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A store bought 50 items at ₱80 each and sold them at ₱100 each. What is the total profit?',
    ['₱800', '₱900', '₱1,000', '₱1,100'],
    2,
    'Profit per item = ₱100 − ₱80 = ₱20. Total profit = ₱20 × 50 = ₱1,000.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'Maria is 28 years old now. She is twice as old as Ana was 4 years ago. How old is Ana now?',
    ['14', '16', '18', '20'],
    2,
    'Maria is 28 and is twice as old as Ana was 4 years ago. Ana 4 years ago = 28 ÷ 2 = 14. Ana now = 14 + 4 = 18.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A mixture contains water and juice in a ratio of 2:3. If there are 15 liters of the mixture, how many liters of juice are there?',
    ['5', '6', '8', '9'],
    3,
    'Total parts = 2 + 3 = 5. Juice = (3/5) × 15 = 9 liters.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If the perimeter of a square is 64 cm, what is the area of the square?',
    ['128 sq cm', '196 sq cm', '225 sq cm', '256 sq cm'],
    3,
    'Side = 64 ÷ 4 = 16 cm. Area = 16 × 16 = 256 sq cm.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A project requires 8 workers to complete in 15 days. How many days will it take 12 workers to complete the same project?',
    ['8', '10', '12', '14'],
    1,
    'Total work = 8 × 15 = 120 worker-days. With 12 workers: 120 ÷ 12 = 10 days.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is 5/6 − 1/3?',
    ['1/6', '1/3', '1/2', '2/3'],
    2,
    'Convert 1/3 to 2/6. Then 5/6 − 2/6 = 3/6 = 1/2.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A government employee\'s salary increased from ₱20,000 to ₱23,000. What is the percentage increase?',
    ['12%', '13%', '14%', '15%'],
    3,
    'Increase = ₱23,000 − ₱20,000 = ₱3,000. Percentage = (3,000 / 20,000) × 100 = 15%.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'In a class of 40 students, 60% passed the exam. How many students failed?',
    ['14', '16', '18', '20'],
    1,
    '60% passed means 40% failed. 40% of 40 = 0.40 × 40 = 16 students failed.'
  ),

  // --- NUMERICAL ABILITY: HARD (8) ---

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A sum of ₱50,000 is invested at 8% per annum compound interest, compounded annually. What is the amount after 2 years?',
    ['₱56,000', '₱57,500', '₱58,320', '₱59,000'],
    2,
    'A = P(1 + r)^n = 50,000(1.08)² = 50,000 × 1.1664 = ₱58,320.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'Two trains start from the same station traveling in opposite directions at 60 km/h and 80 km/h respectively. After how many hours will they be 490 km apart?',
    ['2.5 hours', '3 hours', '3.5 hours', '4 hours'],
    2,
    'Combined speed = 60 + 80 = 140 km/h. Time = 490 ÷ 140 = 3.5 hours.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A father is 4 times as old as his son. In 16 years, the father will be twice as old as his son. How old is the son now?',
    ['6', '8', '10', '12'],
    1,
    'Let son = x, father = 4x. In 16 years: 4x + 16 = 2(x + 16). 4x + 16 = 2x + 32. 2x = 16. x = 8.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A merchant mixes 20 kg of rice at ₱45/kg with 30 kg of rice at ₱55/kg. What is the price per kg of the mixture?',
    ['₱49', '₱50', '₱51', '₱52'],
    2,
    'Total cost = (20 × 45) + (30 × 55) = 900 + 1,650 = ₱2,550. Price per kg = 2,550 ÷ 50 = ₱51.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A boat travels 36 km upstream in 6 hours and 36 km downstream in 3 hours. What is the speed of the current?',
    ['1 km/h', '2 km/h', '3 km/h', '4 km/h'],
    2,
    'Upstream speed = 36/6 = 6 km/h. Downstream speed = 36/3 = 12 km/h. Speed of current = (12 − 6) / 2 = 3 km/h.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'Three pipes A, B, and C can fill a tank in 12, 15, and 20 hours respectively. If all three are opened simultaneously, how long will it take to fill the tank?',
    ['4 hours', '5 hours', '6 hours', '7 hours'],
    1,
    'Rate = 1/12 + 1/15 + 1/20 = 5/60 + 4/60 + 3/60 = 12/60 = 1/5. Time = 5 hours.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A sum of money doubles itself in 10 years at simple interest. What is the rate of interest per annum?',
    ['5%', '8%', '10%', '12%'],
    2,
    'If P doubles, then Interest = P. SI = P × R × T / 100. P = P × R × 10 / 100. 100 = 10R. R = 10%.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'In a survey of 200 government employees, 120 use public transport, 90 use private vehicles, and 30 use both. How many employees use neither public transport nor private vehicles?',
    ['10', '15', '20', '25'],
    2,
    'Using inclusion-exclusion: Those who use at least one = 120 + 90 − 30 = 180. Neither = 200 − 180 = 20.'
  ),

  // =================================
  // ANALYTICAL ABILITY (30 questions)
  // =================================

  // --- ANALYTICAL ABILITY: EASY (9) ---

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Complete the series: 5, 10, 20, 40, __',
    ['60', '70', '80', '90'],
    2,
    'Each number is doubled: 5×2=10, 10×2=20, 20×2=40, 40×2=80.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Which one does not belong in the group?',
    ['Dog', 'Cat', 'Eagle', 'Rabbit'],
    2,
    'Dog, Cat, and Rabbit are mammals, while Eagle is a bird. Eagle does not belong in the group.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If APPLE is coded as 15523, what is the code for ALE?',
    ['123', '153', '132', '135'],
    0,
    'From APPLE (A-P-P-L-E = 1-5-5-2-3): A=1, P=5, L=2, E=3. Therefore ALE = A(1), L(2), E(3) = 123.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'All teachers are educated. Maria is a teacher. Therefore:',
    ['Maria is not educated.', 'Maria is educated.', 'All educated people are teachers.', 'Maria may or may not be educated.'],
    1,
    'This is a basic syllogism. If all teachers are educated and Maria is a teacher, then Maria must be educated.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Complete the series: Z, X, V, T, __',
    ['S', 'R', 'Q', 'P'],
    1,
    'The series goes backward in the alphabet, skipping one letter each time: Z, (Y), X, (W), V, (U), T, (S), R.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If you face North and turn 90 degrees clockwise, which direction are you facing?',
    ['South', 'East', 'West', 'Northwest'],
    1,
    'Turning 90 degrees clockwise from North takes you to East.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Which of the following is the odd one out?',
    ['Triangle', 'Square', 'Circle', 'Rectangle'],
    2,
    'Triangle, Square, and Rectangle all have straight sides and angles. Circle has no straight sides or angles.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If the day after tomorrow is Thursday, what day is today?',
    ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    1,
    'If the day after tomorrow is Thursday, then tomorrow is Wednesday, and today is Tuesday.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Complete the pattern: 1, 4, 9, 16, 25, __',
    ['30', '33', '36', '49'],
    2,
    'These are perfect squares: 1², 2², 3², 4², 5². The next is 6² = 36.'
  ),

  // --- ANALYTICAL ABILITY: MEDIUM (15) ---

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Statement: All civil servants are citizens. Some citizens are voters. Conclusion: Some civil servants are voters. Which is correct?',
    ['The conclusion definitely follows.', 'The conclusion definitely does not follow.', 'The conclusion may or may not follow.', 'More information is needed to determine.'],
    2,
    'While all civil servants are citizens, we only know SOME citizens are voters. We cannot determine with certainty whether any of those voter-citizens are also civil servants. The conclusion may or may not be true.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Find the next number in the series: 2, 6, 12, 20, 30, __',
    ['38', '40', '42', '44'],
    2,
    'Differences: 4, 6, 8, 10. The differences increase by 2 each time. Next difference = 12. So 30 + 12 = 42.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a certain code language, if CAT = 24 and DOG = 26, what is the value of PIG?',
    ['26', '28', '30', '32'],
    3,
    'Each word\'s value is the sum of its letter positions: C(3)+A(1)+T(20)=24, D(4)+O(15)+G(7)=26. So PIG = P(16)+I(9)+G(7) = 32.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'A is the father of B. B is the sister of C. D is the husband of C. What is A to D?',
    ['Father', 'Father-in-law', 'Brother-in-law', 'Uncle'],
    1,
    'A is B\'s father. B is C\'s sister, so A is also C\'s father. D is C\'s husband. Therefore, A is D\'s father-in-law.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If "+" means "−", "−" means "×", "×" means "÷", and "÷" means "+", what is the value of 12 − 4 × 2 ÷ 8 + 3?',
    ['27', '29', '31', '33'],
    1,
    'Replacing symbols: 12 × 4 ÷ 2 + 8 − 3 = (12 × 4) ÷ 2 + 8 − 3 = 48 ÷ 2 + 8 − 3 = 24 + 8 − 3 = 29.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Five friends — Ana, Ben, Cora, Dan, and Ella — sit in a row. Ana sits at one end. Ben sits next to Cora. Dan does not sit next to Ella. If Cora sits in the middle, who sits at the other end?',
    ['Ben', 'Dan', 'Ella', 'Cannot be determined'],
    2,
    'Cora is in position 3 (middle). Ben sits next to Cora, so Ben is in position 2 or 4. Ana is at one end (position 1 or 5). Dan does not sit next to Ella. If Ana is at position 1 and Ben is at position 2, then positions 4 and 5 have Dan and Ella. Dan cannot be next to Ella. But positions 4 and 5 are adjacent, so this fails. So Ben must be at position 4. Positions 2 and 5 have Dan and Ella. Dan next to Ella would only happen if they\'re adjacent. Position 2 is next to 1 and 3, position 5 is at the end. They are not adjacent. So Dan=2, Ella=5 or Dan=5, Ella=2. Either way works. But if Ana=1, Ben=4, Cora=3, Dan=2, Ella=5 — Ella is at the other end.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Which letter comes next in the series: A, C, F, J, O, __',
    ['T', 'U', 'V', 'W'],
    1,
    'Gaps between letters: +2, +3, +4, +5. Next gap = +6. O (15th letter) + 6 = U (21st letter).'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Statement 1: No politicians are honest. Statement 2: All honest people are respected. Conclusion: No politicians are respected. Is this valid?',
    ['Valid', 'Invalid', 'Partially valid', 'Cannot be determined'],
    1,
    'Even though no politicians are honest, they could still be respected for reasons other than honesty. The conclusion does not necessarily follow.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'A clock shows 3:15. What is the angle between the hour and minute hands?',
    ['0°', '7.5°', '15°', '22.5°'],
    1,
    'At 3:15, the minute hand is at 90° (pointing at 3). The hour hand has moved past 3 by 15 minutes × 0.5°/min = 7.5°. So the hour hand is at 97.5°. Angle between them = 97.5° − 90° = 7.5°.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If January 1 of a certain year falls on a Monday, on what day will March 1 fall? (Non-leap year)',
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    3,
    'January has 31 days, February has 28 days (non-leap). Days from Jan 1 to Mar 1 = 31 + 28 = 59 days. 59 ÷ 7 = 8 weeks and 3 days. So March 1 is 3 days after Monday = Thursday.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a group of 60 people, 35 speak Filipino, 25 speak English, and 10 speak both. How many speak only Filipino?',
    ['20', '25', '30', '35'],
    1,
    'Only Filipino = Total Filipino − Both = 35 − 10 = 25.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Which of the following conclusions can be drawn from the statements? Statement 1: All managers attend meetings. Statement 2: Jose attends meetings.',
    ['Jose is a manager.', 'Jose is not a manager.', 'Jose may or may not be a manager.', 'No conclusion can be drawn.'],
    2,
    'All managers attend meetings, but not all who attend meetings are necessarily managers. Jose attends meetings, but we cannot confirm if he is a manager. He may or may not be one.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Find the missing number: 3, 5, 9, 15, 23, __',
    ['31', '33', '35', '37'],
    1,
    'Differences: 2, 4, 6, 8. Next difference = 10. So 23 + 10 = 33.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Tom is taller than Jerry. Sam is shorter than Jerry but taller than Pat. Who is the shortest?',
    ['Tom', 'Jerry', 'Sam', 'Pat'],
    3,
    'Order from tallest to shortest: Tom > Jerry > Sam > Pat. Pat is the shortest.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If the word LEADER is written as OHDGHU using a certain code, what code is used?',
    ['Each letter is shifted forward by 2', 'Each letter is shifted forward by 3', 'Each letter is shifted backward by 2', 'Each letter is replaced by its reverse alphabet'],
    1,
    'L→O (+3), E→H (+3), A→D (+3), D→G (+3), E→H (+3), R→U (+3). Each letter is shifted forward by 3 positions.'
  ),

  // --- ANALYTICAL ABILITY: HARD (6) ---

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Six people — P, Q, R, S, T, and U — are seated around a circular table. P is between T and U. Q is opposite to T. R is to the left of Q. Who is opposite to P?',
    ['Q', 'R', 'S', 'U'],
    1,
    'In a circular arrangement with 6 seats: If P is between T and U, place T-P-U consecutively. Q is opposite T. The remaining seats have R and S. R is to the left of Q. Working out the positions: T, P, U, then opposite T is Q. R is to Q\'s left, and S fills the remaining seat. P is opposite R.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'A cube has all its faces painted red. It is then cut into 64 smaller equal cubes. How many smaller cubes have exactly two faces painted?',
    ['16', '20', '24', '28'],
    2,
    'A cube cut into 64 pieces means 4 cuts per side (4×4×4). Edge cubes (not corners) have 2 faces painted. Each edge has 4−2=2 such cubes. A cube has 12 edges. Total = 12 × 2 = 24.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Statement 1: Some teachers are writers. Statement 2: All writers are readers. Statement 3: Some readers are athletes. Which conclusion is definitely true?',
    ['Some teachers are readers.', 'All teachers are athletes.', 'Some athletes are writers.', 'No teachers are athletes.'],
    0,
    'Some teachers are writers (S1), and all writers are readers (S2). Therefore, some teachers (those who are writers) must also be readers. The other conclusions cannot be definitively drawn.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Find the next number: 1, 1, 2, 3, 5, 8, 13, 21, __',
    ['26', '29', '34', '42'],
    2,
    'This is the Fibonacci sequence where each number is the sum of the two preceding numbers. 13 + 21 = 34.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'In a family, there are 6 members: A, B, C, D, E, and F. A and B are a married couple. A is the father. C is the son of A. D is the sister of C. E is the brother of A. F is the daughter of E. What is the relationship of F to D?',
    ['Sister', 'Cousin', 'Niece', 'Aunt'],
    1,
    'A is the father, married to B. C is A\'s son, D is A\'s daughter (C\'s sister). E is A\'s brother (uncle to C and D). F is E\'s daughter. So F and D are cousins (children of siblings A and E).'
  ),

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'A man walks 3 km North, then 4 km East, then 3 km South, and finally 2 km West. How far is he from his starting point and in which direction?',
    ['2 km East', '2 km West', '5 km Northeast', '7 km East'],
    0,
    'North-South: 3 km N − 3 km S = 0 (back to original latitude). East-West: 4 km E − 2 km W = 2 km East. He is exactly 2 km East of the starting point.'
  ),

  // ====================================
  // GENERAL INFORMATION (30 questions)
  // ====================================

  // --- GENERAL INFORMATION: EASY (9) ---

  q(QC.GENERAL_INFORMATION, D.EASY,
    'What are the three branches of the Philippine government?',
    ['Legislative, Executive, Judicial', 'Legislative, Military, Executive', 'Executive, Judicial, Electoral', 'Legislative, Judicial, Administrative'],
    0,
    'The Philippine government has three co-equal branches: Legislative (makes laws), Executive (implements laws), and Judicial (interprets laws).'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'Who wrote the Philippine national anthem "Lupang Hinirang"?',
    ['Jose Palma', 'Julian Felipe', 'Juan Luna', 'Marcelo del Pilar'],
    1,
    'Julian Felipe composed the music of the Philippine national anthem. Jose Palma wrote the Spanish lyrics "Filipinas" which was later translated to "Lupang Hinirang."'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'Which body of water lies to the west of the Philippines?',
    ['Pacific Ocean', 'West Philippine Sea', 'Celebes Sea', 'Sulu Sea'],
    1,
    'The West Philippine Sea (part of the South China Sea) lies to the west of the Philippines.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the highest mountain in the Philippines?',
    ['Mount Pulag', 'Mount Apo', 'Mount Pinatubo', 'Mount Mayon'],
    1,
    'Mount Apo in Davao del Sur is the highest mountain in the Philippines, standing at approximately 2,954 meters above sea level.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'Republic Act No. 6713 is also known as:',
    ['Anti-Graft and Corrupt Practices Act', 'Code of Conduct and Ethical Standards for Public Officials and Employees', 'Administrative Code of the Philippines', 'Civil Service Law'],
    1,
    'RA 6713 is the "Code of Conduct and Ethical Standards for Public Officials and Employees," which outlines ethical standards for government service.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the basic unit of life?',
    ['Atom', 'Cell', 'Molecule', 'Organ'],
    1,
    'The cell is the basic structural and functional unit of all living organisms.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'How many regions does the Philippines currently have?',
    ['15', '16', '17', '18'],
    2,
    'The Philippines has 17 administrative regions, including the National Capital Region (NCR) and the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM).'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'Who is known as the "Brains of the Revolution"?',
    ['Andres Bonifacio', 'Apolinario Mabini', 'Emilio Aguinaldo', 'Antonio Luna'],
    1,
    'Apolinario Mabini is known as the "Brains of the Revolution" and the "Sublime Paralytic." He served as the first Prime Minister of the Philippines.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'What gas do plants absorb from the atmosphere during photosynthesis?',
    ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    2,
    'Plants absorb carbon dioxide (CO₂) during photosynthesis and convert it into glucose and oxygen using sunlight.'
  ),

  // --- GENERAL INFORMATION: MEDIUM (15) ---

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Under RA 6713, public officials must submit their Statement of Assets, Liabilities, and Net Worth (SALN) on or before:',
    ['January 31', 'March 31', 'April 30', 'June 30'],
    2,
    'Under RA 6713, public officials and employees must file their SALN on or before April 30 of every year.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Article of the 1987 Philippine Constitution deals with the Bill of Rights?',
    ['Article II', 'Article III', 'Article IV', 'Article VI'],
    1,
    'Article III of the 1987 Philippine Constitution is the Bill of Rights, which guarantees the fundamental rights of Filipino citizens.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The EDSA People Power Revolution occurred in what year?',
    ['1983', '1984', '1986', '1989'],
    2,
    'The EDSA People Power Revolution took place in February 1986, which led to the ouster of President Ferdinand Marcos and the installation of President Corazon Aquino.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which government agency is primarily responsible for the conservation and management of the country\'s environment and natural resources?',
    ['DOST', 'DENR', 'DA', 'DILG'],
    1,
    'The Department of Environment and Natural Resources (DENR) is the primary government agency responsible for environmental conservation and natural resource management.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the term of office of a Philippine Senator?',
    ['3 years', '4 years', '6 years', '9 years'],
    2,
    'Philippine Senators serve a term of 6 years and can be re-elected for one consecutive term, as provided by the 1987 Constitution.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The Kartilya ng Katipunan was written by:',
    ['Andres Bonifacio', 'Emilio Jacinto', 'Jose Rizal', 'Marcelo H. del Pilar'],
    1,
    'The Kartilya ng Katipunan was written by Emilio Jacinto, known as the "Brains of the Katipunan." It served as the moral guide for Katipunan members.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which planet is known as the "Red Planet"?',
    ['Jupiter', 'Venus', 'Mars', 'Saturn'],
    2,
    'Mars is known as the "Red Planet" because of the iron oxide (rust) on its surface, which gives it a reddish appearance.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What does the principle of "public office is a public trust" mean under the Philippine Constitution?',
    ['Government officials own their offices.', 'Public officials must serve the people with accountability, integrity, and loyalty.', 'Public offices can be bought and sold.', 'Government employees have absolute power.'],
    1,
    'Article XI, Section 1 of the 1987 Constitution states that public office is a public trust, meaning officials must serve with utmost responsibility, integrity, loyalty, and efficiency.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Filipino painter is famous for the painting "Spoliarium"?',
    ['Fernando Amorsolo', 'Juan Luna', 'Felix Resurreccion Hidalgo', 'Carlos Francisco'],
    1,
    'Juan Luna painted the "Spoliarium" in 1884, which won a gold medal at the Exposición Nacional de Bellas Artes in Madrid, Spain.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The greenhouse effect is primarily caused by:',
    ['Ozone depletion', 'Trapping of heat by atmospheric gases', 'Volcanic eruptions', 'Solar radiation increase'],
    1,
    'The greenhouse effect occurs when certain gases in the atmosphere (like CO₂, methane) trap heat from the sun, warming Earth\'s surface.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Philippine president established the Commonwealth of the Philippines in 1935?',
    ['Emilio Aguinaldo', 'Manuel L. Quezon', 'Sergio Osmeña', 'Jose P. Laurel'],
    1,
    'Manuel L. Quezon became the first President of the Commonwealth of the Philippines, established on November 15, 1935, under the Tydings-McDuffie Act.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the primary purpose of the Commission on Audit (COA)?',
    ['To prosecute corrupt officials', 'To examine and audit government revenues and expenditures', 'To create national budgets', 'To collect taxes'],
    1,
    'The Commission on Audit (COA) is the supreme audit institution mandated to examine, audit, and settle all accounts pertaining to government revenues and expenditures.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which natural disaster is measured using the Richter Scale?',
    ['Typhoon', 'Earthquake', 'Tsunami', 'Volcanic eruption'],
    1,
    'The Richter Scale measures the magnitude (energy released) of earthquakes. It was developed by Charles F. Richter in 1935.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The concept of "bayanihan" in Filipino culture refers to:',
    ['A festive celebration', 'A community spirit of cooperation', 'A form of martial arts', 'A type of traditional clothing'],
    1,
    '"Bayanihan" embodies the Filipino spirit of communal unity and cooperation, traditionally exemplified by community members helping a neighbor move their house.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which international agreement aims to combat climate change by limiting global temperature increase?',
    ['Kyoto Protocol', 'Paris Agreement', 'Montreal Protocol', 'Geneva Convention'],
    1,
    'The Paris Agreement (2015) aims to limit global temperature increase to well below 2°C above pre-industrial levels, with efforts to limit it to 1.5°C.'
  ),

  // --- GENERAL INFORMATION: HARD (6) ---

  q(QC.GENERAL_INFORMATION, D.HARD,
    'Under the 1987 Philippine Constitution, what is the maximum number of terms a member of the House of Representatives can serve consecutively?',
    ['Two terms', 'Three terms', 'Four terms', 'No term limit'],
    1,
    'Article VI, Section 7 of the 1987 Constitution states that members of the House of Representatives shall serve for three years and shall not serve for more than three consecutive terms.'
  ),

  q(QC.GENERAL_INFORMATION, D.HARD,
    'Which provision of RA 6713 prohibits public officials from having financial or material interest in any transaction requiring the approval of their office?',
    ['Section 3(a) - Fidelity to public interest', 'Section 3(h) - Conflict of interest', 'Section 7(a) - Prohibited acts and transactions', 'Section 8 - Statements and Disclosure'],
    2,
    'Section 7(a) of RA 6713 specifically prohibits public officials and employees from having financial or material interest in transactions requiring approval of their office.'
  ),

  q(QC.GENERAL_INFORMATION, D.HARD,
    'The Comprehensive Agrarian Reform Program (CARP) was established under which Republic Act?',
    ['RA 6389', 'RA 6657', 'RA 7160', 'RA 8371'],
    1,
    'RA 6657, also known as the Comprehensive Agrarian Reform Law (CARL), was signed into law on June 10, 1988, under President Corazon Aquino, establishing CARP.'
  ),

  q(QC.GENERAL_INFORMATION, D.HARD,
    'What is the significance of the Malolos Constitution in Philippine history?',
    ['It was the first democratic constitution in Asia.', 'It established American rule in the Philippines.', 'It was drafted during the Japanese occupation.', 'It created the Commonwealth government.'],
    0,
    'The Malolos Constitution (1899) was the first democratic constitution in Asia, establishing the First Philippine Republic under Emilio Aguinaldo.'
  ),

  q(QC.GENERAL_INFORMATION, D.HARD,
    'In environmental science, what is "biomagnification"?',
    ['The increase of pollutant concentrations through the food chain', 'The process of biodegradation', 'The growth of organisms in polluted environments', 'The use of organisms to clean up pollution'],
    0,
    'Biomagnification is the process by which the concentration of toxic substances increases at each successive trophic level in the food chain, becoming more concentrated in top predators.'
  ),

  q(QC.GENERAL_INFORMATION, D.HARD,
    'Which constitutional commission has the power to decide all cases involving the legality of any tax, fee, or assessment?',
    ['Commission on Audit', 'Commission on Elections', 'Civil Service Commission', 'Court of Tax Appeals'],
    3,
    'The Court of Tax Appeals (CTA), while not a constitutional commission itself, has exclusive appellate jurisdiction over cases involving taxes, fees, and assessments. Note: COA audits government finances, while CTA handles tax disputes.'
  ),

  // ================================
  // CLERICAL ABILITY (30 questions)
  // ================================

  // --- CLERICAL ABILITY: EASY (9) ---

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Arrange the following names in alphabetical order: 1) Santos, 2) Reyes, 3) Torres, 4) Mendoza',
    ['4, 2, 1, 3', '2, 4, 1, 3', '4, 2, 3, 1', '2, 1, 4, 3'],
    0,
    'Alphabetical order: Mendoza (4), Reyes (2), Santos (1), Torres (3). The correct sequence is 4, 2, 1, 3.'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which of the following numbers is the same as 4,587?',
    ['4,578', '4,857', '4,587', '4,758'],
    2,
    'Only option C (4,587) exactly matches the given number 4,587.'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which word is spelled incorrectly?',
    ['Necessary', 'Separate', 'Definately', 'Occurrence'],
    2,
    '"Definately" is misspelled. The correct spelling is "Definitely."'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'File the following names alphabetically. Which name comes FIRST? Garcia, Roberto; Garcia, Ramon; Garcia, Ricardo; Garcia, Rafael',
    ['Garcia, Roberto', 'Garcia, Ramon', 'Garcia, Ricardo', 'Garcia, Rafael'],
    3,
    'All share "Garcia" as surname. Comparing first names alphabetically: Rafael, Ramon, Ricardo, Roberto. Garcia, Rafael comes first.'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Compare the two codes: Code A: XJ-4429-PH / Code B: XJ-4429-PH. Are they the same?',
    ['Same', 'Different — the letters differ', 'Different — the numbers differ', 'Different — both letters and numbers differ'],
    0,
    'Both codes are identical: XJ-4429-PH. They are the same.'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which of the following addresses matches exactly? Target: 256 Rizal Ave., Sta. Cruz, Manila\nA) 256 Rizal Ave., Sta. Cruz, Manila\nB) 265 Rizal Ave., Sta. Cruz, Manila\nC) 256 Rizal Ave., Sta. Cruz, Manilla\nD) 256 Rizal St., Sta. Cruz, Manila',
    ['A', 'B', 'C', 'D'],
    0,
    'Only option A (256 Rizal Ave., Sta. Cruz, Manila) matches the target exactly. B has wrong number (265), C misspells Manila, D has "St." instead of "Ave."'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'What comes next when filing numerically? 1023, 1024, 1025, __',
    ['1026', '1030', '1027', '1025'],
    0,
    'The numbers are in consecutive order. After 1025, the next number is 1026.'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Identify the error in this sentence: "The employe submitted his daily time record on time."',
    ['The word "submitted" is misspelled.', 'The word "employe" should be "employee."', 'The word "record" is misspelled.', 'There is no error.'],
    1,
    '"Employe" is missing the final "e." The correct spelling is "employee."'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Under which letter group would the file for "Department of Education" be placed?',
    ['D', 'E', 'O', 'F'],
    0,
    'When filing by organization name, "Department of Education" is filed under "D" for "Department." Articles and prepositions ("of") are not considered for primary filing.'
  ),

  // --- CLERICAL ABILITY: MEDIUM (15) ---

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Compare the two entries:\nEntry A: Villanueva, Maria C. — Employee No. 2019-0347\nEntry B: Villanueva, Maria C. — Employee No. 2019-0374\nWhat is the discrepancy?',
    ['The names are different.', 'The employee numbers are different.', 'Both the names and numbers are different.', 'There is no discrepancy.'],
    1,
    'The names are identical, but the employee numbers differ: 2019-0347 vs. 2019-0374. The last two digits are transposed.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Arrange the following file numbers in ascending order: 3-1478, 3-1487, 3-1468, 3-1498',
    ['3-1478, 3-1487, 3-1468, 3-1498', '3-1468, 3-1478, 3-1487, 3-1498', '3-1498, 3-1487, 3-1478, 3-1468', '3-1468, 3-1487, 3-1478, 3-1498'],
    1,
    'In ascending order: 3-1468, 3-1478, 3-1487, 3-1498.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following pairs contains entries that are NOT identical?\nA) BN-7834-QRS / BN-7834-QRS\nB) FK-2190-MNP / FK-2190-MPN\nC) TL-5567-ABC / TL-5567-ABC\nD) WR-8812-XYZ / WR-8812-XYZ',
    ['Pair A', 'Pair B', 'Pair C', 'Pair D'],
    1,
    'Pair B is not identical: FK-2190-MNP vs. FK-2190-MPN. The last three letters differ (MNP vs. MPN — the N and P are swapped).'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A government form requires the date format DD/MM/YYYY. Which of the following correctly represents February 14, 2025?',
    ['02/14/2025', '14/02/2025', '2025/02/14', '14-02-2025'],
    1,
    'In DD/MM/YYYY format, February 14, 2025 is written as 14/02/2025.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Five documents need to be filed. Their reference numbers are: R-2024-089, R-2024-078, R-2024-095, R-2024-082, R-2024-091. What is the correct ascending order?',
    ['078, 082, 089, 091, 095', '095, 091, 089, 082, 078', '078, 089, 082, 091, 095', '082, 078, 089, 095, 091'],
    0,
    'In ascending numerical order: R-2024-078, R-2024-082, R-2024-089, R-2024-091, R-2024-095.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Proofread the following sentence and identify the error: "The commitee will convene on Wednesday to discuss the new policy."',
    ['The word "convene" is misspelled.', 'The word "commitee" should be "committee."', 'The word "Wednesday" is misspelled.', 'There is no error.'],
    1,
    '"Commitee" is missing one "t." The correct spelling is "committee" (double "m" and double "t").'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'If a classification system uses the following codes — A for Administrative, B for Budget, C for Correspondence, D for Disbursement — under which code should a letter from another agency be filed?',
    ['A', 'B', 'C', 'D'],
    2,
    'A letter from another agency is a form of correspondence. It should be filed under code C for Correspondence.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Compare the two Social Security numbers:\nSSS A: 34-2876591-4\nSSS B: 34-2876519-4\nWhat is the difference?',
    ['The first segment differs.', 'The middle segment differs.', 'The last segment differs.', 'They are identical.'],
    1,
    'The middle segments differ: 2876591 vs. 2876519. The digits "91" and "19" are transposed near the end.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following names should be filed LAST alphabetically?\nA) De Leon, Patricia\nB) Delos Santos, Mark\nC) De Guzman, Anna\nD) Del Rosario, Jose',
    ['De Leon, Patricia', 'Delos Santos, Mark', 'De Guzman, Anna', 'Del Rosario, Jose'],
    1,
    'Filing alphabetically by surname: De Guzman, De Leon, Del Rosario, Delos Santos. "Delos Santos" comes last because "Delos" alphabetically follows "Del R" and "De L".'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A memo contains the following text: "All personel are required to attend the traning seminar." How many spelling errors are there?',
    ['0', '1', '2', '3'],
    2,
    'There are 2 spelling errors: "personel" should be "personnel" and "traning" should be "training."'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Verify the following data entry:\nOriginal: Juan S. Dela Cruz, 45, Male, Quezon City\nEncoded: Juan S. Dela Cruz, 45, Male, Quezon City\nIs the data entry correct?',
    ['No, the name is wrong.', 'No, the age is wrong.', 'No, the city is wrong.', 'Yes, it is correct.'],
    3,
    'The encoded entry exactly matches the original data: Juan S. Dela Cruz, 45, Male, Quezon City. The data entry is correct.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'In a coding system, "Approved" = 1, "Pending" = 2, "Denied" = 3, "Under Review" = 4. A document marked "UR" should be coded as:',
    ['1', '2', '3', '4'],
    3,
    '"UR" stands for "Under Review," which is coded as 4.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following ZIP codes matches Makati City (correct ZIP: 1200)?',
    ['1020', '1200', '1210', '1220'],
    1,
    'The correct ZIP code for Makati City is 1200. Only option B matches.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Identify which pair of numbers is NOT identical:\nA) 78234156 / 78234156\nB) 94501287 / 94501287\nC) 63178420 / 63178402\nD) 25609813 / 25609813',
    ['Pair A', 'Pair B', 'Pair C', 'Pair D'],
    2,
    'Pair C is not identical: 63178420 vs. 63178402. The last three digits differ (420 vs. 402 — the 2 and 0 are transposed).'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A form requires the field "Full Name (Last, First, Middle Initial)." Which is the correct format for Maria Santos Cruz?',
    ['Maria Santos Cruz', 'Cruz, Maria S.', 'Santos, Maria C.', 'Cruz, Maria Santos'],
    1,
    'Assuming "Cruz" is the last name and "Santos" is the middle name: the correct format is "Cruz, Maria S." (Last name, First name, Middle Initial).'
  ),

  // --- CLERICAL ABILITY: HARD (6) ---

  q(QC.CLERICAL_ABILITY, D.HARD,
    'A document tracking system uses the format: [Department Code]-[Year]-[Sequential Number]-[Priority Level]. If the HR Department (code: HR) receives its 156th document in 2025 with high priority (H), what is the correct tracking code?',
    ['HR-2025-156-H', '2025-HR-156-H', 'HR-156-2025-H', 'H-HR-2025-156'],
    0,
    'Following the format [Department Code]-[Year]-[Sequential Number]-[Priority Level]: HR-2025-156-H.'
  ),

  q(QC.CLERICAL_ABILITY, D.HARD,
    'Compare the following three records and identify which one contains an error:\nRecord 1: Fernandez, Ana B. — TIN: 123-456-789-000\nRecord 2: Fernandez, Ana B. — TIN: 123-456-789-000\nRecord 3: Fernandez, Ana B. — TIN: 123-465-789-000',
    ['Record 1', 'Record 2', 'Record 3', 'No record contains an error.'],
    2,
    'Record 3 has a transposition error: the TIN shows 123-465-789-000 instead of 123-456-789-000. The digits "4" and "6" are swapped in the second group.'
  ),

  q(QC.CLERICAL_ABILITY, D.HARD,
    'Seven files need to be arranged. Their labels are: PH-2024-A3, PH-2024-B1, PH-2023-C2, PH-2024-A1, PH-2023-B3, PH-2024-A2, PH-2023-C1. If files are sorted first by year (ascending) then by letter-number code (ascending), which file comes 4th?',
    ['PH-2023-C2', 'PH-2024-A1', 'PH-2024-A2', 'PH-2024-A3'],
    1,
    'Sort by year first: 2023 group: B3, C1, C2. 2024 group: A1, A2, A3, B1. Order: PH-2023-B3, PH-2023-C1, PH-2023-C2, PH-2024-A1... The 4th file is PH-2024-A1.'
  ),

  q(QC.CLERICAL_ABILITY, D.HARD,
    'Proofread the following paragraph and count the total number of errors (spelling, grammar, and punctuation):\n"The Deparment of Finance have released the annual buget report. All agencies are adviced to review their respective allocations, and submit compliance reports before the deadline."',
    ['2', '3', '4', '5'],
    2,
    'Errors: (1) "Deparment" → "Department," (2) "have" → "has" (subject-verb agreement), (3) "buget" → "budget," (4) "adviced" → "advised." Total: 4 errors.'
  ),

  q(QC.CLERICAL_ABILITY, D.HARD,
    'A filing clerk must cross-reference documents using a matrix. Document types are: Memo (M), Letter (L), Report (R). Priority levels are: Urgent (1), Routine (2), Low (3). Storage areas are: Vault (V), Cabinet (C), Archive (A). An urgent report should be coded as:',
    ['R-1-V', 'M-1-C', 'R-2-C', 'L-1-V'],
    0,
    'An urgent report: Document type = R (Report), Priority = 1 (Urgent), and urgent documents go to the Vault (V). The code is R-1-V.'
  ),

  q(QC.CLERICAL_ABILITY, D.HARD,
    'You receive 5 documents for filing. Match each document to its correct category:\n1) Budget Proposal → ?\n2) Employee Leave Form → ?\n3) Audit Finding → ?\n4) Invitation Letter → ?\n5) Purchase Order → ?\nCategories: F=Financial, P=Personnel, C=Correspondence, A=Administrative\nWhich assignment is correct?',
    ['1-F, 2-P, 3-F, 4-C, 5-F', '1-F, 2-A, 3-F, 4-C, 5-A', '1-A, 2-P, 3-F, 4-C, 5-F', '1-F, 2-P, 3-A, 4-C, 5-A'],
    0,
    'Budget Proposal (Financial), Employee Leave Form (Personnel), Audit Finding (Financial), Invitation Letter (Correspondence), Purchase Order (Financial). The correct assignment is 1-F, 2-P, 3-F, 4-C, 5-F.'
  ),
];
