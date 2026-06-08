import { pgSchema, uuid, text, boolean, integer, timestamp, date, jsonb } from 'drizzle-orm/pg-core'

// EmmausAI uses its own schema, separate from SilverConnect
export const emmausSchema = pgSchema('emmaus')

export const profiles = emmausSchema.table('profiles', {
  id: uuid('id').primaryKey(),
  displayName: text('display_name'),
  preferredLocale: text('preferred_locale').default('en'),
  countryCode: text('country_code').default('US'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const courses = emmausSchema.table('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  difficulty: text('difficulty').default('beginner'),
  thumbnailUrl: text('thumbnail_url'),
  lessonsCount: integer('lessons_count').default(0),
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const lessons = emmausSchema.table('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content'),
  bibleReferences: text('bible_references'),
  orderIndex: integer('order_index').default(0),
  aiPrompt: text('ai_prompt'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const userProgress = emmausSchema.table('user_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }),
  completed: boolean('completed').default(false),
  score: integer('score'),
  completedAt: timestamp('completed_at', { withTimezone: true }),
})

export const studyGroups = emmausSchema.table('study_groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  courseId: uuid('course_id').references(() => courses.id),
  createdBy: uuid('created_by').references(() => profiles.id),
  maxMembers: integer('max_members').default(12),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const studyGroupMembers = emmausSchema.table('study_group_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id').references(() => studyGroups.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }),
  joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
})

export const prayerRequests = emmausSchema.table('prayer_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id),
  content: text('content').notNull(),
  isAnonymous: boolean('is_anonymous').default(false),
  prayerCount: integer('prayer_count').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const chatHistory = emmausSchema.table('chat_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }),
  messages: jsonb('messages'),
  topic: text('topic'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const devotionals = emmausSchema.table('devotionals', {
  id: uuid('id').primaryKey().defaultRandom(),
  devotionalDate: date('devotional_date').notNull(),
  verse: text('verse').notNull(),
  verseReference: text('verse_reference').notNull(),
  reflection: text('reflection').notNull(),
  prayer: text('prayer'),
  application: text('application'),
  locale: text('locale').default('en'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const readingPlans = emmausSchema.table('reading_plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  durationDays: integer('duration_days').default(365),
  planData: jsonb('plan_data'),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const userReadingProgress = emmausSchema.table('user_reading_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }),
  planId: uuid('plan_id').references(() => readingPlans.id),
  currentDay: integer('current_day').default(1),
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow(),
  lastReadAt: timestamp('last_read_at', { withTimezone: true }),
})
