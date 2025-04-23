export default function useDeleteMe() {
    localStorage.removeItem("api_key");
    console.log("API key deleted");
    deleteIndexedDB("mbts-db")
    console.log("IDB deleted");
    console.log("User deleted");
}

export function resetDB() {
    deleteIndexedDB("mbts-db")
}

const deleteIndexedDB = (dbName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(dbName);
  
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      request.onblocked = () => {
        console.warn("Delete blocked – close other tabs using the DB");
      };
    });
  };
  
  // Beispiel:
  deleteIndexedDB("meinDatenbankName")
    .then(() => console.log("IDB gelöscht"))
    .catch((err) => console.error("Fehler beim Löschen der IDB:", err));