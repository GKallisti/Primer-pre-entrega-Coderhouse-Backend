import express from "express";
import handlebars from "express-handlebars";
import productsmdbRouter from "./routes/productrouter.js";
import cartmdbRouter from "./routes/cartrouter.js";
import viewsmdbRouter from "./routes/viewsrouter.js";
import { __dirname } from "./utils.js";
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import sessionRouter from './router/sessions.router.js';
import mongoose from 'mongoose';



const app = express();
//const FileStorage = FileStore(session);      
const PORT = process.env.PORT||8080;
const server = app.listen(PORT, ()=>console.log(`esuchando en puerto ${PORT}`));
const connection = mongoose.connect("mongodb+srv://Gkallisti:123@cluster0.obvrjnw.mongodb.net/ecommerce?retryWrites=true&w=majority");




const hbs = handlebars.create();
hbs.allowProtoPropertiesByDefault = true;
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);


app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static((`${__dirname}/public`)));
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Gkallisti:123@cluster0.obvrjnw.mongodb.net/ecommerce?retryWrites=true&w=majority",
        ttl:900
    }),                                            
    secret: 'coderS3cret',
    resave: false,                  
    saveUninitialized: true        }))

//routes
app.use('/', viewsmdbRouter);
app.use('/api/products', productsmdbRouter);
app.use('/api/carts', cartmdbRouter);
app.use('/api/sessions', sessionRouter);
