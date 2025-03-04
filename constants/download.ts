import AsyncStorage from '@react-native-async-storage/async-storage';
import { Question } from './models';

export async function storeQuestion(question: Question) {
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
