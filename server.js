const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('done');
  });

// const testTransaction = new Transaction({
//   serviceType: 'invoices',
//   id_number: 3,
//   serviceBusinessName: 'galaxysailors',
//   recipientName: 'dwffvwf',
// });

// testTransaction
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
