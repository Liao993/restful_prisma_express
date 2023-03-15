// this script : getting information and print on terminal directly without restful api
// the app.js is the one used express to get, post, update and delete data

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })