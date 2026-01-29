import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Camera, Users, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface City {
  name: string;
  description: string;
  image: string;
  highlights: string[];
  rating: number;
  visitors: string;
  bestTime: string;
}

interface CityDirectoryProps {
  onCityClick: (cityName: string) => void;
}

export function CityDirectory({ onCityClick }: CityDirectoryProps) {
  const cities: City[] = [
    {
      name: "Udaipur",
      description: "The City of Lakes",
      image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1200&q=90",
      highlights: ["City Palace", "Lake Pichola", "Jag Mandir", "Sajjangarh Fort"],
      rating: 4.8,
      visitors: "2M+ yearly",
      bestTime: "Oct-Mar"
    },
    {
      name: "Jaipur",
      description: "The Pink City",
      image: "https://images.unsplash.com/photo-1677868818231-b5e09bcfc5e3?w=1200&q=90",
      highlights: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"],
      rating: 4.7,
      visitors: "3M+ yearly",
      bestTime: "Nov-Feb"
    },
    {
      name: "Jodhpur",
      description: "The Blue City",
      image: "https://images.unsplash.com/photo-1642528922719-8876c7d17318?w=1200&q=90",
      highlights: ["Mehrangarh Fort", "Blue Houses", "Umaid Bhawan", "Jaswant Thada"],
      rating: 4.6,
      visitors: "1.5M+ yearly",
      bestTime: "Oct-Mar"
    },
    {
      name: "Jaisalmer",
      description: "The Golden City",
      image: "https://images.unsplash.com/photo-1668605105277-87816e3e2aab?w=1200&q=90",
      highlights: ["Golden Fort", "Sam Sand Dunes", "Desert Safari", "Kuldhara Village"],
      rating: 4.5,
      visitors: "800K+ yearly",
      bestTime: "Nov-Feb"
    },
    {
      name: "Pushkar",
      description: "The Holy City",
      image: "https://images.unsplash.com/photo-1583261429112-e0e7fe037a49?w=1200&q=90",
      highlights: ["Pushkar Lake", "Brahma Temple", "Camel Fair", "Savitri Temple"],
      rating: 4.4,
      visitors: "600K+ yearly",
      bestTime: "Oct-Mar"
    },
    {
      name: "Mount Abu",
      description: "The Hill Station",
      image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=1200&q=90",
      highlights: ["Dilwara Temples", "Nakki Lake", "Sunset Point", "Guru Shikhar"],
      rating: 4.3,
      visitors: "500K+ yearly",
      bestTime: "Apr-Jun"
    },
    {
      name: "Bikaner",
      description: "The Camel City",
      image: "https://images.unsplash.com/photo-1571498660382-2b2edc40b4e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWthbmVyJTIwZm9ydCUyMHJhamFzdGhhbg%3D%3D&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      highlights: ["Junagarh Fort", "Camel Farm", "Karni Mata Temple", "Desert Safari"],
      rating: 4.2,
      visitors: "400K+ yearly",
      bestTime: "Oct-Mar"
    },
    {
      name: "Ajmer",
      description: "The Sufi City",
      image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhamXR2VciUyMHNoYXJpZiuiMcmFmaStuYTU4YW4%3D&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      highlights: ["Ajmer Sharif", "Ana Sagar Lake", "Taragarh Fort", "Akbari Fort"],
      rating: 4.1,
      visitors: "1M+ yearly",
      bestTime: "Oct-Mar"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Explore Rajasthan's Magnificent Cities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the royal heritage, vibrant culture, and architectural marvels 
            of each unique destination across the land of kings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                onClick={() => onCityClick(city.name)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={city.image}
                    alt={city.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-gray-900 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {city.rating}
                    </Badge>
                  </div>

                  {/* City Name Overlay */}
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                    <p className="text-amber-300">{city.description}</p>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {city.visitors}
                    </div>
                    <div className="flex items-center gap-1">
                      <Camera className="w-4 h-4" />
                      {city.bestTime}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">Top Attractions:</p>
                    <div className="flex flex-wrap gap-1">
                      {city.highlights.slice(0, 2).map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {city.highlights.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{city.highlights.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700">
                        Explore City →
                      </span>
                      <MapPin className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Cities Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg">
            <MapPin className="w-5 h-5" />
            View All Rajasthan Cities
          </button>
        </motion.div>
      </div>
    </section>
  );
}