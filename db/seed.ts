import { db } from "./index";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    console.log("Seeding database...");

    // Seed categories
    const categories = [
      { name: "Digital" },
      { name: "Branding" },
      { name: "UX/UI" },
      { name: "Mobile" },
      { name: "Development" },
      { name: "Identity" }
    ];

    for (const category of categories) {
      const existingCategory = await db.query.categories.findFirst({
        where: eq(schema.categories.name, category.name)
      });

      if (!existingCategory) {
        await db.insert(schema.categories).values(category);
        console.log(`Category added: ${category.name}`);
      } else {
        console.log(`Category already exists: ${category.name}`);
      }
    }

    // Seed projects
    const projects = [
      {
        slug: "harmony",
        title: "Harmony",
        shortDescription: "Digital music experience platform",
        description: "A comprehensive digital platform reimagining the music listening experience for audiophiles and casual listeners alike.",
        fullDescription: "Harmony is a digital music platform that offers a unique approach to discovering and experiencing music. The project involved creating a holistic design system that appeals to both serious audiophiles and casual listeners, with particular attention to visual hierarchy, interaction design, and accessibility.",
        image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        client: "Harmony Music Inc.",
        industry: "Entertainment"
      },
      {
        slug: "pulse",
        title: "Pulse",
        shortDescription: "Health tracking redesigned",
        description: "A mobile application that reimagines how users track and improve their health metrics through intuitive design and personalized insights.",
        image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        client: "HealthTech Innovations",
        industry: "Healthcare"
      },
      {
        slug: "metric",
        title: "Metric",
        shortDescription: "Financial analytics platform",
        description: "A comprehensive dashboard that transforms complex financial data into accessible, actionable insights for businesses and individuals.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        client: "FinTech Solutions",
        industry: "Finance"
      },
      {
        slug: "aroma",
        title: "Aroma",
        shortDescription: "Artisanal coffee branding",
        description: "A complete brand identity for an artisanal coffee roaster, focused on communicating quality, sustainability, and craftsmanship.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        client: "Aroma Roasters",
        industry: "Food & Beverage"
      },
      {
        slug: "habitat",
        title: "Habitat",
        shortDescription: "Smart home interface design",
        description: "An intuitive interface design for a smart home system that balances advanced functionality with ease of use for various user groups.",
        image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        client: "SmartLiving Technologies",
        industry: "Technology"
      },
      {
        slug: "connect",
        title: "Connect",
        shortDescription: "Social networking reinvented",
        description: "A fresh approach to social networking that prioritizes meaningful connections and content relevance over engagement metrics.",
        image: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        client: "ConnectTech",
        industry: "Social Media"
      }
    ];

    for (const project of projects) {
      const existingProject = await db.query.projects.findFirst({
        where: eq(schema.projects.slug, project.slug)
      });

      if (!existingProject) {
        await db.insert(schema.projects).values(project);
        console.log(`Project added: ${project.title}`);
      } else {
        console.log(`Project already exists: ${project.title}`);
      }
    }

    // Seed play items
    const playItems = [
      {
        slug: "light-study",
        title: "Light study",
        image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "geometric",
        title: "Geometric",
        image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "type-experiment",
        title: "Type experiment",
        image: "https://images.unsplash.com/photo-1497005367839-6e852de72767?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        slug: "gradient-flow",
        title: "Gradient flow",
        image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ];

    for (const item of playItems) {
      const existingItem = await db.query.playItems.findFirst({
        where: eq(schema.playItems.slug, item.slug)
      });

      if (!existingItem) {
        await db.insert(schema.playItems).values(item);
        console.log(`Play item added: ${item.title}`);
      } else {
        console.log(`Play item already exists: ${item.title}`);
      }
    }

    console.log("Database seeding completed!");

  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
