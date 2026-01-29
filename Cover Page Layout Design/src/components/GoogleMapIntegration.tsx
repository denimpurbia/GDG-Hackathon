import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Star, Navigation, X } from 'lucide-react';

// Declare Google Maps types for TypeScript
declare const google: any;
declare global {
  interface Window {
    google: any;
  }
}

// Define location data for Rajasthan attractions and hotels
const rajasthanLocations = [
  // Jaipur
  { id: 1, name: 'Amber Fort', type: 'attraction', lat: 26.9855, lng: 75.8513, city: 'Jaipur', rating: 4.8, description: 'Magnificent hilltop palace blending Hindu and Mughal architecture', image: 'https://images.unsplash.com/photo-1599661046289-e94464cb7ed6?w=600&q=90' },
  { id: 2, name: 'Hawa Mahal', type: 'attraction', lat: 26.9239, lng: 75.8267, city: 'Jaipur', rating: 4.6, description: 'Palace of Winds with iconic honeycomb structure', image: 'https://images.unsplash.com/photo-1677868818231-b5e09bcfc5e3?w=600&q=90' },
  { id: 3, name: 'Rambagh Palace', type: 'hotel', lat: 26.8983, lng: 75.7979, city: 'Jaipur', rating: 4.8, price: '₹28,900', description: 'Former palace of Maharaja', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=90' },
  
  // Udaipur
  { id: 4, name: 'City Palace Udaipur', type: 'attraction', lat: 24.5761, lng: 73.6833, city: 'Udaipur', rating: 4.9, description: 'Sprawling palace complex overlooking Lake Pichola', image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=600&q=90' },
  { id: 5, name: 'Lake Palace', type: 'hotel', lat: 24.5726, lng: 73.6785, city: 'Udaipur', rating: 4.9, price: '₹32,500', description: 'Floating palace hotel with unmatched luxury', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=90' },
  { id: 6, name: 'Jagat Niwas Palace', type: 'hotel', lat: 24.5797, lng: 73.6843, city: 'Udaipur', rating: 4.5, price: '₹3,200', description: 'Heritage hotel with stunning lake views', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=90' },
  
  // Jodhpur
  { id: 7, name: 'Mehrangarh Fort', type: 'attraction', lat: 26.2984, lng: 73.0189, city: 'Jodhpur', rating: 4.8, description: 'One of India\'s largest forts towering over the Blue City', image: 'https://images.unsplash.com/photo-1642528922719-8876c7d17318?w=600&q=90' },
  { id: 8, name: 'Umaid Bhawan Palace', type: 'hotel', lat: 26.2885, lng: 73.0366, city: 'Jodhpur', rating: 4.9, price: '₹45,200', description: 'Art Deco palace with museum and royal suites', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=90' },
  
  // Jaisalmer
  { id: 9, name: 'Jaisalmer Fort', type: 'attraction', lat: 26.9157, lng: 70.9083, city: 'Jaisalmer', rating: 4.7, description: 'UNESCO World Heritage Site - a living fort', image: 'https://images.unsplash.com/photo-1668605105277-87816e3e2aab?w=600&q=90' },
  { id: 10, name: 'Desert Camp Jaisalmer', type: 'hotel', lat: 26.8806, lng: 70.7719, city: 'Jaisalmer', rating: 4.6, price: '₹12,800', description: 'Luxury desert camping with cultural experiences', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=90' },
];

interface GoogleMapProps {
  className?: string;
}

export function GoogleMapIntegration({ className = '' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    // Initialize Google Map
    if (!mapRef.current) return;

    const initMap = () => {
      // Center on Rajasthan
      const rajasthanCenter = { lat: 26.9124, lng: 75.7873 }; // Jaipur

      const mapInstance = new google.maps.Map(mapRef.current!, {
        center: rajasthanCenter,
        zoom: 7,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      setMap(mapInstance);

      // Add markers for each location
      const newMarkers = rajasthanLocations.map((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstance,
          title: location.name,
          icon: {
            url: location.type === 'hotel' 
              ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new google.maps.Size(40, 40),
          },
        });

        marker.addListener('click', () => {
          setSelectedLocation(location);
          mapInstance.panTo({ lat: location.lat, lng: location.lng });
          mapInstance.setZoom(12);
        });

        return marker;
      });

      setMarkers(newMarkers);
    };

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup markers
      markers.forEach(marker => marker.setMap(null));
    };
  }, []);

  const handleCloseInfo = () => {
    setSelectedLocation(null);
    if (map) {
      map.setZoom(7);
      map.panTo({ lat: 26.9124, lng: 75.7873 });
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-[600px] rounded-xl shadow-2xl" />

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <h3 className="font-semibold mb-2">Map Legend</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-sm">Attractions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-sm">Hotels</span>
        </div>
      </div>

      {/* Location Info Card */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <Card className="overflow-hidden shadow-2xl premium-card animate-fadeInUp">
            <div className="relative">
              <img
                src={selectedLocation.image + '?w=400&h=200&fit=crop'}
                alt={selectedLocation.name}
                className="w-full h-48 object-cover"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                onClick={handleCloseInfo}
              >
                <X className="w-4 h-4" />
              </Button>
              <Badge className={`absolute top-2 left-2 ${
                selectedLocation.type === 'hotel' ? 'bg-blue-600' : 'bg-red-600'
              } text-white`}>
                {selectedLocation.type === 'hotel' ? 'Hotel' : 'Attraction'}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">{selectedLocation.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{selectedLocation.city}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{selectedLocation.rating}</span>
                {selectedLocation.price && (
                  <span className="ml-auto text-lg font-bold text-green-600">
                    {selectedLocation.price}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">{selectedLocation.description}</p>
              <div className="flex gap-2">
                <Button className="flex-1 premium-button">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" className="flex-1">
                  {selectedLocation.type === 'hotel' ? 'Book Now' : 'Buy Tickets'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
