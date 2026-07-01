import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'server', 'src', 'uploads');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Ensure db directory and file exist
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    users: [],
    reports: [],
    resumeMetadata: [],
    analysisHistory: []
  }, null, 2));
}

// In-memory cache synced with file
let dbCache = {
  users: [],
  reports: [],
  resumeMetadata: [],
  analysisHistory: []
};

try {
  const fileData = fs.readFileSync(DB_FILE, 'utf8');
  dbCache = JSON.parse(fileData);
} catch (e) {
  console.error("Error reading database file, resetting...", e);
  saveDb();
}

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbCache, null, 2));
  } catch (err) {
    console.error("Database save failed:", err);
  }
}

// Simple Model constructor mimicking mongoose
class LocalModel {
  constructor(collectionName) {
    this.collection = collectionName;
  }

  async find(query = {}) {
    let items = dbCache[this.collection] || [];
    return items.filter(item => {
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  }

  async findOne(query = {}) {
    let items = dbCache[this.collection] || [];
    const found = items.find(item => {
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
    return found || null;
  }

  async findById(id) {
    let items = dbCache[this.collection] || [];
    const found = items.find(item => item.id === id);
    return found || null;
  }

  async create(data) {
    const newItem = {
      id: Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
      createdAt: new Date().toISOString(),
      ...data
    };
    if (!dbCache[this.collection]) {
      dbCache[this.collection] = [];
    }
    dbCache[this.collection].push(newItem);
    saveDb();
    return newItem;
  }

  async findByIdAndUpdate(id, updateData) {
    let items = dbCache[this.collection] || [];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updateData, updatedAt: new Date().toISOString() };
    saveDb();
    return items[index];
  }

  async deleteOne(query = {}) {
    let items = dbCache[this.collection] || [];
    const initialLength = items.length;
    dbCache[this.collection] = items.filter(item => {
      let matchesAll = true;
      for (const key in query) {
        if (item[key] !== query[key]) {
          matchesAll = false;
          break;
        }
      }
      return !matchesAll;
    });
    if (initialLength !== dbCache[this.collection].length) {
      saveDb();
      return { deletedCount: initialLength - dbCache[this.collection].length };
    }
    return { deletedCount: 0 };
  }

  async deleteById(id) {
    return this.deleteOne({ id });
  }
}

export const User = new LocalModel('users');
export const Report = new LocalModel('reports');
export const ResumeMetadata = new LocalModel('resumeMetadata');
export const AnalysisHistory = new LocalModel('analysisHistory');

export default {
  User,
  Report,
  ResumeMetadata,
  AnalysisHistory
};
