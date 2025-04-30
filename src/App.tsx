import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [operations, setOperations] = useState<Array<Schema["Operation"]["type"]>>([]);

  useEffect(() => {
    client.models.Operation.observeQuery().subscribe({
      next: (data) => setOperations([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Operation.create({ userId: "1",desc: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {operations.map((operation) => (
          <li key={operation.id}>{operation.desc}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
