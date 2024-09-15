
function getStorage(key, obj = true) {
    if (obj) {
        const value = localStorage.getItem(key)
        return JSON.parse(value)
    }
    return localStorage.getItem(key)
}
function setStorage(key, item, obj = true) {
    if (obj) {
        localStorage.setItem(key, JSON.stringify(item))
        return
    }
    localStorage.setItem(key, item)
}
function pushStorage(key, item) {
    const items = localStorage.getItem(key)
    if (items) {
        /**{@type} Object[] */
        const parsesItems = JSON.parse(items)
        parsesItems.push(item)
        localStorage.setItem(key, JSON.stringify(parsesItems))

    } else if (!ocalStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(item))
    }
    console.error(`Items with key ${key} is not found in the storage`)
}
function removeStorage(key, item, obj = true) {
    if (obj) {
        let data = JSON.parse(localStorage.getItem(key))
        delete data[`${item}`]
        localStorage.setItem(key, JSON.stringify(data))

    }

    localStorage.removeItem(key)
}
function getSession(key, obj = true) {
    if (obj) {
        const value = sessionStorage.getItem(key);
        return JSON.parse(value);
    }
    return sessionStorage.getItem(key);
}
function setSession(key, item, obj = true) {
    if (obj) {
        sessionStorage.setItem(key, JSON.stringify(item));
        return;
    }
    sessionStorage.setItem(key, item);
}
function removeSession(key, item, obj = true) {
    if (obj) {
        let data = JSON.parse(sessionStorage.getItem(key));
        delete data[`${item}`];
        sessionStorage.setItem(key, JSON.stringify(data));
    } else {
        sessionStorage.removeItem(key);
    }
}
function formatDate(dateString) {
    const currentDate = new Date();
    const date = new Date(dateString);

    // Calculate the time difference in milliseconds
    const diffTime = Math.abs(currentDate - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Check if the date is today
    if (currentDate.toDateString() === date.toDateString()) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes < 60) {
            return `${diffMinutes} minutes ago`;
        } else {
            const diffHours = Math.floor(diffMinutes / 60);
            return `${diffHours} hours ago`;
        }
    }
    // Check if the date is yesterday
    else if (diffDays === 1) {
        return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Check if the date is in the same week
    else if (date.getDay() < currentDate.getDay()) {
        return `${date.toLocaleDateString('en-US', { weekday: 'long' })} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Check if the date is in the same month
    else if (date.getMonth() === currentDate.getMonth()) {
        return `${date.toLocaleDateString('en-US', { weekday: 'short' })}, ${date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}, at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Check if the date is in the previous year
    else if (date.getFullYear() === currentDate.getFullYear() - 1) {
        return `${date.toLocaleDateString('en-US', { weekday: 'short' })}, ${date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}, ${date.getFullYear()}`;
    }
    // Default case
    else {
        return date.toLocaleDateString('en-US');
    }
}
        
        // let db;
        // function initializeIndexedDB(amount, order, table, el) {

        //     let request = indexedDB.open('NoblehouseDB', 1);

        //     request.onupgradeneeded = (event) => {
        //         db = event.target.result;
        //         const objectStore = db.createObjectStore(table, { keyPath: 'id' });
        //         objectStore.createIndex('title', 'title', { unique: false });
        //         objectStore.createIndex('date', 'date', { unique: false });
        //         objectStore.createIndex('id', 'id', { unique: false });
        //     };

        //     request.onsuccess = (event) => {
        //         db = event.target.result;
        //         const transaction = db.transaction([table], 'readonly');
        //         const objectStore = transaction.objectStore(table);

        //         const requestCount = objectStore.count();

        //         requestCount.onsuccess = (event) => {
        //             const count = event.target.result;
        //             if (count > 0) {
        //                 // Data exists in the object store, load and log it
        //                 // loadDataFromIndexedDB(amount, order, table, el);
        //                 fetchData('date', 'asc', '', '', 5, 1, table, el);
        //             } else {
        //                 // No data in the object store, fetch data from API and store it
        //                 fetchDataFromAPIAndStore(amount, order, table, el);
        //             }
        //         };

        //         requestCount.onerror = (event) => {
        //             console.error('Error counting records in IndexedDB:', event.target.error);
        //         };
        //     };

        //     request.onerror = (event) => {
        //         console.error('Error opening database:', event.target.error);
        //     };
        // }

        // function loadDataFromIndexedDB(amount, order, table, el) {
        //     const transaction = db.transaction([table], 'readonly');
        //     const objectStore = transaction.objectStore(table);
        //     const request = objectStore.getAll(IDBKeyRange.lowerBound(0), amount);

        //     request.onsuccess = (event) => {
        //         const data = event.target.result;
        //         console.log(`Loaded ${data.length} items from IndexedDB:`);
        //         updateDataDiv(data, table, el);
        //     };

        //     request.onerror = (event) => {
        //         console.error('Error loading data from IndexedDB:', event.target.error);
        //     };
        // }

        // function fetchData(sortBy = 'date', sortOrder = 'desc', filterBy = null, searchTerm = null, pageSize = 10, pageNumber = 1, table, el) {
        //     const transaction = db.transaction([table]);
        //     const objectStore = transaction.objectStore(table);
        //     let request;

        //     // Sorting
        //     const index = objectStore.index(sortBy);
        //     const direction = sortOrder === 'asc' ? 'prev' : 'next';

        //     // Filtering
        //     if (filterBy) {
        //         const range = IDBKeyRange.only(filterBy);
        //         request = index.openCursor(range, direction);
        //     } else {
        //         request = index.openCursor(null, direction);
        //     }

        //     let count = 0;
        //     let result = [];
        //     request.onsuccess = (event) => {
        //         const cursor = event.target.result;
        //         if (cursor && count < pageNumber * pageSize) {
        //             if (!searchTerm || searchTerm === cursor.value.title) {
        //                 if (count >= (pageNumber - 1) * pageSize) {
        //                     result.push(cursor.value);
        //                 }
        //                 count++;
        //             }
        //             cursor.continue();
        //         } else {
        //             // Pagination
        //             const startIndex = (pageNumber - 1) * pageSize;
        //             const endIndex = pageNumber * pageSize;
        //             const paginatedResult = result.slice(startIndex, endIndex);
        //             updateDataDiv(paginatedResult, table, el);
        //         }
        //     };
        //     request.onerror = (event) => {
        //         console.error('Error fetching data:', event.target.error);
        //     };
        // }


        // function fetchDataFromAPIAndStore(amount, order, table, el) {
        //     fetch('https://noblehousecc.org/wp-json/jet-cct/albums?_orderby=id&_order=desc')
        //         .then((response) => {
        //             if (!response.ok) {
        //                 throw new Error('Failed to fetch data from API');
        //             }
        //             return response.json();
        //         })
        //         .then((data) => {
        //             const transaction = db.transaction([table], 'readwrite');
        //             const objectStore = transaction.objectStore(table);

        //             data.forEach((album) => {
        //                 objectStore.add(album);
        //             });

        //             console.log(`Fetched ${data.length} items from API and stored in IndexedDB`);
        //             // Load and log the newly fetched data
        //             // loadDataFromIndexedDB(amount, order, table, el);
        //             fetchData('date', 'desc', 'id', '', 4, 1, table, el);
        //         })
        //         .catch((error) => {
        //             console.error('Error fetching data from API:', error);
        //         });
        // }

        // function fetchAlbumById(id) {
        //     return new Promise((resolve, reject) => {
        //         const transaction = db.transaction(['albums'], 'readonly');
        //         const objectStore = transaction.objectStore('albums');
        //         const request = objectStore.get(id);

        //         request.onsuccess = (event) => {
        //             const album = event.target.result;
        //             if (album) {
        //                 resolve(album); // Resolve the Promise with the fetched album
        //             } else {
        //                 resolve(null); // Resolve with null if album not found
        //             }
        //         };

        //         request.onerror = (event) => {
        //             reject(event.target.error); // Reject the Promise with the error
        //         };
        //     });
        // }


// function fetchData(sortBy = 'id', sortOrder = 'asc', filterBy = null, searchTerm = null, pageSize = 20, pageNumber = 1, table) {
        //     const transaction = db.transaction([table]);
        //     const objectStore = transaction.objectStore(table);
        //     let request;
        
        //     // Sorting
        //     const index = objectStore.index(sortBy);
        //     const direction = sortOrder === 'desc' ? 'prev' : 'next';
        
        //     // Filtering
        //     if (filterBy) {
        //         const range = IDBKeyRange.only(filterBy);
        //         request = index.openCursor(range, direction);
        //     } else {
        //         request = index.openCursor(null, direction);
        //     }
        
        //     let count = 0;
        //     let result = [];
        //     request.onsuccess = (event) => {
        //         const cursor = event.target.result;
        //         if (cursor && count < pageNumber * pageSize) {
        //             if (!searchTerm || searchTerm === cursor.value.title) {
        //                 if (count >= (pageNumber - 1) * pageSize) {
        //                     result.push(cursor.value);
        //                 }
        //                 count++;
        //             }
        //             cursor.continue();
        //         } else {
        //             // Pagination
        //             const startIndex = (pageNumber - 1) * pageSize;
        //             const endIndex = pageNumber * pageSize;
        //             const paginatedResult = result.slice(startIndex, endIndex);
        //             console.log(paginatedResult);
        //         }
        //     };
        //     request.onerror = (event) => {
        //         console.error('Error fetching data:', event.target.error);
        //     };
        // }
                