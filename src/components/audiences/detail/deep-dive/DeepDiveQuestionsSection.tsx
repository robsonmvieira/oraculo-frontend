import { useTranslation } from 'react-i18next'
import { HelpCircle } from 'lucide-react'
import type { CommonQuestion } from '@/modules/audience/domain/entities/TopicDeepDive.entity'

export interface DeepDiveQuestionsSectionProps {
  questions: CommonQuestion[]
}

const frequencyColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-zinc-300',
}

export function DeepDiveQuestionsSection({ questions }: Readonly<DeepDiveQuestionsSectionProps>) {
  const { t } = useTranslation('audiences')

  if (questions.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('deepDive.commonQuestions')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{questions.length}</span>
      </h4>
      <ul className="space-y-3">
        {questions.map((q) => (
          <li key={q.question} className="flex gap-2">
            <HelpCircle className="w-4 h-4 text-gray-400 dark:text-zinc-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm text-gray-900 dark:text-white">
                  {q.question}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${frequencyColors[q.frequency] ?? frequencyColors.low}`}>
                  {t(`deepDive.severity.${q.frequency}`)}
                </span>
              </div>
              {q.exampleContext && (
                <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                  {q.exampleContext}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
