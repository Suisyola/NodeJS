const expect = require('expect');
const request = require('supertest');

const app = require('./../server.js').app;
const Todo = require('./../models/todo.js').Todo;

beforeEach((done) => {              // executed beforeEach test case.
    Todo.remove({}).then(() => {    // clear the database because test case assumes there is no document in db
        done();
    })
})

describe('POST/todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text'
         
        request(app)                    // 1. making request via supertest on app variable
            .post('/todos')             // 2. post to /todos
            .send({ text })             // 3. send data along with request, which is converted to JSON
            .expect(200)                // 4. make assertion: expect status HTTP 200
            .expect((res) => {          
                expect(res.body.text).toBe(text);   // 5. make assertion: body in response equals text variable. Server's behaviour just returns the text
            }).end((err, res) => {
                if (err) {              // 6. if there is error (i.e. not HTTP200 or text body is not expected)
                    return done(err);   // 7. return required so that below codes not executed
                }
                
                Todo.find()             // make request to database to find all todos
                    .then((todos) => {
                        expect(todos.length).toBe(1);       // expect only 1 document in db
                        expect(todos[0].text).toBe(text);   // expect that 1 document to have text property with value same as text variable
                        done();
                    }).catch((e) => {
                        return done(e);     // exception handling
                    });
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)                    // 1. making request via supertest on app variable
            .post('/todos')             // 2. post to /todos
            .send({})
            .expect(400)                // 4. make assertion: expect status HTTP 400
            .end((err, res) => {
                if (err) {              // 6. if there is error (i.e. not HTTP200 or text body is not expected)
                    return done(err);   // 7. return required so that below codes not executed
                }
                
                Todo.find()             // make request to database to find all todos
                    .then((todos) => {
                        expect(todos.length).toBe(0);       // expect only 0 document in db
                        done();
                    }).catch((e) => {
                        return done(e);     // exception handling
                    });
            });
    });
});