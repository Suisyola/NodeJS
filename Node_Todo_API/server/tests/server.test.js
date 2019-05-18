const expect = require('expect');
const request = require('supertest');
const ObjectID = require('mongodb').ObjectID;

const app = require('./../server.js').app;
const Todo = require('./../models/todo.js').Todo;
const User = require('./../models/user.js').User;
const todos = require('./seed/seed.js').todos;
const populateTodos = require('./seed/seed.js').populateTodos;
const users = require('./seed/seed.js').users;
const populateUsers = require('./seed/seed.js').populateUsers;

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST/todos', () => {
    it('should create a new todo', (done) => {
        var text = 'some todos';
         
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

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var dataToPatch = {
            text: 'This is a Patched text',
            completed: true
        };

        request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .send(dataToPatch)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(dataToPatch.text);
                expect(res.body.todo.completedAt).toBeA('number');
                expect(res.body.todo.completed).toBe(true);
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var dataToPatch = {
            text: 'This is a Patched text',
            completed: false
        };

        request(app)
            .patch(`/todos/${todos[1]._id.toHexString()}`)
            .send(dataToPatch)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(dataToPatch.text);
                expect(res.body.todo.completedAt).toNotExist();
                expect(res.body.todo.completed).toBe(false);
            })
            .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'example@example.com';
        var password = '123mnb!';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                // use ['x-auth'] instead of . due to the dash. This is invalid .x-auth
                expect(res.headers['x-auth'].toExist());
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done();
                }

                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                }).catch((e) => {
                    return done(err);
                });
            });
    });

    it('should return validation errors if request invalid', (done) => {
        var email = 'example@example.com';
        var password = '12345';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {
        var email = users[0].email;
        var password = '123mnb!';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end((err) => {
                if (err) {
                    return done();
                }

                User.find({email}).countDocuments().then((count) => {
                    expect(count).toBe(1);
                    done();
                });
            });
    });
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password,
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.token[0]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((e) => {
                    return done(err);
                });
            }); 
    });

    it('should reject invalid login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: 'fail@login.com',
                password: 'abc12341',
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                
                done();
            }); 
    });
});

describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token) 
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                
                User.findById(users[0]._id).then((user) => {
                    expect(user.token).length.toBe(0);
                    done();
                }).catch((e) => {
                    return done(err);
                });
            }); 
    });
});