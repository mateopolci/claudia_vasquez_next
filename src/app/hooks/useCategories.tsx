"use client";

import { useState, useEffect, useCallback } from 'react';

interface Category {
  id: number;
  documentId: string;
  name: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchCategories = useCallback(async () => {
    if (categories.length > 0 || loading) return;
    
    setLoading(true);
    setHasAttemptedFetch(true);
    
    try {
      const response = await fetch('http://localhost:1337/api/series?fields[0]=id&fields[1]=documentId&fields[2]=name');
      
      if (!response.ok) {
        console.error('Error fetching categories:', response.statusText);
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setCategories(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, [categories.length, loading]);

  useEffect(() => {
    if (!hasAttemptedFetch) {
      const timer = setTimeout(() => {
        fetchCategories();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [fetchCategories, hasAttemptedFetch]);

  return { categories, loading, error, fetchCategories };
}