import { create } from 'zustand'
import type { Community } from '@/modules/community/domain/entities/Community.entity'

interface CreateAudienceState {
  audienceName: string
  selectedCommunities: Community[]
  isModalOpen: boolean
  mode: 'create' | 'edit'
  editingAudienceId: string | null
  editingAudienceDescription: string

  setAudienceName: (name: string) => void
  toggleCommunity: (community: Community) => void
  removeCommunity: (communityName: string) => void
  openModal: () => void
  openEditModal: (audienceId: string, name: string, communities: Community[], description: string) => void
  closeModal: () => void
  reset: () => void
  getSelectedNames: () => string[]
}

const initialState = {
  audienceName: '',
  selectedCommunities: [] as Community[],
  isModalOpen: false,
  mode: 'create' as const,
  editingAudienceId: null as string | null,
  editingAudienceDescription: '',
}

export const useCreateAudienceStore = create<CreateAudienceState>()(
  (set, get) => ({
    ...initialState,

    setAudienceName: (name: string) => set({ audienceName: name }),

    toggleCommunity: (community: Community) =>
      set((state) => {
        const exists = state.selectedCommunities.some(
          (c) => c.getName() === community.getName()
        )
        return {
          selectedCommunities: exists
            ? state.selectedCommunities.filter(
                (c) => c.getName() !== community.getName()
              )
            : [...state.selectedCommunities, community],
        }
      }),

    removeCommunity: (communityName: string) =>
      set((state) => ({
        selectedCommunities: state.selectedCommunities.filter(
          (c) => c.getName() !== communityName
        ),
      })),

    openModal: () => set({ isModalOpen: true, mode: 'create', editingAudienceId: null }),

    openEditModal: (audienceId: string, name: string, communities: Community[], description: string) =>
      set({
        isModalOpen: true,
        mode: 'edit',
        editingAudienceId: audienceId,
        editingAudienceDescription: description,
        audienceName: name,
        selectedCommunities: communities,
      }),

    closeModal: () => set(initialState),

    reset: () => set(initialState),

    getSelectedNames: () =>
      get().selectedCommunities.map((c) => c.getName()),
  })
)
