import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Star, Navigation, X, Hotel, Castle, Coffee, Camera, Phone, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Declare Google Maps types for TypeScript
declare const google: any;
declare global {
  interface Window {
    google: any;
  }
}

// Location data with all categories
const mapLocations = [
  // Hotels
  { id: 1, name: 'Jagat Niwas Palace Hotel', category: 'hotel', lat: 24.5797, lng: 73.6843, city: 'Udaipur', rating: 4.5, description: 'Heritage hotel with stunning Lake Pichola views', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=90', price: '₹3,200/night' },
  { id: 2, name: 'Lake Palace Hotel', category: 'hotel', lat: 24.5726, lng: 73.6785, city: 'Udaipur', rating: 4.9, description: 'Iconic floating palace in the middle of Lake Pichola', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=90', price: '₹32,500/night' },
  { id: 3, name: 'Rambagh Palace', category: 'hotel', lat: 26.8983, lng: 75.7979, city: 'Jaipur', rating: 4.8, description: 'Former royal palace turned luxury heritage hotel', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=90', price: '₹28,900/night' },
  { id: 4, name: 'Umaid Bhawan Palace', category: 'hotel', lat: 26.2885, lng: 73.0366, city: 'Jodhpur', rating: 4.9, description: 'Art Deco palace with museum and royal suites', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=90', price: '₹45,200/night' },

  // Temples
  { id: 5, name: 'Brahma Temple', category: 'temple', lat: 26.4901, lng: 74.5515, city: 'Pushkar', rating: 4.7, description: 'One of the few temples dedicated to Lord Brahma', image: 'https://images.unsplash.com/photo-1583261429112-e0e7fe037a49?w=600&q=90', price: 'Free entry' },
  { id: 6, name: 'Karni Mata Temple', category: 'temple', lat: 27.8177, lng: 73.3355, city: 'Bikaner', rating: 4.5, description: 'Famous temple with thousands of sacred rats', image: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3?w=600&q=90', price: 'Free entry' },
  { id: 7, name: 'Dilwara Temples', category: 'temple', lat: 24.6526, lng: 72.7184, city: 'Mount Abu', rating: 4.8, description: 'Exquisite marble Jain temples with intricate carvings', image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=600&q=90', price: 'Free entry' },

  // Cafes & Restaurants
  { id: 8, name: 'Cafe Edelweiss', category: 'cafe', lat: 26.9201, lng: 75.8235, city: 'Jaipur', rating: 4.4, description: 'Rooftop cafe with authentic Rajasthani cuisine', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=90', price: '₹500/person' },
  { id: 9, name: 'Ambrai Restaurant', category: 'cafe', lat: 24.5776, lng: 73.6821, city: 'Udaipur', rating: 4.7, description: 'Lakeside dining with City Palace views', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=90', price: '₹1,200/person' },
  { id: 10, name: 'Indique Restaurant', category: 'cafe', lat: 26.2998, lng: 73.0182, city: 'Jodhpur', rating: 4.6, description: 'Terrace restaurant overlooking Mehrangarh Fort', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=90', price: '₹800/person' },

  // Tourist Attractions
  { id: 11, name: 'Amber Fort', category: 'attraction', lat: 26.9855, lng: 75.8513, city: 'Jaipur', rating: 4.8, description: 'Magnificent hilltop palace with stunning architecture', image: 'https://images.unsplash.com/photo-1599661046289-e94464cb7ed6?w=600&q=90', price: '₹200 entry' },
  { id: 12, name: 'Hawa Mahal', category: 'attraction', lat: 26.9239, lng: 75.8267, city: 'Jaipur', rating: 4.6, description: 'Iconic Palace of Winds with honeycomb facade', image: 'https://images.unsplash.com/photo-1677868818231-b5e09bcfc5e3?w=600&q=90', price: '₹50 entry' },
  { id: 13, name: 'City Palace Udaipur', category: 'attraction', lat: 24.5761, lng: 73.6833, city: 'Udaipur', rating: 4.9, description: 'Sprawling palace complex on Lake Pichola banks', image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=600&q=90', price: '₹300 entry' },
  { id: 14, name: 'Mehrangarh Fort', category: 'attraction', lat: 26.2984, lng: 73.0189, city: 'Jodhpur', rating: 4.8, description: 'One of India\'s largest forts towering above the Blue City', image: 'https://images.unsplash.com/photo-1642528922719-8876c7d17318?w=600&q=90', price: '₹100 entry' },
  { id: 15, name: 'Jaisalmer Fort', category: 'attraction', lat: 26.9157, lng: 70.9083, city: 'Jaisalmer', rating: 4.7, description: 'UNESCO World Heritage living fort in golden sandstone', image: 'https://images.unsplash.com/photo-1668605105277-87816e3e2aab?w=600&q=90', price: 'Free entry' },
];

// Category configurations
const categoryConfig = {
  hotel: { color: '#3B82F6', icon: Hotel, label: 'Hotels' },
  temple: { color: '#F59E0B', icon: Camera, label: 'Temples' },
  cafe: { color: '#10B981', icon: Coffee, label: 'Cafes' },
  attraction: { color: '#EF4444', icon: Castle, label: 'Attractions' },
};

interface PremiumMapSectionProps {
  className?: string;
}

export function PremiumMapSection({ className = '' }: PremiumMapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      try {
        // Center on Rajasthan (Jaipur)
        const rajasthanCenter = { lat: 26.0, lng: 74.5 };

        const mapInstance = new google.maps.Map(mapRef.current!, {
          center: rajasthanCenter,
          zoom: 7,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#a8d5f2' }],
            },
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });

        setMap(mapInstance);

        // Add markers for each location
        const newMarkers = mapLocations.map((location) => {
          const config = categoryConfig[location.category as keyof typeof categoryConfig];
          
          const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: mapInstance,
            title: location.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: config.color,
              fillOpacity: 0.9,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });

          marker.addListener('click', () => {
            setSelectedLocation(location);
            mapInstance.panTo({ lat: location.lat, lng: location.lng });
            mapInstance.setZoom(12);
          });

          return { marker, category: location.category };
        });

        setMarkers(newMarkers);
        setIsLoading(false);
      } catch (error) {
        console.error('Map initialization error:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      // Replace with your actual Google Maps API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      markers.forEach(({ marker }) => marker.setMap(null));
    };
  }, []);

  // Filter markers based on active filter
  useEffect(() => {
    markers.forEach(({ marker, category }) => {
      if (activeFilter === 'all' || category === activeFilter) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
    });
  }, [activeFilter, markers]);

  const handleCloseInfo = () => {
    setSelectedLocation(null);
    if (map) {
      map.setZoom(7);
      map.panTo({ lat: 26.0, lng: 74.5 });
    }
  };

  const getCategoryIcon = (category: string) => {
    const Icon = categoryConfig[category as keyof typeof categoryConfig]?.icon || MapPin;
    return <Icon className="w-4 h-4" />;
  };

  if (hasError) {
    return (
      <section className={`py-20 bg-gradient-to-br from-gray-50 to-white ${className}`}>
        <div className="max-w-7xl mx-auto px-6">
          <Card className="p-12 text-center">
            <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Map Unavailable</h3>
            <p className="text-gray-600 mb-4">
              We couldn't load the interactive map at this moment. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="explore-map" className={`py-20 bg-gradient-to-br from-gray-50 to-white ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-1 text-sm">
            Interactive Map
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Explore the City on Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover hotels, temples, cafes, and tourist attractions across Rajasthan. 
            Click on any marker to view details.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('all')}
            className="gap-2"
          >
            <MapPin className="w-4 h-4" />
            All Places
          </Button>
          {Object.entries(categoryConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <Button
                key={key}
                variant={activeFilter === key ? 'default' : 'outline'}
                onClick={() => setActiveFilter(key)}
                className="gap-2"
                style={{
                  backgroundColor: activeFilter === key ? config.color : undefined,
                  borderColor: config.color,
                  color: activeFilter === key ? 'white' : config.color,
                }}
              >
                <Icon className="w-4 h-4" />
                {config.label}
              </Button>
            );
          })}
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading interactive map...</p>
                </div>
              </div>
            )}
            <div ref={mapRef} className="w-full h-[600px] bg-gray-100" />
          </div>

          {/* Map Legend */}
          {!isLoading && (
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-[200px]">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Map Legend
              </h3>
              <div className="space-y-2">
                {Object.entries(categoryConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: config.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{config.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Location Info Card */}
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4 z-50"
          >
            <Card className="overflow-hidden shadow-2xl border-2 border-white">
              <div className="relative">
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Close button */}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 rounded-full shadow-lg"
                  onClick={handleCloseInfo}
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <Badge
                    className="flex items-center gap-1 text-white"
                    style={{
                      backgroundColor: categoryConfig[selectedLocation.category as keyof typeof categoryConfig]?.color,
                    }}
                  >
                    {getCategoryIcon(selectedLocation.category)}
                    {categoryConfig[selectedLocation.category as keyof typeof categoryConfig]?.label}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedLocation.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{selectedLocation.city}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{selectedLocation.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{selectedLocation.rating}</span>
                    <span className="text-gray-500 text-sm">/5</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {selectedLocation.category === 'hotel' ? 'Starting from' : 'Entry fee'}
                    </div>
                    <div className="text-lg font-bold text-gray-900">{selectedLocation.price}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex gap-2">
                  <Button className="flex-1 gap-2">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Phone className="w-4 h-4" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
