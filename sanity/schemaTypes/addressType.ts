import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const addressType = defineType({
  name: "address",
  title: "Address",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Address Name",
      type: "string",
      description: "A frindly name for the address (e.g., Home, Work)",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "email",
    }),
    defineField({
      name: "address",
      title: "Street Address",
      type: "string",
      description: "Street address include house apartment, unit number",
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      description: "tow latter state code (e.g., CA, Ny)",
      validation: (Rule) => Rule.required().length(2).uppercase(),
    }),
    defineField({
      name: "zip",
      title: "ZIP Code",
      type: "string",
      description: "Format: 12345 or 12345-6789",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d{5}(-\d{4})?$/, {
            name: "zip code",
            invert: false,
          })
          .custom((zip: string | undefined) => {
            if (!zip) {
              return "Zip code is required";
            }
            if (!zip.match(/^\d{5}(-\d{4})?$/)) {
              return "Please enter vailed ZIP code (e.g., 12345 or 12345-6789)";
            }
            return true;
          }),
    }),

    defineField({
      name: "defaulte",
      title: "Defualte Address",
      type: "boolean",
      description: "Set as defaulte address",
      initialValue: true,
    }),
    defineField({
        name: "createdAt",
        title: "CreatedAt",
        type: "datetime",
        initialValue: new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
        title: "name",
        subtitle: "address",
        city: "city",
        state: "state",
        isDefault: "default",
    },
    prepare({ title, subtitle, city, state, isDefault }) {
        return {
            title: `${title} ${isDefault ? "(Def)" : ""}`,
            subtitle: `${subtitle}, ${city}, ${state}`,
        }
    }
  }
});
