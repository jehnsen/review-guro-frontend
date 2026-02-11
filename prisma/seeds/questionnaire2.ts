import { QuestionCategory as QC, Difficulty as D } from '@prisma/client';
import { q, SeedQuestion } from './types';

export const questionnaire2: SeedQuestion[] = [
  // ===== VERBAL ABILITY (40 questions: 12 EASY, 20 MEDIUM, 8 HARD) =====

  // VERBAL — EASY (12)
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that is most similar in meaning to "BENEVOLENT".',
    ['Hostile', 'Kind', 'Greedy', 'Indifferent'],
    1,
    '"Benevolent" means well-meaning and kindly. "Kind" is the closest synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that is most opposite in meaning to "TRANSPARENT".',
    ['Clear', 'Opaque', 'Visible', 'Obvious'],
    1,
    '"Transparent" means see-through or clear. "Opaque" means not able to be seen through, making it the antonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Select the correctly spelled word.',
    ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'],
    1,
    'The correct spelling is "accommodate" with double "c" and double "m".'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that best completes the sentence: "The manager gave a ______ explanation of the new policy."',
    ['Concise', 'Concised', 'Concisely', 'Concision'],
    0,
    'An adjective is needed to modify the noun "explanation." "Concise" is the correct adjective meaning brief and clear.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Which of the following sentences is grammatically correct?',
    ['She don\'t like coffee.', 'She doesn\'t likes coffee.', 'She doesn\'t like coffee.', 'She not like coffee.'],
    2,
    '"She doesn\'t like coffee" uses the correct subject-verb agreement with the third-person singular auxiliary "doesn\'t" followed by the base form "like."'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word most similar in meaning to "DILIGENT".',
    ['Lazy', 'Industrious', 'Careless', 'Reckless'],
    1,
    '"Diligent" means showing careful and persistent effort. "Industrious" is the closest synonym meaning hardworking.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'BOOK is to LIBRARY as PAINTING is to ______.',
    ['Artist', 'Museum', 'Canvas', 'Brush'],
    1,
    'A book is housed in a library; a painting is housed in a museum. The analogy is about where items are kept or displayed.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that is most opposite in meaning to "ABUNDANT".',
    ['Plentiful', 'Scarce', 'Excessive', 'Generous'],
    1,
    '"Abundant" means existing in large quantities. "Scarce" means insufficient or in short supply, making it the antonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Which sentence uses the correct form of the verb?',
    ['The children was playing outside.', 'The children were playing outside.', 'The children is playing outside.', 'The children has playing outside.'],
    1,
    '"Children" is a plural noun and requires the plural verb "were." "The children were playing outside" is correct.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word most similar in meaning to "RESILIENT".',
    ['Fragile', 'Tough', 'Weak', 'Delicate'],
    1,
    '"Resilient" means able to recover quickly from difficulties. "Tough" is the closest synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Select the correctly spelled word.',
    ['Recieve', 'Recieve', 'Receive', 'Receve'],
    2,
    'The correct spelling follows the "i before e, except after c" rule: "receive."'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that best completes the sentence: "The government ______ new regulations last month."',
    ['Implement', 'Implementing', 'Implemented', 'Implements'],
    2,
    'The phrase "last month" indicates past tense. "Implemented" is the correct past tense form.'
  ),

  // VERBAL — MEDIUM (20)
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "ACQUIESCE".',
    ['Resist', 'Comply', 'Argue', 'Deny'],
    1,
    '"Acquiesce" means to accept something reluctantly but without protest. "Comply" is the closest synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most opposite in meaning to "METICULOUS".',
    ['Careful', 'Careless', 'Precise', 'Thorough'],
    1,
    '"Meticulous" means showing great attention to detail. "Careless" is the antonym meaning without attention or thought.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'SURGEON is to SCALPEL as CARPENTER is to ______.',
    ['Wood', 'House', 'Saw', 'Nail'],
    2,
    'A surgeon uses a scalpel as a primary tool; a carpenter uses a saw. The analogy is about a professional and their tool.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word that best completes the sentence: "Despite the heavy rain, the soldiers remained ______ in their posts."',
    ['Steadfast', 'Steadfastly', 'Steadfasting', 'Steadfasted'],
    0,
    'An adjective is needed after the linking verb "remained." "Steadfast" is the correct adjective meaning firm and unwavering.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Identify the sentence with the correct punctuation.',
    [
      'The report which was submitted late, was rejected.',
      'The report, which was submitted late was rejected.',
      'The report, which was submitted late, was rejected.',
      'The report which was submitted late was rejected.'
    ],
    2,
    'A non-restrictive clause ("which was submitted late") must be set off by commas on both sides.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What does the idiomatic expression "to burn the midnight oil" mean?',
    ['To waste resources', 'To work or study late into the night', 'To start a fire', 'To arrive late'],
    1,
    '"To burn the midnight oil" is an idiom meaning to work or study late into the night.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "CANDID".',
    ['Secretive', 'Dishonest', 'Frank', 'Reserved'],
    2,
    '"Candid" means truthful and straightforward. "Frank" is the closest synonym meaning open and honest.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which of the following sentences contains a grammatical error?',
    [
      'Each of the students has submitted their project.',
      'Neither the teacher nor the students were absent.',
      'The committee has made its decision.',
      'Every citizen should exercise his or her right to vote.'
    ],
    0,
    '"Each" is singular and should be followed by "his or her project," not "their project." This is a pronoun-antecedent agreement error.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'FAMINE is to HUNGER as DROUGHT is to ______.',
    ['Rain', 'Thirst', 'Water', 'Desert'],
    1,
    'Famine causes hunger; drought causes thirst. The analogy relates a condition to the need it creates.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most opposite in meaning to "ELOQUENT".',
    ['Articulate', 'Fluent', 'Inarticulate', 'Persuasive'],
    2,
    '"Eloquent" means fluent and persuasive in speaking. "Inarticulate" means unable to speak clearly, making it the antonym.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Select the correct word to complete the sentence: "The suspect ______ to the police station for questioning."',
    ['Was brought', 'Was brung', 'Was bringed', 'Was broughten'],
    0,
    '"Was brought" is the correct passive past tense of "bring." The other options are not proper English verb forms.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What does the expression "a blessing in disguise" mean?',
    ['A hidden curse', 'Something that seems bad but turns out to be good', 'A religious ceremony', 'A form of punishment'],
    1,
    '"A blessing in disguise" is an idiom meaning an apparent misfortune that eventually has good results.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word that best completes the sentence: "The senator\'s ______ speech inspired the audience to take action."',
    ['Mundane', 'Compelling', 'Tedious', 'Monotonous'],
    1,
    '"Compelling" means evoking interest or attention in a powerfully irresistible way, fitting the context of inspiring the audience.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Read the passage and answer: "The Philippine eagle, one of the world\'s largest and most powerful birds, is critically endangered. Deforestation and hunting have reduced its population to fewer than 800 individuals." What is the main cause of the Philippine eagle\'s endangered status?',
    ['Climate change', 'Deforestation and hunting', 'Natural disasters', 'Disease'],
    1,
    'The passage explicitly states that deforestation and hunting have reduced the Philippine eagle\'s population.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "FEASIBLE".',
    ['Impossible', 'Practicable', 'Difficult', 'Unlikely'],
    1,
    '"Feasible" means possible and practical to do. "Practicable" is the closest synonym meaning able to be done.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Identify the correctly punctuated sentence.',
    [
      'Lets go to the park said Maria.',
      '"Let\'s go to the park," said Maria.',
      '"Lets go to the park" said Maria.',
      '"Let\'s go to the park" said Maria.'
    ],
    1,
    'Direct speech requires quotation marks, a comma before the dialogue tag, and the contraction "Let\'s" (Let us).'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'MICROSCOPE is to BIOLOGIST as TELESCOPE is to ______.',
    ['Physicist', 'Astronomer', 'Chemist', 'Geologist'],
    1,
    'A biologist uses a microscope; an astronomer uses a telescope. The analogy is about a scientist and their primary instrument.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most opposite in meaning to "LETHARGIC".',
    ['Sluggish', 'Energetic', 'Tired', 'Drowsy'],
    1,
    '"Lethargic" means sluggish and apathetic. "Energetic" means showing great activity and vitality, making it the antonym.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which sentence demonstrates correct subject-verb agreement?',
    [
      'The group of students are going on a trip.',
      'The group of students is going on a trip.',
      'The group of students were going on a trip.',
      'The group of students have going on a trip.'
    ],
    1,
    '"Group" is a collective noun treated as singular, so it takes the singular verb "is." "The group of students is going on a trip" is correct.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the correctly spelled word.',
    ['Bureacracy', 'Bureaucracy', 'Buruecracy', 'Beurocracy'],
    1,
    'The correct spelling is "bureaucracy." It comes from the French word "bureau" meaning office.'
  ),

  // VERBAL — HARD (8)
  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word most similar in meaning to "OBSEQUIOUS".',
    ['Arrogant', 'Servile', 'Defiant', 'Independent'],
    1,
    '"Obsequious" means excessively compliant or deferential. "Servile" is the closest synonym meaning excessively willing to serve.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word most opposite in meaning to "LOQUACIOUS".',
    ['Verbose', 'Talkative', 'Taciturn', 'Garrulous'],
    2,
    '"Loquacious" means very talkative. "Taciturn" means reserved or uncommunicative, making it the antonym.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Read the passage: "In an era where misinformation proliferates through social media, critical thinking has become an indispensable skill. Citizens must learn to evaluate sources, question assumptions, and distinguish fact from opinion before forming judgments." What is the author\'s primary argument?',
    [
      'Social media should be banned.',
      'Critical thinking is essential for navigating misinformation.',
      'People should not use the internet.',
      'All news sources are unreliable.'
    ],
    1,
    'The author argues that critical thinking is necessary ("indispensable skill") for dealing with misinformation in the age of social media.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word that best completes the sentence: "The diplomat\'s ______ remarks helped de-escalate the tense negotiations."',
    ['Inflammatory', 'Conciliatory', 'Provocative', 'Antagonistic'],
    1,
    '"Conciliatory" means intended to placate or pacify, which fits the context of de-escalating tension. The other options would increase tension.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'PANACEA is to DISEASE as UTOPIA is to ______.',
    ['Happiness', 'Imperfection', 'Government', 'Economy'],
    1,
    'A panacea is an imagined cure for all diseases; a utopia is an imagined place free of all imperfection. Both represent ideal solutions to their respective problems.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Which sentence contains a dangling modifier?',
    [
      'After finishing the report, the manager reviewed the data.',
      'Walking through the park, the flowers were beautiful.',
      'She completed the task while listening to music.',
      'The teacher graded the papers carefully.'
    ],
    1,
    '"Walking through the park, the flowers were beautiful" contains a dangling modifier because the flowers were not walking. It should be "Walking through the park, I noticed the beautiful flowers."'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word most similar in meaning to "EPHEMERAL".',
    ['Permanent', 'Transient', 'Eternal', 'Lasting'],
    1,
    '"Ephemeral" means lasting for a very short time. "Transient" is the closest synonym meaning not permanent.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Read the passage: "The concept of sustainable development seeks to balance economic growth with environmental preservation. Critics argue that this balance is unachievable, as industrial progress inevitably degrades natural resources. Proponents counter that innovation and policy reform can reconcile these competing interests." Which statement best represents the proponents\' view?',
    [
      'Economic growth is more important than the environment.',
      'Industrial progress always harms the environment.',
      'Technology and good governance can achieve both growth and preservation.',
      'Sustainable development is impossible.'
    ],
    2,
    'Proponents believe that "innovation and policy reform can reconcile these competing interests," meaning technology and governance can achieve both economic growth and environmental preservation.'
  ),

  // ===== NUMERICAL ABILITY (40 questions: 12 EASY, 20 MEDIUM, 8 HARD) =====

  // NUMERICAL — EASY (12)
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 15% of 240?',
    ['34', '36', '38', '40'],
    1,
    '15% of 240 = 0.15 x 240 = 36.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If a shirt costs PHP 450 and is discounted by 20%, what is the sale price?',
    ['PHP 350', 'PHP 360', 'PHP 370', 'PHP 380'],
    1,
    'Discount = 20% of 450 = PHP 90. Sale price = 450 - 90 = PHP 360.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is the value of 3/4 + 1/8?',
    ['5/8', '7/8', '4/8', '3/8'],
    1,
    '3/4 = 6/8. So 6/8 + 1/8 = 7/8.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'Simplify: 48 / 6 + 3 x 2',
    ['10', '12', '14', '22'],
    2,
    'Following order of operations: 48/6 = 8, 3 x 2 = 6. Then 8 + 6 = 14.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If the ratio of boys to girls in a class is 3:5, and there are 24 boys, how many girls are there?',
    ['30', '35', '40', '45'],
    2,
    'If 3 parts = 24, then 1 part = 8. Girls = 5 parts = 5 x 8 = 40.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What number comes next in the series: 5, 10, 15, 20, ___?',
    ['22', '24', '25', '30'],
    2,
    'The series increases by 5 each time. 20 + 5 = 25.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A worker earns PHP 600 per day. How much does he earn in 22 working days?',
    ['PHP 12,200', 'PHP 13,200', 'PHP 12,000', 'PHP 13,000'],
    1,
    '600 x 22 = PHP 13,200.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'Convert 0.75 to a fraction in simplest form.',
    ['3/4', '7/10', '15/20', '6/8'],
    0,
    '0.75 = 75/100 = 3/4 when simplified by dividing both by 25.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is the area of a rectangle with length 12 cm and width 8 cm?',
    ['80 sq cm', '96 sq cm', '40 sq cm', '20 sq cm'],
    1,
    'Area = length x width = 12 x 8 = 96 sq cm.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If 5 pens cost PHP 75, how much do 8 pens cost?',
    ['PHP 100', 'PHP 110', 'PHP 120', 'PHP 130'],
    2,
    'Cost per pen = 75/5 = PHP 15. Cost of 8 pens = 15 x 8 = PHP 120.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 1,250 - 487?',
    ['763', '773', '783', '863'],
    0,
    '1,250 - 487 = 763.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'Round 3,467 to the nearest hundred.',
    ['3,400', '3,470', '3,500', '3,460'],
    2,
    'The tens digit is 6 (>= 5), so round up. 3,467 rounded to the nearest hundred is 3,500.'
  ),

  // NUMERICAL — MEDIUM (20)
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A government employee\'s monthly salary is PHP 28,000. If 12% is deducted for taxes and contributions, what is the net take-home pay?',
    ['PHP 24,000', 'PHP 24,640', 'PHP 25,000', 'PHP 25,360'],
    1,
    'Deduction = 12% of 28,000 = PHP 3,360. Net pay = 28,000 - 3,360 = PHP 24,640.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If a car travels at 80 km/h, how long will it take to cover 280 km?',
    ['3 hours', '3 hours 15 minutes', '3 hours 30 minutes', '3 hours 45 minutes'],
    2,
    'Time = Distance / Speed = 280 / 80 = 3.5 hours = 3 hours 30 minutes.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What number comes next in the series: 3, 7, 15, 31, ___?',
    ['47', '55', '59', '63'],
    3,
    'Each number is doubled and then 1 is added: 3x2+1=7, 7x2+1=15, 15x2+1=31, 31x2+1=63.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A store bought goods for PHP 5,000 and sold them for PHP 6,500. What is the profit percentage?',
    ['25%', '30%', '35%', '40%'],
    1,
    'Profit = 6,500 - 5,000 = PHP 1,500. Profit % = (1,500/5,000) x 100 = 30%.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If x + 7 = 23, what is the value of 3x?',
    ['42', '45', '48', '51'],
    2,
    'x + 7 = 23, so x = 16. Therefore, 3x = 3 x 16 = 48.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'In a survey of 500 people, 35% preferred Brand A. How many people preferred Brand A?',
    ['150', '170', '175', '180'],
    2,
    '35% of 500 = 0.35 x 500 = 175 people.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A tank can be filled by Pipe A in 6 hours and by Pipe B in 3 hours. How long will it take to fill the tank if both pipes are open?',
    ['1 hour', '1.5 hours', '2 hours', '2.5 hours'],
    2,
    'Pipe A fills 1/6 per hour, Pipe B fills 1/3 per hour. Combined rate = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 per hour. Time = 1/(1/2) = 2 hours.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A father is 4 times as old as his son. In 20 years, the father will be twice as old as his son. How old is the son now?',
    ['8', '10', '12', '15'],
    1,
    'Let son = x, father = 4x. In 20 years: 4x + 20 = 2(x + 20). 4x + 20 = 2x + 40. 2x = 20. x = 10.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the average of 85, 92, 78, 88, and 97?',
    ['86', '87', '88', '89'],
    2,
    'Sum = 85 + 92 + 78 + 88 + 97 = 440. Average = 440 / 5 = 88.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If 2/3 of a number is 42, what is the number?',
    ['56', '60', '63', '66'],
    2,
    'If 2/3 of x = 42, then x = 42 x 3/2 = 63.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A rectangular garden has a perimeter of 56 meters. If its length is 18 meters, what is its width?',
    ['8 meters', '10 meters', '12 meters', '14 meters'],
    1,
    'Perimeter = 2(L + W). 56 = 2(18 + W). 28 = 18 + W. W = 10 meters.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is 7/12 - 1/4 expressed in simplest form?',
    ['1/4', '1/3', '5/12', '1/6'],
    1,
    '7/12 - 1/4 = 7/12 - 3/12 = 4/12 = 1/3.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'An employee receives a 15% salary increase. If the new salary is PHP 34,500, what was the original salary?',
    ['PHP 28,000', 'PHP 29,000', 'PHP 29,500', 'PHP 30,000'],
    3,
    'Let original = x. x + 0.15x = 34,500. 1.15x = 34,500. x = 34,500 / 1.15 = PHP 30,000.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A bus departs at 7:45 AM and arrives at 11:20 AM. How long is the travel time?',
    ['3 hours 25 minutes', '3 hours 35 minutes', '3 hours 45 minutes', '4 hours 35 minutes'],
    1,
    'From 7:45 AM to 11:20 AM: 7:45 to 11:00 = 3 hours 15 minutes, plus 20 more minutes = 3 hours 35 minutes.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If the price of rice increases from PHP 42 per kilo to PHP 50 per kilo, what is the percentage increase (rounded to the nearest whole number)?',
    ['16%', '17%', '19%', '20%'],
    2,
    'Increase = 50 - 42 = 8. Percentage increase = (8/42) x 100 = 19.05% ≈ 19%.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'Three workers can complete a project in 12 days. How many days will it take 4 workers to complete the same project?',
    ['8 days', '9 days', '10 days', '11 days'],
    1,
    'Total work = 3 x 12 = 36 worker-days. With 4 workers: 36/4 = 9 days.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the value of √144 + √81?',
    ['21', '23', '25', '27'],
    0,
    '√144 = 12 and √81 = 9. So 12 + 9 = 21.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A store offers "Buy 3, Get 1 Free" on items priced at PHP 120 each. How much do you pay for 8 items?',
    ['PHP 680', 'PHP 720', 'PHP 840', 'PHP 960'],
    1,
    'For every 4 items, you pay for 3. 8 items = 2 groups of 4, so you pay for 6 items. 6 x 120 = PHP 720.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What number comes next in the series: 2, 6, 18, 54, ___?',
    ['108', '128', '148', '162'],
    3,
    'Each number is multiplied by 3: 2x3=6, 6x3=18, 18x3=54, 54x3=162.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If a P50,000 investment earns 6% simple annual interest, how much interest is earned after 2 years?',
    ['PHP 5,000', 'PHP 5,500', 'PHP 6,000', 'PHP 6,500'],
    2,
    'Simple interest = Principal x Rate x Time = 50,000 x 0.06 x 2 = PHP 6,000.'
  ),

  // NUMERICAL — HARD (8)
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A train 150 meters long passes a pole in 15 seconds. What is its speed in km/h?',
    ['30 km/h', '36 km/h', '40 km/h', '45 km/h'],
    1,
    'Speed = 150/15 = 10 m/s. Converting to km/h: 10 x 3.6 = 36 km/h.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A mixture contains milk and water in the ratio 5:3. If 16 liters of the mixture is replaced with pure milk, the ratio becomes 3:1. What was the original quantity of the mixture?',
    ['48 liters', '56 liters', '64 liters', '72 liters'],
    0,
    'Let total = 8x (5x milk, 3x water). Removing 16L of mixture removes milk = 5(16)/8 = 10 and water = 3(16)/8 = 6. After removal: milk = 5x-10, water = 3x-6. Adding 16L pure milk: milk = 5x+6, water = 3x-6. Ratio 3:1: 5x+6 = 3(3x-6), 5x+6 = 9x-18, 4x = 24, x = 6. Total = 8 × 6 = 48 liters.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'Two trains start from the same station at the same time, traveling in opposite directions at 60 km/h and 80 km/h. After how many hours will they be 490 km apart?',
    ['2.5 hours', '3 hours', '3.5 hours', '4 hours'],
    2,
    'Combined speed = 60 + 80 = 140 km/h (opposite directions). Time = 490/140 = 3.5 hours.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'The sum of three consecutive even numbers is 78. What is the largest number?',
    ['24', '26', '28', '30'],
    2,
    'Let the numbers be x, x+2, x+4. Sum: 3x + 6 = 78. 3x = 72. x = 24. Largest = 24 + 4 = 28.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A boat travels 24 km upstream in 4 hours and 24 km downstream in 3 hours. What is the speed of the current?',
    ['0.5 km/h', '1 km/h', '1.5 km/h', '2 km/h'],
    1,
    'Upstream speed = 24/4 = 6 km/h. Downstream speed = 24/3 = 8 km/h. Speed of current = (8-6)/2 = 1 km/h.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'If log₁₀(x) = 3, what is the value of log₁₀(x²)?',
    ['6', '9', '27', '1000'],
    0,
    'log₁₀(x²) = 2 × log₁₀(x) = 2 × 3 = 6.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A circular garden has a radius of 14 meters. What is its area? (Use π = 22/7)',
    ['516 sq m', '576 sq m', '616 sq m', '636 sq m'],
    2,
    'Area = πr² = (22/7) x 14 x 14 = (22/7) x 196 = 22 x 28 = 616 sq m.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'In how many ways can 5 different books be arranged on a shelf?',
    ['25', '60', '100', '120'],
    3,
    '5 books can be arranged in 5! = 5 x 4 x 3 x 2 x 1 = 120 ways.'
  ),

  // ===== ANALYTICAL ABILITY (30 questions: 9 EASY, 15 MEDIUM, 6 HARD) =====

  // ANALYTICAL — EASY (9)
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If all roses are flowers and some flowers are red, which statement must be true?',
    ['All roses are red.', 'Some roses may be red.', 'No roses are red.', 'All red things are roses.'],
    1,
    'Since all roses are flowers and some flowers are red, it is possible (but not certain) that some roses are red. "Some roses may be red" is the only logically valid conclusion.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'What comes next in the pattern: A, C, E, G, ___?',
    ['H', 'I', 'J', 'K'],
    1,
    'The pattern skips every other letter: A(skip B), C(skip D), E(skip F), G(skip H), I.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If Monday is 2 days after a holiday, on what day was the holiday?',
    ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
    3,
    'If Monday is 2 days after the holiday, count back 2 days from Monday: Sunday, Saturday. The holiday was on Saturday.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Which number does not belong in the group: 8, 27, 64, 100, 125?',
    ['8', '27', '100', '125'],
    2,
    '8=2³, 27=3³, 64=4³, 125=5³. These are perfect cubes. 100 is not a perfect cube (100=10²), so it does not belong.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If FISH is coded as EHRG, how is BIRD coded?',
    ['AHQC', 'CHSE', 'AKPC', 'AQHC'],
    0,
    'Each letter is shifted back by 1: F→E, I→H, S→R, H→G. Applying to BIRD: B→A, I→H, R→Q, D→C = AHQC.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Complete the series: 100, 90, 81, 73, 66, ___?',
    ['58', '59', '60', '61'],
    2,
    'Differences: 10, 9, 8, 7 (decreasing by 1). Next difference = 6. So 66 - 6 = 60.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Maria is taller than Jose. Jose is taller than Pedro. Who is the tallest?',
    ['Jose', 'Pedro', 'Maria', 'Cannot be determined'],
    2,
    'Maria > Jose > Pedro. Therefore, Maria is the tallest.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If all government employees must wear uniforms, and Juan is a government employee, what can we conclude?',
    ['Juan likes wearing uniforms.', 'Juan must wear a uniform.', 'Juan works in an office.', 'Juan is a civil servant.'],
    1,
    'The premise states all government employees must wear uniforms. Since Juan is a government employee, he must wear a uniform. This is a direct logical deduction.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Which shape comes next: Circle, Square, Triangle, Circle, Square, ___?',
    ['Circle', 'Square', 'Triangle', 'Rectangle'],
    2,
    'The pattern repeats: Circle, Square, Triangle. After Circle and Square, the next shape is Triangle.'
  ),

  // ANALYTICAL — MEDIUM (15)
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Statement: All lawyers passed the bar exam. Some professionals are lawyers. Conclusion I: Some professionals passed the bar exam. Conclusion II: All professionals passed the bar exam. Which conclusion(s) follow?',
    ['Only Conclusion I', 'Only Conclusion II', 'Both Conclusions', 'Neither Conclusion'],
    0,
    'Since some professionals are lawyers, and all lawyers passed the bar exam, it follows that some professionals passed the bar exam (Conclusion I). However, not all professionals are lawyers, so Conclusion II does not follow.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'What comes next in the series: 2, 5, 11, 23, 47, ___?',
    ['91', '93', '94', '95'],
    3,
    'Pattern: each number is doubled plus 1. 2x2+1=5, 5x2+1=11, 11x2+1=23, 23x2+1=47, 47x2+1=95.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a code language, "PLANE" is written as "RNCPG." How is "TRAIN" written?',
    ['VTCKP', 'VTCJP', 'VTCKL', 'VSCJP'],
    0,
    'Each letter shifts by +2: P→R, L→N, A→C, N→P, E→G. Applying to TRAIN: T→V, R→T, A→C, I→K, N→P = VTCKP.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Five friends — Ana, Ben, Cara, Dan, and Eva — sit in a row. Ana sits at one end. Ben sits at the other end. Eva sits in the middle. Cara sits next to Ana. Where does Dan sit?',
    ['Position 1', 'Position 2', 'Position 4', 'Position 5'],
    2,
    'Ana is at position 1, Ben is at position 5, Eva is in the middle at position 3. Cara sits next to Ana, so Cara is at position 2. Dan must be at position 4 (the only remaining spot).'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If A is north of B, and C is east of B, what direction is A from C?',
    ['Northeast', 'Northwest', 'Southeast', 'Southwest'],
    1,
    'B is south of A and west of C. From C, to get to A, you go west (to B) and then north. Therefore, A is northwest of C.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a class, 60% of students passed Math, 70% passed English, and 40% passed both. What percentage passed at least one subject?',
    ['80%', '85%', '90%', '95%'],
    2,
    'Using inclusion-exclusion: P(Math or English) = P(Math) + P(English) - P(Both) = 60 + 70 - 40 = 90%.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Complete the letter series: B, D, G, K, P, ___?',
    ['T', 'U', 'V', 'W'],
    2,
    'Differences between positions: B(2) to D(4)=+2, D(4) to G(7)=+3, G(7) to K(11)=+4, K(11) to P(16)=+5. Next: +6 = 22 = V.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Pointing to a woman, Rodel said, "She is the daughter of my mother\'s only son." How is the woman related to Rodel?',
    ['Sister', 'Daughter', 'Niece', 'Cousin'],
    1,
    'Rodel\'s mother\'s only son is Rodel himself. So the woman is the daughter of Rodel—she is his daughter.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If "CAT" is coded as "DBU" and "DOG" is coded as "EPH," what is "PIG" coded as?',
    ['QJH', 'OHF', 'QHJ', 'PIH'],
    0,
    'Each letter is shifted forward by 1: C→D, A→B, T→U; D→E, O→P, G→H. Applying to PIG: P→Q, I→J, G→H = QJH.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'A man walks 5 km north, then 3 km east, then 5 km south. How far is he from the starting point?',
    ['3 km', '5 km', '8 km', '13 km'],
    0,
    'Walking 5 km north and then 5 km south brings him back to the same north-south position. He only moved 3 km east, so he is 3 km from the starting point.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Statement: No teacher is a politician. All politicians are wealthy. Which conclusion is valid?',
    ['No teacher is wealthy.', 'Some teachers are wealthy.', 'No teacher is both a politician and wealthy.', 'All wealthy people are politicians.'],
    2,
    'Since no teacher is a politician, no teacher can be both a politician and wealthy. The first two conclusions are not necessarily true (teachers may or may not be wealthy through other means), and the last reverses the relationship.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Find the odd one out: January, March, May, June, July.',
    ['January', 'March', 'June', 'July'],
    2,
    'January (31), March (31), May (31), July (31) all have 31 days. June has only 30 days, making it the odd one out.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If "+" means "minus," "-" means "multiply," "x" means "divide," and "/" means "plus," what is the value of 12 - 4 / 8 x 2 + 3?',
    ['47', '49', '51', '53'],
    1,
    'Replacing symbols: 12 multiply 4 plus 8 divide 2 minus 3 = 12 × 4 + 8 ÷ 2 - 3. Following order of operations: 12 × 4 = 48, 8 ÷ 2 = 4, then 48 + 4 - 3 = 49.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a family, there are 6 members: A, B, C, D, E, and F. A and B are married. D is the son of A. C is the sister of D. E is the brother of A. F is the daughter of E. How is F related to D?',
    ['Sister', 'Cousin', 'Niece', 'Aunt'],
    1,
    'E is A\'s brother, making E the uncle of D. F is E\'s daughter. Therefore F and D are cousins.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Which number replaces the question mark: 4, 9, 25, 49, 121, ?',
    ['144', '169', '196', '225'],
    1,
    'These are squares of prime numbers: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121. Next prime is 13, so 13²=169.'
  ),

  // ANALYTICAL — HARD (6)
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'In a certain code, "SOCIAL" is written as "TPDJBM." Using the same code, what does "IFBMUI" stand for?',
    ['HEALTH', 'WEALTH', 'HEARTH', 'HEAVEN'],
    0,
    'In the code, each letter is shifted forward by 1: S→T, O→P, C→D, I→J, A→B, L→M. Reversing: I→H, F→E, B→A, M→L, U→T, I→H = HEALTH.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Six people — P, Q, R, S, T, and U — are seated around a circular table. P sits opposite R. Q sits to the immediate left of P. T sits to the immediate right of R. Who sits opposite Q?',
    ['S', 'T', 'U', 'Cannot be determined'],
    1,
    'Arranging around the circle: P is at position 1, Q to P\'s left at position 2. R is opposite P at position 4. T is to R\'s right at position 5. The person opposite Q (position 2) is at position 5, which is T.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Statement I: All dogs are animals. Statement II: All animals are living things. Statement III: Some living things are plants. Which conclusion is definitely true?',
    ['All dogs are plants.', 'Some plants are dogs.', 'All dogs are living things.', 'Some dogs are plants.'],
    2,
    'From Statement I (all dogs are animals) and Statement II (all animals are living things), we can conclude: all dogs are living things. The relationship between dogs and plants cannot be determined.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'A clock shows 3:15. What is the angle between the hour and minute hands?',
    ['0°', '7.5°', '15°', '22.5°'],
    1,
    'At 3:15, the minute hand is at 90° (pointing at 3). The hour hand moves 0.5° per minute. At 3:00 it is at 90°. In 15 minutes, it moves 7.5°, so it is at 97.5°. Angle between hands = 97.5° - 90° = 7.5°.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'In a group of 100 people, 65 like tea, 45 like coffee, and 15 like neither. How many people like both tea and coffee?',
    ['15', '20', '25', '30'],
    2,
    'People who like at least one = 100 - 15 = 85. Using inclusion-exclusion: 85 = 65 + 45 - Both. Both = 110 - 85 = 25.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'If the day before yesterday was Thursday, what day will it be three days after tomorrow?',
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    2,
    'If the day before yesterday was Thursday, then yesterday was Friday, and today is Saturday. Tomorrow is Sunday. Three days after tomorrow: Sunday + 1 = Monday, + 2 = Tuesday, + 3 = Wednesday.'
  ),

  // ===== GENERAL INFORMATION (30 questions: 9 EASY, 15 MEDIUM, 6 HARD) =====

  // GENERAL INFO — EASY (9)
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the national flower of the Philippines?',
    ['Orchid', 'Sampaguita', 'Sunflower', 'Rose'],
    1,
    'The Sampaguita (Jasminum sambac) was declared the national flower of the Philippines in 1934.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'Who is known as the "Father of the Philippine Revolution"?',
    ['Jose Rizal', 'Andres Bonifacio', 'Emilio Aguinaldo', 'Apolinario Mabini'],
    1,
    'Andres Bonifacio is known as the "Father of the Philippine Revolution" for founding the Katipunan and leading the revolt against Spanish colonization.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the longest river in the Philippines?',
    ['Pasig River', 'Cagayan River', 'Pampanga River', 'Agusan River'],
    1,
    'The Cagayan River (also known as Rio Grande de Cagayan) is the longest river in the Philippines at approximately 505 km.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'How many regions are there in the Philippines?',
    ['15', '16', '17', '18'],
    2,
    'The Philippines has 17 administrative regions, including the National Capital Region (NCR), BARMM, and CAR.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What branch of government is responsible for making laws in the Philippines?',
    ['Executive', 'Legislative', 'Judicial', 'Administrative'],
    1,
    'The Legislative branch, composed of the Senate and the House of Representatives (Congress), is responsible for making laws.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the currency of the Philippines?',
    ['Ringgit', 'Peso', 'Baht', 'Rupee'],
    1,
    'The Philippine Peso (PHP) is the official currency of the Philippines.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'Which Philippine hero wrote "Noli Me Tangere"?',
    ['Andres Bonifacio', 'Marcelo H. del Pilar', 'Jose Rizal', 'Graciano Lopez Jaena'],
    2,
    'Dr. Jose Rizal wrote "Noli Me Tangere" (Touch Me Not) in 1887, a novel exposing the abuses of Spanish colonial rule.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the largest island in the Philippines?',
    ['Mindanao', 'Luzon', 'Samar', 'Palawan'],
    1,
    'Luzon is the largest island in the Philippines with an area of approximately 109,965 square kilometers.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'Which body of water separates the Philippines from Taiwan?',
    ['South China Sea', 'Luzon Strait', 'Sulu Sea', 'Celebes Sea'],
    1,
    'The Luzon Strait separates the Philippines (northern Luzon) from Taiwan.'
  ),

  // GENERAL INFO — MEDIUM (15)
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Under RA 6713 (Code of Conduct and Ethical Standards for Public Officials and Employees), which of the following is NOT a norm of conduct?',
    ['Commitment to public interest', 'Political neutrality', 'Profitability', 'Responsiveness to the public'],
    2,
    'RA 6713 lists norms including commitment to public interest, professionalism, justness and sincerity, political neutrality, responsiveness, nationalism, and others. "Profitability" is not among them.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'According to the 1987 Philippine Constitution, what is the term of office of the President?',
    ['4 years', '5 years', '6 years', '7 years'],
    2,
    'Under the 1987 Philippine Constitution, the President serves a single term of 6 years without reelection.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Philippine president declared Martial Law in 1972?',
    ['Diosdado Macapagal', 'Ferdinand Marcos', 'Corazon Aquino', 'Ramon Magsaysay'],
    1,
    'President Ferdinand Marcos declared Martial Law on September 21, 1972, through Proclamation No. 1081.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the highest peak in the Philippines?',
    ['Mount Pulag', 'Mount Apo', 'Mount Pinatubo', 'Mount Mayon'],
    1,
    'Mount Apo in Mindanao is the highest peak in the Philippines at 2,954 meters above sea level.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Under RA 6713, public officials must submit their Statement of Assets, Liabilities, and Net Worth (SALN) within how many days after assuming office?',
    ['15 days', '30 days', '45 days', '60 days'],
    1,
    'Under RA 6713 Section 8, public officials and employees must file their SALN within 30 days after assumption of office.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What treaty ended the Spanish-American War and ceded the Philippines to the United States?',
    ['Treaty of Tordesillas', 'Treaty of Paris', 'Treaty of Versailles', 'Treaty of Manila'],
    1,
    'The Treaty of Paris (1898) ended the Spanish-American War and ceded the Philippines, Guam, and Puerto Rico to the United States.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which government agency is primarily responsible for the conservation of the Philippine environment?',
    ['DPWH', 'DENR', 'DOST', 'DOH'],
    1,
    'The Department of Environment and Natural Resources (DENR) is the primary government agency responsible for the conservation, management, and development of the country\'s environment and natural resources.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What does the blue color in the Philippine flag represent?',
    ['Courage and valor', 'Peace, truth, and justice', 'Equality and fraternity', 'Purity and liberty'],
    1,
    'The blue stripe in the Philippine flag represents peace, truth, and justice.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the supreme law of the land in the Philippines?',
    ['Republic Act 6713', 'The Civil Code', 'The 1987 Constitution', 'The Revised Penal Code'],
    2,
    'The 1987 Philippine Constitution is the supreme law of the land. All laws must conform to it.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Filipino scientist is known for his studies on the medicinal uses of Philippine plants?',
    ['Fe del Mundo', 'Eduardo Quisumbing', 'Gregorio Zara', 'Ramon Barba'],
    1,
    'Dr. Eduardo Quisumbing was a renowned Filipino botanist known for his extensive research on Philippine medicinal plants.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Under the Philippine Constitution, who has the power to declare the existence of a state of war?',
    ['The President', 'The Supreme Court', 'Congress', 'The Secretary of National Defense'],
    2,
    'Under Article VI, Section 23 of the 1987 Constitution, Congress has the power to declare the existence of a state of war by a vote of two-thirds of both Houses.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the main cause of the depletion of the ozone layer?',
    ['Carbon dioxide', 'Chlorofluorocarbons (CFCs)', 'Methane', 'Sulfur dioxide'],
    1,
    'Chlorofluorocarbons (CFCs), once commonly used in refrigerants and aerosols, are the main cause of ozone layer depletion.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What Philippine law mandates the establishment of the Civil Service Commission?',
    ['RA 6713', 'The 1987 Constitution', 'RA 7041', 'RA 9485'],
    1,
    'The 1987 Philippine Constitution (Article IX-B) establishes the Civil Service Commission as the central personnel agency of the government.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which natural disaster is the Philippines most frequently affected by due to its location along the Pacific Ring of Fire?',
    ['Tornadoes', 'Earthquakes and volcanic eruptions', 'Blizzards', 'Droughts'],
    1,
    'The Philippines is located along the Pacific Ring of Fire, making it highly prone to earthquakes and volcanic eruptions.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM) a result of?',
    ['The 1987 Constitution only', 'The Bangsamoro Organic Law (RA 11054)', 'Presidential decree', 'Supreme Court ruling'],
    1,
    'BARMM was established through the Bangsamoro Organic Law (Republic Act No. 11054), ratified in a plebiscite in 2019.'
  ),

  // GENERAL INFO — HARD (6)
  q(QC.GENERAL_INFORMATION, D.HARD,
    'Under RA 6713, which of the following is a prohibited act for public officials?',
    [
      'Attending community gatherings',
      'Receiving gifts from relatives on special occasions',
      'Soliciting or accepting gifts in connection with official transactions',
      'Joining professional organizations'
    ],
    2,
    'Section 7(d) of RA 6713 prohibits public officials from soliciting or accepting, directly or indirectly, any gift, gratuity, favor, or anything of monetary value in connection with any government operation or transaction.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'What principle in the Philippine Constitution states that sovereignty resides in the people and all government authority emanates from them?',
    ['Separation of Powers', 'Popular Sovereignty', 'Rule of Law', 'Checks and Balances'],
    1,
    'Article II, Section 1 of the 1987 Constitution embodies the principle of popular sovereignty: "Sovereignty resides in the people and all government authority emanates from them."'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'Which international agreement commits signatory countries to reduce greenhouse gas emissions, and was signed by the Philippines?',
    ['Kyoto Protocol', 'Montreal Protocol', 'Paris Agreement', 'Basel Convention'],
    2,
    'The Paris Agreement (2015) commits signatory nations, including the Philippines, to limit global warming. While the Kyoto Protocol also addresses emissions, the Paris Agreement is the more recent and comprehensive commitment.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'Under the Philippine Constitution, what is the minimum age requirement for a person to be elected as a Senator?',
    ['25 years old', '30 years old', '35 years old', '40 years old'],
    2,
    'Under Article VI, Section 3 of the 1987 Constitution, a Senator must be at least 35 years old on the day of the election.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'Which provision of RA 6713 requires public officials to act with patriotism and to promote the use of locally produced goods?',
    ['Professionalism', 'Nationalism and patriotism', 'Commitment to democracy', 'Responsiveness to the public'],
    1,
    'Section 4(g) of RA 6713 mandates nationalism and patriotism, requiring public officials to be loyal to the Republic, promote the use of locally produced goods, and prioritize the country\'s interests.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'What is the writ of amparo in Philippine law?',
    [
      'A remedy for unlawful detention',
      'A remedy protecting the right to life, liberty, and security against extralegal killings and enforced disappearances',
      'A court order to produce a document',
      'A petition for change of name'
    ],
    1,
    'The writ of amparo is a legal remedy available to any person whose right to life, liberty, and security is violated or threatened by an unlawful act, particularly extralegal killings and enforced disappearances.'
  ),

  // ===== CLERICAL ABILITY (30 questions: 9 EASY, 15 MEDIUM, 6 HARD) =====

  // CLERICAL — EASY (9)
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which of the following names comes FIRST in alphabetical order?',
    ['Reyes, Manuel C.', 'Reyes, Manuel A.', 'Reyes, Mario B.', 'Reyes, Maria D.'],
    1,
    'All have the surname "Reyes." Comparing first names: Manuel comes before Maria and Mario (Man- before Mar-). Between "Manuel A." and "Manuel C.", the middle initial A comes before C.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Compare the two numbers: 847362 and 847362. Are they the same or different?',
    ['Same', 'Different', 'Cannot be determined', 'Partially the same'],
    0,
    'Both numbers are 847362. They are exactly the same.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which word is MISSPELLED?',
    ['Necessary', 'Definitely', 'Seperate', 'Occurrence'],
    2,
    '"Seperate" is misspelled. The correct spelling is "separate."'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Under which letter of the alphabet would you file a document from the "Department of Budget and Management"?',
    ['B', 'D', 'M', 'G'],
    1,
    'Documents are filed by the first significant word in the name. "Department" starts with D, so it is filed under D.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Compare the two codes: XJ-4829-LP and XJ-4829-LP. Are they the same or different?',
    ['Same', 'Different', 'Cannot be determined', 'Only partially matching'],
    0,
    'Both codes read XJ-4829-LP. They are exactly the same.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which of the following is in correct alphabetical order?',
    [
      'Apple, Banana, Cherry, Date',
      'Banana, Apple, Cherry, Date',
      'Cherry, Apple, Date, Banana',
      'Date, Cherry, Banana, Apple'
    ],
    0,
    'Apple, Banana, Cherry, Date is the correct alphabetical sequence: A, B, C, D.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which word is correctly spelled?',
    ['Committment', 'Comittment', 'Commitment', 'Comitment'],
    2,
    '"Commitment" is the correct spelling with double "m," single "t," and the suffix "-ment."'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'If today is file number 2024-0345, what is the next file number in sequence?',
    ['2024-0346', '2024-0445', '2024-0350', '2025-0345'],
    0,
    'The next sequential file number after 2024-0345 is 2024-0346.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Compare the two addresses: "142 Mabini St., Quezon City" and "142 Mabini St., Quezon City." Are they the same?',
    ['Same', 'Different', 'Cannot determine', 'Only the number is the same'],
    0,
    'Both addresses read "142 Mabini St., Quezon City." They are exactly the same.'
  ),

  // CLERICAL — MEDIUM (15)
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Arrange the following names in correct alphabetical order: (1) Santos, Ana M. (2) Santos, Ana C. (3) Santiago, Ana B. (4) Santos, Alicia D. Which is the correct order?',
    ['3, 4, 2, 1', '4, 2, 1, 3', '3, 2, 1, 4', '4, 3, 2, 1'],
    0,
    'First compare surnames: Santiago (3) comes before Santos (1,2,4). Among Santos: Alicia (4) before Ana (1,2). Among Santos, Ana: middle initial C (2) before M (1). Order: 3, 4, 2, 1.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Compare: "Philippine National Police" and "Philippine National Pollce." Are they the same?',
    ['Same', 'Different — "Police" vs "Pollce"', 'Cannot determine', 'Same except for capitalization'],
    1,
    'The second entry spells "Pollce" with double "l" instead of "Police." They are different.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following codes is different from the others?',
    ['MNL-20240815-A', 'MNL-20240815-A', 'MNL-20240815-A', 'MNL-20240B15-A'],
    3,
    'The fourth code has "0B15" instead of "0815." The letter B replaces the digit 8, making it different.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'In a filing system, where would you file "Bureau of Internal Revenue"?',
    ['Under B for Bureau', 'Under I for Internal', 'Under R for Revenue', 'Under G for Government'],
    0,
    'In standard filing, government agencies are filed by their official name. "Bureau" is the first word, so it is filed under B.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Identify the error in the following sentence: "The employes submitted there reports on time."',
    ['No error', '"employes" should be "employees" and "there" should be "their"', '"employes" should be "employees" only', '"there" should be "their" only'],
    1,
    'There are two errors: "employes" should be "employees" (correct spelling) and "there" should be "their" (possessive pronoun).'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Compare these numbers carefully: 9,847,231 and 9,847,321. Are they the same or different?',
    ['Same', 'Different', 'Same except for commas', 'Cannot be compared'],
    1,
    'The numbers differ: 9,847,231 vs 9,847,321. The fifth and sixth digits are swapped (23 vs 32).'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which group of names is in correct alphabetical order?',
    [
      'Cruz, De Leon, Dela Cruz, Del Rosario',
      'Cruz, De Leon, Del Rosario, Dela Cruz',
      'Cruz, Del Rosario, De Leon, Dela Cruz',
      'Cruz, Dela Cruz, De Leon, Del Rosario'
    ],
    1,
    'Alphabetical order treats spaces as coming before letters. The correct order: Cruz, De Leon (D-E-space-L), Del Rosario (D-E-L-space-R), Dela Cruz (D-E-L-A).'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A clerk processes 45 documents per hour. How many documents can be processed in a 7.5-hour workday?',
    ['315', '337', '338', '340'],
    2,
    '45 documents/hour × 7.5 hours = 337.5. Since partial documents round to the nearest whole number, the answer is 338. However, in practice, 45 × 7.5 = 337.5, and since you cannot process half a document, the answer is 337 or 338 depending on rounding. 45 × 7 = 315, 45 × 0.5 = 22.5, total = 337.5 ≈ 338.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following addresses does NOT match the others?',
    [
      '27-B Rizal Ave., Makati City',
      '27-B Rizal Ave., Makati City',
      '27-B Rizal Ave., Makati City',
      '27-B Rizal Ave., Makati Clty'
    ],
    3,
    'The fourth address has "Clty" instead of "City" (lowercase L instead of i). It does not match the others.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'If documents are coded as follows: Memo = M, Letter = L, Report = R, Circular = C, what is the code for a batch containing 3 Memos, 2 Letters, and 1 Report?',
    ['3M-2L-1R', 'MMMLLL', 'M3L2R1', '3M-2L-R'],
    0,
    'Following standard coding convention, each document type is prefixed with its quantity and separated by hyphens: 3M-2L-1R.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following words is spelled INCORRECTLY?',
    ['Accommodation', 'Acknowledgement', 'Acquaintance', 'Adolescense'],
    3,
    '"Adolescense" is incorrect. The correct spelling is "adolescence" with a "c" before the final "e."'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Compare: Reference No. TRN-2024-08876 and Reference No. TRN-2024-08876. Are they the same?',
    ['Same', 'Different', 'Only the numbers match', 'Only the letters match'],
    0,
    'Both reference numbers are TRN-2024-08876. They are exactly the same.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'In filing, which name comes LAST alphabetically?',
    ['Villanueva, Roberto S.', 'Villareal, Roberto S.', 'Villafuerte, Roberto S.', 'Villamor, Roberto S.'],
    1,
    'Comparing after "Villa": Villafu-erte, Villam-or, Villan-ueva, Villar-eal. Alphabetically: f < m < n < r. Villareal comes last.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Detect the error: "The commitee will conviene at 2:00 PM in the conference room."',
    ['No error', '"commitee" should be "committee"', '"conviene" should be "convene"', 'Both "commitee" and "conviene" are misspelled'],
    3,
    'Both words are misspelled: "commitee" should be "committee" (double "m" and double "t"), and "conviene" should be "convene."'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which pair of numbers is NOT identical?',
    ['5738291 and 5738291', '4829163 and 4829163', '6174053 and 6174053', '3928471 and 3928741'],
    3,
    'In the fourth pair, 3928471 vs 3928741: the last three digits differ (471 vs 741). The digits 4, 7, and 1 are rearranged.'
  ),

  // CLERICAL — HARD (6)
  q(QC.CLERICAL_ABILITY, D.HARD,
    'Arrange in correct filing order: (1) San Juan, Patricia L. (2) San Jose, Patricia L. (3) Sanchez, Patricia L. (4) San Andres, Patricia L. (5) Santos, Patricia L. Which is correct?',
    ['4, 2, 1, 3, 5', '3, 4, 2, 1, 5', '4, 2, 1, 5, 3', '2, 4, 1, 3, 5'],
    0,
    'Filing order: San Andres (4) — "San A", San Jose (2) — "San J", San Juan (1) — "San Ju", Sanchez (3) — "Sanc", Santos (5) — "Sant". Order: 4, 2, 1, 3, 5.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'Compare the following entries carefully and identify how many differences exist:\nEntry A: DPWH-RO3-2024-0847-LZ\nEntry B: DPWH-RO3-2024-0847-LZ\nEntry C: DPWH-R03-2024-0847-LZ\nEntry D: DPWH-RO3-2024-0847-LZ',
    ['No differences', 'One difference (Entry C)', 'Two differences', 'Three differences'],
    1,
    'Entry C has "R03" (with zero) instead of "RO3" (with letter O). Entries A, B, and D are identical. Only Entry C differs.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'A government office uses the coding system: Region (2 digits) - Province (3 letters) - Year (4 digits) - Sequence (4 digits). Which code follows this format correctly?',
    ['03-CAV-2024-0012', '3-CAV-2024-0012', '03-CA-2024-0012', '03-CAV-24-0012'],
    0,
    'The correct format requires: 2-digit region (03), 3-letter province (CAV), 4-digit year (2024), and 4-digit sequence (0012). Only "03-CAV-2024-0012" follows all rules.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'Examine these five telephone numbers and identify which one is DIFFERENT from the rest:\n(1) (02) 8846-7231\n(2) (02) 8846-7231\n(3) (02) 8846-7231\n(4) (02) 8846-7231\n(5) (02) 8846-7321',
    ['Number 1', 'Number 3', 'Number 4', 'Number 5'],
    3,
    'Number 5 has 7321 at the end instead of 7231. The digits 2 and 3 are swapped in the last four digits.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'If files are organized by: (1) Year, (2) Department Code alphabetically, (3) Document number, which sequence is correct?\nA: 2023-ADMIN-001\nB: 2023-BUDGET-002\nC: 2024-ADMIN-001\nD: 2023-ADMIN-003',
    ['A, D, B, C', 'A, B, D, C', 'C, A, D, B', 'B, A, D, C'],
    0,
    'Sort by year first (2023 before 2024), then by department (ADMIN before BUDGET), then by number (001 before 003). Order: A(2023-ADMIN-001), D(2023-ADMIN-003), B(2023-BUDGET-002), C(2024-ADMIN-001).'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'A proofreader finds errors in a document. Which sentence is FREE of errors?',
    [
      'The goverment impliments new policys every year.',
      'The government implements new policies every year.',
      'The government impliments new policies every year.',
      'The goverment implements new policies every year.'
    ],
    1,
    'Option B is error-free. Option A has three errors: "goverment" (government), "impliments" (implements), "policys" (policies). Option C has "impliments." Option D has "goverment."'
  ),
];
