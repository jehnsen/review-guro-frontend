import { QuestionCategory as QC, Difficulty as D } from '@prisma/client';
import { q, SeedQuestion } from './types';

export const questionnaire7: SeedQuestion[] = [
  // ==================== VERBAL ABILITY (40 questions) ====================

  // --- VERBAL ABILITY: EASY (12) ---

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word most similar in meaning to "CANDID".',
    ['Secretive', 'Honest', 'Cautious', 'Timid'],
    1,
    '"Candid" means frank, open, and sincere. "Honest" is the closest synonym.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Which word is the opposite of "AFFLUENT"?',
    ['Wealthy', 'Destitute', 'Generous', 'Abundant'],
    1,
    '"Affluent" means having a great deal of money or wealth. Its opposite is "Destitute," meaning extremely poor.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Identify the correctly spelled word.',
    ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'],
    2,
    'The correct spelling is "Accommodate" with double "c" and double "m".'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that best completes the sentence: "The witness gave a ______ account of what happened."',
    ['detailed', 'detaled', 'deetailed', 'dettailed'],
    0,
    '"Detailed" is the correctly spelled word meaning thorough and comprehensive.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'BOOK is to LIBRARY as PAINTING is to ______.',
    ['Artist', 'Gallery', 'Canvas', 'Brush'],
    1,
    'A book is kept in a library; a painting is kept in a gallery. Both describe an item and the place where it is housed.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Which sentence is grammatically correct?',
    ['She don\'t like coffee.', 'She doesn\'t likes coffee.', 'She doesn\'t like coffee.', 'She not like coffee.'],
    2,
    '"She doesn\'t like coffee" is correct. With third-person singular subjects, use "doesn\'t" followed by the base form of the verb.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word most similar in meaning to "BREVITY".',
    ['Length', 'Shortness', 'Complexity', 'Brightness'],
    1,
    '"Brevity" means concise and exact use of words or shortness of time. "Shortness" is the closest synonym.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Which word is the opposite of "TRANSPARENT"?',
    ['Clear', 'Obvious', 'Opaque', 'Visible'],
    2,
    '"Transparent" means allowing light to pass through so that objects behind can be seen clearly. "Opaque" means not able to be seen through, the opposite.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the correct word to complete the sentence: "Every student must submit ______ homework on time."',
    ['his or her', 'their', 'its', 'there'],
    0,
    '"His or her" is the grammatically correct pronoun to refer to "every student," which is singular. "Their" is increasingly accepted, but "his or her" is the traditional correct form.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'What does the idiomatic expression "to burn the midnight oil" mean?',
    ['To waste resources', 'To work or study late into the night', 'To start a fire at night', 'To cook dinner very late'],
    1,
    '"To burn the midnight oil" means to work or study late into the night, referring to the old practice of using oil lamps.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'Choose the word that best completes the sentence: "The manager ______ the employees for their outstanding performance."',
    ['commended', 'condemned', 'commanded', 'commenced'],
    0,
    '"Commended" means to praise formally or officially, which fits the context of recognizing outstanding performance.'
  ),

  q(QC.VERBAL_ABILITY, D.EASY,
    'DOCTOR is to PATIENT as TEACHER is to ______.',
    ['School', 'Student', 'Classroom', 'Book'],
    1,
    'A doctor serves a patient; a teacher serves a student. Both describe a professional and the person they serve.'
  ),

  // --- VERBAL ABILITY: MEDIUM (20) ---

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "PRAGMATIC".',
    ['Idealistic', 'Practical', 'Theoretical', 'Abstract'],
    1,
    '"Pragmatic" means dealing with things sensibly and realistically, in a way that is based on practical rather than theoretical considerations.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which word is the opposite of "EPHEMERAL"?',
    ['Fleeting', 'Temporary', 'Permanent', 'Brief'],
    2,
    '"Ephemeral" means lasting for a very short time. "Permanent" is the opposite, meaning lasting or intended to last indefinitely.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Select the sentence with the correct subject-verb agreement.',
    ['The group of students were going on a field trip.', 'The group of students was going on a field trip.', 'The group of students are going on a field trip.', 'The group of students have going on a field trip.'],
    1,
    '"The group" is a collective noun treated as singular, so it takes the singular verb "was." The phrase "of students" is a prepositional phrase that does not affect the verb.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Identify the sentence with a misplaced modifier.',
    ['Walking through the park, the flowers were beautiful.', 'She quickly finished her homework after dinner.', 'The boy wearing a red shirt ran across the street.', 'He carefully placed the vase on the table.'],
    0,
    '"Walking through the park, the flowers were beautiful" has a misplaced modifier. It suggests the flowers were walking. It should be "Walking through the park, I noticed the beautiful flowers."'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the correct word: "The data ______ that the experiment was a success."',
    ['suggests', 'suggest', 'suggesting', 'have suggested'],
    1,
    '"Data" is the plural of "datum," so it takes the plural verb "suggest." "The data suggest that the experiment was a success."'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'ARCHITECT is to BLUEPRINT as COMPOSER is to ______.',
    ['Instrument', 'Orchestra', 'Score', 'Melody'],
    2,
    'An architect creates a blueprint; a composer creates a score. Both describe a creator and their written plan or work.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What does the expression "to play devil\'s advocate" mean?',
    ['To be deliberately evil', 'To argue against something for the sake of debate', 'To worship the devil', 'To avoid responsibility'],
    1,
    '"To play devil\'s advocate" means to take a position one does not necessarily agree with, for the sake of debate or to explore the thought further.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word that best completes the sentence: "The politician\'s speech was full of ______ promises that he never intended to keep."',
    ['genuine', 'hollow', 'substantial', 'heartfelt'],
    1,
    '"Hollow" means without significance or sincerity, which fits the context of promises that were never intended to be kept.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which of the following sentences uses the correct form of the word?',
    ['The affect of the medicine was immediate.', 'The effect of the medicine was immediate.', 'The medicine had a good affect on her.', 'She was effected by the news.'],
    1,
    '"Effect" as a noun means the result or outcome. "The effect of the medicine" is correct. "Affect" is typically used as a verb.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Read the passage: "The Philippines is an archipelago consisting of more than 7,600 islands. Its strategic location in Southeast Asia has made it a melting pot of diverse cultures and traditions." What can be inferred from this passage?',
    ['The Philippines has only one culture.', 'The Philippines\' location contributed to its cultural diversity.', 'All islands in the Philippines are inhabited.', 'The Philippines is the largest archipelago in the world.'],
    1,
    'The passage states that the strategic location has made it a "melting pot of diverse cultures," implying that its location contributed to cultural diversity.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word most similar in meaning to "UBIQUITOUS".',
    ['Rare', 'Omnipresent', 'Hidden', 'Unique'],
    1,
    '"Ubiquitous" means present, appearing, or found everywhere. "Omnipresent" is the closest synonym.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which word is the opposite of "LETHARGIC"?',
    ['Sluggish', 'Drowsy', 'Energetic', 'Weary'],
    2,
    '"Lethargic" means affected by lethargy; sluggish and apathetic. "Energetic" is the opposite, meaning showing or involving great activity or vitality.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the sentence that uses the correct punctuation.',
    ['The report is due on Monday, however we may get an extension.', 'The report is due on Monday; however, we may get an extension.', 'The report is due on Monday however, we may get an extension.', 'The report is due on Monday however we may get an extension.'],
    1,
    'When "however" is used as a conjunctive adverb connecting two independent clauses, it should be preceded by a semicolon and followed by a comma.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which sentence contains a redundancy?',
    ['She returned the book to the library.', 'He made a brief summary of the report.', 'The teacher explained the lesson clearly.', 'They collaborated together on the project.'],
    3,
    '"Collaborated together" is redundant because "collaborated" already means to work together. "Together" is unnecessary.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the correct word to complete the sentence: "Neither the manager nor the employees ______ satisfied with the new policy."',
    ['was', 'is', 'were', 'has been'],
    2,
    'When "neither...nor" connects a singular and a plural subject, the verb agrees with the subject closest to it. "Employees" is plural, so "were" is correct.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'What does "to go the extra mile" mean?',
    ['To travel a long distance', 'To make more effort than is expected', 'To run a marathon', 'To take a detour'],
    1,
    '"To go the extra mile" means to make more effort than is expected of you, to do more than what is required.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the word that best completes the sentence: "The new law aims to ______ corruption in government agencies."',
    ['eradicate', 'exonerate', 'elaborate', 'exaggerate'],
    0,
    '"Eradicate" means to destroy completely or put an end to, which fits the context of eliminating corruption.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'SCALPEL is to SURGEON as GAVEL is to ______.',
    ['Carpenter', 'Judge', 'Lawyer', 'Blacksmith'],
    1,
    'A scalpel is a tool used by a surgeon; a gavel is a tool used by a judge. Both describe an instrument and its user.'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Which of the following words is spelled correctly?',
    ['Beaurocracy', 'Bureacracy', 'Bureaucracy', 'Burocracy'],
    2,
    'The correct spelling is "Bureaucracy." It comes from the French word "bureau" (office) and Greek "kratia" (power).'
  ),

  q(QC.VERBAL_ABILITY, D.MEDIUM,
    'Choose the correct word: "The teacher asked the students to ______ from using their phones during class."',
    ['refrain', 'restrain', 'retain', 'remain'],
    0,
    '"Refrain" means to stop oneself from doing something. "Refrain from" is the correct phrase meaning to abstain from an action.'
  ),

  // --- VERBAL ABILITY: HARD (8) ---

  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the word most similar in meaning to "OBSEQUIOUS".',
    ['Rebellious', 'Servile', 'Observant', 'Obvious'],
    1,
    '"Obsequious" means obedient or attentive to an excessive or servile degree. "Servile" is the closest synonym, meaning having or showing an excessive willingness to serve or please others.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Which word is the opposite of "EQUIVOCAL"?',
    ['Ambiguous', 'Unequivocal', 'Uncertain', 'Evasive'],
    1,
    '"Equivocal" means open to more than one interpretation; ambiguous. "Unequivocal" means leaving no doubt; unambiguous, which is the direct opposite.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Read the passage: "The concept of restorative justice emphasizes repairing the harm caused by criminal behavior. Instead of focusing solely on punishment, it brings together victims, offenders, and community members to address the consequences of crime and seek reconciliation." Based on the passage, restorative justice primarily differs from traditional justice by:',
    ['Imposing harsher punishments on offenders', 'Focusing on rehabilitation over incarceration', 'Prioritizing harm repair and reconciliation over punishment', 'Excluding the community from the justice process'],
    2,
    'The passage explicitly states that restorative justice "emphasizes repairing the harm" and seeks "reconciliation" instead of "focusing solely on punishment."'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the sentence that correctly uses the subjunctive mood.',
    ['I wish I was there to help you.', 'If I was the president, I would fix the economy.', 'The board recommended that he takes immediate action.', 'It is essential that every employee be present at the meeting.'],
    3,
    'The subjunctive mood is used after expressions of necessity, recommendation, or demand. "It is essential that every employee be present" correctly uses the base form "be" in the subjunctive.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'PALLIATIVE is to CURE as COSMETIC is to ______.',
    ['Transformation', 'Beauty', 'Superficial', 'Appearance'],
    0,
    'A palliative relieves symptoms without providing a cure; something cosmetic improves appearance without providing a real transformation. Both describe something that addresses surface-level issues without fundamental change.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Which sentence demonstrates correct parallel structure?',
    ['She enjoys reading, to swim, and hiking.', 'The proposal was rejected not because it was expensive but because it was impractical.', 'He is responsible for planning, organizing, and he supervises the team.', 'The job requires experience in marketing, having good writing skills, and able to communicate effectively.'],
    1,
    'The sentence "The proposal was rejected not because it was expensive but because it was impractical" maintains parallel structure with matching "because it was..." clauses.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'What does the word "perspicacious" mean?',
    ['Persistent and determined', 'Having a ready insight into things; shrewd', 'Prone to sweating', 'Clearly expressed and easily understood'],
    1,
    '"Perspicacious" means having a ready insight into and understanding of things; mentally shrewd. It comes from the Latin "perspicax" meaning having the power of seeing through.'
  ),

  q(QC.VERBAL_ABILITY, D.HARD,
    'Choose the best word to complete the sentence: "The diplomat\'s ______ response to the controversial question managed to satisfy both sides without committing to either."',
    ['belligerent', 'anodyne', 'acerbic', 'incendiary'],
    1,
    '"Anodyne" means not likely to provoke dissent or offense; inoffensive, often deliberately so. It fits the context of a diplomatic, non-committal response.'
  ),

  // ==================== NUMERICAL ABILITY (40 questions) ====================

  // --- NUMERICAL ABILITY: EASY (12) ---

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 3/4 + 1/8?',
    ['5/8', '7/8', '4/12', '1/2'],
    1,
    '3/4 + 1/8 = 6/8 + 1/8 = 7/8. Convert 3/4 to 6/8 to get a common denominator of 8.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A notebook costs ₱35. How much will 8 notebooks cost?',
    ['₱240', '₱280', '₱320', '₱260'],
    1,
    '₱35 x 8 = ₱280.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 25% of 360?',
    ['80', '90', '85', '95'],
    1,
    '25% of 360 = (25/100) x 360 = 0.25 x 360 = 90.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If 5x = 45, what is the value of x?',
    ['7', '8', '9', '10'],
    2,
    '5x = 45, so x = 45 / 5 = 9.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is the next number in the sequence: 3, 7, 11, 15, ___?',
    ['17', '18', '19', '20'],
    2,
    'The pattern increases by 4 each time: 3+4=7, 7+4=11, 11+4=15, 15+4=19.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A bag contains 5 red balls, 3 blue balls, and 2 green balls. What fraction of the balls are blue?',
    ['3/10', '3/8', '1/3', '3/5'],
    0,
    'Total balls = 5 + 3 + 2 = 10. Blue balls = 3. Fraction = 3/10.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'Maria earns ₱450 per day. How much does she earn in 5 days?',
    ['₱2,050', '₱2,250', '₱2,150', '₱2,350'],
    1,
    '₱450 x 5 = ₱2,250.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is 0.75 expressed as a fraction?',
    ['3/5', '7/10', '3/4', '4/5'],
    2,
    '0.75 = 75/100 = 3/4 (simplified by dividing both numerator and denominator by 25).'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'If the ratio of boys to girls in a class is 3:5 and there are 15 boys, how many girls are there?',
    ['20', '25', '30', '35'],
    1,
    'If boys:girls = 3:5 and there are 15 boys, then 3 parts = 15, so 1 part = 5. Girls = 5 x 5 = 25.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'What is the sum of 1,248 and 3,756?',
    ['4,904', '5,004', '4,994', '5,104'],
    1,
    '1,248 + 3,756 = 5,004.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'Convert 2.5 hours to minutes.',
    ['125 minutes', '130 minutes', '150 minutes', '160 minutes'],
    2,
    '2.5 hours x 60 minutes/hour = 150 minutes.'
  ),

  q(QC.NUMERICAL_ABILITY, D.EASY,
    'A rectangle has a length of 12 cm and a width of 8 cm. What is its perimeter?',
    ['40 cm', '96 cm', '20 cm', '36 cm'],
    0,
    'Perimeter = 2(length + width) = 2(12 + 8) = 2(20) = 40 cm.'
  ),

  // --- NUMERICAL ABILITY: MEDIUM (20) ---

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A shirt originally priced at ₱800 is on sale at 30% off. If there is an additional 10% discount on the sale price, what is the final price?',
    ['₱480', '₱504', '₱560', '₱520'],
    1,
    'First discount: ₱800 x 0.70 = ₱560. Second discount: ₱560 x 0.90 = ₱504.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If a car travels at 80 km/h for 2.5 hours, how far does it travel?',
    ['160 km', '180 km', '200 km', '220 km'],
    2,
    'Distance = Speed x Time = 80 km/h x 2.5 h = 200 km.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the next number in the sequence: 2, 6, 18, 54, ___?',
    ['108', '162', '148', '126'],
    1,
    'Each number is multiplied by 3: 2x3=6, 6x3=18, 18x3=54, 54x3=162.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A vendor bought 50 mangoes at ₱15 each and sold them at ₱22 each. What is the total profit?',
    ['₱300', '₱350', '₱400', '₱450'],
    1,
    'Cost = 50 x ₱15 = ₱750. Revenue = 50 x ₱22 = ₱1,100. Profit = ₱1,100 - ₱750 = ₱350.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If 3x + 7 = 28, what is the value of x?',
    ['5', '6', '7', '8'],
    2,
    '3x + 7 = 28. Subtract 7 from both sides: 3x = 21. Divide by 3: x = 7.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A worker can finish a job in 12 days. Another worker can finish the same job in 18 days. If they work together, how many days will it take them to finish the job?',
    ['6 days', '7.2 days', '8 days', '9 days'],
    1,
    'Rate of worker 1 = 1/12. Rate of worker 2 = 1/18. Combined rate = 1/12 + 1/18 = 3/36 + 2/36 = 5/36. Time = 36/5 = 7.2 days.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'Ana is 4 years older than twice Ben\'s age. If Ana is 28 years old, how old is Ben?',
    ['10', '11', '12', '13'],
    2,
    'Let Ben\'s age = x. 2x + 4 = 28. 2x = 24. x = 12. Ben is 12 years old.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is 5/6 - 2/9?',
    ['1/2', '11/18', '7/15', '1/3'],
    1,
    '5/6 - 2/9 = 15/18 - 4/18 = 11/18. The LCD of 6 and 9 is 18.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A rectangular garden is 15 meters long and 10 meters wide. If a path 1 meter wide is built around it, what is the area of the path?',
    ['50 sq m', '52 sq m', '54 sq m', '56 sq m'],
    2,
    'Outer dimensions with 1 m path on each side: (15+2) x (10+2) = 17 x 12 = 204 sq m. Inner area: 15 x 10 = 150 sq m. Area of the path = 204 - 150 = 54 sq m.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If a dozen eggs costs ₱96, how much do 30 eggs cost?',
    ['₱200', '₱220', '₱240', '₱260'],
    2,
    'Price per egg = ₱96 / 12 = ₱8. Cost of 30 eggs = 30 x ₱8 = ₱240.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'The average of five numbers is 42. If four of the numbers are 38, 40, 45, and 50, what is the fifth number?',
    ['35', '37', '32', '42'],
    1,
    'Sum of five numbers = 42 x 5 = 210. Sum of four known numbers = 38 + 40 + 45 + 50 = 173. Fifth number = 210 - 173 = 37.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A store marks up its products by 40% over cost. If a product sells for ₱700, what was the cost?',
    ['₱450', '₱475', '₱500', '₱525'],
    2,
    'Selling price = Cost x 1.40. So Cost = ₱700 / 1.40 = ₱500.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What number, when increased by 20% of itself, gives 96?',
    ['72', '76', '78', '80'],
    3,
    'Let the number be x. x + 0.20x = 96. 1.20x = 96. x = 96 / 1.20 = 80.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'In a class of 45 students, 60% passed the exam. How many students failed?',
    ['15', '18', '20', '27'],
    1,
    'Students who passed = 60% of 45 = 27. Students who failed = 45 - 27 = 18.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A tank can be filled by a pipe in 8 hours and emptied by another pipe in 12 hours. If both pipes are open, how long will it take to fill the tank?',
    ['20 hours', '24 hours', '18 hours', '16 hours'],
    1,
    'Fill rate = 1/8 per hour. Empty rate = 1/12 per hour. Net fill rate = 1/8 - 1/12 = 3/24 - 2/24 = 1/24 per hour. Time to fill = 24 hours.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A mixture contains milk and water in the ratio 5:3. If there are 20 liters of milk, how many liters of water are in the mixture?',
    ['10', '12', '14', '16'],
    1,
    'Milk:Water = 5:3. If 5 parts = 20 liters, then 1 part = 4 liters. Water = 3 x 4 = 12 liters.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'If the simple interest on ₱10,000 for 2 years is ₱1,600, what is the annual interest rate?',
    ['6%', '7%', '8%', '9%'],
    2,
    'Simple Interest = Principal x Rate x Time. ₱1,600 = ₱10,000 x Rate x 2. Rate = ₱1,600 / (₱10,000 x 2) = 0.08 = 8%.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'What is the value of 2^5 + 3^3?',
    ['51', '55', '59', '63'],
    2,
    '2^5 = 32. 3^3 = 27. 32 + 27 = 59.'
  ),

  q(QC.NUMERICAL_ABILITY, D.MEDIUM,
    'A triangle has sides of 5 cm, 12 cm, and 13 cm. What is its area?',
    ['28 sq cm', '30 sq cm', '32 sq cm', '65 sq cm'],
    1,
    'This is a right triangle (5-12-13 Pythagorean triple). Area = (1/2) x base x height = (1/2) x 5 x 12 = 30 sq cm.'
  ),

  // --- NUMERICAL ABILITY: HARD (8) ---

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A man invests ₱50,000 at 6% per annum compound interest. What will be the amount after 2 years?',
    ['₱56,000', '₱56,180', '₱55,800', '₱56,500'],
    1,
    'Compound Interest: A = P(1 + r)^n = 50,000(1 + 0.06)^2 = 50,000(1.1236) = ₱56,180.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'Three pipes can fill a tank in 6, 8, and 12 hours respectively. If all three pipes are opened simultaneously, how long will it take to fill the tank?',
    ['2 hours 40 min', '2 hours', '3 hours', '8/3 hours'],
    3,
    'Combined rate = 1/6 + 1/8 + 1/12 = 4/24 + 3/24 + 2/24 = 9/24 = 3/8 per hour. Time = 8/3 hours = 2 hours 40 minutes. The answer 8/3 hours is equivalent to 2 hours and 40 minutes.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A boat travels 24 km upstream in 3 hours and 24 km downstream in 2 hours. What is the speed of the current?',
    ['1 km/h', '2 km/h', '3 km/h', '4 km/h'],
    1,
    'Upstream speed = 24/3 = 8 km/h. Downstream speed = 24/2 = 12 km/h. Speed of current = (Downstream - Upstream) / 2 = (12 - 8) / 2 = 2 km/h.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'The sum of three consecutive even numbers is 78. What is the largest of the three numbers?',
    ['24', '26', '28', '30'],
    2,
    'Let the three consecutive even numbers be (x-2), x, (x+2). Sum = 3x = 78. x = 26. The largest number = 26 + 2 = 28.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A merchant mixes 30 kg of rice at ₱45/kg with 20 kg of rice at ₱60/kg. At what price per kg should he sell the mixture to gain a 25% profit?',
    ['₱62.50', '₱63.75', '₱65.00', '₱67.50'],
    1,
    'Total cost = (30 x ₱45) + (20 x ₱60) = ₱1,350 + ₱1,200 = ₱2,550. Cost per kg = ₱2,550 / 50 = ₱51. Selling price for 25% profit = ₱51 x 1.25 = ₱63.75.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A clock shows 3:15. What is the angle between the hour and minute hands?',
    ['0°', '7.5°', '15°', '22.5°'],
    1,
    'At 3:15, the hour hand position = (3 x 30) + (15 x 0.5) = 90 + 7.5 = 97.5° from 12 o\'clock. The minute hand at 15 minutes = 15 x 6 = 90° from 12 o\'clock. The angle between them = 97.5 - 90 = 7.5°.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A and B together can complete a project in 10 days. B and C together can complete it in 15 days. A and C together can complete it in 12 days. How many days will it take if all three work together?',
    ['7 days', '7.5 days', '8 days', '8.5 days'],
    2,
    'A+B = 1/10, B+C = 1/15, A+C = 1/12. Adding all: 2(A+B+C) = 1/10 + 1/15 + 1/12 = 6/60 + 4/60 + 5/60 = 15/60 = 1/4. So A+B+C = 1/8. Together they complete it in 8 days.'
  ),

  q(QC.NUMERICAL_ABILITY, D.HARD,
    'A shopkeeper sells an item at a 10% loss. If he had sold it for ₱135 more, he would have made a 5% profit. What is the cost price?',
    ['₱800', '₱850', '₱900', '₱950'],
    2,
    'Let cost price = CP. Selling at 10% loss: SP1 = 0.90 x CP. Selling at 5% profit: SP2 = 1.05 x CP. Difference: SP2 - SP1 = ₱135. 1.05CP - 0.90CP = ₱135. 0.15CP = ₱135. CP = ₱900.'
  ),

  // ==================== ANALYTICAL ABILITY (30 questions) ====================

  // --- ANALYTICAL ABILITY: EASY (9) ---

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Complete the pattern: A, C, E, G, ___',
    ['H', 'I', 'J', 'K'],
    1,
    'The pattern skips every other letter in the alphabet: A(skip B)C(skip D)E(skip F)G(skip H)I.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If APPLE is coded as 1-16-16-12-5, how is CAT coded?',
    ['3-1-20', '3-1-19', '2-1-20', '3-2-20'],
    0,
    'Each letter is replaced by its position in the alphabet: C=3, A=1, T=20. So CAT = 3-1-20.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Which one is the odd one out? Apple, Mango, Carrot, Banana',
    ['Apple', 'Mango', 'Carrot', 'Banana'],
    2,
    'Apple, Mango, and Banana are fruits. Carrot is a vegetable, making it the odd one out.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If Monday is the first day of the month, what day is the 18th?',
    ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    2,
    'From Monday the 1st: 1st=Mon, 8th=Mon, 15th=Mon, 18th = Mon+3 = Thursday.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Complete the number series: 5, 10, 20, 40, ___',
    ['50', '60', '70', '80'],
    3,
    'Each number is doubled: 5x2=10, 10x2=20, 20x2=40, 40x2=80.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Maria is taller than Ana. Ana is taller than Luz. Who is the shortest?',
    ['Maria', 'Ana', 'Luz', 'Cannot be determined'],
    2,
    'Maria > Ana > Luz in height. Therefore, Luz is the shortest.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'All dogs are animals. All animals need water. Therefore:',
    ['All dogs need water.', 'All animals are dogs.', 'Some dogs do not need water.', 'Water is only for dogs.'],
    0,
    'This is a valid syllogism. If all dogs are animals, and all animals need water, then all dogs need water.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'If you face North and turn 90 degrees clockwise, which direction are you facing?',
    ['South', 'East', 'West', 'North'],
    1,
    'Starting from North and turning 90 degrees clockwise brings you to face East.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.EASY,
    'Which number does not belong in the group? 2, 5, 11, 14, 17, 23',
    ['2', '14', '11', '5'],
    1,
    '2, 5, 11, 17, and 23 are prime numbers. 14 is not a prime number (14 = 2 x 7), so it does not belong.'
  ),

  // --- ANALYTICAL ABILITY: MEDIUM (15) ---

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a row of students, Pedro is 8th from the left and 12th from the right. How many students are in the row?',
    ['18', '19', '20', '21'],
    1,
    'Total students = position from left + position from right - 1 = 8 + 12 - 1 = 19.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If FISH is coded as GKUJ, how is BIRD coded?',
    ['CJSE', 'CKSE', 'CKTF', 'CKTE'],
    2,
    'Each letter is shifted forward: F(6)→G(7) +1, I(9)→K(11) +2, S(19)→U(21) +2, H(8)→J(10) +2. The shift pattern is +1, +2, +2, +2. Applying to BIRD: B(2)+1=C(3), I(9)+2=K(11), R(18)+2=T(20), D(4)+2=F(6). So BIRD is coded as CKTF.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Statement: "All government employees must follow the Code of Conduct." Conclusion I: A government employee was reprimanded for violating the Code. Conclusion II: Private sector employees do not have a Code of Conduct.',
    ['Only Conclusion I follows.', 'Only Conclusion II follows.', 'Both conclusions follow.', 'Neither conclusion follows.'],
    0,
    'Conclusion I logically follows because if all government employees must follow the Code, then violation can lead to reprimand. Conclusion II does not follow because the statement says nothing about private sector employees.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If South-East becomes North, what does North-West become?',
    ['South', 'East', 'West', 'North-East'],
    0,
    'If South-East is rotated to become North, the rotation is 135 degrees clockwise (or equivalently, each direction is rotated by 135°). South-East (135°) → North (0°/360°) means a shift of 225° clockwise or 135° counter-clockwise. Applying the same rotation to North-West (315°): 315° - 135° = 180° = South. So North-West becomes South.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a family, A is the father of B. C is the sister of B. D is the husband of C. What is D to A?',
    ['Son', 'Son-in-law', 'Brother', 'Nephew'],
    1,
    'A is B\'s father. C is B\'s sister, so C is also A\'s child (daughter). D is C\'s husband. Therefore, D is A\'s son-in-law.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Complete the series: 1, 1, 2, 3, 5, 8, 13, ___',
    ['18', '20', '21', '24'],
    2,
    'This is the Fibonacci sequence where each number is the sum of the two preceding numbers: 8 + 13 = 21.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Five friends A, B, C, D, and E are sitting in a row. B is to the right of A. D is to the left of C but to the right of E. A is to the left of E. Who is sitting in the middle?',
    ['A', 'B', 'C', 'E'],
    3,
    'From the conditions: A is to the left of E, E is to the left of D, D is to the left of C, and B is to the right of A. The arrangement from left to right is: A, B, E, D, C or A, E, B, D, C. Since B is to the right of A and E is to the right of A, and D is to the right of E but left of C: A, B, E, D, C. E is in the middle (3rd position).'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If "+" means "multiply," "-" means "divide," "x" means "add," and "÷" means "subtract," what is 8 + 3 - 6 x 4 ÷ 2?',
    ['6', '8', '24', '26'],
    0,
    'Replacing the symbols: 8 × 3 ÷ 6 + 4 - 2. Following the standard order of operations (multiplication and division first, then addition and subtraction): (8 × 3) = 24, 24 ÷ 6 = 4, then 4 + 4 = 8, 8 - 2 = 6. The answer is 6.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'A is the mother of B. B is the sister of C. D is the son of C. E is the father of A. What is B to D?',
    ['Mother', 'Aunt', 'Grandmother', 'Sister'],
    1,
    'A is B\'s mother. B is C\'s sister. D is C\'s son. Since B and C are siblings, B is D\'s aunt.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Find the missing number: 3, 9, 27, 81, ___',
    ['162', '216', '243', '324'],
    2,
    'Each number is multiplied by 3: 3×3=9, 9×3=27, 27×3=81, 81×3=243.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'In a certain language, "kal pul" means "good boy," "pul dam" means "boy plays," and "dam tok" means "plays well." What means "well"?',
    ['kal', 'pul', 'dam', 'tok'],
    3,
    '"dam" appears in "pul dam" (boy plays) and "dam tok" (plays well). So "dam" means "plays." In "dam tok" (plays well), since "dam" = plays, "tok" must mean "well."'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'If 1st January 2024 is a Monday, what day of the week is 1st March 2024?',
    ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
    2,
    'January has 31 days, February 2024 has 29 days (leap year). From Jan 1 to Mar 1 = 31 + 29 = 60 days. 60 days = 8 weeks + 4 days. Monday + 4 days = Friday.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Which figure completes the pattern? In a 3x3 grid, each row contains a circle, triangle, and square. Each column also contains each shape once. The middle cell of the bottom row is missing. The bottom row has: square, ___, circle.',
    ['Square', 'Circle', 'Triangle', 'Diamond'],
    2,
    'Each row and column must contain one of each shape. The bottom row already has a square and circle, so the missing shape is a triangle.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Statement: "Some teachers are researchers. All researchers are scholars." Which conclusion is valid?',
    ['All teachers are scholars.', 'Some teachers are scholars.', 'All scholars are researchers.', 'No teachers are scholars.'],
    1,
    'Since some teachers are researchers, and all researchers are scholars, those teachers who are researchers are also scholars. Therefore, some teachers are scholars.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.MEDIUM,
    'Six people P, Q, R, S, T, and U are sitting around a circular table. P is between U and Q. R is between S and T. Q and S are not adjacent. Who is sitting opposite P?',
    ['R', 'S', 'T', 'U'],
    0,
    'Arranging clockwise: U, P, Q, T, R, S. P is between U and Q (correct). R is between S and T (correct). Q(3rd) and S(6th) are not adjacent (correct). The person opposite P (2nd position) is R (5th position).'
  ),

  // --- ANALYTICAL ABILITY: HARD (6) ---

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'A man walks 5 km towards South, then turns left and walks 3 km, then turns left again and walks 5 km. How far is he from his starting point and in which direction?',
    ['3 km East', '3 km West', '5 km East', '5 km North'],
    0,
    'Starting point → 5 km South → turn left (now facing East) → 3 km East → turn left (now facing North) → 5 km North. The 5 km South and 5 km North cancel out. He is 3 km East of his starting point.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'In a group of 60 people, 35 like tea, 30 like coffee, and 10 like both. How many people like neither tea nor coffee?',
    ['3', '5', '10', '15'],
    1,
    'People who like tea or coffee = 35 + 30 - 10 = 55 (using inclusion-exclusion principle). People who like neither = 60 - 55 = 5.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Complete the series: 2, 3, 5, 7, 11, 13, ___',
    ['15', '17', '19', '21'],
    1,
    'This is a series of consecutive prime numbers: 2, 3, 5, 7, 11, 13, 17. The next prime number after 13 is 17.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Eight friends A, B, C, D, E, F, G, and H are sitting around a square table with two people on each side. A and C are on opposite sides. B is on the same side as A. E is adjacent to D but not to F. G and H are on the same side, opposite to B and A. F is not on the same side as D. Who is sitting with D?',
    ['E', 'F', 'C', 'B'],
    0,
    'A and B are on one side. G and H are on the opposite side. A and C are on opposite sides, so C is with G and H... but that gives 3 on one side. Re-reading: A and C on opposite sides. B is with A. G and H are opposite to A and B. So: Side 1: A, B. Side 3 (opposite): G, H. C is opposite A, so C is on side 3... This means C is with G and H—not possible with 2 per side. C must be on a different opposite side. In a square, A\'s opposite side is side 3. Side 2 and 4 are also options. If C is on the side perpendicular to A, the remaining people are C, D, E, F for sides 2 and 4. E is adjacent to D, so they are on the same side. F is not with D. So D and E are together, C and F are together. Therefore, D is sitting with E.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'Statements: "No fish is a bird. Some birds can swim. All sparrows are birds." Conclusions: I. No fish is a sparrow. II. Some fish can swim. III. Some sparrows can swim.',
    ['Only I follows.', 'Only I and II follow.', 'Only I and III follow.', 'All follow.'],
    0,
    'I: No fish is a bird + All sparrows are birds → No fish is a sparrow. This follows. II: "Some birds can swim" does not mean any fish can swim; this does not follow. III: Some birds can swim and all sparrows are birds, but we cannot conclude that the swimming birds are sparrows specifically. This does not necessarily follow. Only Conclusion I definitively follows.'
  ),

  q(QC.ANALYTICAL_ABILITY, D.HARD,
    'A cube is painted red on all faces and then cut into 64 smaller equal cubes. How many smaller cubes have exactly two faces painted?',
    ['8', '16', '24', '32'],
    2,
    'A cube cut into 64 smaller cubes means 4 cuts along each dimension (4x4x4=64). Cubes with exactly 2 painted faces are on the edges but not at corners. Each edge of the original cube has 4 small cubes, but 2 are corners. So each edge has 4-2=2 cubes with 2 painted faces. A cube has 12 edges. Total = 12 × 2 = 24.'
  ),

  // ==================== GENERAL INFORMATION (30 questions) ====================

  // --- GENERAL INFORMATION: EASY (9) ---

  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the national flower of the Philippines?',
    ['Rose', 'Sampaguita', 'Orchid', 'Sunflower'],
    1,
    'The Sampaguita (Jasminum sambac) is the national flower of the Philippines, declared by Governor-General Frank Murphy in 1934.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'Which article of the 1987 Philippine Constitution contains the Bill of Rights?',
    ['Article I', 'Article II', 'Article III', 'Article IV'],
    2,
    'Article III of the 1987 Philippine Constitution is the Bill of Rights, which enumerates the fundamental rights of citizens.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the national language of the Philippines as stated in the 1987 Constitution?',
    ['English', 'Filipino', 'Tagalog', 'Cebuano'],
    1,
    'Article XIV, Section 6 of the 1987 Constitution states that the national language of the Philippines is Filipino.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'Who is the author of the Philippine national anthem "Lupang Hinirang"?',
    ['Jose Rizal', 'Julian Felipe', 'Juan Luna', 'Marcelo del Pilar'],
    1,
    'Julian Felipe composed the music for the Philippine national anthem, originally called "Marcha Nacional Filipina," now known as "Lupang Hinirang."'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'What government agency is primarily responsible for conducting elections in the Philippines?',
    ['Civil Service Commission', 'Commission on Audit', 'Commission on Elections', 'Department of the Interior and Local Government'],
    2,
    'The Commission on Elections (COMELEC) is the constitutional body responsible for enforcing and administering all election laws and regulations in the Philippines.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'Mount Apo, the highest mountain in the Philippines, is located in which island?',
    ['Luzon', 'Visayas', 'Mindanao', 'Palawan'],
    2,
    'Mount Apo, standing at 2,954 meters, is located in Mindanao, specifically in the provinces of Davao del Sur and North Cotabato.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'What does RA 6713 stand for?',
    ['Code of Conduct and Ethical Standards for Public Officials and Employees', 'Anti-Graft and Corrupt Practices Act', 'Government Procurement Reform Act', 'Local Government Code'],
    0,
    'Republic Act No. 6713 is the "Code of Conduct and Ethical Standards for Public Officials and Employees," which establishes the standards of conduct for government workers.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'Which planet in the solar system is known as the "Red Planet"?',
    ['Venus', 'Jupiter', 'Mars', 'Saturn'],
    2,
    'Mars is known as the "Red Planet" because of iron oxide (rust) on its surface, which gives it a reddish appearance.'
  ),

  q(QC.GENERAL_INFORMATION, D.EASY,
    'What is the largest ocean in the world?',
    ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    3,
    'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 60 million square miles.'
  ),

  // --- GENERAL INFORMATION: MEDIUM (15) ---

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Under the 1987 Philippine Constitution, what is the minimum age requirement to be elected as President of the Philippines?',
    ['30 years old', '35 years old', '40 years old', '45 years old'],
    2,
    'Article VII, Section 2 of the 1987 Constitution states that the President must be at least forty years of age on the day of the election.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'According to RA 6713, public officials and employees must submit their Statement of Assets, Liabilities, and Net Worth (SALN) on or before what date each year?',
    ['January 31', 'March 31', 'April 30', 'June 30'],
    2,
    'Under RA 6713, public officials and employees are required to file their SALN on or before April 30 of every year.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the term of office for members of the Philippine House of Representatives?',
    ['3 years', '4 years', '5 years', '6 years'],
    0,
    'Members of the House of Representatives serve a term of three years and may be re-elected for not more than three consecutive terms.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Filipino value is best described as "a sense of shame or propriety that dictates behavior in social situations"?',
    ['Bayanihan', 'Hiya', 'Pakikisama', 'Utang na loob'],
    1,
    'Hiya is a Filipino value that refers to a sense of shame, propriety, or embarrassment that regulates behavior and social interactions.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The Ombudsman of the Philippines serves a term of how many years?',
    ['5 years', '6 years', '7 years', '9 years'],
    2,
    'The Ombudsman and Deputies serve a term of seven years without reappointment, as stated in Article XI, Section 11 of the 1987 Constitution.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What does the principle of "jus sanguinis" mean in the context of Philippine citizenship?',
    ['Citizenship by place of birth', 'Citizenship by blood or descent', 'Citizenship by naturalization', 'Citizenship by marriage'],
    1,
    '"Jus sanguinis" (right of blood) means citizenship is acquired through one\'s parents. This is the primary basis for Philippine citizenship under the 1987 Constitution.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which region in the Philippines is known as the Cordillera Administrative Region (CAR)?',
    ['Region I', 'Region II', 'CAR', 'Region IV-A'],
    2,
    'The Cordillera Administrative Region (CAR) is a distinct administrative region in the northern part of Luzon, composed of the provinces of Abra, Apayao, Benguet, Ifugao, Kalinga, and Mountain Province, with Baguio City as its regional center.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the greenhouse effect?',
    ['The cooling of the Earth due to pollution', 'The trapping of heat in the atmosphere by certain gases', 'The destruction of the ozone layer', 'The reflection of sunlight back into space'],
    1,
    'The greenhouse effect is the process by which greenhouse gases (such as carbon dioxide and methane) trap heat in the Earth\'s atmosphere, warming the planet\'s surface.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Under the Philippine Constitution, suffrage may be exercised by citizens of the Philippines who are at least how old?',
    ['16 years old', '18 years old', '20 years old', '21 years old'],
    1,
    'Article V, Section 1 of the 1987 Constitution states that suffrage may be exercised by all citizens of the Philippines not otherwise disqualified by law, who are at least eighteen years of age.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The Rizal Law (RA 1425) requires the teaching of the life, works, and writings of Jose Rizal in:',
    ['All private schools only', 'All public schools only', 'All public and private schools, colleges, and universities', 'Only in universities'],
    2,
    'RA 1425 (Rizal Law) mandates the teaching of Jose Rizal\'s life, works, and writings in all public and private schools, colleges, and universities in the Philippines.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the Civil Service Commission\'s primary mandate?',
    ['To collect taxes efficiently', 'To serve as the central personnel agency of the Philippine government', 'To prosecute corrupt officials', 'To manage the national budget'],
    1,
    'The Civil Service Commission (CSC) is the central personnel agency of the Philippine government, mandated to promote morale, efficiency, integrity, responsiveness, progressiveness, and courtesy in the civil service.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the process by which plants convert sunlight into food called?',
    ['Respiration', 'Photosynthesis', 'Transpiration', 'Osmosis'],
    1,
    'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'The EDSA People Power Revolution of 1986 led to the ouster of which Philippine president?',
    ['Diosdado Macapagal', 'Ferdinand Marcos', 'Corazon Aquino', 'Carlos Garcia'],
    1,
    'The EDSA People Power Revolution of February 1986 resulted in the peaceful overthrow of President Ferdinand Marcos and the installation of Corazon Aquino as president.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'Which Filipino value refers to "communal unity and cooperation," often associated with moving a nipa hut?',
    ['Hiya', 'Pakikisama', 'Bayanihan', 'Mano po'],
    2,
    'Bayanihan is the Filipino value of communal unity, cooperation, and solidarity. It is traditionally associated with the practice of neighbors helping move a nipa hut to a new location.'
  ),

  q(QC.GENERAL_INFORMATION, D.MEDIUM,
    'What is the Commission on Audit (COA) primarily responsible for?',
    ['Conducting elections', 'Examining and auditing government revenues and expenditures', 'Appointing government officials', 'Creating new laws'],
    1,
    'The Commission on Audit (COA) has the power, authority, and duty to examine, audit, and settle all accounts pertaining to the revenue and receipts of, and expenditures or uses of funds and property of the Philippine government.'
  ),

  // --- GENERAL INFORMATION: HARD (6) ---

  q(QC.GENERAL_INFORMATION, D.HARD,
    'According to Section 1, Article II of the 1987 Philippine Constitution, "The Philippines is a democratic and republican State. Sovereignty resides in the ______ and all government authority emanates from them."',
    ['citizens', 'electorate', 'people', 'nation'],
    2,
    'Section 1, Article II states: "The Philippines is a democratic and republican State. Sovereignty resides in the people and all government authority emanates from them."'
  ),

  q(QC.GENERAL_INFORMATION, D.HARD,
    'Under RA 6713, which of the following is NOT listed as a norm of conduct for public officials and employees?',
    ['Commitment to public interest', 'Profitability', 'Justness and sincerity', 'Political neutrality'],
    1,
    'RA 6713 lists eight norms of conduct including commitment to public interest, professionalism, justness and sincerity, political neutrality, responsiveness to the public, nationalism and patriotism, commitment to democracy, and simple living. "Profitability" is not among them.'
  ),

  q(QC.GENERAL_INFORMATION, D.HARD,
    'The 1987 Philippine Constitution provides that no person shall be detained solely by reason of his political beliefs and aspirations. This is found under which right in the Bill of Rights?',
    ['Freedom of speech', 'Right against unreasonable searches and seizures', 'Right to liberty', 'Right against political detention'],
    2,
    'Article III, Section 18(1) states: "No person shall be detained solely by reason of his political beliefs and aspirations." This falls under the broader right to liberty guaranteed by the Bill of Rights.'
  ),

  q(QC.GENERAL_INFORMATION, D.HARD,
    'Which international agreement, which the Philippines is a signatory to, aims to limit global warming to well below 2 degrees Celsius above pre-industrial levels?',
    ['Kyoto Protocol', 'Montreal Protocol', 'Paris Agreement', 'Rio Declaration'],
    2,
    'The Paris Agreement (2015) aims to limit global warming to well below 2°C above pre-industrial levels, with efforts to limit the increase to 1.5°C. The Philippines signed and ratified this agreement.'
  ),

  q(QC.GENERAL_INFORMATION, D.HARD,
    'Under the Philippine Constitution, who has the power to grant amnesty with the concurrence of a majority of all the Members of Congress?',
    ['The Supreme Court', 'The Senate President', 'The President', 'The Ombudsman'],
    2,
    'Article VII, Section 19 of the 1987 Constitution grants the President the power to grant amnesty with the concurrence of a majority of all the Members of Congress.'
  ),

  q(QC.GENERAL_INFORMATION, D.HARD,
    'In the context of Philippine governance, what does the principle of "parens patriae" refer to?',
    ['The right of citizens to vote', 'The state acting as guardian of persons under legal disability', 'The power of the president to veto bills', 'The right to own private property'],
    1,
    '"Parens patriae" literally means "parent of the nation." In legal context, it refers to the state\'s role as guardian of persons under legal disability, such as minors and the mentally incapacitated, exercising protective authority over their welfare.'
  ),

  // ==================== CLERICAL ABILITY (30 questions) ====================

  // --- CLERICAL ABILITY: EASY (9) ---

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Arrange the following words in alphabetical order: Mango, Lemon, Melon, Lime',
    ['Lemon, Lime, Mango, Melon', 'Lime, Lemon, Mango, Melon', 'Lemon, Lime, Melon, Mango', 'Lime, Lemon, Melon, Mango'],
    0,
    'Alphabetical order: Lemon (LE), Lime (LI), Mango (MA), Melon (ME). "LE" comes before "LI," and "MA" comes before "ME."'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Compare the following pairs: 4589 and 4598. Are they the same or different?',
    ['Same', 'Different', 'Cannot be determined', 'Partially same'],
    1,
    '4589 and 4598 are different. The last two digits are transposed: "89" vs "98."'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which of the following words is spelled correctly?',
    ['Neccessary', 'Necessary', 'Necesary', 'Neccesary'],
    1,
    'The correct spelling is "Necessary" — one "c" and two "s"s.'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'In filing, which name comes first alphabetically? Garcia, Jose M. or Garcia, Jose A.?',
    ['Garcia, Jose M.', 'Garcia, Jose A.', 'They are filed the same', 'Cannot be determined'],
    1,
    'When last names and first names are the same, file by middle initial. "A" comes before "M," so Garcia, Jose A. comes first.'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Which of the following numbers is the largest? 0.45, 0.54, 0.405, 0.504',
    ['0.45', '0.54', '0.405', '0.504'],
    1,
    'Comparing: 0.54 > 0.504 > 0.45 > 0.405. The largest number is 0.54.'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Find the error in the address: 456 Rizal Ave., Makati City, Metro Manila, 12100',
    ['Incorrect street name', 'Incorrect city', 'Incorrect ZIP code (should be 4 digits)', 'No error'],
    2,
    'Philippine ZIP codes are 4 digits. "12100" has 5 digits and is incorrect. Makati City ZIP codes are typically in the 1200-1299 range.'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Compare the following names: "De la Cruz, Roberto" and "Dela Cruz, Roberto." Are they filed the same way?',
    ['Yes, they are the same', 'No, "De la Cruz" comes first', 'No, "Dela Cruz" comes first', 'It depends on the filing system'],
    3,
    'Filing of names with spaces (De la Cruz vs. Dela Cruz) depends on the filing system used. Some systems treat "De la" as separate words and file under "D-e," while others treat "Dela" as one word. Most Philippine filing systems would distinguish them.'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'How many errors are in this sentence? "The goverment employes must submitt their reports on tyme."',
    ['2', '3', '4', '5'],
    2,
    'Four errors: "goverment" (government), "employes" (employees), "submitt" (submit), "tyme" (time).'
  ),

  q(QC.CLERICAL_ABILITY, D.EASY,
    'Arrange the following file numbers in ascending order: 2045, 2054, 2035, 2053',
    ['2035, 2045, 2053, 2054', '2035, 2045, 2054, 2053', '2045, 2035, 2053, 2054', '2053, 2054, 2035, 2045'],
    0,
    'In ascending order: 2035, 2045, 2053, 2054.'
  ),

  // --- CLERICAL ABILITY: MEDIUM (15) ---

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Arrange the following names in correct filing order: Santos, Maria C.; Santos, Mario A.; Santos, Maria A.; Santos, Mario C.',
    ['Santos, Maria A.; Santos, Maria C.; Santos, Mario A.; Santos, Mario C.', 'Santos, Mario A.; Santos, Mario C.; Santos, Maria A.; Santos, Maria C.', 'Santos, Maria A.; Santos, Mario A.; Santos, Maria C.; Santos, Mario C.', 'Santos, Maria C.; Santos, Maria A.; Santos, Mario C.; Santos, Mario A.'],
    0,
    'Filing order: Compare first names first: Maria before Mario (I before O). Then compare middle initials: A before C. So: Maria A., Maria C., Mario A., Mario C.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Compare the following codes: XK-7493-PQ and XK-7493-PQ. Are they the same or different?',
    ['Same', 'Different', 'Cannot be determined', 'Partially same'],
    0,
    'Both codes are identical: XK-7493-PQ. All letters, numbers, and hyphens match exactly.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A filing code uses the format: [Department Letter][Year]-[Sequential Number]. Which of the following is the most recent document? A2024-0089, A2024-0098, A2023-0150, A2025-0003',
    ['A2024-0089', 'A2024-0098', 'A2023-0150', 'A2025-0003'],
    3,
    'The most recent document has the latest year. A2025-0003 is from 2025, which is later than all others. The sequential number being lower does not affect the year-based ordering.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'In a government form, which of the following entries has an error for a date field that requires DD/MM/YYYY format?',
    ['15/06/2024', '31/12/2023', '02/30/2024', '28/02/2024'],
    2,
    '02/30/2024 is invalid because if it means the 2nd day of the 30th month (impossible) or if interpreted differently, February 30 does not exist. In DD/MM/YYYY format, this would be day 2, month 30—there is no 30th month.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'How many differences can you find between these two strings? ABCDEFGHIJ and ABCDEFGHJI',
    ['0', '1', '2', '3'],
    1,
    'Comparing character by character: the last two characters are transposed. "IJ" in the first string vs "JI" in the second. While two characters differ in position, this represents 1 transposition error (one swap).'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'If documents are classified as follows: "A" for Administrative, "F" for Financial, "P" for Personnel, and "T" for Technical, how should a memo about employee leave policies be classified?',
    ['A - Administrative', 'F - Financial', 'P - Personnel', 'T - Technical'],
    2,
    'Employee leave policies relate to personnel management, so the document should be classified as "P" for Personnel.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following ZIP code and city pairings is likely INCORRECT for the Philippines?',
    ['1000 - Manila', '6000 - Cebu City', '8000 - Davao City', '5000 - Quezon City'],
    3,
    'Quezon City ZIP codes are in the 1100 range. "5000" is the ZIP code for Iloilo City, not Quezon City. Manila is 1000, Cebu City is 6000, and Davao City is 8000.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Proofread the following: "The Commision on Audit shall have the power to examine and audit all accounts pertaning to the revenue." How many spelling errors are there?',
    ['0', '1', '2', '3'],
    2,
    'Two spelling errors: "Commision" should be "Commission" and "pertaning" should be "pertaining."'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'In alphabetical filing, which of the following comes LAST?',
    ['De Leon, Antonio', 'De Los Santos, Carlos', 'Del Rosario, Bella', 'De Guzman, Diana'],
    1,
    'Filing alphabetically by the letter after "De/Del": De Guzman (G), De Leon (L), De Los Santos (L then O), Del Rosario (L then R... but "Del" vs "De L"). Comparing: De Guzman, De Leon, De Los Santos, Del Rosario. "De G" < "De L" < "De Los" < "Del R". De Los Santos comes after De Leon (comparing "Los" vs "Leon": "Leo" < "Los"). Del Rosario: "Del" comes after "De L" since "Del" = "Del" and "De L" = "De L" (space after De). In strict filing, "Del" (no space) files differently from "De L" (with space). "De Los Santos" would likely come last as "De Los" > "De Leo" and "Del" could be before or after depending on convention.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Compare these two entries and identify the difference: "Employee ID: 2024-EMP-00451" vs "Employee ID: 2024-EMP-00415"',
    ['The year is different', 'The prefix is different', 'The last three digits are different', 'The entries are identical'],
    2,
    'The difference is in the last three digits: "451" vs "415." The digits 5 and 1 are transposed.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A government office uses a color-coded filing system: Red for Urgent, Yellow for Routine, Blue for Confidential, and Green for Archive. A classified performance review of a senior official should be filed under which color?',
    ['Red', 'Yellow', 'Blue', 'Green'],
    2,
    'A classified performance review is confidential in nature and should be filed under Blue (Confidential).'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Which of the following account numbers follows the correct format of XXX-XXXX-XXX?',
    ['123-45678-901', '123-4567-890', '1234-567-890', '12-34567-890'],
    1,
    'The format XXX-XXXX-XXX means 3 digits, hyphen, 4 digits, hyphen, 3 digits. Only "123-4567-890" matches this pattern.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'How many times does the letter combination "tion" appear in the following sentence? "The administration of the organization requires dedication, determination, and cooperation for the completion of the mission."',
    ['5', '6', '7', '8'],
    1,
    'The "tion" combination appears in: administra(tion), organiza(tion), dedica(tion), determina(tion), coopera(tion), and comple(tion). Note that "mission" ends in "sion," not "tion." Total count: 6.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'Arrange the following government agencies in alphabetical order: DILG, DBM, DOLE, DA',
    ['DA, DBM, DILG, DOLE', 'DA, DBM, DOLE, DILG', 'DBM, DA, DILG, DOLE', 'DILG, DA, DBM, DOLE'],
    0,
    'Alphabetical order: DA (Department of Agriculture), DBM (Department of Budget and Management), DILG (Department of the Interior and Local Government), DOLE (Department of Labor and Employment). D-A < D-B < D-I < D-O.'
  ),

  q(QC.CLERICAL_ABILITY, D.MEDIUM,
    'A data entry clerk is inputting the following information. Which entry contains a formatting error for a Philippine mobile number (format: 09XX-XXX-XXXX)?',
    ['0917-123-4567', '0918-456-7890', '917-123-4567', '0925-789-0123'],
    2,
    '"917-123-4567" is missing the leading "0." Philippine mobile numbers should start with "09" followed by the remaining digits. The correct format would be "0917-123-4567."'
  ),

  // --- CLERICAL ABILITY: HARD (6) ---

  q(QC.CLERICAL_ABILITY, D.HARD,
    'Arrange the following names in correct filing order: Mac Arthur, Douglas; MacArthur, Daniel; Mack, Robert; Macaraeg, Luis',
    ['Mac Arthur, Douglas; Macaraeg, Luis; MacArthur, Daniel; Mack, Robert', 'Macaraeg, Luis; Mac Arthur, Douglas; MacArthur, Daniel; Mack, Robert', 'Mac Arthur, Douglas; MacArthur, Daniel; Macaraeg, Luis; Mack, Robert', 'Macaraeg, Luis; MacArthur, Daniel; Mac Arthur, Douglas; Mack, Robert'],
    0,
    'In strict alphabetical filing: "Mac Arthur" (with space) is filed as M-A-C-[space]-A, which comes before "Macaraeg" (M-A-C-A-R). "MacArthur" (no space) is filed as M-A-C-A-R-T, which comes after "Macaraeg" (M-A-C-A-R-A). "Mack" comes last. Order: Mac Arthur, Macaraeg, MacArthur, Mack.'
  ),

  q(QC.CLERICAL_ABILITY, D.HARD,
    'A government form requires entering data in the following order: Last Name, First Name MI., Employee Number, Department Code, Date Hired (MM/DD/YYYY). Which entry is correctly formatted?',
    ['Santos, Juan A., EMP-2024-001, ADM, 03/15/2024', 'Juan Santos A., 2024-001-EMP, ADM, 15/03/2024', 'Santos Juan, A., EMP-2024-001, ADM, 2024-03-15', 'SANTOS, Juan A., EMP2024001, ADM, 03-15-2024'],
    0,
    'Option A follows the correct format: "Santos, Juan A." (Last Name, First Name MI.), "EMP-2024-001" (Employee Number), "ADM" (Department Code), "03/15/2024" (MM/DD/YYYY date format).'
  ),

  q(QC.CLERICAL_ABILITY, D.HARD,
    'Compare the following two records and identify ALL differences: Record A: "TIN: 123-456-789-000 | SSS: 04-1234567-8 | PhilHealth: 01-234567890-1" Record B: "TIN: 123-456-798-000 | SSS: 04-1234567-8 | PhilHealth: 01-234567890-1"',
    ['No differences', 'One difference: TIN numbers differ', 'Two differences: TIN and SSS numbers differ', 'Three differences: all numbers differ'],
    1,
    'There is one difference: In the TIN, Record A has "789" while Record B has "798." The digits 8 and 9 are transposed. The SSS and PhilHealth numbers are identical in both records.'
  ),

  q(QC.CLERICAL_ABILITY, D.HARD,
    'A records management system uses the following coding: First 2 letters of department + Year + Sequential 4-digit number. Which code represents the 156th document from the Finance department in 2025?',
    ['FI-2025-0156', 'FN-2025-0156', 'FI-2025-156', 'FIN-2025-0156'],
    0,
    'Finance department: first 2 letters = "FI." Year = 2025. Sequential number with 4 digits = 0156. The correct code is FI-2025-0156.'
  ),

  q(QC.CLERICAL_ABILITY, D.HARD,
    'You are auditing a payroll sheet. Employee A has a basic salary of ₱25,000, overtime of ₱3,500, and deductions of ₱4,200. Employee B has a basic salary of ₱25,000, overtime of ₱3,500, and deductions of ₱4,200. The sheet shows net pay of ₱24,300 for A and ₱24,800 for B. Which statement is correct?',
    ['Both net pays are correct', 'Only A\'s net pay is correct', 'Only B\'s net pay is correct', 'Neither net pay is correct'],
    1,
    'Net pay = Basic salary + Overtime - Deductions = ₱25,000 + ₱3,500 - ₱4,200 = ₱24,300. Both employees have the same figures, so both should have ₱24,300. A is correct (₱24,300), but B is incorrect (shows ₱24,800 instead of ₱24,300).'
  ),

  q(QC.CLERICAL_ABILITY, D.HARD,
    'In a cross-referencing system, Document #2024-ADM-0089 references Documents #2024-FIN-0034, #2024-PER-0112, and #2024-ADM-0067. If Document #2024-FIN-0034 is moved to Archive Box 7-A, which cross-reference entry needs to be updated?',
    ['Only Document #2024-ADM-0089', 'Only Document #2024-FIN-0034', 'Documents #2024-ADM-0089 and #2024-FIN-0034', 'All four documents'],
    2,
    'When a document is moved, its own location record must be updated (#2024-FIN-0034), and any document that references it must also have its cross-reference updated (#2024-ADM-0089 references it). The other two documents (#2024-PER-0112 and #2024-ADM-0067) are only referenced BY #2024-ADM-0089, not referencing #2024-FIN-0034, so they do not need updating.'
  ),
];
