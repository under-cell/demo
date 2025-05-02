<script setup>
import { ref } from 'vue'

const prompt = ref('')
const generatedText = ref('')
const isLoading = ref(false)
const error = ref(null)

// IMPORTANT: Replace with your actual backend API URL
// If you uncomment the proxy in vite.config.js, you can use '/api/generate' directly
const backendUrl = 'http://localhost:3001/api/generate'

const generateCopy = async () => {
  if (!prompt.value.trim()) {
    error.value = '请输入一个提示词。'
    return
  }

  isLoading.value = true
  error.value = null
  generatedText.value = '' // Clear previous result

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt.value })
    })

    if (!response.ok) {
      // Try to parse error message from backend
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // Ignore if response is not JSON
      }
      throw new Error(errorMessage);
    }

    const data = await response.json()
    generatedText.value = data.generatedText

  } catch (err) {
    console.error('Error generating copy:', err)
    error.value = err.message || 'An unexpected error occurred. Please check the console and backend logs.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="copy-generator">
    <form @submit.prevent="generateCopy">
      <div class="form-group">
        <label for="prompt">输入你的文本:</label>
        <textarea
          id="prompt"
          v-model="prompt"
          rows="4"
          placeholder="例如，为一家专注于可持续发展的新咖啡店写一个朗朗上口的口号"
          :disabled="isLoading"
        ></textarea>
      </div>

      <button type="submit" :disabled="isLoading" style="margin-top: 30px;">
        <span v-if="isLoading">生成中...</span>
        <span v-else>生成文本</span>
      </button>
    </form>

    <div v-if="isLoading" class="loading-indicator">
      ⏳ 思考中...
    </div>

    <div v-if="error" class="error-message">
      <p><strong>Error:</strong> {{ error }}</p>
    </div>

    <div v-if="generatedText" class="result-area">
      <h2>生成的文本:</h2>
      <pre>{{ generatedText }}</pre>
    </div>
  </div>
</template>

<style scoped>
.copy-generator {
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Spacing between elements */
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

textarea {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  resize: vertical; /* Allow vertical resizing */
  min-height: 80px;
}

textarea:focus {
  outline: none;
  border-color: var(--color-border-hover);
  box-shadow: 0 0 0 2px var(--color-border-hover-soft);
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-background);
  background-color: var(--color-primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-start; /* Align button to the start */
}

button:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

button:disabled {
  background-color: var(--color-border);
  cursor: not-allowed;
}

.loading-indicator,
.error-message,
.result-area {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
}

.loading-indicator {
  text-align: center;
  color: var(--color-text-light);
}

.error-message {
  background-color: hsla(0, 100%, 50%, 0.1);
  border: 1px solid hsla(0, 100%, 50%, 0.3);
  color: hsl(0, 80%, 60%);
}

.error-message p {
  margin: 0;
}

.result-area {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-border);
}

.result-area h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  color: var(--color-heading);
}

pre {
  white-space: pre-wrap; /* Wrap long lines */
  word-wrap: break-word; /* Break words if needed */
  background-color: var(--color-background-soft);
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  font-family: var(--font-family-mono);
  font-size: 0.95rem;
  color: var(--color-text);
  line-height: 1.6;
}
</style> 