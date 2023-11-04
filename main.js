#! /usr/bin/env node
import inquirer from 'inquirer';
class Student {
    constructor(name) {
        this.name = name;
    }
}
class Person {
    constructor() {
        this._students = [];
    }
    addStudent(obj) {
        this.students.push(obj);
    }
    get students() {
        return this._students;
    }
}
const people = new Person();
async function start(people) {
    do {
        console.log('Welcome');
        const { select } = await inquirer.prompt({
            type: 'list',
            message: 'With whom you do wanna talk with?',
            name: 'select',
            choices: ['Myself', 'Student'],
        });
        switch (select) {
            case 'Myself':
                console.log('I am talking to myself....');
                break;
            case 'Student':
                const { ans } = await inquirer.prompt({
                    type: 'input',
                    message: 'Which student do you wanna talk...',
                    name: 'ans',
                });
                const student = people.students.find((value) => value.name === ans);
                if (!student) {
                    const name = new Student(ans);
                    people.addStudent(name);
                    console.log(`New student added in the list\nHello i am ${name.name}`);
                    console.log(people.students);
                }
                if (student) {
                    console.log(`Student already exists in the list\nHello i am ${student.name}`);
                    console.log(people.students);
                }
                break;
        }
    } while (true);
}
start(people);
