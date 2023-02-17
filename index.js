const mongoose = require('mongoose');
const { Student, University } = require('./schema');
const { faker } = require("@faker-js/faker");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:2717/university";

const client = new MongoClient(uri);

async function createUniversityDB() {
    try {
        await client.startSession();

        const studentCollection = client.db("University").collection("students");
        const universityCollection = client.db("University").collection("universities");

        let studentList = [];
        let universityList = [];

        for (let i = 0; i < 50; i++) {
            const name = faker.name.fullName();
            const private = faker.datatype.boolean();
            const city = faker.address.cityName();
            const country = faker.address.country();
            const zip = faker.address.zipCode();
            const street = faker.address.streetAddress();
            const address = {
                city: city,
                country: country,
                zip: zip,
                street: street
            }
            const university = {
                name: name,
                private: private,
                address: address
            };
            universityList.push(university);
        }

        function NoteArray(size){
            var note = [];
            for (var i = 0 ; i < size ; i++){
                note[i] = Math.floor(Math.random() * 21);
            }
            return note;
        }

        for (let i = 0; i < 1000; i++) {
            const firstname = faker.name.firstName();
            const lastname = faker.name.lastName();
            const gender = faker.name.sex();
            const country = faker.address.country();
            const birthdate = faker.date.birthdate({ min: 16, max: 20, mode: 'age' });
            const university = faker.helpers.arrayElement(universityList);
            const student = {
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                country: country,
                birthdate: birthdate,
                university: university,
                notes: NoteArray(10)
            };
            studentList.push(student);
        }

        //Push students
        console.log("students create");
        studentCollection.insertMany(studentList);

        //Push universities
        console.log("universities create");
        universityCollection.insertMany(universityList);

    } catch (err) {
        console.log('err.stack : ');
        console.log(err.stack);
    }
}
createUniversityDB();
console.log('DB creat successfully !')