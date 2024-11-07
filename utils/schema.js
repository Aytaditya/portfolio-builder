//import { integer } from 'drizzle-orm/sqlite-core';

const {pgTable,serial,varchar,text, integer, boolean} = require('drizzle-orm/pg-core');

export const userInfo=pgTable('userInfo',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    username:varchar('username'),
    bio:text('bio'),
    location:varchar('location'),
    link:varchar('link'),
    profileImage:varchar('profileImage')
})


export const project=pgTable('project',{
    id:serial('id').primaryKey(),
    name:varchar('name'),
    desc:text('desc'),
    url:varchar('url').notNull(),
    logo:varchar('logo'),
    banner:varchar('banner'),
    category:varchar('category'),
    activeStatus:boolean('activeStatus').$default(true),
    emailRef:varchar('emailRef'),
    userRef: integer('userRef').notNull().references(() => userInfo.id)
})