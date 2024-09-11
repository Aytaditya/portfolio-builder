import { pgTable,serial,varchar } from "drizzle-orm/pg-core"

const userInfo=pgTable('userInfo',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
})