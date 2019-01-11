## ⚗️SQL Learning Labs
**DEMO LOGIN CREDENTIALS:** <br/>
user: **demo**<br/>
pass: **demo123456**<br/>

Welcome to SQL Learning Labs<br/><br/>

Our Goal here is to help students of all levels master & improve their skills in SQL. 
Future Plans of Updates:
- Intermediate & Master Levels
- Tutorial Bash Commands

### **`Contents`**
- [Tech Stack](#tech-stack)
- [Links](#links)
- [Navigating Repos](#navigating-repos)
- [Concept Wireframing](#concept)
- [Screenshots](#screenshots)

### **`Tech Stack`**
#### Front End with *React.js* and *Redux*


**React.js**  - renders real-time content change resulting from user actions<br/>
**Redux** - state management & token handling<br/>
**React-Router-Dom** - for declarative routing.  <br/>

 

#### Back End with *Express.js*, *Node.js*, *Mongoose*/*MongoDB*

**Express.js** - Routing/middleware <br/>
 - passport.js<br/>
 - JWT Token<br/>
 - bcrypt<br/>

**Node.js** - Javascript runtime environment<br/>
**Mongoose/MongoDB** - Data is being stored in a MongoDB environment after being cleaned and prepped via Mongoose schemas/virtuals/models.<br/>

### **`LINKS`** 
[Client-Side](https://sql-labs.herokuapp.com/)<br/>
[Server-Side](https://xlingual-server.herokuapp.com/)<br/>

**Github Repos:** <br/>

front-end: https://github.com/thinkful-ei25/SQL-Labs-Mary-Brady-client<br/>

back-end: https://github.com/thinkful-ei25/sql-labs-mary-brady-server<br/>

### **`Navigating Repos`**<br/>
**Front-end example routes** <br/>
Root-component: src/components/app.js<br/>
Landing-Page: src/components/landing-page.js<br/>
user actions: src/actions/users.js<br/>
front of card actions: src/actions/frontofcardactions.js<br/>
back of card actions: src/actions/backofcardactions.js<br/>


**Back-end example routes** <br/>

*Server-Root*<br/>
/index.js<br/>

*Models*<br/>
Question Model: models/question.js<br/>
User Model: models/user.js<br/>

*Routes*<br/>
All Authorization passes through: routes/auth.js<br/>
Post to create/salt a 'User': /routes/users.js<br/>
All Flashcard related routes: /routes/question.js<br/>
- Retrieval of User's private flashcard questions:  '/frontofcard'<br/>
- Retrieval of User's answers from corresponding flashcard questions: '/backofcard'<br/>


### **`Concept Wireframing`**

LINK: [original-wireframe concept]()

### **`Screenshots`**

COMING SOON
