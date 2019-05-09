const expect = require('expect');
const request = require('supertest');
const ObjectID = require('mongodb').ObjectID;

const app = require('./../server.js').app;
const Todo = require('./../models/todo.js').Todo;

const todos = [{
    _id : new ObjectID(),
    text: 'First test todo'
}, {
    _id : new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done) => {              // executed beforeEach test case.
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => {    // clear the database because test case assumes there is no document in db
            done();
        });
});

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
                
                Todo.find({text})             // make request to database to find all todos
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
                        expect(todos.length).toBe(2);       // expect only 0 document in db
                        done();
                    }).catch((e) => {
                        return done(e);     // exception handling
                    });
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                return done();
            });
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non object ids', (done) => {
        var id = 'what?';
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId)
                    .then((todo) => {
                        expect(todo).toNotExist();
                        done();
                    }).catch((e) => {
                        return done();
                    });
            });
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID();
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID();
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});