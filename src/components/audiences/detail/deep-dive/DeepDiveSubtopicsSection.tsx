import { useTranslation } from 'react-i18next'
import type { Subtopic } from '@/modules/audience/domain/entities/TopicDeepDive.entity'

export interface DeepDiveSubtopicsSectionProps {
  subtopics: Subtopic[]
}

export function DeepDiveSubtopicsSection({ subtopics }: Readonly<DeepDiveSubtopicsSectionProps>) {
  const { t } = useTranslation('audiences')

  if (subtopics.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('deepDive.subtopics')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{subtopics.length}</span>
      </h4>
      <div className="grid grid-cols-1 gap-3">
        {subtopics.map((subtopic) => (
          <div
            key={subtopic.name}
            className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {subtopic.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-zinc-400">
                {t('deepDive.posts', { count: subtopic.postCount })}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
              {subtopic.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
