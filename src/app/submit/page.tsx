'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { kindnessTypes } from '@/lib/types';
import { PlusCircle } from 'lucide-react';

const formSchema = z.object({
  description: z.string().min(10, 'Please describe the deed in at least 10 characters.').max(280, 'Description must be 280 characters or less.'),
  kindnessType: z.enum(kindnessTypes),
  photo: z.any().optional(),
});

export default function SubmitPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Deed Submitted to the Ledger!',
      description: 'Your act of kindness is now awaiting verification from the community.',
    });
    form.reset();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-headline">
            <PlusCircle className="text-primary" />
            Record an Act of Kindness
          </CardTitle>
          <CardDescription>
            Share a good deed you've performed or witnessed. Your entry will be reviewed by the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>The Good Deed</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Helped a turtle cross the road safely."
                        className="resize-none bg-background/50"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the act of kindness clearly and concisely.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kindnessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Kindness</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {kindnessTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Categorizing the deed helps in tracking community harmony.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Optional Photo</FormLabel>
                    <FormControl>
                      <Input type="file" className="bg-background/50" {...field} />
                    </FormControl>
                    <FormDescription>
                      A photo can help the community verify your submission.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full shadow-lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Commit to Ledger'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
