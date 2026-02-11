import { QuestionCategory as QC, Difficulty as D } from '@prisma/client';
import { q, SeedQuestion } from './types';

export const questionnaire3: SeedQuestion[] = [
  // ============================================================
  // VERBAL ABILITY — 40 questions (12 EASY, 20 MEDIUM, 8 HARD)
  // ============================================================

  // --- VERBAL ABILITY: EASY (12) ---
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that is most similar in meaning to "BENEVOLENT."',
    ['Hostile', 'Kind', 'Ignorant', 'Fearful'],
    1,
    '"Benevolent" means well-meaning and kindly, making "Kind" the correct synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that is most opposite in meaning to "TRANSPARENT."',
    ['Clear', 'Opaque', 'Visible', 'Obvious'],
    1,
    '"Transparent" means allowing light to pass through. "Opaque" means not transparent, so it is the antonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Select the correctly spelled word.',
    ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'],
    1,
    'The correct spelling is "accommodate" with double "c" and double "m."'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Fill in the blank: The manager _______ the employees for their outstanding performance.',
    ['commended', 'condemned', 'commanded', 'commenced'],
    0,
    '"Commended" means to praise formally, which fits the context of recognizing outstanding performance.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Which word is a synonym of "CONCEAL"?',
    ['Reveal', 'Hide', 'Discover', 'Display'],
    1,
    '"Conceal" means to keep from sight or to hide, so "Hide" is the correct synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the correct word to complete the sentence: She is the _______ of the two sisters.',
    ['tallest', 'taller', 'more tall', 'most tall'],
    1,
    'When comparing two items, use the comparative form "taller," not the superlative "tallest."'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'What is the antonym of "ABUNDANT"?',
    ['Plentiful', 'Scarce', 'Ample', 'Generous'],
    1,
    '"Abundant" means existing in large quantities. "Scarce" means insufficient or in short supply, making it the antonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that best completes the analogy: Book is to Reading as Fork is to _______.',
    ['Writing', 'Cooking', 'Eating', 'Cutting'],
    2,
    'A book is the tool used for reading; a fork is the tool used for eating.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Identify the sentence with correct grammar.',
    ['She don\'t like coffee.', 'She doesn\'t likes coffee.', 'She doesn\'t like coffee.', 'She don\'t likes coffee.'],
    2,
    'With third-person singular subjects, use "doesn\'t" (does not) followed by the base form of the verb: "She doesn\'t like coffee."'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Which word means "to make something easier"?',
    ['Complicate', 'Facilitate', 'Aggravate', 'Obstruct'],
    1,
    '"Facilitate" means to make an action or process easier, which matches the given definition.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word most similar in meaning to "DILIGENT."',
    ['Lazy', 'Careless', 'Hardworking', 'Indifferent'],
    2,
    '"Diligent" means having or showing care in one\'s work, which is synonymous with "hardworking."'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Fill in the blank: The report _______ submitted before the deadline.',
    ['was', 'were', 'are', 'have'],
    0,
    '"Report" is singular, so the correct auxiliary verb in the passive voice is "was." The report was submitted.'
  ),

  // --- VERBAL ABILITY: MEDIUM (20) ---
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "PRAGMATIC."',
    ['Idealistic', 'Theoretical', 'Practical', 'Emotional'],
    2,
    '"Pragmatic" means dealing with things sensibly and realistically, making "practical" the best synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which sentence uses the correct form of the verb?',
    ['Each of the students have submitted their report.', 'Each of the students has submitted his or her report.', 'Each of the students have submitted his or her report.', 'Each of the students has submitted their reports.'],
    1,
    '"Each" is singular and requires the singular verb "has." The pronoun should agree: "his or her report."'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Complete the analogy: Painter is to Canvas as Author is to _______.',
    ['Brush', 'Book', 'Manuscript', 'Pen'],
    2,
    'A painter creates on a canvas; an author creates on a manuscript. The manuscript is the medium where an author composes work.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What is the antonym of "LAUDABLE"?',
    ['Praiseworthy', 'Deplorable', 'Commendable', 'Admirable'],
    1,
    '"Laudable" means deserving praise. "Deplorable" means deserving strong condemnation, making it the antonym.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word that best completes the sentence: The new policy was met with _______ from employees who felt it was unfair.',
    ['approbation', 'indifference', 'resistance', 'enthusiasm'],
    2,
    'If employees felt the policy was unfair, they would oppose it. "Resistance" means opposition, which fits the context.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Read the paragraph and answer: "The Philippine eagle is one of the world\'s most endangered raptors. Found only in the Philippines, it faces threats from deforestation and hunting. Conservation efforts are crucial to ensure its survival." What is the main idea?',
    ['Philippine eagles are found worldwide.', 'The Philippine eagle is endangered and needs conservation.', 'Deforestation is the only threat to eagles.', 'Hunting of Philippine eagles is legal.'],
    1,
    'The paragraph focuses on the endangered status of the Philippine eagle and the need for conservation efforts.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which word is most nearly opposite in meaning to "FRUGAL"?',
    ['Thrifty', 'Economical', 'Extravagant', 'Prudent'],
    2,
    '"Frugal" means sparing or economical with money. "Extravagant" means spending excessively, so it is the antonym.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Identify the sentence with the correct punctuation.',
    ['The director said, "we need to finalize the report."', 'The director said, "We need to finalize the report."', 'The director said "We need to finalize the report".', 'The director said "we need to finalize the report".'],
    1,
    'In direct speech, capitalize the first word of the quotation and place the period inside the closing quotation mark after a comma following the reporting verb.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the correct meaning of the underlined word: The witness gave a CANDID account of the events.',
    ['Biased', 'Truthful and straightforward', 'Exaggerated', 'Brief'],
    1,
    '"Candid" means truthful, straightforward, and honest in expressing one\'s views.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Fill in the blank: Neither the manager nor the employees _______ aware of the schedule change.',
    ['was', 'is', 'were', 'has been'],
    2,
    'With "neither...nor," the verb agrees with the nearer subject. "Employees" is plural, so "were" is correct.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word that best completes the analogy: Doctor is to Hospital as Teacher is to _______.',
    ['Classroom', 'School', 'Library', 'Office'],
    1,
    'A doctor works in a hospital; a teacher works in a school. Both refer to the primary workplace.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which sentence contains a grammatical error?',
    ['The committee has reached its decision.', 'Everyone should bring their own lunch.', 'The data show a clear trend.', 'She and I went to the conference.'],
    1,
    '"Everyone" is singular, so the pronoun should be "his or her" instead of "their" in formal grammar. "Everyone should bring his or her own lunch."'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What does the word "MITIGATE" mean?',
    ['To increase', 'To make less severe', 'To eliminate completely', 'To investigate'],
    1,
    '"Mitigate" means to make something less severe, serious, or painful.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "EXEMPLARY."',
    ['Typical', 'Outstanding', 'Ordinary', 'Mediocre'],
    1,
    '"Exemplary" means serving as a desirable model or being commendable, which is closest to "outstanding."'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which of the following sentences is correct?',
    ['The less people attend, the better.', 'The fewer people attend, the better.', 'The lesser people attend, the better.', 'The few people attend, the better.'],
    1,
    '"Fewer" is used with countable nouns (people), while "less" is used with uncountable nouns.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Fill in the blank: The CEO emphasized the need for _______ among departments to achieve company goals.',
    ['competition', 'collaboration', 'separation', 'confrontation'],
    1,
    '"Collaboration" means working together, which logically fits achieving shared company goals.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What is the meaning of the idiomatic expression "to burn the midnight oil"?',
    ['To waste resources', 'To work or study late into the night', 'To be angry', 'To start a fire'],
    1,
    '"To burn the midnight oil" means to work or study late at night.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the best word to replace the underlined phrase: The government official was REMOVED FROM OFFICE due to corruption charges.',
    ['Promoted', 'Impeached', 'Transferred', 'Appointed'],
    1,
    '"Impeached" refers to the formal process of removing a government official from office due to charges of misconduct.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Arrange the following sentences to form a coherent paragraph:\n1. Finally, the results are compiled and presented.\n2. First, the researcher identifies the problem.\n3. Next, data is collected through surveys.\n4. Then, the data is analyzed using statistical tools.',
    ['2-3-4-1', '1-2-3-4', '3-2-4-1', '2-4-3-1'],
    0,
    'The logical order follows the research process: identify the problem (2), collect data (3), analyze data (4), present results (1).'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which word is the antonym of "EPHEMERAL"?',
    ['Temporary', 'Permanent', 'Brief', 'Transient'],
    1,
    '"Ephemeral" means lasting for a very short time. "Permanent" means lasting forever, making it the antonym.'
  ),

  // --- VERBAL ABILITY: HARD (8) ---
  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word most similar in meaning to "UBIQUITOUS."',
    ['Rare', 'Unique', 'Omnipresent', 'Obscure'],
    2,
    '"Ubiquitous" means present, appearing, or found everywhere, which is synonymous with "omnipresent."'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Read the passage and answer: "The principle of separation of powers ensures that no single branch of government can dominate. The executive enforces laws, the legislative creates them, and the judiciary interprets them. This system of checks and balances was designed to prevent tyranny." Which best describes the author\'s purpose?',
    ['To criticize the government structure', 'To explain how the separation of powers works and why it exists', 'To argue for a single ruling body', 'To compare different governments worldwide'],
    1,
    'The passage explains the separation of powers among three branches and states its purpose is to prevent tyranny. The author\'s intent is explanatory.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word that best completes the sentence: The attorney\'s _______ argument swayed the jury in favor of his client.',
    ['specious', 'cogent', 'trivial', 'ambiguous'],
    1,
    '"Cogent" means clear, logical, and convincing, which is the quality of an argument that would sway a jury.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'What is the meaning of "OBSEQUIOUS"?',
    ['Disobedient', 'Overly eager to please or obey', 'Indifferent', 'Hostile'],
    1,
    '"Obsequious" means excessively compliant or deferential, showing a servile willingness to please.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Complete the analogy: Cacophony is to Harmony as Chaos is to _______.',
    ['Disorder', 'Confusion', 'Order', 'Anarchy'],
    2,
    'Cacophony (harsh sound) is the opposite of harmony. Chaos (complete disorder) is the opposite of order.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Which sentence correctly uses the subjunctive mood?',
    ['If I was the president, I would change the policy.', 'If I were the president, I would change the policy.', 'If I am the president, I would change the policy.', 'If I be the president, I would change the policy.'],
    1,
    'The subjunctive mood uses "were" for hypothetical or contrary-to-fact conditions: "If I were the president..."'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'The word "EQUIVOCAL" most nearly means:',
    ['Definite', 'Ambiguous', 'Balanced', 'Equal'],
    1,
    '"Equivocal" means open to more than one interpretation; ambiguous or deliberately vague.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Read the passage: "While fiscal decentralization aims to empower local government units, critics argue that without adequate institutional capacity, devolution may exacerbate regional inequalities rather than ameliorate them." What does the author imply?',
    ['Decentralization always succeeds.', 'Local governments are inherently corrupt.', 'Decentralization may worsen inequality if local institutions are weak.', 'Regional inequality is not a significant concern.'],
    2,
    'The passage states that "without adequate institutional capacity, devolution may exacerbate regional inequalities," implying weak institutions could worsen the situation.'
  ),

  // ============================================================
  // NUMERICAL ABILITY — 40 questions (12 EASY, 20 MEDIUM, 8 HARD)
  // ============================================================

  // --- NUMERICAL ABILITY: EASY (12) ---
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 45% of 200?',
    ['80', '90', '100', '85'],
    1,
    '45% of 200 = 0.45 x 200 = 90.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If a notebook costs P35 and you buy 8 notebooks, how much do you pay in total?',
    ['P270', 'P280', 'P290', 'P300'],
    1,
    '35 x 8 = 280. The total cost is P280.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'Simplify: 3/4 + 1/8',
    ['7/8', '4/12', '1/2', '5/8'],
    0,
    '3/4 = 6/8. Then 6/8 + 1/8 = 7/8.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is the next number in the series: 5, 10, 20, 40, ___?',
    ['60', '70', '80', '100'],
    2,
    'Each number is multiplied by 2. 40 x 2 = 80.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A worker earns P500 per day. How much does he earn in 22 working days?',
    ['P10,000', 'P11,000', 'P12,000', 'P10,500'],
    1,
    '500 x 22 = 11,000. The worker earns P11,000 in 22 working days.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 1,250 divided by 25?',
    ['45', '50', '55', '60'],
    1,
    '1,250 / 25 = 50.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If the ratio of boys to girls in a class is 3:5 and there are 15 boys, how many girls are there?',
    ['20', '25', '30', '35'],
    1,
    'If 3 parts = 15, then 1 part = 5. Girls = 5 parts = 5 x 5 = 25.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 15% of 600?',
    ['80', '85', '90', '95'],
    2,
    '15% of 600 = 0.15 x 600 = 90.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A rectangular garden is 12 meters long and 8 meters wide. What is its perimeter?',
    ['36 meters', '40 meters', '96 meters', '20 meters'],
    1,
    'Perimeter = 2(length + width) = 2(12 + 8) = 2(20) = 40 meters.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'Convert 3/5 to a percentage.',
    ['50%', '55%', '60%', '65%'],
    2,
    '3/5 = 0.60 = 60%.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is the value of 7 squared (7^2)?',
    ['14', '42', '49', '56'],
    2,
    '7^2 = 7 x 7 = 49.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If you deposit P5,000 and withdraw P1,750, how much remains?',
    ['P3,150', 'P3,250', 'P3,350', 'P3,450'],
    1,
    '5,000 - 1,750 = 3,250. The remaining balance is P3,250.'
  ),

  // --- NUMERICAL ABILITY: MEDIUM (20) ---
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A store offers a 20% discount on an item priced at P1,500. After the discount, a 12% VAT is added. What is the final price?',
    ['P1,296', 'P1,344', 'P1,260', 'P1,440'],
    1,
    'Discounted price = 1,500 x 0.80 = 1,200. VAT = 1,200 x 0.12 = 144. Final price = 1,200 + 144 = P1,344.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If 5 workers can finish a project in 12 days, how many days will it take 10 workers to finish the same project?',
    ['6', '8', '10', '24'],
    0,
    'Total work = 5 x 12 = 60 worker-days. With 10 workers: 60/10 = 6 days.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the next number in the series: 3, 7, 15, 31, ___?',
    ['47', '55', '63', '59'],
    2,
    'Each term is the previous term multiplied by 2 plus 1: 3x2+1=7, 7x2+1=15, 15x2+1=31, 31x2+1=63.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'Maria is 28 years old. She is twice as old as Ana was 4 years ago. How old is Ana now?',
    ['14', '16', '18', '20'],
    2,
    'Ana\'s age 4 years ago: 28/2 = 14. Ana\'s current age: 14 + 4 = 18.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A car travels 240 km in 3 hours. What is its average speed in km/h?',
    ['60 km/h', '70 km/h', '80 km/h', '90 km/h'],
    2,
    'Speed = Distance / Time = 240 / 3 = 80 km/h.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If a merchant buys goods for P4,000 and sells them for P5,200, what is the profit percentage?',
    ['25%', '28%', '30%', '32%'],
    2,
    'Profit = 5,200 - 4,000 = 1,200. Profit % = (1,200/4,000) x 100 = 30%.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'Solve for x: 3x + 7 = 28',
    ['5', '6', '7', '8'],
    2,
    '3x + 7 = 28. 3x = 21. x = 7.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'In a survey of 200 employees, 40% preferred coffee, 35% preferred tea, and the rest preferred juice. How many preferred juice?',
    ['40', '45', '50', '55'],
    2,
    'Coffee: 40%, Tea: 35%, Juice: 100% - 40% - 35% = 25%. Juice = 0.25 x 200 = 50 employees.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A rectangular tank holds 480 liters. If the tank is 8 meters long and 6 meters wide, what is the water depth in meters? (1 cubic meter = 1,000 liters)',
    ['0.01 m', '0.1 m', '10 m', '1 m'],
    0,
    'Volume in cubic meters = 480/1000 = 0.48 m^3. Depth = Volume/(Length x Width) = 0.48/(8 x 6) = 0.48/48 = 0.01 m.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If the simple interest on P10,000 at 5% per annum for 3 years is:',
    ['P1,000', 'P1,200', 'P1,500', 'P2,000'],
    2,
    'Simple Interest = P x R x T = 10,000 x 0.05 x 3 = P1,500.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the average of 82, 76, 91, 88, and 63?',
    ['78', '80', '82', '84'],
    1,
    'Sum = 82 + 76 + 91 + 88 + 63 = 400. Average = 400/5 = 80.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A pipe can fill a tank in 6 hours. Another pipe can fill it in 12 hours. Working together, how long will they take to fill the tank?',
    ['3 hours', '4 hours', '5 hours', '8 hours'],
    1,
    'Rate of pipe 1 = 1/6, Rate of pipe 2 = 1/12. Combined rate = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4. Time = 4 hours.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A shirt originally costs P800. It is marked up by 25% and then sold at a 10% discount. What is the selling price?',
    ['P880', 'P900', 'P920', 'P850'],
    1,
    'Marked-up price = 800 x 1.25 = 1,000. Discount = 1,000 x 0.10 = 100. Selling price = 1,000 - 100 = P900.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If 3 apples cost P45, how much do 7 apples cost?',
    ['P95', 'P100', 'P105', 'P110'],
    2,
    'Cost per apple = 45/3 = P15. Cost of 7 apples = 15 x 7 = P105.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is 2/3 of 5/8?',
    ['7/24', '10/24', '5/12', '7/11'],
    2,
    '2/3 x 5/8 = 10/24 = 5/12.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A government office has 48 employees. If the ratio of male to female employees is 5:7, how many female employees are there?',
    ['20', '24', '28', '32'],
    2,
    'Total parts = 5 + 7 = 12. One part = 48/12 = 4. Female = 7 x 4 = 28.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'The population of a town increases from 50,000 to 55,000 in one year. What is the percentage increase?',
    ['5%', '8%', '10%', '11%'],
    2,
    'Increase = 55,000 - 50,000 = 5,000. Percentage = (5,000/50,000) x 100 = 10%.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the square root of 196?',
    ['12', '13', '14', '15'],
    2,
    '14 x 14 = 196, so the square root of 196 is 14.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If a train travels at 90 km/h, how far will it travel in 2 hours and 30 minutes?',
    ['200 km', '210 km', '225 km', '250 km'],
    2,
    '2 hours 30 minutes = 2.5 hours. Distance = Speed x Time = 90 x 2.5 = 225 km.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'Find the value of x: x/4 + 3 = 10',
    ['24', '28', '32', '36'],
    1,
    'x/4 + 3 = 10. x/4 = 7. x = 28.'
  ),

  // --- NUMERICAL ABILITY: HARD (8) ---
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A and B can complete a task in 8 days. B and C can complete it in 12 days. A and C can complete it in 10 days. How long will A, B, and C take working together?',
    ['240/37 days', '120/37 days', '6 days', '7 days'],
    0,
    'A+B rate = 1/8, B+C rate = 1/12, A+C rate = 1/10. Adding all three: 2(A+B+C) = 1/8 + 1/12 + 1/10 = 15/120 + 10/120 + 12/120 = 37/120. So A+B+C rate = 37/240 per day. Time = 240/37 ≈ 6.49 days.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A sum of money doubles itself at simple interest in 10 years. What is the rate of interest per annum?',
    ['5%', '8%', '10%', '12%'],
    2,
    'If P doubles, then interest = P. Using SI formula: P = P x R x 10 / 100. So R x 10 = 100. R = 10% per annum.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'In a class of 60 students, 35 passed in English, 40 passed in Math, and 20 passed in both. How many students failed in both subjects?',
    ['5', '10', '15', '20'],
    0,
    'Students passing at least one subject = 35 + 40 - 20 = 55. Students failing both = 60 - 55 = 5.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'The sum of the ages of a father and his son is 56. After 4 years, the father will be three times as old as the son. What is the present age of the son?',
    ['10', '12', '14', '16'],
    1,
    'Let son = x, father = 56 - x. After 4 years: (56 - x + 4) = 3(x + 4). 60 - x = 3x + 12. 48 = 4x. x = 12.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A boat travels 30 km upstream in 5 hours and 30 km downstream in 3 hours. What is the speed of the current?',
    ['1 km/h', '2 km/h', '3 km/h', '4 km/h'],
    1,
    'Upstream speed = 30/5 = 6 km/h. Downstream speed = 30/3 = 10 km/h. Speed of current = (downstream - upstream)/2 = (10 - 6)/2 = 2 km/h.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'What is the compound interest on P20,000 at 10% per annum for 2 years, compounded annually?',
    ['P4,000', 'P4,200', 'P4,400', 'P4,100'],
    1,
    'A = P(1+r)^n = 20,000(1.10)^2 = 20,000 x 1.21 = 24,200. CI = 24,200 - 20,000 = P4,200.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'Three consecutive even numbers have a sum of 78. What is the largest number?',
    ['24', '26', '28', '30'],
    2,
    'Let the numbers be x, x+2, x+4. Sum: 3x + 6 = 78. 3x = 72. x = 24. The largest is 24 + 4 = 28.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A cylindrical water tank has a radius of 7 meters and height of 10 meters. What is its volume? (Use pi = 22/7)',
    ['1,540 cubic meters', '1,320 cubic meters', '1,440 cubic meters', '1,580 cubic meters'],
    0,
    'Volume = pi x r^2 x h = (22/7) x 7^2 x 10 = (22/7) x 49 x 10 = 22 x 7 x 10 = 1,540 cubic meters.'
  ),

  // ============================================================
  // ANALYTICAL ABILITY — 30 questions (9 EASY, 15 MEDIUM, 6 HARD)
  // ============================================================

  // --- ANALYTICAL ABILITY: EASY (9) ---
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'What comes next in the series: A, C, E, G, ___?',
    ['H', 'I', 'J', 'K'],
    1,
    'The series skips one letter each time (A, C, E, G). The next letter after G, skipping H, is I.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'All roses are flowers. Some flowers are red. Which conclusion is valid?',
    ['All roses are red.', 'Some roses may be red.', 'No roses are red.', 'All red things are roses.'],
    1,
    'Since all roses are flowers and some flowers are red, it is possible that some roses are red, but it is not certain. "Some roses may be red" is the valid conclusion.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If APPLE is coded as 1-16-16-12-5, how is "CAT" coded?',
    ['3-1-20', '3-1-19', '2-1-20', '3-2-20'],
    0,
    'Each letter is replaced by its position in the alphabet: C=3, A=1, T=20. So CAT = 3-1-20.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Which does not belong in the group: Triangle, Square, Circle, Rectangle?',
    ['Triangle', 'Square', 'Circle', 'Rectangle'],
    2,
    'Triangle, square, and rectangle all have straight sides (polygons). Circle is the odd one out as it has no straight sides.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If Monday is two days after a certain day, what is that day?',
    ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
    3,
    'Two days before Monday is Saturday. So the certain day is Saturday.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Complete the pattern: 2, 6, 18, 54, ___',
    ['108', '162', '216', '72'],
    1,
    'Each number is multiplied by 3: 2x3=6, 6x3=18, 18x3=54, 54x3=162.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Pedro is taller than Juan. Carlos is shorter than Juan. Who is the shortest?',
    ['Pedro', 'Juan', 'Carlos', 'Cannot be determined'],
    2,
    'Pedro > Juan > Carlos. Therefore, Carlos is the shortest.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If all teachers are graduates and Mario is a teacher, which statement must be true?',
    ['Mario is a doctor.', 'Mario is a graduate.', 'All graduates are teachers.', 'Mario is not a graduate.'],
    1,
    'If all teachers are graduates and Mario is a teacher, then Mario must be a graduate.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Which number does not belong: 8, 27, 64, 100, 125?',
    ['8', '27', '100', '125'],
    2,
    '8=2^3, 27=3^3, 64=4^3, 125=5^3. These are all perfect cubes except 100, which is 10^2 (a perfect square but not a perfect cube).'
  ),

  // --- ANALYTICAL ABILITY: MEDIUM (15) ---
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a certain code, FIRE is written as GJSF. How is WATER written in that code?',
    ['XBUFS', 'XBUES', 'WBUFS', 'XBUGS'],
    0,
    'Each letter is shifted by +1: F->G, I->J, R->S, E->F. Applying to WATER: W->X, A->B, T->U, E->F, R->S = XBUFS.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Statement: All managers are leaders. Some leaders are innovative.\nConclusion I: Some managers are innovative.\nConclusion II: Some leaders are managers.\nWhich conclusion(s) follow(s)?',
    ['Only Conclusion I', 'Only Conclusion II', 'Both Conclusions', 'Neither Conclusion'],
    1,
    'Since all managers are leaders, some leaders must be managers (Conclusion II follows). However, we cannot be certain that some managers are innovative, only that some leaders are (Conclusion I does not necessarily follow).'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'A man walks 5 km north, then turns right and walks 3 km, then turns right again and walks 5 km. In which direction is he from his starting point?',
    ['North', 'South', 'East', 'West'],
    2,
    'Starting point -> 5 km North -> turns right (East) 3 km -> turns right (South) 5 km. He is now 3 km East of his starting point.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Find the missing number: 4, 9, 25, 49, 121, ___',
    ['144', '169', '196', '225'],
    1,
    'The series consists of squares of prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121. The next prime is 13: 13^2=169.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If P is the brother of Q, Q is the sister of R, and R is the father of S, what is P to S?',
    ['Grandfather', 'Uncle', 'Father', 'Brother'],
    1,
    'R is S\'s father. Q is R\'s sister, making Q an aunt to S. P is Q\'s brother, so P is also a sibling of R, making P an uncle to S.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a row of students, Liza is 10th from the left and 15th from the right. How many students are in the row?',
    ['24', '25', '26', '23'],
    0,
    'Total students = position from left + position from right - 1 = 10 + 15 - 1 = 24.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Which word does NOT belong: Nitrogen, Oxygen, Carbon, Mercury?',
    ['Nitrogen', 'Oxygen', 'Carbon', 'Mercury'],
    3,
    'Nitrogen, Oxygen, and Carbon are non-metals (gases at room temperature). Mercury is a metal (liquid at room temperature), so it does not belong.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Statement: No cats are dogs. All dogs are animals.\nConclusion I: No cats are animals.\nConclusion II: Some animals are dogs.\nWhich conclusion(s) follow(s)?',
    ['Only Conclusion I', 'Only Conclusion II', 'Both Conclusions', 'Neither Conclusion'],
    1,
    'Since all dogs are animals, some animals must be dogs (Conclusion II follows). However, cats can still be animals through other means, so Conclusion I does not follow.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If 2 = 6, 3 = 12, 4 = 20, 5 = 30, what does 6 = ?',
    ['36', '40', '42', '48'],
    2,
    'The pattern is n x (n+1): 2x3=6, 3x4=12, 4x5=20, 5x6=30, 6x7=42.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Five people A, B, C, D, and E are sitting in a row. B is to the right of A. D is to the left of C. E is between A and D. What is the order from left to right?',
    ['A, E, D, C, B', 'A, B, E, D, C', 'B, A, E, D, C', 'A, E, D, B, C'],
    1,
    'B is to the right of A, so A comes before B. E is between A and D: A, E, D. D is to the left of C: D, C. Combining all conditions: A, B, E, D, C — B is to the right of A (yes), E is between A and D (positions 1 and 4, yes), D is to the left of C (yes). The order is A, B, E, D, C.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If the day before yesterday was Thursday, what day will it be the day after tomorrow?',
    ['Saturday', 'Sunday', 'Monday', 'Tuesday'],
    2,
    'If the day before yesterday was Thursday, then yesterday was Friday and today is Saturday. The day after tomorrow is Monday.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Complete the series: ZA, YB, XC, WD, ___',
    ['VE', 'UE', 'VF', 'UF'],
    0,
    'The first letter goes backward (Z, Y, X, W, V) and the second letter goes forward (A, B, C, D, E). Next is VE.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'A clock shows 3:15. What is the angle between the hour and minute hands?',
    ['0 degrees', '7.5 degrees', '15 degrees', '22.5 degrees'],
    1,
    'At 3:15, the minute hand is at 90 degrees (pointing at 3). The hour hand has moved past 3 by 15 minutes: 3 x 30 + 15 x 0.5 = 90 + 7.5 = 97.5 degrees. Angle between them = 97.5 - 90 = 7.5 degrees.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Which of the following is the mirror image of "EXAM" when the mirror is placed at the right side?',
    ['MAXE', 'EXAM', 'MAXE (reversed)', 'The letters appear reversed left-to-right'],
    0,
    'When a mirror is placed to the right, the word reads in reverse order: MAXE.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If "+" means "multiply," "-" means "divide," "x" means "add," and "/" means "subtract," what is the value of 8 + 3 - 6 x 2 / 1?',
    ['5', '6', '7', '8'],
    0,
    'Replacing symbols: 8 multiply 3 divide 6 add 2 subtract 1 = (8 x 3) / 6 + 2 - 1 = 24/6 + 2 - 1 = 4 + 2 - 1 = 5.'
  ),

  // --- ANALYTICAL ABILITY: HARD (6) ---
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Statement: Some doctors are teachers. All teachers are researchers.\nConclusion I: Some doctors are researchers.\nConclusion II: All researchers are teachers.\nConclusion III: Some researchers are doctors.\nWhich conclusion(s) follow(s)?',
    ['Only I', 'Only I and III', 'Only II', 'All of them'],
    1,
    'Since some doctors are teachers and all teachers are researchers, those doctors who are teachers must also be researchers (Conclusion I follows). Since some doctors are researchers, some researchers must be doctors (Conclusion III follows). Conclusion II does not follow because researchers can exist who are not teachers.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Six people — A, B, C, D, E, and F — are seated in a row from left to right. A is at one end. B is adjacent to A. D is adjacent to F. C is not adjacent to A or B. E is in the middle of the row. Who is at the rightmost end?',
    ['C', 'D', 'F', 'Cannot be determined'],
    0,
    'A is at one end (position 1). B is adjacent to A (position 2). E is in the middle — in a row of 6, middle positions are 3 and 4. C is not adjacent to A or B, so C cannot be in position 3. E must be at position 3, C at a later position. D is adjacent to F. Arrangement: A, B, E, D, F, C or A, B, E, F, D, C. In both cases, C is at position 6 (rightmost end).'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'In a family, there are six members: A, B, C, D, E, and F. A and B are a married couple. A is the father. C is the son of A. D is the sister of C. E is the brother of A. F is the daughter of E. What is F\'s relationship to D?',
    ['Sister', 'Cousin', 'Niece', 'Aunt'],
    1,
    'A is the father, B is his wife. C is A\'s son, D is C\'s sister (A\'s daughter). E is A\'s brother (uncle to C and D). F is E\'s daughter. Therefore, F is D\'s cousin.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'What comes next in the series: 1, 1, 2, 3, 5, 8, 13, 21, ___?',
    ['26', '29', '34', '42'],
    2,
    'This is the Fibonacci sequence where each number is the sum of the two preceding numbers: 13 + 21 = 34.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'If the following statements are true:\n1. All A are B.\n2. No B are C.\n3. Some C are D.\nWhich of the following must be true?',
    ['Some A are C.', 'No A are C.', 'All D are B.', 'Some D are A.'],
    1,
    'Since all A are B, and no B are C, it follows that no A can be C. If A were C, then since A is also B, some B would be C, which contradicts statement 2.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Seven people — P, Q, R, S, T, U, V — are ranked 1st to 7th (1st is highest). P ranks higher than Q but lower than R. S ranks immediately above T. U ranks lower than V but higher than Q. T ranks higher than P. V ranks 2nd. What is the ranking order from 1st to 7th?',
    ['R, V, S, T, P, U, Q', 'R, V, T, S, P, U, Q', 'V, R, S, T, P, U, Q', 'R, V, S, T, U, P, Q'],
    0,
    'V is 2nd. R > P > Q (from clue 1). T > P (from clue 4). U > Q and V > U (from clue 3). S is immediately above T. Since V=2nd, R must be 1st (R > T > P, and R must be above V or... R could be 1st). R=1st, V=2nd. S immediately above T, and T > P. So S, T are consecutive with S higher. S=3rd, T=4th. P=5th (T > P). V > U > Q: U=6th, Q=7th. Order: R, V, S, T, P, U, Q.'
  ),

  // ============================================================
  // GENERAL INFORMATION — 30 questions (9 EASY, 15 MEDIUM, 6 HARD)
  // ============================================================

  // --- GENERAL INFORMATION: EASY (9) ---
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the national flower of the Philippines?',
    ['Ylang-ylang', 'Sampaguita', 'Rose', 'Orchid'],
    1,
    'The Sampaguita (Jasminum sambac) was declared the national flower of the Philippines in 1934.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'How many regions are there in the Philippines?',
    ['15', '16', '17', '18'],
    2,
    'The Philippines has 17 administrative regions, including the National Capital Region (NCR), Cordillera Administrative Region (CAR), and the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM).'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'Who was the first President of the Philippines?',
    ['Manuel Quezon', 'Emilio Aguinaldo', 'Jose Rizal', 'Andres Bonifacio'],
    1,
    'Emilio Aguinaldo was the first President of the Philippines, serving from 1899 to 1901 during the First Philippine Republic.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the longest river in the Philippines?',
    ['Pasig River', 'Cagayan River', 'Pampanga River', 'Agusan River'],
    1,
    'The Cagayan River (Rio Grande de Cagayan) is the longest river in the Philippines at approximately 505 kilometers.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'Republic Act No. 6713 is also known as the:',
    ['Anti-Graft and Corrupt Practices Act', 'Code of Conduct and Ethical Standards for Public Officials and Employees', 'Ombudsman Act', 'Civil Service Law'],
    1,
    'RA 6713 is the "Code of Conduct and Ethical Standards for Public Officials and Employees," enacted in 1989.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the smallest planet in our solar system?',
    ['Mars', 'Venus', 'Mercury', 'Pluto'],
    2,
    'Mercury is the smallest planet in our solar system. Pluto was reclassified as a dwarf planet in 2006.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'Which body of water separates the islands of Luzon and Samar?',
    ['San Bernardino Strait', 'Surigao Strait', 'Balintang Channel', 'Mindoro Strait'],
    0,
    'The San Bernardino Strait separates the islands of Luzon (Sorsogon) and Samar.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'Who is known as the "Father of the Filipino Nation"?',
    ['Jose Rizal', 'Andres Bonifacio', 'Emilio Aguinaldo', 'Apolinario Mabini'],
    1,
    'Andres Bonifacio is recognized as the "Father of the Filipino Nation" (Ama ng Bayan) for founding the Katipunan and leading the revolution against Spain.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What branch of government has the power to make laws?',
    ['Executive', 'Legislative', 'Judiciary', 'Military'],
    1,
    'The Legislative branch, composed of the Senate and House of Representatives (Congress), has the power to make laws.'
  ),

  // --- GENERAL INFORMATION: MEDIUM (15) ---
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Under the 1987 Philippine Constitution, how many years is the term of a President?',
    ['4 years', '5 years', '6 years', '7 years'],
    2,
    'Under Article VII, Section 4 of the 1987 Constitution, the President serves a term of six years without reelection.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which of the following is NOT a duty of a public official under RA 6713?',
    ['Act promptly on public transactions', 'Make financial disclosures', 'Prioritize personal interests over public duty', 'Uphold public interest over personal interest'],
    2,
    'RA 6713 requires public officials to prioritize public interest. Prioritizing personal interests over public duty violates the code.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the significance of the Battle of Mactan in Philippine history?',
    ['It was the first battle against the Japanese.', 'Lapu-Lapu defeated Ferdinand Magellan.', 'It marked the start of the Philippine Revolution.', 'It was the last battle of World War II in the Philippines.'],
    1,
    'The Battle of Mactan (1521) is significant because Lapu-Lapu and his warriors defeated the Spanish expedition led by Ferdinand Magellan, who was killed in the battle.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The Commission on Audit (COA) is mandated to:',
    ['Prosecute public officials', 'Audit government agencies and accounts', 'Appoint civil servants', 'Draft legislation'],
    1,
    'The Commission on Audit (COA) is the supreme audit institution of the Philippine government, mandated to examine and audit all government revenues and expenditures.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What does the color blue in the Philippine flag represent?',
    ['Courage and valor', 'Peace, truth, and justice', 'Purity and peace', 'Freedom and sovereignty'],
    1,
    'The blue stripe in the Philippine flag represents peace, truth, and justice.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which layer of the atmosphere protects Earth from ultraviolet radiation?',
    ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
    1,
    'The ozone layer, located in the stratosphere, absorbs and blocks most of the sun\'s harmful ultraviolet radiation.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The Noli Me Tangere and El Filibusterismo were written by:',
    ['Marcelo H. del Pilar', 'Jose Rizal', 'Graciano Lopez Jaena', 'Andres Bonifacio'],
    1,
    'Jose Rizal wrote "Noli Me Tangere" (1887) and "El Filibusterismo" (1891), novels that exposed the abuses of Spanish colonial rule.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the Bill of Rights in the Philippine Constitution?',
    ['Article I', 'Article II', 'Article III', 'Article IV'],
    2,
    'Article III of the 1987 Philippine Constitution is the Bill of Rights, which enumerates the fundamental rights of every Filipino citizen.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Filipino value refers to the concept of communal unity and cooperation?',
    ['Utang na loob', 'Bayanihan', 'Pakikisama', 'Hiya'],
    1,
    '"Bayanihan" refers to the spirit of communal unity, cooperation, and working together toward a common goal, exemplified by the tradition of neighbors helping to carry a house.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The Civil Service Commission (CSC) is responsible for:',
    ['Managing the national budget', 'Overseeing the civil service system', 'Conducting elections', 'Auditing government funds'],
    1,
    'The Civil Service Commission is the central personnel agency of the Philippine government, responsible for overseeing the civil service system and ensuring merit-based employment.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the greenhouse effect?',
    ['The cooling of the Earth\'s surface', 'The trapping of heat in the atmosphere by certain gases', 'The depletion of the ozone layer', 'The increase of oxygen in the atmosphere'],
    1,
    'The greenhouse effect is the process where certain gases (CO2, methane, etc.) trap heat in the Earth\'s atmosphere, raising surface temperatures.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Philippine president declared Martial Law in 1972?',
    ['Diosdado Macapagal', 'Ferdinand Marcos', 'Corazon Aquino', 'Carlos Garcia'],
    1,
    'Ferdinand Marcos declared Martial Law on September 21, 1972, through Proclamation No. 1081.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What international agreement aims to combat climate change by limiting global temperature increase?',
    ['Kyoto Protocol', 'Paris Agreement', 'Montreal Protocol', 'Geneva Convention'],
    1,
    'The Paris Agreement (2015) aims to limit global temperature increase to well below 2 degrees Celsius above pre-industrial levels.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Under RA 6713, what is the Statement of Assets, Liabilities, and Net Worth (SALN)?',
    ['A tax return document', 'A financial disclosure required of public officials', 'A bank statement', 'A business registration form'],
    1,
    'The SALN is a document required under RA 6713 for public officials and employees to disclose their assets, liabilities, and net worth to promote transparency and accountability.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the main function of the Supreme Court in the Philippines?',
    ['To enforce laws', 'To create new laws', 'To interpret the Constitution and laws', 'To approve the national budget'],
    2,
    'The Supreme Court is the highest court in the Philippines and has the power to interpret the Constitution and laws, and to settle disputes involving rights.'
  ),

  // --- GENERAL INFORMATION: HARD (6) ---
  q(QC.GENERAL_INFORMATION, D.HARD,
    'Under the 1987 Philippine Constitution, what is the process of removing a sitting President from office?',
    ['Recall election', 'Impeachment by the House and conviction by the Senate', 'Vote of no confidence by Congress', 'Resignation demanded by the Supreme Court'],
    1,
    'Article XI of the 1987 Constitution provides that the President can be removed through impeachment. The House of Representatives initiates impeachment, and the Senate conducts the trial.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'What principle under RA 6713 states that public officials must at all times be accountable to the people?',
    ['Principle of Transparency', 'Principle of Accountability', 'Principle of Public Service', 'Principle of Nationalism'],
    1,
    'RA 6713 enshrines the Principle of Accountability, requiring that public officials are answerable to the people for their actions and decisions in public office.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'The concept of "jus sanguinis" in Philippine citizenship means:',
    ['Citizenship by place of birth', 'Citizenship by blood or descent', 'Citizenship by naturalization', 'Citizenship by marriage'],
    1,
    '"Jus sanguinis" (right of blood) means that citizenship is determined by the nationality of the parents, not the place of birth. The Philippines primarily follows this principle.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'Which section of the 1987 Constitution provides for the autonomy of local government units?',
    ['Article VIII', 'Article X', 'Article XII', 'Article XIV'],
    1,
    'Article X of the 1987 Philippine Constitution provides for local government autonomy, decentralization, and the creation of autonomous regions.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'What is the significance of the Malolos Constitution in Philippine history?',
    ['It was the first democratic constitution in Asia.', 'It established the American colonial government.', 'It declared the Philippines independent from Japan.', 'It established the Commonwealth government.'],
    0,
    'The Malolos Constitution (1899) was the first democratic constitution in Asia, establishing the First Philippine Republic under President Emilio Aguinaldo.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'Under Philippine law, the writ of habeas corpus protects citizens from:',
    ['Double taxation', 'Illegal detention or imprisonment', 'Unfair labor practices', 'Discrimination in employment'],
    1,
    'The writ of habeas corpus (Article III, Section 15 of the 1987 Constitution) is a legal remedy against unlawful detention, requiring the detaining authority to justify the detention before a court.'
  ),

  // ============================================================
  // CLERICAL ABILITY — 30 questions (9 EASY, 15 MEDIUM, 6 HARD)
  // ============================================================

  // --- CLERICAL ABILITY: EASY (9) ---
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which of the following names should be filed FIRST alphabetically?',
    ['Santos, Maria', 'Sanchez, Pedro', 'Salvador, Jose', 'Salas, Ana'],
    3,
    'Alphabetically: Salas comes before Salvador, Sanchez, and Santos. So "Salas, Ana" is filed first.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which of the following is spelled correctly?',
    ['Recieve', 'Receive', 'Receve', 'Receeve'],
    1,
    'The correct spelling is "receive" following the "i before e except after c" rule.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Compare the following two numbers. Are they the same or different?\n4857291 and 4857291',
    ['Same', 'Different', 'Cannot be determined', 'Partially different'],
    0,
    'Both numbers are 4857291. They are exactly the same.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Arrange the following words in alphabetical order: Eagle, Duck, Falcon, Canary. Which comes THIRD?',
    ['Canary', 'Duck', 'Eagle', 'Falcon'],
    2,
    'Alphabetical order: Canary, Duck, Eagle, Falcon. "Eagle" is the third word.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which of the following addresses matches: "1245 Rizal Avenue, Quezon City" and "1245 Rizal Avenue, Quezon City"?',
    ['They match', 'They do not match', 'Partially match', 'Cannot be determined'],
    0,
    'Both addresses are identical: "1245 Rizal Avenue, Quezon City." They match completely.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'If documents are filed by date, which should come FIRST?\nA) March 15, 2024\nB) January 8, 2024\nC) February 22, 2024\nD) January 3, 2024',
    ['March 15, 2024', 'January 8, 2024', 'February 22, 2024', 'January 3, 2024'],
    3,
    'The earliest date is January 3, 2024. Documents filed chronologically would place this first.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which word is misspelled?',
    ['Government', 'Department', 'Managment', 'Environment'],
    2,
    '"Managment" is misspelled. The correct spelling is "Management."'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'In filing, which last name comes first: De Leon, De Guzman, De Castro, De la Cruz?',
    ['De Leon', 'De Guzman', 'De Castro', 'De la Cruz'],
    2,
    'Alphabetically by the letter after "De": Castro, Guzman, la Cruz, Leon. "De Castro" comes first.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Compare the two codes. Are they identical?\nCode A: PH-2024-ABCX\nCode B: PH-2024-ABCX',
    ['Identical', 'Different', 'Partially different', 'Cannot be compared'],
    0,
    'Both codes are PH-2024-ABCX. They are identical.'
  ),

  // --- CLERICAL ABILITY: MEDIUM (15) ---
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Compare the two numbers carefully. Are they the same?\n67839201 and 67839201',
    ['Same', 'Different', 'Cannot be determined', 'Only the first digits match'],
    0,
    'Both numbers are 67839201. They are exactly the same upon careful comparison.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Arrange the following names in correct alphabetical order for filing:\n1. Reyes, Carlo\n2. Ramos, Belen\n3. Rivera, Dante\n4. Rosales, Elena\nWhat is the correct order?',
    ['2, 1, 3, 4', '1, 2, 3, 4', '2, 1, 4, 3', '1, 2, 4, 3'],
    0,
    'Alphabetically: Ramos (2), Reyes (1), Rivera (3), Rosales (4). The correct order is 2, 1, 3, 4.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following contains a spelling error?',
    ['Correspondence', 'Acknowledgement', 'Bureaucracy', 'Adminstration'],
    3,
    '"Adminstration" is misspelled. The correct spelling is "Administration."'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Compare the two addresses. Are they the same?\nAddress 1: 78-B Magsaysay Blvd., Sta. Mesa, Manila\nAddress 2: 78-B Magsaysay Blvd., Sta. Mesa, Manila',
    ['Same', 'Different', 'Partially the same', 'Cannot be determined'],
    0,
    'Both addresses read "78-B Magsaysay Blvd., Sta. Mesa, Manila." They are the same.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'If a code system uses: A=1, B=2, C=3, ... Z=26, what is the code for "DESK"?',
    ['4-5-19-11', '4-5-18-11', '4-5-19-12', '3-5-19-11'],
    0,
    'D=4, E=5, S=19, K=11. So DESK = 4-5-19-11.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A clerk needs to file the following documents. Which should be filed LAST if arranged chronologically?\nA) Memo dated April 10, 2024\nB) Letter dated June 5, 2024\nC) Report dated May 22, 2024\nD) Notice dated March 18, 2024',
    ['Memo dated April 10, 2024', 'Letter dated June 5, 2024', 'Report dated May 22, 2024', 'Notice dated March 18, 2024'],
    1,
    'Chronological order: March 18, April 10, May 22, June 5. The letter dated June 5, 2024 should be filed last.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Identify the pair that does NOT match:\nA) 54321 — 54321\nB) 98765 — 98765\nC) 13579 — 13597\nD) 24680 — 24680',
    ['Pair A', 'Pair B', 'Pair C', 'Pair D'],
    2,
    'Pair C does not match: 13579 vs 13597. The last two digits are reversed (79 vs 97).'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following words is spelled INCORRECTLY?',
    ['Accommodate', 'Occurrence', 'Separate', 'Occurence'],
    3,
    '"Occurence" is misspelled. The correct spelling is "Occurrence" with double "r."'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'In a filing system, under which letter would you file "Philippine National Bank"?',
    ['P', 'N', 'B', 'It depends on the filing system'],
    0,
    'In standard filing, organizations are filed under the first word of the name. "Philippine National Bank" would be filed under "P."'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which sentence contains a typographical error?',
    ['The meeting is scheduled for Monday.', 'Please submit your reort by Friday.', 'The budget was approved yesterday.', 'All employees must attend the seminar.'],
    1,
    '"reort" is a typographical error. It should be "report."'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Arrange the following file numbers in ascending order: 10-042, 10-039, 10-045, 10-041. Which is SECOND?',
    ['10-039', '10-041', '10-042', '10-045'],
    1,
    'Ascending order: 10-039, 10-041, 10-042, 10-045. The second entry is 10-041.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Compare the two names. Are they the same?\nName 1: Villanueva, Ma. Cristina P.\nName 2: Villanueva, Ma. Christina P.',
    ['Same', 'Different', 'Partially the same', 'Cannot be determined'],
    1,
    'The names are different. Name 1 has "Cristina" while Name 2 has "Christina" (extra "h").'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'If a form requires "Last Name, First Name, Middle Initial," which is correctly formatted?',
    ['Juan A. Cruz', 'Cruz, Juan A.', 'Juan Cruz A.', 'A. Cruz, Juan'],
    1,
    'The correct format following "Last Name, First Name, Middle Initial" is "Cruz, Juan A."'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A document coding system uses the format: DEPT-YEAR-SEQ. If the Department of Finance issued its 15th document in 2024, what is the code?',
    ['DOF-2024-015', 'FIN-2024-15', 'DOF-24-015', 'FINANCE-2024-015'],
    0,
    'Using the standard abbreviation for Department of Finance (DOF), full year (2024), and three-digit sequence number (015), the code is DOF-2024-015.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'How many errors are in the following sentence? "The deparment recieved the documents on Wenesday."',
    ['1', '2', '3', '4'],
    2,
    'Three errors: "deparment" should be "department," "recieved" should be "received," and "Wenesday" should be "Wednesday." The word "documents" is spelled correctly.'
  ),

  // --- CLERICAL ABILITY: HARD (6) ---
  q(QC.CLERICAL_ABILITY, D.HARD,
    'Compare the following two account numbers carefully:\nAccount 1: PHL-2024-78453-KLM-09\nAccount 2: PHL-2024-78453-KML-09\nAre they the same?',
    ['Same', 'Different — the letter group differs', 'Different — the number group differs', 'Different — both groups differ'],
    1,
    'Account 1 has "KLM" while Account 2 has "KML." The letters L and M are transposed, making the letter group different.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'In which order should the following be filed alphabetically?\n1. Del Rosario, Angelica\n2. Dela Cruz, Benjamin\n3. De Leon, Carmen\n4. De los Santos, Diana\n5. Del Valle, Eduardo',
    ['2, 3, 4, 1, 5', '3, 4, 2, 1, 5', '3, 2, 4, 1, 5', '1, 2, 3, 4, 5'],
    0,
    'When filing alphabetically, treat "De," "Dela," "Del," and "De los" as part of the surname and alphabetize letter by letter. Dela Cruz (DEC), De Leon (DEL), De los Santos (DEL), Del Rosario (DELR), Del Valle (DELV). Alphabetical order: Dela Cruz (2), De Leon (3), De los Santos (4), Del Rosario (1), Del Valle (5) = 2, 3, 4, 1, 5.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'A clerk typed the following data. Find the row with a discrepancy.\nOriginal → Typed\nA) 284-GHJ-5901 → 284-GHJ-5901\nB) 739-PLK-4823 → 739-PLK-4823\nC) 156-QWE-7364 → 156-QWE-7634\nD) 492-RTY-6150 → 492-RTY-6150',
    ['Row A', 'Row B', 'Row C', 'Row D'],
    2,
    'Row C has a discrepancy: the original is 7364 but the typed version is 7634. The digits 3 and 6 are transposed.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'Arrange these government agencies alphabetically by their acronyms:\n1. DILG\n2. DBM\n3. DOH\n4. DA\n5. DOLE\nWhat is the correct order?',
    ['4, 2, 1, 3, 5', '2, 4, 1, 3, 5', '4, 2, 3, 1, 5', '2, 4, 3, 1, 5'],
    0,
    'Alphabetically by acronym: DA (4), DBM (2), DILG (1), DOH (3), DOLE (5). The order is 4, 2, 1, 3, 5.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'A clerk must verify the following entries. How many pairs have discrepancies?\n1. Gonzales, Roberto M. → Gonzalez, Roberto M.\n2. Bautista, Elena S. → Bautista, Elena S.\n3. Mercado, Patricia L. → Mercado, Patricia L.\n4. Villanueva, Ramon D. → Vilanueva, Ramon D.\n5. Soriano, Angela T. → Soriano, Angela T.',
    ['1', '2', '3', '4'],
    1,
    'Pair 1 has a discrepancy: "Gonzales" vs "Gonzalez" (s vs z). Pair 4 has a discrepancy: "Villanueva" vs "Vilanueva" (double l vs single l). Pairs 2, 3, and 5 match. Total discrepancies: 2.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'Using the filing rule "nothing comes before something," arrange these entries:\n1. San Juan\n2. San\n3. Sanchez\n4. San Jose\n5. Santos',
    ['2, 3, 5, 4, 1', '2, 1, 4, 3, 5', '2, 4, 1, 3, 5', '3, 2, 5, 4, 1'],
    2,
    'Under the "nothing before something" rule: "San" (2) comes first (shortest, the space counts as nothing). Next, "San Jose" (4) before "San Juan" (1) because "Jo" comes before "Ju." Then "Sanchez" (3) before "Santos" (5). The correct order is 2, 4, 1, 3, 5.'
  ),
];
