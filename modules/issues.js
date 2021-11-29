
// issues.js

import { db } from './db.js'

export async function getAllIssues() {
    console.log('getAllIssues()')
    const sql = 'SELECT * FROM issues'
    const result = await db.query(sql)
    return result
}

export async function addIssue(data) {
    console.log('addIssue()')
    data.fields.username = data.username
    const id = await addIssueDetails(data.fields)
    console.log(`lastInsertId: ${id}`)
}

async function addIssueDetails(data) {
    let sql = `SELECT id FROM accounts WHERE user = "${data.username}"`
    let result = await db.query(sql)
    const userid = result[0].id
    const now = new Date().toISOString()
    const date = now.slice(0, 19).replace('T', ' ')
    console.log(date)
    sql = `INSERT INTO issues(userid, applianceType, ageOfAppliance, manufacturer, faultSummary, faultDescription, workBudget, dateCreated, status, username, longitude, latitude)\ VALUES(${userid}, "${data.applianceType}", ${data['age-slider']}, "${data.manufacturer}", "${data['fault-summary']}", "${data['fault-description']}", ${data['price-slider']}, "${date}", "${data.status}", "${data.username}", "${data.lon}", "${data.lat}");`
    console.log(sql)
    sql = sql.replace('""', "NULL")
    result = await db.query(sql)
    console.log(result)
    return result.lastInsertId
}

export async function getUnassignedIssues() {
    const sql = `SELECT * FROM issues WHERE status = "unassigned"`
    const result = await db.query(sql)
//     console.log(result)
    return result
}
