export type Language = 'en' | 'hi' | 'te';

export interface Translations {
  title: string;
  placeholder: string;
  send: string;
  crisisTitle: string;
  crisisDescription: string;
  crisisHelplines: string;
  signIn: string;
  signUp: string;
  signOut: string;
  email: string;
  password: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  conversationStarters: string[];
}

export const translations: Record<Language, Translations> = {
  en: {
    title: 'SereneTalk',
    placeholder: 'Share what\'s on your mind...',
    send: 'Send',
    crisisTitle: 'Need immediate help?',
    crisisDescription: 'If you\'re in crisis or need immediate support, please reach out:',
    crisisHelplines: 'Crisis Helplines',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    welcomeTitle: 'Welcome to SereneTalk',
    welcomeSubtitle: 'A safe space to share your thoughts and feelings. I\'m here to listen and support you.',
    conversationStarters: [
      "I'm feeling anxious today",
      "I need someone to talk to",
      "Help me relax",
      "I'm having a difficult day",
    ],
  },
  hi: {
    title: 'SereneTalk',
    placeholder: 'अपने मन की बात साझा करें...',
    send: 'भेजें',
    crisisTitle: 'तुरंत मदद चाहिए?',
    crisisDescription: 'यदि आप संकट में हैं या तुरंत सहायता की आवश्यकता है, कृपया संपर्क करें:',
    crisisHelplines: 'क्राइसिस हेल्पलाइन',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    signOut: 'साइन आउट',
    email: 'ईमेल',
    password: 'पासवर्ड',
    welcomeTitle: 'SereneTalk में आपका स्वागत है',
    welcomeSubtitle: 'अपने विचारों और भावनाओं को साझा करने के लिए एक सुरक्षित स्थान। मैं आपकी बात सुनने और समर्थन करने के लिए यहाँ हूँ।',
    conversationStarters: [
      "आज मुझे चिंता हो रही है",
      "मुझे किसी से बात करनी है",
      "मुझे आराम करने में मदद करें",
      "आज मेरा दिन मुश्किल है",
    ],
  },
  te: {
    title: 'SereneTalk',
    placeholder: 'మీ మనసులో ఉన్నది పంచుకోండి...',
    send: 'పంపు',
    crisisTitle: 'తక్షణ సహాయం కావాలా?',
    crisisDescription: 'మీరు సంక్షోభంలో ఉన్నారా లేదా తక్షణ మద్దతు అవసరమైతే, దయచేసి సంప్రదించండి:',
    crisisHelplines: 'క్రైసిస్ హెల్ప్‌లైన్లు',
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    signOut: 'సైన్ అవుట్',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    welcomeTitle: 'SereneTalk కు స్వాగతం',
    welcomeSubtitle: 'మీ ఆలోచనలు మరియు భావాలను పంచుకోవడానికి సురక్షితమైన స్థలం. నేను వినడానికి మరియు మీకు మద్దతు ఇవ్వడానికి ఇక్కడ ఉన్నాను.',
    conversationStarters: [
      "ఈ రోజు నాకు ఆందోళనగా ఉంది",
      "నాకు ఎవరితోనైనా మాట్లాడాలి",
      "నన్ను విశ్రాంతి తీసుకోవడంలో సహాయపడండి",
      "నాకు కష్టమైన రోజు",
    ],
  },
};
