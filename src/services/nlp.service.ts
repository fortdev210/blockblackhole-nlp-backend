/** @format */
import { AppDataSource } from '@/setup/datasource'
import { FeedbackEntity } from "@/entities"
import { getAnalysis } from "@/utils/nlp"

export const addFeedback = async(text:string) => {
    const score = getAnalysis(text)
    const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);
    const newFeedback = new FeedbackEntity()
    Object.assign(newFeedback, {text, score})
    return await feedbackRepository.save(newFeedback)
}

export const getFeedbackList = async () => {
    return await AppDataSource.getRepository(FeedbackEntity).find()||[]
}