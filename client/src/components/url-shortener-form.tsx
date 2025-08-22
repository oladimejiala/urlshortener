import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Scissors, Globe } from "lucide-react";
import { insertUrlSchema, type ShortenedUrlResponse } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type FormData = {
  originalUrl: string;
  customAlias?: string;
};

interface UrlShortenerFormProps {
  onUrlShortened: (result: ShortenedUrlResponse) => void;
}

export function UrlShortenerForm({ onUrlShortened }: UrlShortenerFormProps) {
  const { toast } = useToast();
  const [customAlias, setCustomAlias] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(insertUrlSchema),
    defaultValues: {
      originalUrl: "",
      customAlias: "",
    },
  });

  // Check alias availability
  const { data: aliasCheck, isLoading: checkingAlias } = useQuery<{ available: boolean }>({
    queryKey: ["/api/urls/check-alias", customAlias],
    enabled: !!customAlias && customAlias.length > 0,
    refetchInterval: false,
  });

  const shortenMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/urls", data);
      return response.json();
    },
    onSuccess: (result: ShortenedUrlResponse) => {
      onUrlShortened(result);
      form.reset();
      setCustomAlias("");
      // Invalidate analytics cache to refresh the recent URLs list
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
      toast({
        title: "Success!",
        description: "URL shortened successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to shorten URL",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    shortenMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-url-shortener">
          <FormField
            control={form.control}
            name="originalUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Enter your long URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type="url"
                      placeholder="Enter your URL that needs shortening here"
                      className="w-full px-4 py-3 pr-12 text-lg"
                      data-testid="input-long-url"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="customAlias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Custom alias (optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500 text-sm">urlshortener0.com/  </span>
                      <Input
                        {...field}
                        placeholder="enter your prefered link here"
                        className="w-full pl-28 pr-4 py-3"
                        data-testid="input-custom-alias"
                        onChange={(e) => {
                          field.onChange(e);
                          setCustomAlias(e.target.value);
                        }}
                      />
                    </div>
                  </FormControl>
                  {customAlias && !checkingAlias && aliasCheck && (
                    <p className={cn(
                      "text-sm mt-1",
                      aliasCheck.available ? "text-green-500" : "text-red-500"
                    )}>
                      {aliasCheck.available ? "✓ Available" : "This alias is already taken"}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-end">
              <Button
                type="submit"
                disabled={shortenMutation.isPending || (!!customAlias && aliasCheck && !aliasCheck.available)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6"
                data-testid="button-shorten"
              >
                <Scissors className="h-4 w-4 mr-2" />
                {shortenMutation.isPending ? "Shortening..." : "Shorten URL"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
