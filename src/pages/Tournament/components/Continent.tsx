import React from "react";
import asia from "../../../images/asia1.png";
import europe from "../../../images/europe1.png";
import aus from "../../../images/austrelia1.png";
import africa from "../../../images/africa1.png";
import norame from "../../../images/north america1.png";
import souame from "../../../images/south america1.png";
import india from "../../../images/india2.png";

interface ContinentSelectorProps {
  selectedContinent: string | null;
  setSelectedContinent: (continent: string | null) => void;
}

const continents = [
  { name: "Asia", image: asia },
  { name: "Europe", image: europe },
  { name: "Africa", image: africa },
  { name: "North America", image: norame },
  { name: "South America", image: souame },
  { name: "Australia", image: aus },
  { name: "India", image: india },
];

const ContinentSelector: React.FC<ContinentSelectorProps> = ({
  selectedContinent,
  setSelectedContinent,
}) => {
  const handleSelect = (name: string) => {
    setSelectedContinent(selectedContinent === name ? null : name);
  };

  return (
    <div className="w-full mb-4">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {continents.map(({ name, image }) => (
          <div
            key={name}
            onClick={() => handleSelect(name)}
            style={{
              border: selectedContinent === name ? "3px solid #3B82F6" : "none", // Tailwind blue-500
              padding: "2px",
              cursor: "pointer",
            }}
          >
            <img
              src={image}
              alt={name}
              style={{
                width: "200px",
                height: "100px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinentSelector;
