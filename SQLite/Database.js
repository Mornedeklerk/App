import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: 'ReminderApp.db',
  location: 'default',
},
() => {
  console.log("Database created successfully", db);
},
error => {
  console.log("error on creating Database " + error.message);
});

const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS List (id INTEGER PRIMARY KEY AUTOINCREMENT, Listname VARCHAR(20))`,
      [],
      (sqlTx, res) => {
        console.log("Table created successfully");
      },
      error => {
        console.log("Error on creating table: " + error.message);
      },
    );
  });
};

const createGrocerieTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Groceries (id INTEGER PRIMARY KEY AUTOINCREMENT, Listname VARCHAR(20), Category VARCHAR(20))`,
      [],
      (sqlTx, res) => {
        console.log("Table created successfully");
      },
      error => {
        console.log("Error on creating table: " + error.message);
      },
    );
  });
};



const savelist = (Listname) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO List (Listname) VALUES (?)', [Listname]);
  });
};


const saveGrocerielist = (Listname, Category) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO Groceries (Listname, Category) VALUES (?, ?)', [Listname,Category]);
  });
};


const saveProduct = (productname, expiryDate) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO Products (productname, expiryDate) VALUES (?, ?)', [productname, expiryDate]);
  });
};


const deleteProducts = () => {
  db.transaction((tx) => {
    tx.executeSql('DELETE  FROM List');
  });
};

const deleteGrocerieProducts = () => {
  db.transaction((tx) => {
    tx.executeSql('DELETE  FROM Groceries');
  });
};

const deleteGrocerieProduct = (listId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM Groceries WHERE id = ?',
        [listId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// const fetchProducts = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM Products',
//         [],
//         (tx, results) => {
//           const products = [];
//           const len = results.rows.length;
//           for (let i = 0; i < len; i++) {
//             const row = results.rows.item(i);
//             products.push(row);
//             console.log(`Product ID: ${row.id}, Product Name: ${row.productname}, Expiry Date: ${row.expiryDate}`);
//           }
//           resolve(products);
//         },
//         (tx, error) => {
//           reject(error);
//         }
//       );
//     });
//   });
// };


const fetchList = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM List',
        [],
        (tx, results) => {
          const List = [];
          const len = results.rows.length;
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            List.push(row);
            console.log(`List ID: ${row.id}, List Name: ${row.Listname},`);
          }
          resolve(List);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

const fetchGrocerieList = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Groceries',
        [],
        (tx, results) => {
          const List = [];
          const len = results.rows.length;
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            List.push(row);
            console.log(`Groceries List ID: ${row.id}, Groceries List Name: ${row.Listname},Category Name: ${row.Category}`);
          }
          resolve(List);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};



export { db, saveProduct,  deleteGrocerieProduct, createTables,deleteProducts, savelist, fetchList, saveGrocerielist, createGrocerieTables, fetchGrocerieList, deleteGrocerieProducts};
