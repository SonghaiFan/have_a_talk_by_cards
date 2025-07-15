export interface AppInfo {
  title: string;
  subtitle: string;
  type: string;
  version: string;
}

export interface StartScreen {
  title: string;
  description: string[];
  startButton: string;
}

export interface Navigation {
  nextButton: string;
  prevButton: string;
}

export interface Results {
  title: string;
  subtitle: string;
  restartButton: string;
}

export interface UIConfig {
  startScreen: StartScreen;
  navigation: Navigation;
  results: Results;
}

export interface Category {
  name: string;
  color: string;
  description: string;
}

export interface ThemeConfig {
  categories: Record<string, Category>;
}

export interface ExportTemplate {
  header: string;
  category: string;
  question: string;
  separator: string;
}

export interface ExportConfig {
  filename: string;
  template: ExportTemplate;
}

export interface Question {
  type?: string;
  question: string;
  options?: string[] | Record<string, string>;
}

export interface QuestionCategory {
  category: string;
  questions: Question[];
}

export interface ConversationGame {
  testType: string;
  app: AppInfo;
  ui: UIConfig;
  theme: ThemeConfig;
  export: ExportConfig;
  questions: QuestionCategory[];
}

export interface GameLibrary {
  games: ConversationGame[];
  lastUpdated: string;
}

export interface GameAnswer {
  questionIndex: number;
  categoryIndex: number;
  selectedOption: string;
  answerText: string;
}

export interface GameSession {
  gameId: string;
  startTime: Date;
  answers: GameAnswer[];
  currentQuestionIndex: number;
  currentCategoryIndex: number;
}
