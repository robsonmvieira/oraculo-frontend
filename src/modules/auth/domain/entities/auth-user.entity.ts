interface AuthUserProps {
  id: string
  email: string
  full_name: string
  is_active: boolean
  is_superuser: boolean
  bio?: string | null
  locale?: string | null
  phone_number?: string | null
}

export class AuthUser {
  private readonly id: string
  private readonly email: string
  private readonly fullName: string
  private readonly isActive: boolean
  private readonly isSuperuser: boolean
  private readonly bio: string | null
  private readonly locale: string | null
  private readonly phoneNumber: string | null

  constructor({ id, email, full_name, is_active, is_superuser, bio, locale, phone_number }: AuthUserProps) {
    this.id = id
    this.email = email
    this.fullName = full_name
    this.isActive = is_active
    this.isSuperuser = is_superuser
    this.bio = bio ?? null
    this.locale = locale ?? null
    this.phoneNumber = phone_number ?? null
  }

  getId(): string {
    return this.id
  }

  getEmail(): string {
    return this.email
  }

  getFullName(): string {
    return this.fullName
  }

  getIsActive(): boolean {
    return this.isActive
  }

  getIsSuperuser(): boolean {
    return this.isSuperuser
  }

  getBio(): string | null {
    return this.bio
  }

  getLocale(): string | null {
    return this.locale
  }

  getPhoneNumber(): string | null {
    return this.phoneNumber
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      full_name: this.fullName,
      is_active: this.isActive,
      is_superuser: this.isSuperuser,
      bio: this.bio,
      locale: this.locale,
      phone_number: this.phoneNumber,
    }
  }
}
