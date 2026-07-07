import type { FieldOption, FormConfig } from '../types/feedback';

const RATING_OPTIONS: FieldOption[] = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

const YES_NO_OPTIONS: FieldOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const FOOD_TEMPERATURE_OPTIONS: FieldOption[] = [
  { label: 'Hot', value: 'hot' },
  { label: 'Warm', value: 'warm' },
  { label: 'Cold', value: 'cold' },
];

const PORTION_SIZE_OPTIONS: FieldOption[] = [
  { label: 'Too Little', value: 'too_little' },
  { label: 'Just Right', value: 'just_right' },
  { label: 'Too Much', value: 'too_much' },
];

export const formConfig: FormConfig = [
  {
    id: 'quality',
    title: 'Food Quality',
    fields: [
      {
        id: 'overallQuality',
        type: 'dropdown',
        label: 'Overall Food Quality',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'taste',
        type: 'dropdown',
        label: 'Taste',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'foodTemperature',
        type: 'radio',
        label: 'Food Temperature',
        required: true,
        options: FOOD_TEMPERATURE_OPTIONS,
      },
      {
        id: 'portionSize',
        type: 'dropdown',
        label: 'Portion Size',
        required: false,
        options: PORTION_SIZE_OPTIONS,
      },
      {
        id: 'foodFreshness',
        type: 'radio',
        label: 'Food Freshness',
        required: true,
        options: YES_NO_OPTIONS,
      },
      {
        id: 'comments',
        type: 'textarea',
        label: 'Comments',
        required: false,
        placeholder: 'Any additional feedback about the food quality?',
      },
    ],
  },
  {
    id: 'cleanliness',
    title: 'Cleanliness',
    fields: [
      {
        id: 'servingCounterHygiene',
        type: 'dropdown',
        label: 'Serving Counter Hygiene',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'staffPersonalHygiene',
        type: 'dropdown',
        label: 'Staff Personal Hygiene',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'servingUtensilsCleanliness',
        type: 'dropdown',
        label: 'Serving Utensils Cleanliness',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'foodPresentation',
        type: 'dropdown',
        label: 'Food Presentation',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'foodServingAreaCleanliness',
        type: 'dropdown',
        label: 'Food Serving Area Cleanliness',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'comments',
        type: 'textarea',
        label: 'Comments',
        required: false,
        placeholder: 'Any additional feedback about cleanliness?',
      },
    ],
  },
  {
    id: 'service',
    title: 'Service Experience',
    fields: [
      {
        id: 'staffCourtesy',
        type: 'dropdown',
        label: 'Staff Courtesy',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'staffResponsiveness',
        type: 'dropdown',
        label: 'Staff Responsiveness',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'queueManagement',
        type: 'dropdown',
        label: 'Queue Management',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'concernsAddressed',
        type: 'radio',
        label: 'Were your concerns addressed?',
        required: true,
        options: YES_NO_OPTIONS,
      },
      {
        id: 'overallServiceExperience',
        type: 'dropdown',
        label: 'Overall Service Experience',
        required: true,
        options: RATING_OPTIONS,
      },
      {
        id: 'comments',
        type: 'textarea',
        label: 'Comments',
        required: false,
        placeholder: 'Any additional feedback about the service experience?',
      },
    ],
  },
];
