import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
interface DictionaryEntry {
  word: string
  phonetic?: string
  phonetics: Array<{
    text?: string
    audio?: string
  }>
  meanings: Array<{
    partOfSpeech: string
    definitions: Array<{
      definition: string
      example?: string
      synonyms?: string[]
      antonyms?: string[]
    }>
  }>
}

// API function
const searchWord = async (word: string): Promise<DictionaryEntry[]> => {
  const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  return response.data
}

function App() {
  const [word, setWord] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dictionary', searchTerm],
    queryFn: () => searchWord(searchTerm),
    enabled: !!searchTerm,
  })

  const handleSearch = () => {
    if (word.trim()) {
      setSearchTerm(word.trim().toLowerCase())
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl)
    audio.play()
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Modern Header */}
      <div className="modern-header">
        <h1 className="modern-title">
          Dictionary
        </h1>
        <p className="modern-subtitle">
          Discover meanings, pronunciations, and examples for any word
        </p>
      </div>

      {/* Modern Search Container */}
      <div className="search-container">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Search for any word..."
          className="modern-search-input"
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !word.trim()}
          className="modern-search-button"
        >
          {isLoading ? (
            <>
              <div className="modern-spinner"></div>
              Searching
            </>
          ) : (
            <>
              🔍 Search
            </>
          )}
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="modern-card">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              Searching for "{searchTerm}"...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="modern-card">
          <div className="error-container">
            <h2 className="error-title">❌ Word Not Found</h2>
            <p style={{ fontSize: '1.1rem' }}>
              Please try searching for another word.
            </p>
          </div>
        </div>
      )}

      {/* Results */}
      {data && data.length > 0 && (
        <div>
          {data.map((entry, entryIndex) => (
            <div key={entryIndex} className="modern-card" style={{ marginBottom: '2rem' }}>
              <div className="word-header">
                <div>
                  <h2 className="word-title">{entry.word}</h2>
                  {entry.phonetic && (
                    <p className="phonetic">{entry.phonetic}</p>
                  )}
                </div>
                {entry.phonetics.find(p => p.audio) && (
                  <button
                    className="modern-audio-button"
                    onClick={() => {
                      const audioPhonetic = entry.phonetics.find(p => p.audio)
                      if (audioPhonetic?.audio) {
                        playAudio(audioPhonetic.audio)
                      }
                    }}
                    title="Play pronunciation"
                  >
                    🔊
                  </button>
                )}
              </div>

              <div>
                {entry.meanings.map((meaning, meaningIndex) => (
                  <div key={meaningIndex} className="meaning-section">
                    <h3 className="part-of-speech">{meaning.partOfSpeech}</h3>
                    <div>
                      {meaning.definitions.map((def, defIndex) => (
                        <div key={defIndex} className="definition-item">
                          <p className="definition-text">
                            <strong style={{ color: '#ffffff' }}>{defIndex + 1}.</strong> {def.definition}
                          </p>
                          {def.example && (
                            <div className="example">
                              {def.example}
                            </div>
                          )}
                          {def.synonyms && def.synonyms.length > 0 && (
                            <div className="synonyms">
                              <span className="synonyms-label">Synonyms:</span>
                              <span className="synonyms-list">{def.synonyms.join(', ')}</span>
                            </div>
                          )}
                          {def.antonyms && def.antonyms.length > 0 && (
                            <div className="antonyms">
                              <span className="antonyms-label">Antonyms:</span>
                              <span className="antonyms-list">{def.antonyms.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Welcome State */}
      {!searchTerm && !isLoading && (
        <div className="modern-card">
          <div className="welcome-container">
            <div className="welcome-icon">📖</div>
            <p style={{ fontSize: '1.3rem', fontWeight: '500' }}>
              Enter a word above to discover its meaning, pronunciation, and more
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App