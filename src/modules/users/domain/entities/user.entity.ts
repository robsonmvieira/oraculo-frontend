import type { Audience } from "@/modules/audience/domain/entities/Audience.entity"

interface UserProps {
  id: string
  name: string
  email: string
  audiences: Audience[]
}

export class User {
  private readonly id: string
  private readonly name: string
  private readonly email: string
  private audiences: Audience[]

  constructor(
   {
    id,
    name,
    email,
    audiences,
   }: UserProps
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.audiences = audiences
  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      audiences: this.audiences,
    }
  }

  addAudience(audience: Audience): void {
    this.audiences.push(audience)
  }

  removeAudience(audience: Audience): void {
    this.audiences = this.audiences.filter(a => a.getId() !== audience.getId())
  }

  getAudiences(): Audience[] {
    return this.audiences
  }

  getAudienceById(id: string): Audience | undefined {
    return this.audiences.find(a => a.getId() === id)
  }
}