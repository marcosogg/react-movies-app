import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

const SupabaseIntegrationTest = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(true);
  const { signIn, signOut } = useAuth();
  const { addFavorite, removeFavorite } = useFavorites();

  const runTests = useCallback(async () => {
    setLoading(true);
    const results = {};

    // Test 1: Check Supabase connection
    try {
      const { error } = await supabase.from('favorites').select('count').single();
      results.connectionTest = error ? 'Failed' : 'Passed';
    } catch (error) {
      results.connectionTest = 'Failed';
      console.error('Connection Test Error:', error);
    }

    // Test 2: User Authentication
    try {
      const testEmail = 'test@example.com';
      const testPassword = 'testpassword123';
      
      // Sign up test user
      const { error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      });
      
      if (signUpError) throw signUpError;
      
      // Sign in test user
      const { error: signInError } = await signIn(testEmail, testPassword);
      
      if (signInError) throw signInError;
      
      // Sign out test user
      await signOut();
      
      results.authTest = 'Passed';
    } catch (error) {
      results.authTest = 'Failed';
      console.error('Auth Test Error:', error);
    }

    // Test 3: Favorites CRUD operations
    try {
      // Add a favorite
      const testFavorite = { id: 123, media_type: 'movie', title: 'Test Movie' };
      await addFavorite(testFavorite);
      
      // Check if favorite was added
      const { error: favoritesError } = await supabase
        .from('favorites')
        .select('*')
        .eq('item_id', testFavorite.id)
        .single();
      
      if (favoritesError) throw favoritesError;
      
      // Remove the favorite
      await removeFavorite(testFavorite.id);
      
      // Check if favorite was removed
      const { data: removedFavorite } = await supabase
        .from('favorites')
        .select('*')
        .eq('item_id', testFavorite.id)
        .single();
      
      if (removedFavorite) throw new Error('Favorite was not removed');
      
      results.favoritesTest = 'Passed';
    } catch (error) {
      results.favoritesTest = 'Failed';
      console.error('Favorites Test Error:', error);
    }

    setTestResults(results);
    setLoading(false);
  }, [signIn, signOut, addFavorite, removeFavorite]);

  useEffect(() => {
    runTests();
  }, [runTests]);

  if (loading) {
    return <div>Running Supabase integration tests...</div>;
  }

  return (
    <div>
      <h2>Supabase Integration Test Results</h2>
      <ul>
        <li>Connection Test: {testResults.connectionTest}</li>
        <li>Authentication Test: {testResults.authTest}</li>
        <li>Favorites CRUD Test: {testResults.favoritesTest}</li>
      </ul>
      <button onClick={runTests}>Run Tests Again</button>
    </div>
  );
};

export default SupabaseIntegrationTest;