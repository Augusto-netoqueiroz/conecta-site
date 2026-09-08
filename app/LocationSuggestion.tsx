"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { trackEvent } from "./tracking";

type SupportedCity = {
  name: string;
  slug: string;
  lat: number;
  lon: number;
};

const supportedCities: SupportedCity[] = [
  { name: "Brasília — Plano Piloto", slug: "brasilia-plano-piloto", lat: -15.7939, lon: -47.8828 },
  { name: "Taguatinga", slug: "taguatinga", lat: -15.8342, lon: -48.0563 },
  { name: "Ceilândia", slug: "ceilandia", lat: -15.817, lon: -48.108 },
  { name: "Samambaia", slug: "samambaia", lat: -15.879, lon: -48.087 },
  { name: "Águas Claras", slug: "aguas-claras", lat: -15.839, lon: -48.028 },
  { name: "Guará", slug: "guara", lat: -15.826, lon: -47.978 },
  { name: "Gama", slug: "gama", lat: -16.018, lon: -48.067 },
  { name: "Santa Maria", slug: "santa-maria", lat: -16.004, lon: -47.987 },
  { name: "Recanto das Emas", slug: "recanto-das-emas", lat: -15.902, lon: -48.065 },
  { name: "Sobradinho", slug: "sobradinho", lat: -15.65, lon: -47.79 },
  { name: "Sobradinho II", slug: "sobradinho-ii", lat: -15.642, lon: -47.83 },
  { name: "Planaltina", slug: "planaltina", lat: -15.621, lon: -47.657 },
  { name: "Riacho Fundo", slug: "riacho-fundo", lat: -15.883, lon: -48.016 },
  { name: "Riacho Fundo II", slug: "riacho-fundo-ii", lat: -15.899, lon: -48.04 },
  { name: "Núcleo Bandeirante", slug: "nucleo-bandeirante", lat: -15.871, lon: -47.968 },
  { name: "Vicente Pires", slug: "vicente-pires", lat: -15.805, lon: -48.039 },
  { name: "São Sebastião", slug: "sao-sebastiao", lat: -15.902, lon: -47.779 },
  { name: "Paranoá", slug: "paranoa", lat: -15.775, lon: -47.779 },
  { name: "Itapoã", slug: "itapoa", lat: -15.745, lon: -47.771 },
  { name: "Brazlândia", slug: "brazlandia", lat: -15.67, lon: -48.2 },
];

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const earthRadius = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function nearestCity(latitude: number, longitude: number) {
  return supportedCities
    .map((city) => ({
      city,
      distance: distanceKm(latitude, longitude, city.lat, city.lon),
    }))
    .sort((a, b) => a.distance - b.distance)[0];
}

export default function LocationSuggestion() {
  const [city, setCity] = useState<SupportedCity | null>(null);

  const locate = useCallback(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const result = nearestCity(coords.latitude, coords.longitude);

        if (result && result.distance <= 12) {
          setCity(result.city);
          trackEvent("location_suggestion", {
            city: result.city.name,
            slug: result.city.slug,
          });
        }
      },
      () => {},
      {
        enableHighAccuracy: false,
        timeout: 7000,
        maximumAge: 600000,
      }
    );
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("location-suggestion-dismissed") === "1") return;
    locate();
  }, [locate]);

  function dismiss() {
    sessionStorage.setItem("location-suggestion-dismissed", "1");
    setCity(null);
  }

  if (!city) return null;

  return (
    <section className="location-suggestion" aria-live="polite">
      <div className="container location-suggestion-card">
        <div>
          <span>PÁGINA DA SUA REGIÃO</span>
          <strong>Você parece estar perto de {city.name}</strong>
          <p>Veja a página preparada para essa região e consulte as condições para o seu endereço.</p>
        </div>
        <div className="location-suggestion-actions">
          <Link href={`/cidade/${city.slug}`}>VER {city.name.toUpperCase()}</Link>
          <button type="button" onClick={dismiss}>AGORA NÃO</button>
        </div>
      </div>
    </section>
  );
}
