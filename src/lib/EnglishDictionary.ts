export const recordTypes: {[key: string]: string} = {
    '6300': 'Request master data',
    '6301': 'Transmission of master data',
    '6302': 'Request new examination',
    '6303': 'Cancel requested examination',
    '6310': 'Transmission of examination data',
    '6311': 'Display data of an examination'
}

export const fieldIdentifiers: {[key: string]: string} = {
    '0102': 'Person/company responsible for software',
    '0103': 'Software',
    '0132': 'Release stage of software',
    '0201': '(N)BSNR: Establishment number',
    '0202': 'Name of the payer',
    '0212': 'LANR (lifetime physician number)',
    '0950': 'Central pharmaceutical number for permanent medication',
    '0957': 'Administration form for permanent medication',
    '3000': 'Patient number / patient ID',
    '3100': 'Name affix of the patient',
    '3101': 'Name of the patient',
    '3102': 'First name of the patient',
    '3103': 'Date of  birth of patient',
    '3104': 'Title of the patient',
    '3105': 'Health-insurance number of the patient',
    '3106': 'Full residence of the patient',
    '3107': 'Home street of the patient',
    '3108': 'Type of insurance, MFR',
    '3110': 'Gender of the patient',
    '3112': 'Postal code of the patient',
    '3113': 'Hometown of the patient',
    '3114': 'Residence country code',
    '3116': 'Health-insurance area',
    '3119': 'Health-insurance number of the patient',
    '3618': 'Cellphone number of the patient',
    '3619': 'Email address of the patient',
    '3622': 'Height of the patient in cm',
    '3623': 'Weight of the patient in kg',
    '3626': 'Phone number of the patient',
    '3628': 'Native language of the patient',
    '3649': 'Start of permanent diagnosis',
    '3650': 'Permanent diagnosis',
    '3651': 'Start of permanent medication',
    '3652': 'Permanent medicament',
    '3654': 'Risk factors',
    '3656': 'Allergies',
    '3658': 'Accidents',
    '3660': 'Surgeries',
    '3662': 'Anamnesis',
    '3664': 'Number of births',
    '3666': 'Number of children',
    '3668': 'Number of pregnancies',
    '3670': 'Permanent therapy',
    '3672': 'Follow-up appointment',
    '3673': 'Permanent diagnosis ICD-Code',
    '3674': 'Diagnostic confidence for permanent diagnosis',
    '3675': 'Body side localization for permanent diagnosis',
    '3676': 'Diagnosis explanation for permanent diagnosis',
    '3677': 'Diagnosis derogation for permanent diagnosis',
    '3700': 'Label of the basic-diagnostic category',
    '3701': 'Content of the basic-diagnostic category',
    '4104': 'No. of contracted health insurance',
    '4106': 'Payer billing area',
    '4109': 'Day of last reading of the healh-insurance card in the quarter',
    '4110': 'Valid-to date',
    '4111': 'Health-insurance number',
    '4112': 'Insurance status',
    '4113': 'Status addition / DMP-labeling',
    '4121': 'Schedule of fees',
    '4122': 'Billing area',
    '4200': 'Desired date',
    '4202': 'Accident, Consequences of accident',
    '4203': 'Treatment according to . § 116b SGB V',
    '4204': 'Restricted entitlement according to § 18 Abs. 3a SGB V',
    '4205': 'Assignment',
    '4207': '(Suspected) Diagnosis',
    '4208': 'Findings / Medication',
    '4209': 'Assignment / diagnosis / suspicion',
    '4217': '(N)BSNR: Establishment num-ber of the initiator',
    '4218': '(N)BSNR Establishment number of the referring person',
    '4219': 'Referral from other physician',
    '4220': 'Referral to',
    '4221': 'Type of treatment',
    '4229': 'Exceptional medical indication',
    '4231': 'Follow-up exam of a known infection',
    '4237': 'Hospital name',
    '4241': 'LANR (lifetime physician number) of the initiator',
    '4242': 'LANR (lifetime physician number) of the referring person',
    '6001': 'ICD Code',
    '6003': 'Diagnostic confidence',
    '6004': 'Body side localization',
    '6006': 'Diagnosis explanation',
    '6008': 'Statement of facts for a diagnosis derogation',
    '6200': 'Day of storage of treatment data',
    '6201': 'Time of treatment data elicitation',
    '6205': 'Current diagnosis',
    '6206': 'Central pharmaceutical number',
    '6210': 'Medication prescribed',
    '6211': 'Medication without prescription',
    '6214': 'Number of packages (factor)',
    '6218': 'Information about intake',
    '6220': 'Findings',
    '6221': 'External findings',
    '6226': 'Number of following lines after the identifier 6228',
    '6227': 'Commentary',
    '6228': 'Formatted result charts text',
    '6302': 'File archiving label',
    '6303': 'File format',
    '6304': 'Content of file',
    '6305': 'File path',
    '6329': 'Content of the file in BASE64-coded attachment',
    '6406': 'Free of charge',
    '6407': 'Noctu',
    '6408': 'BVG',
    '6409': 'Accident',
    '6431': 'Aut Idem',
    '8000': 'Record identification',
    '8001': 'End of record',    // Version 3.1
    '8002': 'ObjektIdent',      // Version 3.1
    '8003': 'End of object',    // Version 3.1
    '8004': 'Record length',    // Version 3.1
    '8100': 'Record length',
    '8200': 'ObjektIdent',
    '8201': 'End of object',
    '8202': 'End of record',
    '8310': 'Request identifier',
    '8314': 'Request UID',
    '8315': 'GDT-ID of the receiver',
    '8316': 'GDT-ID of the sender',
    '8402': 'Device and process specific characteristic map',
    '8403': 'Schedule of fees',
    '8404': 'Subcategory to field identifier 8402',
    '8405': 'Information about patient',
    '8407': 'Gender',
    '8408': 'Study-UID',
    '8409': 'Text for examination procedure',
    '8410': 'Test identifier',
    '8411': 'Label of test',
    '8412': 'Test-OID',
    '8413': 'Test/device ID',
    '8418': 'Status of the test',
    '8420': 'Result value',
    '8421': 'Unit',
    '8425': 'Budget-free',
    '8428': 'Sample identifier',
    '8429': 'Sample index',
    '8430': 'Sample label',
    '8431': 'Sample specification',
    '8432': 'Date of collection',
    '8433': 'Time of collection',
    '8437': 'Unit(s) for data stream',
    '8438': 'Data stream',
    '8439': 'Time of collection',
    '8460': 'Normal value text',
    '8461': 'Normal value lower bound',
    '8462': 'Normal value upper bound',
    '8470': 'Test-related notes',
    '8480': 'Results text',
    '8491': 'Referring physician',
    '8501': 'Urgency',
    '8504': 'Intake of medication at the time of sample collection',
    '8510': 'Pregnancy',
    '8511': 'Gestation length (in weeks, days)',
    '8512': '1st day of cycle',
    '8601': 'Name of invoice recipient',
    '8602': 'Title, First name of invoice recipient',
    '8606': 'City of residence of the invoice recipient',
    '8607': 'Street of residence of the invoice recipient',
    '8608': 'Commentary/Reference number',
    '8609': 'Type of billing',
    '8610': 'Private charges',
    '8615': 'Principal',
    '8990': 'Signature (sign of initials)',
    '9103': 'Date of creation',
    '9152': 'Counter URL',
    '9153': 'Description URL',
    '9154': 'URL',
    '9206': 'Used character set',
    '9218': 'GDT Version'
}