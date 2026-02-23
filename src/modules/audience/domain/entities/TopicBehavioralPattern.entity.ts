export interface ToolPattern {
  tool: string
  useCase: string
  satisfaction: string
  painPoints: string[]
  evidence: string
  communities: string[]
}

export interface WorkaroundPattern {
  problem: string
  workaround: string
  frequency: string
  evidence: string
  communities: string[]
}

export interface FrictionPattern {
  friction: string
  category: string
  severity: string
  affectedTools: string[]
  evidence: string
}

export interface ShiftPattern {
  from: string
  to: string
  reason: string
  stage: string
  evidence: string
}

export interface DemandSignal {
  signal: string
  signalType: string
  frequency: string
  communities: string[]
  evidence: string
}

interface TopicBehavioralPatternProps {
  analysisId: string
  topicId: string
  topicName: string
  completedAt: string
  summary: string
  toolPatterns: ToolPattern[]
  workaroundPatterns: WorkaroundPattern[]
  frictionPatterns: FrictionPattern[]
  shiftPatterns: ShiftPattern[]
  demandSignals: DemandSignal[]
}

export class TopicBehavioralPattern {
  private readonly analysisId: string
  private readonly topicId: string
  private readonly topicName: string
  private readonly completedAt: string
  private readonly summary: string
  private readonly toolPatterns: ToolPattern[]
  private readonly workaroundPatterns: WorkaroundPattern[]
  private readonly frictionPatterns: FrictionPattern[]
  private readonly shiftPatterns: ShiftPattern[]
  private readonly demandSignals: DemandSignal[]

  constructor({ analysisId, topicId, topicName, completedAt, summary, toolPatterns, workaroundPatterns, frictionPatterns, shiftPatterns, demandSignals }: TopicBehavioralPatternProps) {
    this.analysisId = analysisId
    this.topicId = topicId
    this.topicName = topicName
    this.completedAt = completedAt
    this.summary = summary
    this.toolPatterns = toolPatterns
    this.workaroundPatterns = workaroundPatterns
    this.frictionPatterns = frictionPatterns
    this.shiftPatterns = shiftPatterns
    this.demandSignals = demandSignals
  }

  getAnalysisId(): string {
    return this.analysisId
  }

  getTopicId(): string {
    return this.topicId
  }

  getTopicName(): string {
    return this.topicName
  }

  getCompletedAt(): string {
    return this.completedAt
  }

  getSummary(): string {
    return this.summary
  }

  getToolPatterns(): ToolPattern[] {
    return this.toolPatterns
  }

  getWorkaroundPatterns(): WorkaroundPattern[] {
    return this.workaroundPatterns
  }

  getFrictionPatterns(): FrictionPattern[] {
    return this.frictionPatterns
  }

  getShiftPatterns(): ShiftPattern[] {
    return this.shiftPatterns
  }

  getDemandSignals(): DemandSignal[] {
    return this.demandSignals
  }

  toJSON(): object {
    return {
      analysisId: this.analysisId,
      topicId: this.topicId,
      topicName: this.topicName,
      completedAt: this.completedAt,
      summary: this.summary,
      toolPatterns: this.toolPatterns,
      workaroundPatterns: this.workaroundPatterns,
      frictionPatterns: this.frictionPatterns,
      shiftPatterns: this.shiftPatterns,
      demandSignals: this.demandSignals,
    }
  }
}
