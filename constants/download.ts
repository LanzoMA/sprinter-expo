import AsyncStorage from '@react-native-async-storage/async-storage';
import { Question } from './models';

export async function storeQuestion(question: Question): Promise<void> {
  const questions = await getQuestions();
  questions.push(question);

  const data = JSON.stringify(questions);
  await AsyncStorage.setItem('saved-questions', data);
}

export async function getQuestions(): Promise<Array<Question>> {
  const data = await AsyncStorage.getItem('saved-questions');

  if (!data) return [];

  return JSON.parse(data);
}

export async function getQuestionById(id: string): Promise<Question> {
  const questions = await getQuestions();

  if (!questions) throw new Error('No questions found');

  const question = questions.find((question) => question._id === id);

  if (!question) throw new Error('Question not found');

  return question;
}
