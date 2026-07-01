import 'dotenv/config';
import app from './app.js';

const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`===============================================`);
  console.log(` AI Resume Analyzer SaaS is running!`);
  console.log(` Port: ${PORT}`);
  console.log(` Host: ${HOST}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`===============================================`);
});
