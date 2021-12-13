const { argv } = require('yargs');
const { db } = require('../db');

/**
 * Seeds Users
 * 
 * Invoke the script like this:
 * node app/scripts/seedUsers.js --run
 */
const seedUsers = async run => {

  if (!run) {
    console.log(`\nDRY RUN, would have seeded 1000 dummy Users to the DB.`)
    console.log("USE --run TO SEED USERS\n")
  } else {
    console.log(`\nREAL RUN, creating 1000 Users...`);

    let successCount = 0;
    for (let i = 0; i < 1000; i++) {
      const template = { name: `Test User ${i + 1}` };
      try {
        await db('users').insert(template);
        successCount++;
      } catch(e) { console.log('users.insert error: ', e)}
    }

    console.log(`\n${successCount} Users created.`)
    console.log(`Fin.\n`)
  }
}

(async function main() {
  if (require.main === module) {
    await seedUsers(argv.run)
    process.exit(0)
  }
})()

module.exports = seedUsers;
