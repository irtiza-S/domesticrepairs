
/* db.js */

import { Client } from 'https://deno.land/x/mysql/mod.ts'

const home = Deno.env.get('HOME')
console.log(`HOME: ${home}`)

const connectionData = {
  '/home/codio':  {
    hostname: '127.0.0.1',
    username: 'websiteuser',
    password: 'websitepassword',
    db: 'website'
  },
  '/app': {
		hostname: 'us-cdbr-east-04.cleardb.com',
    username: 'b018617be19bf2',
    password: '7478bf91',
    db: 'heroku_006331286d51e20'
  }
}

const conn = connectionData[home]
console.log(conn)

const db = await new Client().connect(conn)

export { db }
