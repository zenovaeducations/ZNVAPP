// =====================================
// Firebase Storage
// =====================================

import { storage } from "./firebase-config.js";

import {

    ref,

    uploadBytes,

    getDownloadURL,

    deleteObject

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

export {

    storage,

    ref,

    uploadBytes,

    getDownloadURL,

    deleteObject

};
