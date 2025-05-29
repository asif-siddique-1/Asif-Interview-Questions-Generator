export const QUESTIONS = [
  {
    skill: "React",
    type: "Theoretical",
    question:
      "Explain the difference between functional and class components in React. What are the advantages of using hooks with functional components?",
    evaluationCriteria:
      "Candidate should discuss state management, lifecycle methods vs. hooks, performance considerations, and typical use cases for each component type.",
    difficulty: "Medium",
  },
  {
    skill: "Node.js",
    type: "Theoretical",
    question:
      "Describe the Node.js event loop. How does it handle asynchronous operations, and what role do libuv and the event queue play?",
    evaluationCriteria:
      "Assess understanding of Node.js's non-blocking I/O model, event-driven architecture, the event loop phases, and how background tasks (like I/O) are managed.",
    difficulty: "Medium",
  },
  {
    skill: "MongoDB",
    type: "Theoretical",
    question:
      "What is MongoDB? Explain its document-oriented nature and when you would choose it over a relational database like PostgreSQL.",
    evaluationCriteria:
      "Candidate should explain MongoDB's key features (schema-less, BSON documents), and discuss scenarios where its flexibility and horizontal scalability are beneficial compared to the structured nature of relational databases.",
    difficulty: "Easy",
  },
  {
    skill: "React",
    type: "Coding",
    question:
      "Write a functional React component that fetches data from a dummy API endpoint (`https://jsonplaceholder.typicode.com/posts`) on mount and displays the titles of the first 5 posts. Use the `useEffect` hook.",
    sampleInput: "Component renders.",
    expectedOutput:
      "A list displaying the titles of the first 5 posts from the API.",
    evaluationCriteria:
      "Evaluate correct usage of `useEffect` for data fetching, state management (`useState`), error handling (optional but good), and rendering a list of items.",
    difficulty: "Medium",
  },
  {
    skill: "Node.js",
    type: "Coding",
    question:
      "Write a simple Node.js script using the built-in `http` module that listens on port 3000 and responds with 'Hello, World!' for any GET request to the root path '/'.",
    sampleInput: "Send a GET request to `http://localhost:3000/`",
    expectedOutput: "Response body: 'Hello, World!'",
    evaluationCriteria:
      "Assess ability to create a basic HTTP server, handle incoming requests, send responses, and listen on a specific port.",
    difficulty: "Easy",
  },
  {
    skill: "MongoDB",
    type: "Coding",
    question:
      "Given a MongoDB collection `users` with documents like `{ name: 'Alice', age: 30, status: 'active' }`, write a MongoDB query to find all users older than 25 who are 'active'.",
    sampleInput:
      "Assume `users` collection contains documents with `name`, `age`, and `status` fields.",
    expectedOutput:
      "Documents from the `users` collection where `age > 25` and `status` is 'active'.",
    evaluationCriteria:
      "Assess understanding of MongoDB query syntax, using comparison operators (`$gt`) and logical operators (`$and` implicitly when chaining conditions).",
    difficulty: "Easy",
  },
  {
    skill: "React",
    type: "Theoretical",
    question:
      "Explain the concept of controlled and uncontrolled components in React forms. When would you use one over the other?",
    evaluationCriteria:
      "Candidate should define both concepts, explain how form data is handled in each, discuss typical use cases (e.g., simple inputs vs. complex forms), and mention the role of `refs` in uncontrolled components.",
    difficulty: "Medium",
  },
  {
    skill: "Node.js",
    type: "Theoretical",
    question:
      "What is the purpose of `package.json` in a Node.js project? Explain the differences between `dependencies`, `devDependencies`, and `peerDependencies`.",
    evaluationCriteria:
      "Assess understanding of project metadata, script definitions, and the roles of different dependency types in managing project dependencies and build processes.",
    difficulty: "Easy",
  },
  {
    skill: "MongoDB",
    type: "Theoretical",
    question:
      "Describe how indexing works in MongoDB and why it's important for query performance. What types of indexes are available?",
    evaluationCriteria:
      "Candidate should explain the purpose of indexes in speeding up read operations, discuss the trade-offs (write performance, storage), and mention common index types like single-field, compound, and text indexes.",
    difficulty: "Medium",
  },
  {
    skill: "React/Node.js",
    type: "Theoretical",
    question:
      "Outline the typical architecture of a full-stack application using React for the frontend and Node.js/Express for the backend, interacting with a MongoDB database. Describe the flow of data for a user action that requires saving data.",
    evaluationCriteria:
      "Assess understanding of the overall architecture, how the frontend communicates with the backend (APIs), backend routing, database interactions, and the flow of data from the user interface to the database and back.",
    difficulty: "Hard",
  },
];
