import { getGeminiClient } from './aiService.js';

// Chunks text into smaller, overlapping segments
export const chunkText = (text, size = 600, overlap = 150) => {
  if (!text) return [];
  const words = text.split(/\s+/);
  const chunks = [];
  let i = 0;

  while (i < words.length) {
    const chunkWords = words.slice(i, i + size);
    chunks.push(chunkWords.join(' '));
    i += (size - overlap);
  }

  return chunks;
};

// Computes cosine similarity between two vectors
export const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

// Generates real vector embeddings using gemini-embedding-2-preview, with a fallback
export const getEmbedding = async (text) => {
  const client = getGeminiClient();
  if (!client) {
    // Elegant fallback pseudo-embedding if Gemini is in mock mode (using a simple keyword frequency vector)
    return generatePseudoEmbedding(text);
  }

  try {
    const response = await client.models.embedContent({
      model: 'gemini-embedding-2-preview',
      contents: text
    });

    if (response && response.embedding && response.embedding.values) {
      return response.embedding.values;
    }
    return generatePseudoEmbedding(text);
  } catch (err) {
    console.error("Embedding generation failed, falling back to pseudo-embedding:", err);
    return generatePseudoEmbedding(text);
  }
};

// Simple but consistent hash-based pseudo embedding generation for 100% reliable offline testing
const generatePseudoEmbedding = (text) => {
  const vocab = ["react", "node", "javascript", "python", "docker", "aws", "typescript", "cloud", "api", "database", "ci/cd", "agile", "architecture", "css", "mongodb"];
  const vector = new Array(vocab.length).fill(0);
  const words = text.toLowerCase().split(/\W+/);

  words.forEach(word => {
    const index = vocab.indexOf(word);
    if (index !== -1) {
      vector[index] += 1;
    }
  });

  // Normalize
  const mag = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  if (mag > 0) {
    return vector.map(val => val / mag);
  }
  return vector;
};

// Complete RAG retrieval workflow
export const retrieveChunks = async (resumeText, jdText, topK = 4) => {
  const chunks = chunkText(resumeText);
  if (chunks.length === 0) return [];

  try {
    // 1. Generate embeddings for all chunks
    const chunkWithEmbeddings = await Promise.all(
      chunks.map(async (text, index) => {
        const embedding = await getEmbedding(text);
        return { index, text, embedding };
      })
    );

    // 2. Generate embedding for the Job Description query
    const jdEmbedding = await getEmbedding(jdText);

    // 3. Compute cosine similarity scores
    const scoredChunks = chunkWithEmbeddings.map(chunk => {
      const score = cosineSimilarity(chunk.embedding, jdEmbedding);
      return { text: chunk.text, score };
    });

    // 4. Sort and return Top K relevant chunks
    scoredChunks.sort((a, b) => b.score - a.score);
    return scoredChunks.slice(0, topK);
  } catch (err) {
    console.error("RAG pipeline error:", err);
    // Graceful fallback to return first few chunks
    return chunks.slice(0, topK).map(text => ({ text, score: 0.5 }));
  }
};
