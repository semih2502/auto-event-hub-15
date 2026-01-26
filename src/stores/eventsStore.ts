import { create } from 'zustand';

export type EventCategory = 'meeting' | 'race' | 'salon' | 'rally' | 'auction';

export interface CarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  end_date?: string;
  location: string;
  address: string;
  image_url: string;
  category: EventCategory;
  organizer_id: string;
  organizer_name: string;
  max_participants?: number;
  current_participants: number;
  is_featured: boolean;
  price?: number;
  created_at: string;
}

interface EventsState {
  events: CarEvent[];
  featuredEvents: CarEvent[];
  selectedCategory: EventCategory | 'all';
  isLoading: boolean;
  setEvents: (events: CarEvent[]) => void;
  setFeaturedEvents: (events: CarEvent[]) => void;
  setSelectedCategory: (category: EventCategory | 'all') => void;
  setIsLoading: (isLoading: boolean) => void;
  addEvent: (event: CarEvent) => void;
  updateEvent: (id: string, event: Partial<CarEvent>) => void;
  deleteEvent: (id: string) => void;
}

export const useEventsStore = create<EventsState>((set) => ({
  events: [],
  featuredEvents: [],
  selectedCategory: 'all',
  isLoading: false,
  setEvents: (events) => set({ events }),
  setFeaturedEvents: (events) => set({ featuredEvents: events }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setIsLoading: (isLoading) => set({ isLoading }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (id, updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));
