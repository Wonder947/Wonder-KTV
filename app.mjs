import './config.mjs';
import './db.mjs';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import session from 'express-session';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res)=>{
    res.render('home.hbs', {});
});


app.listen(process.env.PORT || 3000);
