
// issues.js

import { db } from './db.js'

export async function getAll() {
    console.log('getAll()')
    
}

export async function addIssue(data) {
    console.log('addIssue()')
    data.fields.username = data.username
    const id = await addIssueDetails(data.fields)
    console.log(`lastInsertId: ${id}`)
}

async function addIssueDetails(data) {
    console.log(data)
    let sql = `SELECT id FROM accounts WHERE user = "${data.username}"`
    let result = await db.query(sql)
    const userid = result[0].id
    const now = new Date().toISOString()
    const date = now.slice(0, 19).replace('T', ' ')
    console.log(date)
    sql = `INSERT INTO issues(userid, applianceType, ageOfAppliance, manufacturer, faultSummary, faultDescription, workBudget, dateCreated, status)\ VALUES(${userid}, "${data.applianceType}", ${data['age-slider']}, "${data.manufacturer}", "${data['fault-summary']}", "${data['fault-description']}", ${data['price-slider']}, "${date}", "${data.status}");`
    console.log(sql)
    sql = sql.replace('""', "NULL")
    result = await db.query(sql)
    console.log(result)
    return result.lastInsertId
}

// ISO Date String: 2021-11-26T21:43:01.986Z
// ISO Date String: 2021-11-26T21:43:01 <=== this is what we want

