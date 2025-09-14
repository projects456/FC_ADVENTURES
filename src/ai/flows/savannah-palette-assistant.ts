// src/ai/flows/savannah-palette-assistant.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting color palettes based on the savanna theme.
 *
 * - `getSavannahPalette` -  A function that generates color palette suggestions based on the savanna theme.
 * - `SavannahPaletteInput` - The input type for the getSavannahPalette function.
 * - `SavannahPaletteOutput` - The return type for the getSavannahPalette function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SavannahPaletteInputSchema = z.object({
  query: z
    .string()
    .describe(
      'A description of the desired color palette, based on the savanna theme.'
    ),
});
export type SavannahPaletteInput = z.infer<typeof SavannahPaletteInputSchema>;

const SavannahPaletteOutputSchema = z.object({
  paletteDescription: z
    .string()
    .describe('A description of the suggested color palette.'),
  colors: z.array(z.string()).describe('An array of color hex codes.'),
});
export type SavannahPaletteOutput = z.infer<typeof SavannahPaletteOutputSchema>;

export async function getSavannahPalette(input: SavannahPaletteInput): Promise<SavannahPaletteOutput> {
  return savannahPaletteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'savannahPalettePrompt',
  input: {schema: SavannahPaletteInputSchema},
  output: {schema: SavannahPaletteOutputSchema},
  prompt: `You are a color palette expert, specializing in creating visually appealing color schemes based on themes.

  Based on the savanna theme, and the following description:
  {{query}}

  Suggest a color palette. Return a description of the palette, and an array of hex codes for the colors.
  The color palette should evoke the feeling of the savanna. The hex codes should be 6 characters long.
  Return no more than 5 colors in the array.
  Make sure the colors complement each other.
  `,
});

const savannahPaletteFlow = ai.defineFlow(
  {
    name: 'savannahPaletteFlow',
    inputSchema: SavannahPaletteInputSchema,
    outputSchema: SavannahPaletteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

