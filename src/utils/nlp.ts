import natural from "natural";
import stopword from "stopword";

import { WORD_DICT } from "./const";

export const convertToStandard = (text:string):string => {
    const data = text.split(' ');
    data.forEach((word, ind) => {
        Object.keys(WORD_DICT).forEach(key => { 
            if (key === word.toLowerCase()) { 
                data[ind] = WORD_DICT[key] 
            }; 
        });
    })
    return data.join(' ')
}

export const convertToLowerCase = (text:string):string => {
    return text.toLowerCase();
}

// Pure Alphabets extraction 
export const removeNonAlpha = (text: string): string => { 
    return text.replace(/[^a-zA-Z\s]+/g, ''); 
} 

export const getAnalysis = (text: string): number => {
  // NLP Logic
  // Convert all data to its standard form
  const lexData = convertToStandard(text);

  // Convert all data to lowercase
  const lowerCaseData = convertToLowerCase(lexData);

  // Remove non alphabets and special characters
  const onlyAlpha = removeNonAlpha(lowerCaseData);

  // Tokenization
  const tokenConstructor = new natural.WordTokenizer();
  const tokenizedData = tokenConstructor.tokenize(onlyAlpha);
  console.log("Tokenized Data: ", tokenizedData);

  // Remove Stopwords
  const filteredData = stopword.removeStopwords(tokenizedData);
  console.log("After removing stopwords: ", filteredData);

  // Stemming
  const Sentianalyzer = new natural.SentimentAnalyzer(
    "English",
    natural.PorterStemmer,
    "afinn"
  );
  const analysis_score = Sentianalyzer.getSentiment(filteredData);

  return analysis_score
};
