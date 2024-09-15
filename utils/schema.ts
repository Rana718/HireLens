import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";


export const MockInterview=pgTable('mockInterview', {
    id: uuid('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt: text('createdAt').notNull(),
    mockId:varchar('mockId').notNull(),
})