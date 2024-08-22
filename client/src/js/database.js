import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("Putting content into the database");

  const db = await openDB("jate", 1);

  await db.put("jate", { content });
};

export const getDb = async () => {
  console.log("Getting content from the database");

  const db = await openDB("jate", 1);

  return db.getAll("jate");
};

initdb();
