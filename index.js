const mongoose = require('mongoose');

//Map global promise - get rid of warning 
mongoose.Promise = global.Promise;

//connect to db
const db1 =require('./config/keys').MongoURI;

//Connect to Mongo
const db= mongoose.connect(db1,{ useNewUrlParser: true})
.then(()=> console.log('MongoDB connected......'))
.catch(err=>console.log(err));

//Import Model
const Customer = require('./models/customer');

//Add Customer
const addCustomer = (customer)=>{
    const newCustomer = new Customer(customer);
    newCustomer.save()
        .then(()=>{
            console.log('new customer added');
            mongoose.connection.close();
        })
        .catch(err=> console.log(err));    
}

//Find Customer 
const findCustomer = (name)=>{
    //Make case insensitive
    const search = new RegExp(name, 'i');
    Customer.findOne({$or:[{firstName: search}, {lastName: search}]})
        .then(customer => {
            console.info(customer);
            // console.log(`${customer.length}`);
            mongoose.connection.close();
        })
        .catch(err => console.log(err))
}

//Update Customer 
const updateCustomer = (_id, customer)=>{
    Customer.update({_id:_id}, customer)
        .then(() => {
            console.log('Customer Updated')
            mongoose.connection.close();
        })
        .catch(err => console.log(err));
}

//Remove Customer 
const removeCustomer = (_id)=>{
    Customer.remove({_id})
        .then(() => {
            console.log('Customer Removed')
            mongoose.connection.close();
        });
}

//List Customers 
const listCustomers = () => {
    Customer.find()
        .then(customer=>{
            console.log(customer);
            mongoose.connection.close();
        })
}

//Export All Methods

module.exports={
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}