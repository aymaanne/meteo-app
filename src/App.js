import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, CloudSnow, CloudDrizzle, CloudLightning } from 'lucide-react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  
  const API_KEY = 'da73c29de3b26d8031f971654cabc474';
  
  const getWeatherIcon = (condition) => {
    const iconClass = "w-20 h-20";
    switch(condition) {
      case 'Clear':
        return <Sun className={iconClass} style={{color: '#facc15'}} />;
      case 'Clouds':
        return <Cloud className={iconClass} style={{color: '#9ca3af'}} />;
      case 'Rain':
        return <CloudRain className={iconClass} style={{color: '#60a5fa'}} />;
      case 'Drizzle':
        return <CloudDrizzle className={iconClass} style={{color: '#93c5fd'}} />;
      case 'Thunderstorm':
        return <CloudLightning className={iconClass} style={{color: '#c084fc'}} />;
      case 'Snow':
        return <CloudSnow className={iconClass} style={{color: '#bfdbfe'}} />;
      default:
        return <Cloud className={iconClass} style={{color: '#9ca3af'}} />;
    }
  };
  
  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError('Veuillez entrer une ville');
      return;
    }
    
    if (API_KEY === 'VOTRE_CLE_API_ICI') {
      setError('⚠️ Veuillez ajouter votre clé API OpenWeatherMap dans le code (ligne 12)');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=fr`
      );
      
      if (!response.ok) {
        throw new Error('Ville non trouvée. Vérifiez l\'orthographe.');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des données');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    fetchWeather(city);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  useEffect(() => {
    // Charge la météo pour Paris par défaut au démarrage
    fetchWeather('Paris');
  }, []);
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #60a5fa, #3b82f6, #2563eb)',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '32px'
        }}>
          <h1 style={{
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            ☁️ Météo
          </h1>
          
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Entrez une ville..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  background: loading ? '#93c5fd' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => !loading && (e.target.style.background = '#2563eb')}
                onMouseOut={(e) => !loading && (e.target.style.background = '#3b82f6')}
              >
                {loading ? '⏳' : '🔍'}
              </button>
            </div>
          </div>
          
          {error && (
            <div style={{
              marginBottom: '16px',
              padding: '16px',
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          {weather && !error && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  {weather.name}, {weather.sys.country}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  {getWeatherIcon(weather.weather[0].main)}
                </div>
                <p style={{
                  fontSize: '60px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '8px',
                  lineHeight: 1
                }}>
                  {Math.round(weather.main.temp)}°C
                </p>
                <p style={{
                  fontSize: '20px',
                  color: '#4b5563',
                  textTransform: 'capitalize'
                }}>
                  {weather.weather[0].description}
                </p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px'
              }}>
                <div style={{
                  background: '#eff6ff',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Droplets style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
                  <div>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>Humidité</p>
                    <p style={{ fontSize: '20px', fontWeight: '600' }}>{weather.main.humidity}%</p>
                  </div>
                </div>
                
                <div style={{
                  background: '#eff6ff',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Wind style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
                  <div>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>Vent</p>
                    <p style={{ fontSize: '20px', fontWeight: '600' }}>{Math.round(weather.wind.speed)} km/h</p>
                  </div>
                </div>
                
                <div style={{
                  background: '#eff6ff',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Gauge style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
                  <div>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>Pression</p>
                    <p style={{ fontSize: '20px', fontWeight: '600' }}>{weather.main.pressure} hPa</p>
                  </div>
                </div>
                
                <div style={{
                  background: '#eff6ff',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Eye style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
                  <div>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>Visibilité</p>
                    <p style={{ fontSize: '20px', fontWeight: '600' }}>{(weather.visibility / 1000).toFixed(1)} km</p>
                  </div>
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(to right, #fed7aa, #dbeafe)',
                borderRadius: '12px',
                padding: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>Ressenti</p>
                    <p style={{ fontSize: '24px', fontWeight: '600' }}>{Math.round(weather.main.feels_like)}°C</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>Min / Max</p>
                    <p style={{ fontSize: '24px', fontWeight: '600' }}>
                      {Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <p style={{
          textAlign: 'center',
          color: 'white',
          marginTop: '16px',
          fontSize: '14px'
        }}>
          Données fournies par OpenWeatherMap
        </p>
      </div>
    </div>
  );
}

export default App;