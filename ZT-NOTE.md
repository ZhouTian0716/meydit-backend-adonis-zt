
1. Create test
node ace make:test functional projects/store

2. auth middle ware
lecture 50:52
https://www.youtube.com/watch?v=PE0Jmu8Qqjo&t=3052s&ab_channel=AmanVirk

if using session auth
npm i @adonisjs/session

node ace configure @adonisjs/session

3. file upload (learn this LATER)
lecture 58:09

LEARN THIS DRIVE ON DOC TO SETUP WITH AWS S3 LATER
模拟上传测试
import Drive from '@ioc:Adonis/Core/Drive'

4. project show route
exception handler

5. serializeAs null in model usage example

6. tech debts
-- need to manully delete token from sql table, once token expires, but logout will do it, in case of forgotting logout, than you lost the access token (at header, client side won't be able to logout again, need to go database delete)

--