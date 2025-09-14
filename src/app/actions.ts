'use server';

import { getSavannahPalette, type SavannahPaletteInput, type SavannahPaletteOutput } from '@/ai/flows/savannah-palette-assistant';

export async function generatePaletteAction(input: SavannahPaletteInput): Promise<SavannahPaletteOutput> {
  try {
    const palette = await getSavannahPalette(input);
    return palette;
  } catch (error) {
    console.error('Error generating palette:', error);
    throw new Error('Failed to generate color palette. Please try again.');
  }
}
