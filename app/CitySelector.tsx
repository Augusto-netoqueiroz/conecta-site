"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cities } from "./cities";
import { trackEvent } from "./tracking";


type CitySelectorProps = {
  currentCityName?: string;
};

export default function CitySelector({
  currentCityName,
}: CitySelectorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

function selectCity(slug: string) {
  const selectedCity = cities.find(
    (city) => city.slug === slug
  );

  if (selectedCity) {
    trackEvent("select_city", {
      city: selectedCity.name,
      slug: selectedCity.slug,
    });
  }

  setOpen(false);
  setSearch("");
  router.push(`/cidade/${slug}`);
}

  return (
    <section className="city-section">
      <div className="container">
        <div className="city-selector">
          <div className="city-selector-copy">
            <div>
              <strong>Encontre a SKY na sua cidade</strong>
              <span>Selecione sua cidade para ver informações da sua região</span>
            </div>
          </div>

          <div className={`city-dropdown ${open ? "is-open" : ""}`}>
            <button
              className="city-trigger"
              type="button"
              onClick={() => setOpen((value) => !value)}
            >
              <span>{currentCityName || "Selecionar cidade"}</span>
              <span>⌄</span>
            </button>

            <div className="city-panel">
              <input
                type="text"
                placeholder="Buscar cidade"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <div className="city-options">
                {filteredCities.map((city) => (
                  <button
                    type="button"
                    key={city.slug}
                    onClick={() => selectCity(city.slug)}
                  >
                    {city.name}
                  </button>
                ))}

                {filteredCities.length === 0 && (
                  <div className="city-empty">
                    Nenhuma cidade encontrada
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}