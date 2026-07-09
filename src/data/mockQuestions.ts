import type { Question, Cell } from '../types/game';

export const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'ما هي عاصمة المملكة العربية السعودية؟',
    answer: 'الرياض',
    category: 'معلومات سعودية',
    difficulty: 'easy'
  },
  {
    id: '2',
    text: 'في أي عام تم توحيد المملكة العربية السعودية؟',
    answer: '1932 م (1351 هـ)',
    category: 'تاريخ',
    difficulty: 'medium'
  },
  {
    id: '3',
    text: 'ما هو أكبر كوكب في المجموعة الشمسية؟',
    answer: 'المشتري',
    category: 'علوم',
    difficulty: 'easy'
  },
  {
    id: '4',
    text: 'من هو النبي الذي ألقي في النار ولم تحرقه؟',
    answer: 'إبراهيم عليه السلام',
    category: 'دين',
    difficulty: 'easy'
  },
  {
    id: '5',
    text: 'ما هو البحر الذي يفصل بين قارتي أفريقيا وآسيا؟',
    answer: 'الحر الأحمر',
    category: 'جغرافيا',
    difficulty: 'easy'
  },
  {
    id: '6',
    text: 'كم عدد اللاعبين في فريق كرة القدم؟',
    answer: '11 لاعب',
    category: 'رياضة',
    difficulty: 'easy'
  },
  {
    id: '7',
    text: 'أكمل المثل: من جد وجد، ومن زرع...',
    answer: 'حصد',
    category: 'أمثال',
    difficulty: 'easy'
  },
  {
    id: '8',
    text: 'ما هي لغة البرمجة التي تعتبر الأفضل لتطوير واجهات المستخدم؟',
    answer: 'JavaScript / TypeScript',
    category: 'تقنية',
    difficulty: 'medium'
  },
  {
    id: '9',
    text: 'ما هو الذهب الأسود؟',
    answer: 'البترول (النفط)',
    category: 'ثقافة عامة',
    difficulty: 'easy'
  },
  {
    id: '10',
    text: 'شيء كلما زاد نقص، ما هو؟',
    answer: 'العمر',
    category: 'ألغاز',
    difficulty: 'easy'
  }
];

export const INITIAL_GRID: Cell[] = [
  // Row 0
  { id: 0, row: 0, col: 0, letter: 'م', ownerId: null, isWinningCell: false },
  { id: 1, row: 0, col: 1, letter: 'ذ', ownerId: null, isWinningCell: false },
  { id: 2, row: 0, col: 2, letter: 'أ', ownerId: null, isWinningCell: false },
  { id: 3, row: 0, col: 3, letter: 'ي', ownerId: null, isWinningCell: false },
  { id: 4, row: 0, col: 4, letter: 'و', ownerId: null, isWinningCell: false },
  // Row 1
  { id: 5, row: 1, col: 0, letter: 'ت', ownerId: null, isWinningCell: false },
  { id: 6, row: 1, col: 1, letter: 'خ', ownerId: null, isWinningCell: false },
  { id: 7, row: 1, col: 2, letter: 'ع', ownerId: null, isWinningCell: false },
  { id: 8, row: 1, col: 3, letter: 'ف', ownerId: null, isWinningCell: false },
  { id: 9, row: 1, col: 4, letter: 'ز', ownerId: null, isWinningCell: false },
  // Row 2
  { id: 10, row: 2, col: 0, letter: 'ل', ownerId: null, isWinningCell: false },
  { id: 11, row: 2, col: 1, letter: 'س', ownerId: null, isWinningCell: false },
  { id: 12, row: 2, col: 2, letter: 'ب', ownerId: null, isWinningCell: false },
  { id: 13, row: 2, col: 3, letter: 'ث', ownerId: null, isWinningCell: false },
  { id: 14, row: 2, col: 4, letter: 'ش', ownerId: null, isWinningCell: false },
  // Row 3
  { id: 15, row: 3, col: 0, letter: 'ص', ownerId: null, isWinningCell: false },
  { id: 16, row: 3, col: 1, letter: 'ه', ownerId: null, isWinningCell: false },
  { id: 17, row: 3, col: 2, letter: 'ح', ownerId: null, isWinningCell: false },
  { id: 18, row: 3, col: 3, letter: 'ظ', ownerId: null, isWinningCell: false },
  { id: 19, row: 3, col: 4, letter: 'ن', ownerId: null, isWinningCell: false },
  // Row 4
  { id: 20, row: 4, col: 0, letter: 'ج', ownerId: null, isWinningCell: false },
  { id: 21, row: 4, col: 1, letter: 'ك', ownerId: null, isWinningCell: false },
  { id: 22, row: 4, col: 2, letter: 'د', ownerId: null, isWinningCell: false },
  { id: 23, row: 4, col: 3, letter: 'غ', ownerId: null, isWinningCell: false },
  { id: 24, row: 4, col: 4, letter: 'ط', ownerId: null, isWinningCell: false },
];

export const CATEGORIES = [
  'ثقافة عامة',
  'دين',
  'تاريخ',
  'رياضة',
  'علوم',
  'جغرافيا',
  'تقنية',
  'أفلام',
  'مسلسلات',
  'كرتون',
  'أمثال',
  'ألغاز',
  'ذكاء',
  'حساب',
  'لغة عربية',
  'شخصيات',
  'معلومات سعودية',
  'تراث سعودي',
  'لهجات',
  'اقتصاد'
];

export const TEAM_COLORS = [
  { name: 'أحمر فاخر', value: '#dc2626' },
  { name: 'أزرق ملكي', value: '#2563eb' },
  { name: 'أخضر زمردي', value: '#16a34a' },
  { name: 'بنفسجي عميق', value: '#7c3aed' },
  { name: 'برتقالي مشرق', value: '#ea580c' },
  { name: 'ذهبي أصيل', value: '#d97706' },
  { name: 'فيروزي', value: '#0d9488' },
  { name: 'وردي ناعم', value: '#db2777' },
];
