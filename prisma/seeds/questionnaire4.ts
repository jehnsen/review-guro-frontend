import { QuestionCategory as QC, Difficulty as D } from '@prisma/client';
import { q, SeedQuestion } from './types';

export const questionnaire4: SeedQuestion[] = [
  // ========================================================
  // VERBAL ABILITY — 40 questions (12 EASY, 20 MEDIUM, 8 HARD)
  // ========================================================

  // VERBAL ABILITY — EASY (12)
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word most similar in meaning to "DILIGENT".',
    ['Lazy', 'Hardworking', 'Careless', 'Indifferent'],
    1,
    '"Diligent" means showing careful and persistent effort. "Hardworking" is the closest synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word most opposite in meaning to "TIMID".',
    ['Shy', 'Fearful', 'Bold', 'Quiet'],
    2,
    '"Timid" means lacking courage or confidence. "Bold" is the opposite, meaning courageous and confident.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Which of the following words is spelled correctly?',
    ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'],
    2,
    '"Accommodate" is the correct spelling with double "c" and double "m".'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Select the correct word to complete the sentence: "The manager _____ the employees for their excellent performance."',
    ['commended', 'commanded', 'commenced', 'commented'],
    0,
    '"Commended" means to praise formally. The manager praised the employees for their performance.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word most similar in meaning to "CONCEAL".',
    ['Reveal', 'Hide', 'Display', 'Announce'],
    1,
    '"Conceal" means to keep something secret or hidden. "Hide" is the closest synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Identify the sentence with correct grammar.',
    ['She don\'t know the answer.', 'She doesn\'t knows the answer.', 'She doesn\'t know the answer.', 'She don\'t knows the answer.'],
    2,
    'With third-person singular subjects (she, he, it), we use "doesn\'t" + base form of the verb: "She doesn\'t know."'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word most opposite in meaning to "ABUNDANT".',
    ['Plentiful', 'Scarce', 'Numerous', 'Excessive'],
    1,
    '"Abundant" means existing in large quantities. "Scarce" means insufficient or in short supply, the direct opposite.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Fill in the blank: "The teacher asked the students to _____ their homework before the deadline."',
    ['submit', 'summit', 'summon', 'sublet'],
    0,
    '"Submit" means to hand in or present for consideration. Students submit homework to teachers.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Which of the following words is spelled correctly?',
    ['Enviroment', 'Envronment', 'Environment', 'Enviornment'],
    2,
    '"Environment" is the correct spelling. A common error is omitting the "n" before "ment".'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word most similar in meaning to "CANDID".',
    ['Secretive', 'Deceptive', 'Honest', 'Cautious'],
    2,
    '"Candid" means truthful and straightforward. "Honest" is the closest synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'Identify the sentence with correct subject-verb agreement.',
    ['The group of students are studying.', 'The group of students is studying.', 'The group of students were studying.', 'The group of students have studied.'],
    1,
    '"Group" is a collective noun treated as singular. The correct form is "The group... is studying."'
  ),
  q(QC.VERBAL_ABILITY, D.EASY,
    'What does the idiomatic expression "break the ice" mean?',
    ['To cause damage', 'To initiate conversation in a social setting', 'To cool down a drink', 'To end a relationship'],
    1,
    '"Break the ice" means to do or say something to relieve tension or start a conversation in an awkward social situation.'
  ),

  // VERBAL ABILITY — MEDIUM (20)
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'PAINTER is to CANVAS as AUTHOR is to _____.',
    ['Pen', 'Library', 'Manuscript', 'Reader'],
    2,
    'A painter creates on a canvas; an author creates a manuscript. Both relate a creator to the medium they produce.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "PRAGMATIC".',
    ['Idealistic', 'Theoretical', 'Practical', 'Emotional'],
    2,
    '"Pragmatic" means dealing with things sensibly and realistically. "Practical" is the closest synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which sentence uses the correct form of the word?',
    ['The affect of the new policy was immediate.', 'The effect of the new policy was immediate.', 'The new policy was affective immediately.', 'The new policy effected everyone.'],
    1,
    '"Effect" (noun) means result or outcome. "The effect of the new policy" is correct. "Affect" is typically a verb.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Select the word that best completes the sentence: "The witness gave a _____ account of the events, leaving out no details."',
    ['brief', 'comprehensive', 'vague', 'superficial'],
    1,
    '"Comprehensive" means complete and including all relevant details. It fits the context of "leaving out no details."'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'MICROSCOPE is to BIOLOGIST as TELESCOPE is to _____.',
    ['Physicist', 'Astronomer', 'Chemist', 'Mathematician'],
    1,
    'A biologist uses a microscope to study small organisms; an astronomer uses a telescope to study celestial objects.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most opposite in meaning to "MUNDANE".',
    ['Ordinary', 'Routine', 'Extraordinary', 'Dull'],
    2,
    '"Mundane" means lacking interest or excitement; ordinary. "Extraordinary" means very unusual or remarkable, the opposite.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which of the following sentences is grammatically correct?',
    ['Neither the teacher nor the students was present.', 'Neither the teacher nor the students were present.', 'Neither the teacher nor the students is present.', 'Neither the teacher nor the students has been present.'],
    1,
    'With "neither...nor," the verb agrees with the nearer subject. "Students" is plural, so "were" is correct.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the best word to complete the sentence: "The politician\'s speech was filled with _____, making grand promises without substance."',
    ['rhetoric', 'logic', 'evidence', 'statistics'],
    0,
    '"Rhetoric" refers to persuasive language, especially that which is insincere or exaggerated — fitting "grand promises without substance."'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What does the idiom "burn the midnight oil" mean?',
    ['To waste resources', 'To study or work late into the night', 'To start a fire', 'To cook a late dinner'],
    1,
    '"Burn the midnight oil" means to work or study late at night, originally referring to using oil lamps for light.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Read the passage: "The Philippines, an archipelago of over 7,600 islands, boasts one of the longest coastlines in the world. This geographic feature has shaped the nation\'s culture, economy, and way of life." What is the main idea?',
    ['The Philippines has many islands.', 'The Philippine coastline has significantly influenced national identity.', 'The Philippines is the largest archipelago.', 'Filipino culture is diverse.'],
    1,
    'The passage states that the geographic feature (long coastline) has shaped culture, economy, and way of life, making national influence the main idea.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Select the correct word: "The committee will _____ the proposal at next week\'s meeting."',
    ['review', 'revue', 'reveiw', 'reeview'],
    0,
    '"Review" means to assess or examine something formally. "Revue" is a type of theatrical show; the others are misspellings.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'GLOVE is to HAND as BOOT is to _____.',
    ['Leg', 'Foot', 'Shoe', 'Sock'],
    1,
    'A glove covers a hand; a boot covers a foot. Both describe protective coverings for body parts.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "METICULOUS".',
    ['Careless', 'Painstaking', 'Hasty', 'Reckless'],
    1,
    '"Meticulous" means showing great attention to detail. "Painstaking" means done with great care, the closest synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which sentence contains a misplaced modifier?',
    ['Walking to the office, the rain began to fall.', 'She quickly finished the report.', 'The manager approved the budget request.', 'He carefully reviewed the documents.'],
    0,
    '"Walking to the office, the rain began to fall" is a dangling modifier. Rain cannot walk. It should be: "Walking to the office, she noticed the rain."'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most opposite in meaning to "LETHARGIC".',
    ['Sluggish', 'Drowsy', 'Energetic', 'Weary'],
    2,
    '"Lethargic" means lacking energy or enthusiasm. "Energetic" means showing great activity and vitality, the opposite.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Fill in the blank: "Despite the heavy workload, she remained _____ and completed all tasks on time."',
    ['composure', 'composed', 'composing', 'composition'],
    1,
    '"Composed" is an adjective meaning calm and in control of one\'s emotions. It correctly describes "she" after "remained."'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'In the sentence "The new policy, which was implemented last month, has significantly reduced employee turnover," what is the function of the clause "which was implemented last month"?',
    ['It is the main clause.', 'It is a restrictive clause.', 'It is a non-restrictive clause providing additional information.', 'It is an independent clause.'],
    2,
    'The clause is set off by commas and provides extra information about the policy. It is a non-restrictive (non-essential) clause.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the correct word: "The data _____ that customer satisfaction has improved."',
    ['suggests', 'suggest', 'suggesting', 'are suggesting'],
    1,
    '"Data" is technically a plural noun (singular: datum). The correct usage is "The data suggest." In formal writing, "data" takes a plural verb.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What does the expression "a blessing in disguise" mean?',
    ['A hidden talent', 'Something that seems bad but turns out to be good', 'A secret gift', 'A religious ceremony'],
    1,
    '"A blessing in disguise" means an apparent misfortune that eventually has good results.'
  ),
  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'DROUGHT is to RAIN as FAMINE is to _____.',
    ['Hunger', 'Food', 'Disease', 'Poverty'],
    1,
    'A drought is a lack of rain; a famine is a lack of food. Both analogies describe a shortage and what is lacking.'
  ),

  // VERBAL ABILITY — HARD (8)
  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word most similar in meaning to "OBSEQUIOUS".',
    ['Rebellious', 'Servile', 'Dominant', 'Independent'],
    1,
    '"Obsequious" means excessively compliant or eager to please in a servile way. "Servile" is the closest synonym.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Read the passage: "While empirical evidence supports the effectiveness of cognitive behavioral therapy for anxiety disorders, some researchers argue that its long-term efficacy remains unproven due to the limited duration of most clinical trials. They advocate for longitudinal studies spanning at least five years." What can be inferred?',
    ['Cognitive behavioral therapy is ineffective.', 'All researchers agree on the therapy\'s effectiveness.', 'There is a need for more extended research on long-term outcomes.', 'Clinical trials are unnecessary.'],
    2,
    'The passage discusses the call for longitudinal studies due to limited trial durations, implying a need for more extended research.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word most opposite in meaning to "EPHEMERAL".',
    ['Transient', 'Permanent', 'Fleeting', 'Momentary'],
    1,
    '"Ephemeral" means lasting for a very short time. "Permanent" means lasting forever, the direct opposite.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Identify the correct sentence.',
    ['Whom is responsible for this project?', 'Who is responsible for this project?', 'Whom are responsible for this project?', 'Whomever is responsible for this project?'],
    1,
    '"Who" is the subject pronoun used when it functions as the subject of the verb "is." "Whom" is used as an object pronoun.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the best word to complete the sentence: "The CEO\'s _____ leadership style alienated many employees, as she made decisions unilaterally without consulting her team."',
    ['democratic', 'autocratic', 'laissez-faire', 'collaborative'],
    1,
    '"Autocratic" means ruling with absolute authority. Making decisions unilaterally without consulting others is characteristic of autocratic leadership.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'PARADOX is to CONTRADICTION as HYPERBOLE is to _____.',
    ['Understatement', 'Exaggeration', 'Metaphor', 'Irony'],
    1,
    'A paradox involves a contradiction; hyperbole involves exaggeration. Both relate a literary device to its defining characteristic.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Which sentence demonstrates correct use of the subjunctive mood?',
    ['If I was the manager, I would approve the request.', 'If I were the manager, I would approve the request.', 'If I am the manager, I would approve the request.', 'If I be the manager, I would approve the request.'],
    1,
    'The subjunctive mood uses "were" (not "was") for hypothetical or contrary-to-fact conditions. "If I were the manager" is correct.'
  ),
  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word most similar in meaning to "PERFUNCTORY".',
    ['Thorough', 'Enthusiastic', 'Cursory', 'Deliberate'],
    2,
    '"Perfunctory" means carried out with minimal effort or reflection. "Cursory" means hasty and not thorough, the closest synonym.'
  ),

  // ========================================================
  // NUMERICAL ABILITY — 40 questions (12 EASY, 20 MEDIUM, 8 HARD)
  // ========================================================

  // NUMERICAL ABILITY — EASY (12)
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 3/4 + 1/8?',
    ['5/8', '7/8', '4/8', '1/2'],
    1,
    '3/4 = 6/8. So 6/8 + 1/8 = 7/8.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A notebook costs ₱45. How much will 8 notebooks cost?',
    ['₱320', '₱340', '₱360', '₱380'],
    2,
    '₱45 x 8 = ₱360.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 25% of 480?',
    ['100', '110', '120', '130'],
    2,
    '25% of 480 = (25/100) x 480 = 0.25 x 480 = 120.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If you have ₱1,000 and spend ₱375, how much change do you have?',
    ['₱575', '₱600', '₱625', '₱650'],
    2,
    '₱1,000 - ₱375 = ₱625.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is the next number in the series: 5, 10, 15, 20, ___?',
    ['22', '24', '25', '30'],
    2,
    'The pattern adds 5 each time. 20 + 5 = 25.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'Convert 0.75 to a fraction in simplest form.',
    ['3/4', '7/10', '75/10', '15/20'],
    0,
    '0.75 = 75/100 = 3/4 when simplified by dividing both numerator and denominator by 25.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A store sells 3 mangoes for ₱60. How much does one mango cost?',
    ['₱15', '₱18', '₱20', '₱25'],
    2,
    '₱60 / 3 = ₱20 per mango.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 18 x 12?',
    ['196', '206', '216', '226'],
    2,
    '18 x 12 = 216. (18 x 10 = 180, 18 x 2 = 36, 180 + 36 = 216).'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If a pen costs ₱12.50, how much do 4 pens cost?',
    ['₱48.00', '₱50.00', '₱52.00', '₱54.00'],
    1,
    '₱12.50 x 4 = ₱50.00.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 1,296 divided by 12?',
    ['98', '104', '108', '112'],
    2,
    '1,296 / 12 = 108.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A rectangular room is 6 meters long and 4 meters wide. What is its area?',
    ['20 sq. meters', '24 sq. meters', '28 sq. meters', '10 sq. meters'],
    1,
    'Area = length x width = 6 x 4 = 24 square meters.'
  ),
  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 5/6 of 42?',
    ['30', '33', '35', '36'],
    2,
    '5/6 of 42 = (5 x 42) / 6 = 210 / 6 = 35.'
  ),

  // NUMERICAL ABILITY — MEDIUM (20)
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A government employee earns ₱25,000 per month. If her salary increases by 8%, what is her new monthly salary?',
    ['₱26,500', '₱27,000', '₱27,500', '₱28,000'],
    1,
    'Increase = 8% of ₱25,000 = ₱2,000. New salary = ₱25,000 + ₱2,000 = ₱27,000.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If the ratio of boys to girls in a class is 3:5 and there are 24 boys, how many girls are there?',
    ['30', '35', '40', '45'],
    2,
    'Boys/Girls = 3/5. If boys = 24, then 24/girls = 3/5. Girls = (24 x 5) / 3 = 40.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A worker can finish a job in 12 days. Another worker can finish the same job in 18 days. Working together, how many days will it take them?',
    ['6.2 days', '7.2 days', '8.0 days', '9.0 days'],
    1,
    'Combined rate = 1/12 + 1/18 = 3/36 + 2/36 = 5/36. Time = 36/5 = 7.2 days.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A merchant bought an item for ₱800 and sold it for ₱1,040. What is the percentage profit?',
    ['25%', '28%', '30%', '32%'],
    2,
    'Profit = ₱1,040 - ₱800 = ₱240. Percentage profit = (240/800) x 100 = 30%.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the next number in the series: 3, 7, 15, 31, ___?',
    ['47', '55', '63', '67'],
    2,
    'Each number is doubled and then 1 is added: 3x2+1=7, 7x2+1=15, 15x2+1=31, 31x2+1=63.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'Maria is 4 years older than twice the age of Jose. If Jose is 12 years old, how old is Maria?',
    ['24', '26', '28', '30'],
    2,
    'Maria\'s age = 2(12) + 4 = 24 + 4 = 28 years old.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A car travels at 80 km/h for 2.5 hours. What distance does it cover?',
    ['180 km', '190 km', '200 km', '210 km'],
    2,
    'Distance = Speed x Time = 80 x 2.5 = 200 km.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If ₱15,000 is invested at 6% simple interest per year, how much interest is earned after 3 years?',
    ['₱2,400', '₱2,550', '₱2,700', '₱2,850'],
    2,
    'Simple Interest = Principal x Rate x Time = ₱15,000 x 0.06 x 3 = ₱2,700.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'In a survey, 240 out of 800 respondents preferred option A. What percentage is this?',
    ['25%', '28%', '30%', '32%'],
    2,
    '(240/800) x 100 = 30%.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'Solve for x: 3x + 7 = 28',
    ['5', '6', '7', '8'],
    2,
    '3x + 7 = 28. 3x = 21. x = 7.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A cylindrical water tank has a radius of 3 meters and a height of 7 meters. What is its volume? (Use pi = 3.14)',
    ['178.28 cu. m', '186.42 cu. m', '197.82 cu. m', '201.06 cu. m'],
    2,
    'Volume = pi x r^2 x h = 3.14 x 9 x 7 = 3.14 x 63 = 197.82 cubic meters.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A shirt originally priced at ₱850 is on sale for 15% off. What is the sale price?',
    ['₱697.50', '₱710.00', '₱722.50', '₱735.00'],
    2,
    'Discount = 15% of ₱850 = ₱127.50. Sale price = ₱850 - ₱127.50 = ₱722.50.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the average of 78, 85, 92, 88, and 67?',
    ['80', '82', '84', '86'],
    1,
    'Sum = 78 + 85 + 92 + 88 + 67 = 410. Average = 410 / 5 = 82.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A rectangular garden is 15 meters long and 9 meters wide. If fencing costs ₱120 per meter, how much will it cost to fence the entire garden?',
    ['₱5,280', '₱5,520', '₱5,760', '₱6,000'],
    2,
    'Perimeter = 2(15 + 9) = 2(24) = 48 meters. Cost = 48 x ₱120 = ₱5,760.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If 5 workers can complete a project in 20 days, how many days will 10 workers take to complete the same project?',
    ['8 days', '10 days', '12 days', '15 days'],
    1,
    'Workers x Days = constant. 5 x 20 = 100 worker-days. 10 workers: 100/10 = 10 days.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A bag contains 4 red, 6 blue, and 5 green marbles. What is the probability of drawing a blue marble?',
    ['1/3', '2/5', '1/5', '6/15'],
    1,
    'Total marbles = 4 + 6 + 5 = 15. Probability = 6/15 = 2/5.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'Convert 2 hours and 45 minutes to minutes.',
    ['145 minutes', '155 minutes', '165 minutes', '175 minutes'],
    2,
    '2 hours = 120 minutes. 120 + 45 = 165 minutes.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A fruit vendor bought 50 kg of mangoes at ₱80 per kg and sold them at ₱110 per kg. What is his total profit?',
    ['₱1,200', '₱1,350', '₱1,500', '₱1,650'],
    2,
    'Cost = 50 x ₱80 = ₱4,000. Revenue = 50 x ₱110 = ₱5,500. Profit = ₱5,500 - ₱4,000 = ₱1,500.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If the perimeter of a square is 52 cm, what is the length of one side?',
    ['11 cm', '12 cm', '13 cm', '14 cm'],
    2,
    'A square has 4 equal sides. Side = Perimeter / 4 = 52 / 4 = 13 cm.'
  ),
  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A school has 420 students. If 3/7 of them are female, how many male students are there?',
    ['180', '200', '220', '240'],
    3,
    'Female students = 3/7 x 420 = 180. Male students = 420 - 180 = 240.'
  ),

  // NUMERICAL ABILITY — HARD (8)
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A tank is filled by pipe A in 10 hours and by pipe B in 15 hours. Pipe C can empty the full tank in 30 hours. If all three pipes are opened simultaneously, how long will it take to fill the tank?',
    ['6 hours', '7.5 hours', '8 hours', '9 hours'],
    1,
    'Rate: A = 1/10, B = 1/15, C = -1/30. Combined = 1/10 + 1/15 - 1/30 = 3/30 + 2/30 - 1/30 = 4/30 = 2/15. Time = 15/2 = 7.5 hours.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'The sum of three consecutive even numbers is 126. What is the largest of these numbers?',
    ['40', '42', '44', '46'],
    2,
    'Let the numbers be x, x+2, x+4. 3x + 6 = 126. 3x = 120. x = 40. The largest is 40 + 4 = 44.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A boat can travel 24 km upstream in 3 hours and 24 km downstream in 2 hours. What is the speed of the current?',
    ['1 km/h', '2 km/h', '3 km/h', '4 km/h'],
    1,
    'Upstream speed = 24/3 = 8 km/h. Downstream speed = 24/2 = 12 km/h. Current = (12 - 8) / 2 = 2 km/h.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'If ₱50,000 is invested at 5% compound interest compounded annually, what is the total amount after 2 years?',
    ['₱54,875', '₱55,000', '₱55,125', '₱55,250'],
    2,
    'A = P(1 + r)^n = 50,000(1.05)^2 = 50,000 x 1.1025 = ₱55,125.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'In a class, 60% of students passed in Math, 70% passed in English, and 40% passed in both. What percentage of students failed in both subjects?',
    ['5%', '10%', '15%', '20%'],
    1,
    'Using inclusion-exclusion: passed at least one = 60 + 70 - 40 = 90%. Failed both = 100 - 90 = 10%.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A father is 30 years older than his son. In 5 years, the father\'s age will be three times his son\'s age. What is the son\'s current age?',
    ['8 years', '10 years', '12 years', '14 years'],
    1,
    'Let son = x. Father = x + 30. In 5 years: (x + 35) = 3(x + 5). x + 35 = 3x + 15. 20 = 2x. x = 10.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A mixture contains milk and water in the ratio 5:3. If 16 liters of the mixture is removed and replaced with water, the ratio becomes 3:5. What was the original quantity of the mixture?',
    ['32 liters', '36 liters', '40 liters', '48 liters'],
    0,
    'Let total = T. Original milk = 5T/8, water = 3T/8. Removing 16L removes 10L milk and 6L water (in the 5:3 ratio). After removal: milk = 5T/8 - 10, water = 3T/8 - 6. Adding 16L of water: water = 3T/8 - 6 + 16 = 3T/8 + 10. New ratio milk:water = 3:5, so (5T/8 - 10)/(3T/8 + 10) = 3/5. Cross-multiply: 25T/8 - 50 = 9T/8 + 30. Solving: 16T/8 = 80, so 2T = 80, T = 40 liters.'
  ),
  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A train 150 meters long passes a platform 250 meters long in 20 seconds. What is the speed of the train in km/h?',
    ['54 km/h', '63 km/h', '72 km/h', '81 km/h'],
    2,
    'Total distance = 150 + 250 = 400 meters. Speed = 400/20 = 20 m/s. Converting: 20 x 3.6 = 72 km/h.'
  ),

  // ========================================================
  // ANALYTICAL ABILITY — 30 questions (9 EASY, 15 MEDIUM, 6 HARD)
  // ========================================================

  // ANALYTICAL ABILITY — EASY (9)
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'What comes next in the series: A, C, E, G, ___?',
    ['H', 'I', 'J', 'K'],
    1,
    'The series consists of every other letter of the alphabet: A(skip B), C(skip D), E(skip F), G(skip H), I.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Which one does NOT belong in the group?',
    ['Mango', 'Apple', 'Carrot', 'Banana'],
    2,
    'Mango, Apple, and Banana are fruits. Carrot is a vegetable, so it does not belong.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If January = 1 and March = 3, what number represents June?',
    ['5', '6', '7', '8'],
    1,
    'Each month is assigned its chronological number. June is the 6th month, so June = 6.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Complete the sequence: 100, 90, 80, 70, ___?',
    ['50', '55', '60', '65'],
    2,
    'The sequence decreases by 10 each time. 70 - 10 = 60.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If all dogs are animals, and Rex is a dog, what can we conclude?',
    ['Rex is a cat.', 'Rex is an animal.', 'All animals are dogs.', 'Rex is not an animal.'],
    1,
    'Since all dogs are animals and Rex is a dog, Rex must be an animal. This is a simple syllogism.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Which shape is the odd one out?',
    ['Circle', 'Oval', 'Triangle', 'Ellipse'],
    2,
    'Circle, Oval, and Ellipse are all curved shapes with no straight edges. Triangle has straight sides and angles.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Pedro is taller than Juan. Juan is taller than Marco. Who is the tallest?',
    ['Juan', 'Marco', 'Pedro', 'Cannot be determined'],
    2,
    'Pedro > Juan > Marco. Pedro is the tallest.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Find the next number: 2, 6, 18, 54, ___?',
    ['108', '126', '144', '162'],
    3,
    'Each number is multiplied by 3: 2x3=6, 6x3=18, 18x3=54, 54x3=162.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If you rearrange the letters "LPIHPNEPIS," you get the name of a:',
    ['Country', 'City', 'Animal', 'Food'],
    0,
    'Rearranging "LPIHPNEPIS" gives "PHILIPPINES," which is a country.'
  ),

  // ANALYTICAL ABILITY — MEDIUM (15)
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Statement: All government employees must follow RA 6713. Ana is a government employee. Conclusion: Ana must follow RA 6713. Is this conclusion:',
    ['Definitely true', 'Probably true', 'Probably false', 'Definitely false'],
    0,
    'Since all government employees must follow RA 6713 and Ana is a government employee, the conclusion is definitely true.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Complete the series: 4, 9, 16, 25, 36, ___?',
    ['42', '45', '47', '49'],
    3,
    'These are perfect squares: 2^2=4, 3^2=9, 4^2=16, 5^2=25, 6^2=36, 7^2=49.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a certain code language, FISH is written as EHRG. How is BIRD written?',
    ['AHQC', 'CHSE', 'DKUF', 'AKPC'],
    0,
    'Each letter is shifted one position backward in the alphabet: F->E, I->H, S->R, H->G. Applying to BIRD: B->A, I->H, R->Q, D->C = AHQC.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If "APPLE" is coded as 50 (A=1, P=16, P=16, L=12, E=5), what is the code for "CAT"?',
    ['24', '27', '30', '33'],
    0,
    'C=3, A=1, T=20. Sum = 3 + 1 + 20 = 24.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'A man walks 5 km north, then 3 km east, then 5 km south. How far is he from his starting point?',
    ['2 km', '3 km', '5 km', '8 km'],
    1,
    'Walking 5 km north and then 5 km south brings him back to the same latitude. He is only 3 km east of his starting point.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Which number does NOT fit the pattern? 3, 6, 12, 20, 24, 48',
    ['6', '12', '20', '48'],
    2,
    'The pattern doubles each time: 3, 6, 12, 24, 48. The number 20 does not fit this doubling pattern.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'All teachers are graduates. Some graduates are professionals. Which conclusion is valid?',
    ['All teachers are professionals.', 'Some teachers may be professionals.', 'No teachers are professionals.', 'All professionals are teachers.'],
    1,
    'Since all teachers are graduates and some graduates are professionals, some teachers may be professionals. We cannot say "all" or "none" definitively.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If P > Q, R > S, and Q > R, which of the following is true?',
    ['S > P', 'P > S', 'Q < S', 'R > P'],
    1,
    'P > Q > R > S. Therefore, P > S is true.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a row of children, Liza is 8th from the left and 12th from the right. How many children are in the row?',
    ['18', '19', '20', '21'],
    1,
    'Total = position from left + position from right - 1 = 8 + 12 - 1 = 19.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If the day before yesterday was Wednesday, what day will it be the day after tomorrow?',
    ['Saturday', 'Sunday', 'Monday', 'Tuesday'],
    1,
    'If day before yesterday was Wednesday, then yesterday was Thursday, today is Friday. Tomorrow is Saturday. Day after tomorrow is Sunday.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Complete the series: Z, X, V, T, ___?',
    ['S', 'R', 'Q', 'P'],
    1,
    'The series goes backward, skipping one letter each time: Z(skip Y), X(skip W), V(skip U), T(skip S), R.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Statement 1: Some pens are pencils. Statement 2: All pencils are markers. Conclusion: Some pens are markers. Is this conclusion:',
    ['Definitely true', 'Probably true', 'Cannot be determined', 'Definitely false'],
    0,
    'Since some pens are pencils and all pencils are markers, those pens that are pencils must also be markers. So "some pens are markers" is definitely true.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Find the odd one out: 121, 144, 169, __(196)__, 225, __(250)__.',
    ['196', '225', '250', '144'],
    2,
    '121=11^2, 144=12^2, 169=13^2, 196=14^2, 225=15^2. These are perfect squares. 250 is not a perfect square (it falls between 15^2=225 and 16^2=256).'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Ana is the sister of Ben. Ben is the son of Carlos. Carlos is the father of Diana. What is the relationship between Ana and Diana?',
    ['Mother and daughter', 'Sisters', 'Cousins', 'Aunt and niece'],
    1,
    'Ben is the son of Carlos, and Ana is Ben\'s sister. Diana is also Carlos\'s child. Therefore, Ana and Diana are sisters.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'A clock shows 3:15. What is the angle between the hour and minute hands?',
    ['0 degrees', '7.5 degrees', '15 degrees', '22.5 degrees'],
    1,
    'At 3:15, the minute hand is at 90 degrees (pointing at 3). The hour hand has moved past the 3 by 15 minutes: 0.5 degrees/min x 15 = 7.5 degrees. So the angle is 7.5 degrees.'
  ),

  // ANALYTICAL ABILITY — HARD (6)
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Five friends — A, B, C, D, and E — sit in a row. A sits next to B. C does not sit next to D. E sits at one end. B sits in the middle. Who sits at the other end?',
    ['A', 'C', 'D', 'Cannot be determined'],
    2,
    'B is in position 3 (middle). A sits next to B, so A is in position 2 or 4. E is at one end (position 1 or 5). C does not sit next to D. If E is at position 1: possible arrangement is E, A, B, C, D or E, A, B, D, C. Since C cannot sit next to D, we need them separated. E, A, B, C, D — here C(4) is next to D(5), not allowed. E, A, B, D, C — here D(4) is next to C(5), also not allowed. So A must be in position 4: E, _, B, A, _. C and D go in positions 2 and 5. D at position 5, C at position 2: E, C, B, A, D — C(2) is not next to D(5). Valid! D sits at the other end.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Find the next number in the series: 1, 1, 2, 3, 5, 8, 13, ___?',
    ['18', '20', '21', '26'],
    2,
    'This is the Fibonacci sequence where each number is the sum of the two preceding numbers: 8 + 13 = 21.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'In a group of 50 people, 30 speak Filipino, 25 speak English, and 10 speak both. How many speak neither language?',
    ['3', '5', '7', '10'],
    1,
    'Using inclusion-exclusion: speak at least one = 30 + 25 - 10 = 45. Speak neither = 50 - 45 = 5.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'If the letters of the word "EXAMINATION" are arranged alphabetically, which letter will be in the 6th position?',
    ['I', 'M', 'N', 'A'],
    1,
    'EXAMINATION has the letters: A, A, E, I, I, M, N, N, O, T, X. Arranged alphabetically: 1-A, 2-A, 3-E, 4-I, 5-I, 6-M, 7-N, 8-N, 9-O, 10-T, 11-X. The 6th position is M.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'A cube is painted red on all six faces and then cut into 27 equal smaller cubes. How many smaller cubes have exactly two faces painted red?',
    ['6', '8', '12', '18'],
    2,
    'When a cube is cut into 27 (3x3x3) smaller cubes: corner cubes have 3 painted faces (8 cubes), edge cubes have 2 painted faces (12 cubes), face-center cubes have 1 painted face (6 cubes), and the center cube has 0 painted faces (1 cube). Cubes with exactly 2 painted faces = 12.'
  ),
  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Consider the statements: (1) All managers are leaders. (2) Some leaders are innovators. (3) No innovators are followers. Which conclusion is valid?',
    ['All managers are innovators.', 'Some managers may be innovators.', 'No managers are followers.', 'All innovators are managers.'],
    1,
    'From (1) and (2): All managers are leaders, and some leaders are innovators. So some managers may be innovators (but not necessarily all). We cannot conclude (3) applies to all managers since not all managers are necessarily innovators.'
  ),

  // ========================================================
  // GENERAL INFORMATION — 30 questions (9 EASY, 15 MEDIUM, 6 HARD)
  // ========================================================

  // GENERAL INFORMATION — EASY (9)
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the largest island in the Philippines?',
    ['Mindanao', 'Visayas', 'Luzon', 'Palawan'],
    2,
    'Luzon is the largest island in the Philippines with an area of approximately 109,965 square kilometers.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'How many regions are there currently in the Philippines?',
    ['15', '16', '17', '18'],
    2,
    'The Philippines has 17 administrative regions, including the National Capital Region (NCR) and the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM).'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What are the two official languages of the Philippines as stated in the 1987 Constitution?',
    ['Filipino and Spanish', 'Filipino and English', 'Tagalog and English', 'Cebuano and English'],
    1,
    'Article XIV, Section 6 of the 1987 Philippine Constitution declares Filipino and English as the official languages.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What does RA 6713 stand for?',
    ['Republic Act on Government Auditing', 'Code of Conduct and Ethical Standards for Public Officials and Employees', 'Anti-Graft and Corrupt Practices Act', 'Civil Service Code of the Philippines'],
    1,
    'RA 6713 is the "Code of Conduct and Ethical Standards for Public Officials and Employees," enacted in 1989.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'Who was the first President of the Philippines?',
    ['Manuel Quezon', 'Emilio Aguinaldo', 'Jose P. Laurel', 'Sergio Osmena'],
    1,
    'Emilio Aguinaldo was the first President of the Philippines, serving as president of the First Philippine Republic proclaimed on January 23, 1899.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the Philippine national flower?',
    ['Rose', 'Sampaguita', 'Orchid', 'Sunflower'],
    1,
    'The Sampaguita (Arabian Jasmine) was declared the Philippine national flower in 1934 by Governor-General Frank Murphy.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'Which body of water lies to the west of the Philippines?',
    ['Pacific Ocean', 'South China Sea (West Philippine Sea)', 'Indian Ocean', 'Celebes Sea'],
    1,
    'The South China Sea, which the Philippines refers to as the West Philippine Sea, lies to the west of the Philippine archipelago.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the basic unit of life?',
    ['Atom', 'Molecule', 'Cell', 'Organ'],
    2,
    'The cell is considered the basic structural and functional unit of all living organisms.'
  ),
  q(QC.GENERAL_INFORMATION, D.EASY,
    'Which planet is known as the "Red Planet"?',
    ['Venus', 'Jupiter', 'Mars', 'Saturn'],
    2,
    'Mars is called the "Red Planet" because of its reddish appearance, caused by iron oxide (rust) on its surface.'
  ),

  // GENERAL INFORMATION — MEDIUM (15)
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Under the 1987 Philippine Constitution, what is the minimum age requirement for a person to be elected as President?',
    ['30 years old', '35 years old', '40 years old', '45 years old'],
    2,
    'Article VII, Section 2 of the 1987 Constitution states that no person may be elected President unless they are at least forty years of age.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which article of the 1987 Philippine Constitution contains the Bill of Rights?',
    ['Article I', 'Article II', 'Article III', 'Article IV'],
    2,
    'Article III of the 1987 Philippine Constitution is the Bill of Rights, which guarantees fundamental civil liberties and protections.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What historical event occurred on June 12, 1898?',
    ['The Battle of Manila Bay', 'The Declaration of Philippine Independence', 'The signing of the Treaty of Paris', 'The establishment of the First Philippine Republic'],
    1,
    'On June 12, 1898, General Emilio Aguinaldo declared Philippine independence from Spain in Kawit, Cavite.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Under RA 6713, what is the deadline for public officials to submit their Statement of Assets, Liabilities, and Net Worth (SALN)?',
    ['January 31', 'March 31', 'April 30', 'June 30'],
    2,
    'Under RA 6713, public officials and employees must file their SALN on or before April 30 of every year.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which branch of the Philippine government has the power to declare war?',
    ['Executive', 'Legislative', 'Judicial', 'Military'],
    1,
    'Under Article VI, Section 23 of the 1987 Constitution, the Congress (Legislative branch) has the sole power to declare the existence of a state of war.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The Magellan expedition arrived in the Philippines in what year?',
    ['1521', '1565', '1571', '1898'],
    0,
    'Ferdinand Magellan\'s expedition arrived in the Philippines in 1521. He landed in Homonhon Island and was later killed in the Battle of Mactan.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the greenhouse effect?',
    ['The cooling of Earth due to ozone depletion', 'The trapping of heat in Earth\'s atmosphere by certain gases', 'The reflection of sunlight by ice caps', 'The increase in oxygen levels in the atmosphere'],
    1,
    'The greenhouse effect is the process by which greenhouse gases (CO2, methane, etc.) trap heat in Earth\'s atmosphere, warming the planet.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Philippine region is known as the "Rice Granary of the Philippines"?',
    ['Region I (Ilocos Region)', 'Region II (Cagayan Valley)', 'Region III (Central Luzon)', 'Region IV-A (CALABARZON)'],
    2,
    'Region III (Central Luzon) is known as the "Rice Granary of the Philippines" due to its extensive rice paddies, particularly in Nueva Ecija and Tarlac.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the term of office for members of the Philippine House of Representatives?',
    ['2 years', '3 years', '4 years', '6 years'],
    1,
    'Members of the House of Representatives serve a term of three years and can serve for a maximum of three consecutive terms.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Who wrote the Philippine national anthem, "Lupang Hinirang"?',
    ['Jose Palma', 'Julian Felipe', 'Marcelo del Pilar', 'Juan Luna'],
    1,
    'Julian Felipe composed the music of the Philippine national anthem. Jose Palma wrote the Spanish lyrics ("Filipinas") which were later translated to Filipino.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the Law of Supply and Demand?',
    ['Prices remain constant regardless of supply.', 'When supply increases and demand stays the same, prices tend to decrease.', 'Supply and demand are unrelated to price.', 'High demand always leads to lower prices.'],
    1,
    'The Law of Supply and Demand states that when supply increases with constant demand, prices decrease; when demand increases with constant supply, prices increase.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Filipino hero is known as the "Sublime Paralytic"?',
    ['Andres Bonifacio', 'Apolinario Mabini', 'Marcelo H. del Pilar', 'Graciano Lopez Jaena'],
    1,
    'Apolinario Mabini is known as the "Sublime Paralytic" and the "Brains of the Revolution." He served as the first Prime Minister of the Philippines despite being paralyzed.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What type of government does the Philippines have?',
    ['Federal republic', 'Parliamentary democracy', 'Unitary presidential constitutional republic', 'Constitutional monarchy'],
    2,
    'The Philippines has a unitary presidential constitutional republic form of government, with the President as both head of state and head of government.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is photosynthesis?',
    ['The process by which animals breathe', 'The process by which plants convert light energy into chemical energy', 'The decomposition of organic matter', 'The absorption of minerals from soil'],
    1,
    'Photosynthesis is the process by which green plants use sunlight, carbon dioxide, and water to produce glucose and oxygen.'
  ),
  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The Cordillera Administrative Region (CAR) is home to the famous rice terraces. In which province are the most well-known terraces located?',
    ['Benguet', 'Ifugao', 'Mountain Province', 'Kalinga'],
    1,
    'The Banaue Rice Terraces, often called the "Eighth Wonder of the World," are located in Ifugao province in the Cordillera Administrative Region.'
  ),

  // GENERAL INFORMATION — HARD (6)
  q(QC.GENERAL_INFORMATION, D.HARD,
    'Under the 1987 Philippine Constitution, which of the following is NOT a ground for impeachment?',
    ['Culpable violation of the Constitution', 'Treason', 'Incompetence', 'Betrayal of public trust'],
    2,
    'Article XI, Section 2 lists grounds for impeachment: culpable violation of the Constitution, treason, bribery, graft and corruption, other high crimes, and betrayal of public trust. "Incompetence" is not listed as a ground for impeachment.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'The Malolos Constitution, the first republican constitution in Asia, was ratified in what year?',
    ['1896', '1898', '1899', '1901'],
    2,
    'The Malolos Constitution was ratified on January 21, 1899, by the Malolos Congress. It established the First Philippine Republic.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'Under RA 6713, which of the following is NOT among the norms of conduct for public officials and employees?',
    ['Commitment to public interest', 'Political neutrality', 'Profitability of public service', 'Responsiveness to the public'],
    2,
    'RA 6713 Section 4 lists norms including commitment to public interest, professionalism, justness, political neutrality, responsiveness, nationalism, commitment to democracy, and simple living. "Profitability of public service" is not a norm.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'The Tydings-McDuffie Act of 1934 provided for:',
    ['Immediate Philippine independence', 'A 10-year transition period to Philippine independence', 'The establishment of American military bases', 'Free trade between the US and Philippines forever'],
    1,
    'The Tydings-McDuffie Act (Philippine Independence Act) of 1934 provided for a 10-year transition period (Commonwealth period) leading to full Philippine independence on July 4, 1946.'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'Which section of the 1987 Philippine Constitution guarantees the right against unreasonable searches and seizures?',
    ['Article III, Section 1', 'Article III, Section 2', 'Article III, Section 3', 'Article III, Section 4'],
    1,
    'Article III, Section 2 states: "The right of the people to be secure in their persons, houses, papers, and effects against unreasonable searches and seizures of whatever nature and for any purpose shall be inviolable."'
  ),
  q(QC.GENERAL_INFORMATION, D.HARD,
    'The concept of "parens patriae" in Philippine law means:',
    ['The right of the accused to counsel', 'The government acts as guardian of persons under disability', 'The principle of separation of powers', 'The immunity of the state from suit'],
    1,
    '"Parens patriae" literally means "parent of the country." It refers to the doctrine that the state has the authority and responsibility to act as guardian for those who cannot care for themselves, such as minors and the mentally incapacitated.'
  ),

  // ========================================================
  // CLERICAL ABILITY — 30 questions (9 EASY, 15 MEDIUM, 6 HARD)
  // ========================================================

  // CLERICAL ABILITY — EASY (9)
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Arrange these names in alphabetical order: Mendoza, Garcia, Santos, Bautista. Which name comes first?',
    ['Mendoza', 'Garcia', 'Santos', 'Bautista'],
    3,
    'Alphabetical order: Bautista, Garcia, Mendoza, Santos. "Bautista" comes first because "B" comes before "G," "M," and "S."'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which of the following numbers is the same as 4,587?',
    ['4,578', '4,587', '4,857', '4,758'],
    1,
    '4,587 matches exactly with option B (4,587). The other options have digits in different positions.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Identify the correctly spelled word.',
    ['Goverment', 'Government', 'Govermnent', 'Govenment'],
    1,
    '"Government" is the correct spelling. Common errors include omitting the first "n" or misplacing letters.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which file should come first when filing alphabetically?',
    ['Reyes, Antonio', 'Reyes, Andrea', 'Reyes, Anna', 'Reyes, Andres'],
    1,
    'All have the same last name "Reyes." For first names: Andrea, Andres, Anna, Antonio. "Andrea" comes first alphabetically.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Compare the two codes: TXR-4492-MN and TXR-4492-MN. Are they:',
    ['Exactly the same', 'Different in letters', 'Different in numbers', 'Different in both'],
    0,
    'Both codes are exactly the same: TXR-4492-MN.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which word is misspelled?',
    ['Necessary', 'Sufficient', 'Definately', 'Temporary'],
    2,
    '"Definately" is misspelled. The correct spelling is "Definitely."'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Under which letter should the file for "De Leon, Maria" be placed?',
    ['D', 'L', 'M', 'E'],
    0,
    'Filipino filing convention typically files "De Leon" under "D" as "De" is considered part of the surname.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'What is the correct numerical order of these file numbers: 1023, 1032, 1203, 1302?',
    ['1023, 1032, 1203, 1302', '1032, 1023, 1302, 1203', '1302, 1203, 1032, 1023', '1023, 1203, 1032, 1302'],
    0,
    'In ascending numerical order: 1023 < 1032 < 1203 < 1302.'
  ),
  q(QC.CLERICAL_ABILITY, D.EASY,
    'Compare the addresses: "45 Rizal St., Makati City" and "45 Rizal St., Makati City." Are they:',
    ['Exactly the same', 'Different in street number', 'Different in street name', 'Different in city'],
    0,
    'Both addresses are exactly the same: 45 Rizal St., Makati City.'
  ),

  // CLERICAL ABILITY — MEDIUM (15)
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Arrange the following in correct alphabetical filing order: (1) Del Rosario, Jose (2) Dela Cruz, Ana (3) De Guzman, Pedro (4) De Castro, Maria. Which is the correct order?',
    ['4, 3, 2, 1', '3, 4, 1, 2', '4, 3, 1, 2', '2, 1, 3, 4'],
    0,
    'Alphabetical by surname: De Castro (4), De Guzman (3), Dela Cruz (2), Del Rosario (1). Order: 4, 3, 2, 1.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Find the error in this entry: "Employee No. 2024-0847, Juan M. Reyes, Department of Inteirior and Local Government."',
    ['Employee number is wrong', 'Name format is incorrect', '"Inteirior" should be "Interior"', 'No error found'],
    2,
    '"Inteirior" is misspelled. The correct spelling is "Interior" — Department of Interior and Local Government (DILG).'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'In a numerical coding system where A=1, B=2, ... Z=26, what is the code for the word "FILE"?',
    ['6-9-12-5', '6-9-11-5', '6-8-12-5', '5-9-12-5'],
    0,
    'F=6, I=9, L=12, E=5. The code is 6-9-12-5.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following pairs contains numbers that are NOT identical?\n(a) 837291 — 837291\n(b) 562018 — 562018\n(c) 948372 — 948372\n(d) 719246 — 719264',
    ['Pair (a)', 'Pair (b)', 'Pair (c)', 'Pair (d)'],
    3,
    'Pair (d) is different: 719246 vs. 719264. The last two digits are swapped (46 vs. 64). All other pairs are identical.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A government office assigns codes using the format: DEPT-YYYY-NNN. Which of the following is a valid code?',
    ['DOH-24-001', 'DOH-2024-01', 'DOH-2024-001', 'DOH2024001'],
    2,
    'The format DEPT-YYYY-NNN requires a department code, 4-digit year, and 3-digit number, all separated by hyphens. "DOH-2024-001" is the only valid format.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'You need to file documents from three departments. The correct filing order (alphabetically by department) is:',
    ['Finance, Education, Health', 'Education, Finance, Health', 'Health, Finance, Education', 'Education, Health, Finance'],
    1,
    'Alphabetical order: Education (E), Finance (F), Health (H).'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Identify the address that does NOT match the reference: "Unit 8B, Emerald Tower, 127 Ayala Ave., Makati City 1226"',
    ['Unit 8B, Emerald Tower, 127 Ayala Ave., Makati City 1226', 'Unit 8B, Emerald Tower, 127 Ayala Ave., Makati City 1226', 'Unit 8B, Emerald Tower, 172 Ayala Ave., Makati City 1226', 'Unit 8B, Emerald Tower, 127 Ayala Ave., Makati City 1226'],
    2,
    'Option C has "172 Ayala Ave." instead of "127 Ayala Ave." The digits 1, 2, and 7 are the same but in a different order.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which name pair is NOT identical?\n(a) Ma. Cristina R. Villanueva — Ma. Cristina R. Villanueva\n(b) Jose Fernando L. Santiago — Jose Fernando L. Santiago\n(c) Ana Patricia G. Mendoza — Ana Patricia G. Mendosa\n(d) Ricardo T. Aquino — Ricardo T. Aquino',
    ['Pair (a)', 'Pair (b)', 'Pair (c)', 'Pair (d)'],
    2,
    'Pair (c) is different: "Mendoza" vs. "Mendosa." The "z" was changed to "s." All other pairs are identical.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A filing system uses color codes: Red = Urgent, Blue = Regular, Green = Archive. A document dated 2019 that requires no immediate action should be coded:',
    ['Red', 'Blue', 'Green', 'Red and Blue'],
    2,
    'A document from 2019 that requires no immediate action is old and non-urgent, so it should be archived (Green).'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Proofread the following sentence: "The Commision on Audit is responsible for examining government expenditures." What is the error?',
    ['"Commision" should be "Commission"', '"examining" should be "examinning"', '"expenditures" should be "expeditures"', 'There is no error'],
    0,
    'The correct spelling is "Commission" (with double "s" and "ion"). "Commision" is missing the second "s".'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which group of numbers is arranged in descending order?',
    ['2,341 / 2,431 / 2,413 / 2,314', '2,431 / 2,413 / 2,341 / 2,314', '2,314 / 2,341 / 2,413 / 2,431', '2,413 / 2,431 / 2,341 / 2,314'],
    1,
    'Descending order means from largest to smallest: 2,431 > 2,413 > 2,341 > 2,314.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A memo is dated "Febraury 15, 2025." What is the error?',
    ['The year is wrong', '"Febraury" should be "February"', 'The date format is wrong', 'There is no error'],
    1,
    '"Febraury" is misspelled. The correct spelling is "February" (with "r-u" not "u-r" after "Feb").'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'When filing, which of these personal names comes LAST in alphabetical order?',
    ['Villanueva, Rosa M.', 'Villareal, Jose P.', 'Villamor, Ana S.', 'Villacorta, Pedro R.'],
    1,
    'Comparing the surnames after "Villa-": Villacorta (c), Villamor (m), Villanueva (n), Villareal (r). "R" comes last, so Villareal comes last.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A clerk needs to verify account numbers. Which pair has a discrepancy?\n(a) PHL-20240915-A — PHL-20240915-A\n(b) PHL-20240287-B — PHL-20240278-B\n(c) PHL-20241103-C — PHL-20241103-C\n(d) PHL-20240601-D — PHL-20240601-D',
    ['Pair (a)', 'Pair (b)', 'Pair (c)', 'Pair (d)'],
    1,
    'Pair (b) has a discrepancy: 20240287 vs. 20240278. The last three digits differ (287 vs. 278). All other pairs are identical.'
  ),
  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'In a classification system: Category I = Personnel, Category II = Financial, Category III = Operational. A salary adjustment memo should be classified as:',
    ['Category I', 'Category II', 'Category III', 'Category I and II'],
    3,
    'A salary adjustment memo relates to both Personnel (employee matters) and Financial (monetary adjustments). It should be classified under both Category I and Category II.'
  ),

  // CLERICAL ABILITY — HARD (6)
  q(QC.CLERICAL_ABILITY, D.HARD,
    'A government office uses the reference numbering system: [Agency Code]-[Year]-[Month]-[Sequential Number]. Which reference number is correctly formatted for the 45th document processed by the Department of Education in March 2025?',
    ['DepEd-2025-03-045', 'DEPED-25-3-45', 'DepEd-2025-3-045', 'DepEd-2025-03-45'],
    0,
    'Following the format strictly: Agency code (DepEd), 4-digit year (2025), 2-digit month (03), and 3-digit sequential number (045). "DepEd-2025-03-045" is correct.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'You are proofreading a report. How many errors are in this sentence? "The Departement of Budget and Managment released the allottment for the fourht quarter of 2024."',
    ['2', '3', '4', '5'],
    2,
    'Four errors: (1) "Departement" should be "Department," (2) "Managment" should be "Management," (3) "allottment" should be "allotment," (4) "fourht" should be "fourth."'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'A filing clerk must organize records by last name. If two people share the same last name, files are sorted by first name. If first names also match, sort by middle initial. What is the correct order?\n(1) Santos, Maria C.\n(2) Santos, Maria A.\n(3) Santos, Jose B.\n(4) Santos, Ana D.',
    ['4, 3, 2, 1', '4, 3, 1, 2', '3, 4, 2, 1', '3, 4, 1, 2'],
    0,
    'All share the surname "Santos." Sort by first name: Ana (4), Jose (3), Maria (1 & 2). For the two Marias, sort by middle initial: A (2) before C (1). Order: 4, 3, 2, 1.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'Examine these five codes carefully. How many of them are EXACTLY identical to the reference code "PHR-2024-0917-AX3B"?\n(a) PHR-2024-0917-AX3B\n(b) PHR-2024-0971-AX3B\n(c) PHR-2024-0917-AX3B\n(d) PHR-2024-0917-AXB3\n(e) PHR-2024-0917-AX3B',
    ['2', '3', '4', '5'],
    1,
    'Comparing each to "PHR-2024-0917-AX3B": (a) matches, (b) has 0971 instead of 0917 — different, (c) matches, (d) has AXB3 instead of AX3B — different, (e) matches. Three codes (a, c, e) are identical.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'A cross-referencing system requires that when a document relates to multiple subjects, it should be filed under the primary subject with cross-reference cards placed under secondary subjects. Document X is primarily about "Budget Allocation" but also mentions "Personnel Changes" and "Office Renovation." How many cross-reference cards should be created?',
    ['1', '2', '3', '4'],
    1,
    'The document is filed under the primary subject (Budget Allocation). Cross-reference cards are needed for each secondary subject: Personnel Changes (1) and Office Renovation (2). Total cross-reference cards = 2.'
  ),
  q(QC.CLERICAL_ABILITY, D.HARD,
    'A document tracking log shows the following entries. Which entry has an inconsistency in its date format (all dates should be in DD/MM/YYYY format)?\n(a) 05/03/2025 — Received\n(b) 12/04/2025 — Processed\n(c) 2025/05/15 — Forwarded\n(d) 28/06/2025 — Completed',
    ['Entry (a)', 'Entry (b)', 'Entry (c)', 'Entry (d)'],
    2,
    'Entry (c) uses YYYY/MM/DD format (2025/05/15) instead of the required DD/MM/YYYY format. It should be 15/05/2025.'
  ),
];
