import { create } from 'zustand';
import { Instructor } from '@/schemas/instructor.schema';
import { instructorsMock } from '@/mocks/instructors.mock';

interface InstructorState {
  instructors: Instructor[];
  selectedInstructor: Instructor | null;
  isLoading: boolean;
  error: string | null;
  fetchInstructors: (params?: {
    latitude?: number;
    longitude?: number;
    radius?: number;
  }) => Promise<void>;
  selectInstructor: (instructor: Instructor | null) => void;
  clearError: () => void;
}

export const useInstructorStore = create<InstructorState>((set) => ({
  instructors: [],
  selectedInstructor: null,
  isLoading: false,
  error: null,

  fetchInstructors: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await instructorsMock.GET(params);
      set({ instructors: response.data, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao buscar instrutores',
        isLoading: false,
      });
    }
  },

  selectInstructor: (instructor) => {
    set({ selectedInstructor: instructor });
  },

  clearError: () => {
    set({ error: null });
  },
}));
