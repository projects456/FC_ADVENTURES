'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generatePaletteAction } from '@/app/actions';
import type { SavannahPaletteOutput } from '@/ai/flows/savannah-palette-assistant';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  query: z.string().min(10, {
    message: 'Describe the vibe a bit more!',
  }),
});

const ColorChip = ({ color }: { color: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full border-2 border-white/50" style={{ backgroundColor: color }} />
    <span className="font-mono text-sm uppercase">{color}</span>
  </div>
);

export default function PaletteGenerator() {
  const [palette, setPalette] = useState<SavannahPaletteOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPalette(null);
    try {
      const result = await generatePaletteAction(values);
      setPalette(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="bg-card py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto bg-background shadow-lg">
          <CardHeader className="text-center">
            <Wand2 className="mx-auto h-10 w-10 text-primary mb-2" />
            <CardTitle className="font-headline text-3xl">Savannah Palette Assistant</CardTitle>
            <CardDescription>Feeling inspired? Describe a scene and let our AI generate a unique color palette for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="e.g., 'A dusty sunset over the Mara plains'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Generate Palette
                </Button>
              </form>
            </Form>

            {isLoading && (
              <div className="mt-6 text-center text-muted-foreground">
                <p>Generating your palette...</p>
              </div>
            )}
            
            {palette && (
              <div className="mt-6 border-t pt-6 animate-fade-in">
                <h4 className="font-headline text-lg text-primary">{palette.paletteDescription}</h4>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {palette.colors.map((color) => (
                    <ColorChip key={color} color={color} />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
