import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { deleteUser } from 'aws-amplify/auth';


const client = generateClient<Schema>();
async function handleDeleteUser() {
  try {
    await deleteUser();
  } catch (error) {
    console.log(error);
  }
}

function App() {
  const [operations, setOperations] = useState<Array<Schema["Operation"]["type"]>>([]);
  const { signOut, } = useAuthenticator();

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
      <h1>Opérations</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {operations.map((operation) => (
          <li key={operation.id}>{operation.desc}</li>
        ))}
      </ul>
      <button onClick={handleDeleteUser}>Supprimer mon compte</button>
      <button onClick={signOut}>Sign out</button>
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
