#! /usr/bin/env node
import inquirer from 'inquirer';

class Student {
  constructor(public name: string) {}
}
class Person {
  protected _students: Student[] = [];
  addStudent(obj: Student) {
    this.students.push(obj);
  }

  public get students(): Student[] {
    return this._students;
  }
}

const people = new Person();

async function talkWith(people: Person) {
  console.log('Welcome');
  do {
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

        if (student)
          console.log(
            `Student already exists in the list\nHello i am ${student.name}`
          );
        else {
          const name = new Student(ans);
          people.addStudent(name);

          console.log(`New student added in the list\nHello i am ${name.name}`);
          console.log(people.students);
        }
        break;
    }
  } while (true);
}

talkWith(people);
