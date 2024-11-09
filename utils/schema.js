import { relations } from 'drizzle-orm';

const { pgTable, serial, varchar, text, integer, boolean } = require('drizzle-orm/pg-core');

export const userInfo = pgTable('userInfo', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    username: varchar('username'),
    bio: text('bio'),
    location: varchar('location'),
    link: varchar('link'),
    profileImage: varchar('profileImage')
});

export const project = pgTable('project', {
    id: serial('id').primaryKey(),
    name: varchar('name'),
    desc: text('desc'),
    url: varchar('url').notNull(),
    logo: varchar('logo'),
    banner: varchar('banner'),
    category: varchar('category'),
    activeStatus: boolean('activeStatus'),  // Removed defaultFn and made it notNull
    emailRef: varchar('emailRef'),
    userRef: integer('userRef').notNull().references(() => userInfo.id),
    showGraph: boolean('showGraph')
});


export const userProjectRelation=relations(userInfo,({many})=>(
    {
    project:many(project)
    }
));

export const postRelation=relations(project,({one})=>(
    {
    user:one(userInfo,{fields:[project.userRef],references:[userInfo.id]})
    }
))
