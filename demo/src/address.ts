import { AddressViewProps } from "./views/Address";

export function generateRandomAddress(): AddressViewProps {
      const streetNames = ["Maple", "Oak", "Pine", "Cedar", "Elm", "Birch", "Spruce", "Willow", "Chestnut", "Ash"];
      const streetTypes = ["St", "Ave", "Blvd", "Rd", "Ln", "Dr", "Ct", "Pl"];
      const cityNames = ["Springfield", "Rivertown", "Greenville", "Hillview", "Lakewood", "Brookfield", "Fairview", "Westfield", "Ridgewood", "Eastview"];
      const states = ["CA", "TX", "NY", "FL", "IL", "PA", "OH", "GA", "NC", "MI"];
      const zipCodes = Array.from({ length: 90000 }, (_, i) => (10000 + i).toString());
  
      const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  
      const address1 = `${Math.floor(Math.random() * 9999) + 1} ${randomElement(streetNames)} ${randomElement(streetTypes)}`;
      const address2 = `${randomElement(cityNames)}, ${randomElement(states)}`;
      const postalCode = randomElement(zipCodes);
  
      const hasAddress3 = Math.random() > 0.5;
      const address3 = hasAddress3 ? `Apt ${Math.floor(Math.random() * 999) + 1}` : "";
  
      return {
          address1,
          address2,
          address3,
          postalCode,
      };
  }