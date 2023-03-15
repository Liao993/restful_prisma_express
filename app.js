const express = require("express");
const bodyParser = require('body-parser');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const port = 8000;

app.use(bodyParser.json());


app.get('/get', async (req, res) => {
  const user = await prisma.user.findMany({
    where: {name : "Peter"},
  })
  res.json(user);
})	


app.post('/add', async (req, res) => {
  const name =  req.body.name;
  const email =  req.body.email;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      },
    },
  )
  console.log(user);
  console.log(req.body);
  res.status(200).end();
})



app.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name: "Henry" },
  })
  res.json(user)
})


app.delete(`/publish/:id`, async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  })
  console.log("data deleted");
  res.json(user)
})

// Start up the server 
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});