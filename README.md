# FileTap - File Management System 📂🚀

Welcome to **FileTap** – a streamlined Django + React application for managing, viewing, and downloading files.  
It also integrates with Google Drive APIs to verify and process file content securely.

---

## ✨ Key Features

- **📁 File Upload & Metadata Management**  
  Upload `.txt` files and manage them via the Django Admin panel.

- **📥 File Download**  
  Easily download selected files through the React dashboard.

- **📝 View Files (e.g., Notepad-style)**  
  Open and view file contents (like `text-1.txt`) through the UI — the backend handles logic using Django APIs.

- **✅ Google Drive File Check**  
  Validates files using the Google Drive API to ensure correct permissions and accessibility before processing.

- **🔧 RESTful API (DRF)**  
  Built with Django REST Framework, offering clean, modular, and reusable endpoints.

- **⚛️ React Frontend (Vite)**  
  Fast and modern frontend for interacting with file selection, viewing, and downloading.

---

## 🧰 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Axios, React Toastify  
- **Backend**: Python, Django, Django REST Framework  
- **Database**: SQLite (can be upgraded to PostgreSQL)  
- **3rd-party APIs**: Google Drive API

---

## 🖥️ Dashboard Features

- File dropdown with list of uploaded files from Django backend
- "View" button triggers API to open the file (e.g., with slug `text-1`)
- "Download" button downloads the selected file
- Uses React Toastify for user feedback (errors, success)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ashish8329/filetap.git
