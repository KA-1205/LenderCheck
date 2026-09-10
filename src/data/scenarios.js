export const scenarios = [
  {
    id: 'not-found',
    label: '🚫 Not Found',
    appName: 'QuickCash Loan App',
    packageName: 'com.quickcash.loan',
    messages: [
      {
        sender: 'user',
        type: 'text',
        content: 'https://play.google.com/store/apps/details?id=com.quickcash.loan'
      },
      {
        sender: 'bot',
        type: 'text',
        content: '🔍 Checking "QuickCash Loan App"...\n\nPackage: com.quickcash.loan'
      },
      {
        sender: 'bot',
        type: 'loading',
        content: '⏳ Querying RBI DLA Directory...'
      },
      {
        sender: 'bot',
        type: 'loading',
        content: '⏳ Checking Sachet Portal...'
      },
      {
        sender: 'bot',
        type: 'result-card',
        status: 'warning',
        icon: '⚠️',
        title: 'UNABLE TO VERIFY',
        body: "This app was NOT found in RBI's official Digital Lending Apps directory.",
        checks: [
          { label: 'RBI DLA Directory', value: 'Not found', status: 'danger' },
          { label: 'Sachet Portal', value: 'No complaints found', status: 'ok' },
          { label: 'Snapshot', value: '10 Sep 2026', status: 'neutral' }
        ]
      },
      {
        sender: 'bot',
        type: 'text',
        content: 'What does this mean?\n\nBeing "not found" does not confirm fraud, but it means the app could not be verified through the directory.'
      },
      {
        sender: 'bot',
        type: 'consent',
        content: "🔬 Want a deeper scan?\n\nI can analyze the app's permissions and code patterns for red flags."
      }
    ],
    deepScanSteps: [
      '🔐 Analyzing APK permissions...',
      '📜 Checking signing certificate...',
      '🌐 Checking embedded endpoints...',
      '🤖 Running fraud-pattern classifier...'
    ],
    deepScanResult: {
      status: 'danger',
      icon: '🚫',
      title: 'HIGH RISK',
      subtitle: 'Red Flags Detected',
      permissionFlags: [
        { permission: 'READ_SMS', description: 'Can read your text messages.' },
        { permission: 'READ_CONTACTS', description: 'Can access your contact list.' },
        { permission: 'READ_CALL_LOG', description: 'Can access your call history.' }
      ],
      fraudPatterns: [
        { pattern: '"Loan approved in 2 minutes"', label: 'Guaranteed approval claim', confidence: 87 },
        { pattern: '"Zero processing fee guaranteed"', label: 'Fraud-pattern signal', confidence: 91 }
      ],
      recommendations: [
        'Do NOT install this app',
        'Do NOT share Aadhaar/PAN',
        'Report suspicious activity through the appropriate official channel'
      ]
    },
    noThanksMessage: 'No problem. You can manually verify this app by checking the RBI Digital Lending Apps directory at rbi.org.in, or report suspicious activity through the Sachet Portal at sachet.rbi.org.in.'
  },
  {
    id: 'warning',
    label: '⚠️ Warning',
    appName: 'MoneyFast Loan',
    packageName: 'com.moneyfast.loan',
    messages: [
      {
        sender: 'user',
        type: 'text',
        content: '📎 MoneyFast_Loan_v2.1.4.apk'
      },
      {
        sender: 'bot',
        type: 'text',
        content: '🔍 Received APK: MoneyFast Loan\n\nExtracting package information...\n\nPackage: com.moneyfast.loan\nVersion: 2.1.4'
      },
      {
        sender: 'bot',
        type: 'loading',
        content: '⏳ Querying RBI DLA Directory...'
      },
      {
        sender: 'bot',
        type: 'loading',
        content: '⏳ Checking Sachet Portal...'
      },
      {
        sender: 'bot',
        type: 'result-card',
        status: 'warning',
        icon: '⚠️',
        title: 'FOUND WITH COMPLAINTS',
        body: 'This app was found in the RBI directory, BUT complaint signals were found.',
        checks: [
          { label: 'RBI DLA Directory', value: 'Found', status: 'ok' },
          { label: 'Registered Entity', value: 'MoneyFast Finance Pvt Ltd', status: 'neutral' },
          { label: 'Sachet Portal', value: '12 complaints found', status: 'warning' }
        ],
        complaints: [
          '"Charged ₹2,000 processing fee before loan disbursement."',
          '"Started harassment calls to my contacts."'
        ]
      },
      {
        sender: 'bot',
        type: 'consent',
        content: "🔬 Want a deeper scan?\n\nI can analyze the app's permissions and code patterns for red flags."
      }
    ],
    deepScanSteps: [
      '🔐 Analyzing APK permissions...',
      '📜 Checking signing certificate...',
      '🌐 Checking embedded endpoints...',
      '🤖 Running fraud-pattern classifier...'
    ],
    deepScanResult: {
      status: 'danger',
      icon: '🚫',
      title: 'HIGH RISK',
      subtitle: 'Multiple Red Flags',
      permissionFlags: [
        { permission: 'READ_SMS', description: 'Can read your text messages.' },
        { permission: 'READ_CONTACTS', description: 'Can access your contact list.' },
        { permission: 'BIND_ACCESSIBILITY_SERVICE', description: 'Can control your device.' }
      ],
      fraudPatterns: [
        { pattern: '"100% loan approval guaranteed"', label: 'Guaranteed approval claim', confidence: 94 },
        { pattern: '"Pay ₹999 to unlock your loan"', label: 'Upfront fee demand', confidence: 96 }
      ],
      recommendations: [
        'Do NOT pay upfront fees',
        'Do NOT grant accessibility permissions',
        'Report suspicious activity'
      ]
    },
    noThanksMessage: 'Understood. Given the complaints found, please exercise caution with this app. You can check complaints on the Sachet Portal at sachet.rbi.org.in.'
  },
  {
    id: 'verified',
    label: '✅ Verified',
    appName: 'KreditBee',
    packageName: 'com.kreditbee.android',
    messages: [
      {
        sender: 'user',
        type: 'text',
        content: 'KreditBee'
      },
      {
        sender: 'bot',
        type: 'text',
        content: '🔍 Checking "KreditBee"...\n\nPackage: com.kreditbee.android'
      },
      {
        sender: 'bot',
        type: 'loading',
        content: '⏳ Querying RBI DLA Directory...'
      },
      {
        sender: 'bot',
        type: 'result-card',
        status: 'success',
        icon: '✅',
        title: 'VERIFIED — REGISTERED LENDER',
        body: 'This app is registered with RBI as a Digital Lending App.',
        checks: [
          { label: 'Registered Entity', value: 'KreditBee Finance Pvt Ltd', status: 'ok' },
          { label: 'Entity Type', value: 'NBFC', status: 'ok' },
          { label: 'Registration Status', value: 'Active', status: 'ok' },
          { label: 'Directory Snapshot', value: '10 Sep 2026', status: 'neutral' },
          { label: 'Sachet Portal', value: 'No complaints found', status: 'ok' }
        ]
      },
      {
        sender: 'bot',
        type: 'text',
        content: 'ℹ️ WHAT THIS MEANS\n\nThe app has been found in the relevant registration directory. Users should still read loan terms carefully before proceeding.'
      },
      {
        sender: 'bot',
        type: 'action',
        actionLabel: 'Check Another App',
        actionType: 'reset'
      }
    ],
    deepScanSteps: null,
    deepScanResult: null,
    noThanksMessage: null
  },
  {
    id: 'impersonation',
    label: '🔀 Impersonation',
    appName: 'HDFC Bank Personal Loan',
    packageName: 'com.hdfc.personalloan',
    messages: [
      {
        sender: 'user',
        type: 'text',
        content: 'HDFC Bank Personal Loan'
      },
      {
        sender: 'bot',
        type: 'text',
        content: '🔍 Checking "HDFC Bank Personal Loan"...\n\nPackage: com.hdfc.personalloan'
      },
      {
        sender: 'bot',
        type: 'loading',
        content: '⏳ Querying RBI DLA Directory...'
      },
      {
        sender: 'bot',
        type: 'result-card',
        status: 'impersonation',
        icon: '⚠️',
        title: 'POSSIBLE IMPERSONATION',
        body: null,
        alert: {
          icon: '🚨',
          title: 'NAME / IDENTITY MISMATCH',
          description: 'The app claims to represent HDFC Bank, but its identity does not match the expected official app.'
        },
        checks: [
          { label: 'Claimed package', value: 'com.hdfc.personalloan', status: 'danger' },
          { label: 'Official package', value: 'com.hdfc.bank', status: 'ok' },
          { label: 'Signing certificate', value: 'Does not match', status: 'danger' }
        ]
      },
      {
        sender: 'bot',
        type: 'text',
        content: 'This may be an impersonation attempt.'
      },
      {
        sender: 'bot',
        type: 'text',
        content: 'What to do\n\n1. Do NOT use the app you were sent\n2. Use the official app source instead\n3. Report the suspicious app'
      },
      {
        sender: 'bot',
        type: 'action',
        actionLabel: 'Open Official App →',
        actionType: 'external'
      }
    ],
    deepScanSteps: null,
    deepScanResult: null,
    noThanksMessage: null
  }
];
