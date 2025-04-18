"use client"
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AnalyticsPage() {
  const { address, isConnected } = useAccount();
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [totalReads, setTotalReads] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch analytics and profile data when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      fetchAnalytics();
      fetchProfile();
    }
  }, [isConnected, address]);

  // Fetch total blogs read
  const fetchAnalytics = async () => {
    const { data, error } = await supabase
      .from('blog_reads')
      .select('blog_slug', { count: 'exact' })
      .eq('wallet_address', address);
    if (!error) {
      setTotalReads(data?.length || 0);
    }
    setLoading(false);
  };

  // Fetch user profile
  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', address)
      .single();
    if (!error && data) {
      setProfileData(data);
      setUsername(data.username || '');
    }
  };

  // Handle profile update
  const handleSetProfile = async () => {
    if (!address) return alert('Please connect your wallet');

    let pictureUrl = profileData?.profile_picture;
    if (profilePicture) {
      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .upload(`public/${address}.jpg`, profilePicture, { upsert: true });
      if (!error) {
        pictureUrl = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(`public/${address}.jpg`).data.publicUrl;
      } else {
        return alert('Failed to upload picture');
      }
    }

    const { error } = await supabase
      .from('users')
      .upsert({ 
        wallet_address: address, 
        username, 
        profile_picture: pictureUrl 
      });
    
    if (!error) {
      setProfileData({ username, profile_picture: pictureUrl });
      alert('Profile updated!');
    } else {
      alert('Failed to update profile');
    }
  };

  // Simulate blog read (replace with your actual tracking logic)
  const trackBlogRead = async (slug) => {
    await supabase
      .from('blog_reads')
      .insert({ wallet_address: address, blog_slug: slug });
    fetchAnalytics();
  };

  if (!isConnected) {
    return <div>Please connect your wallet to view analytics and set your profile.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Analytics</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>Blogs Read: {totalReads}</p>
      )}

      <h2>Your Profile</h2>
      {profileData?.profile_picture && (
        <img 
          src={profileData.profile_picture} 
          alt="Profile" 
          style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
        />
      )}
      <p>Username: {profileData?.username || 'Not set'}</p>

      <h3>Update Profile</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Set Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
          style={{ padding: '8px' }}
        />
        <button 
          onClick={handleSetProfile}
          style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none' }}
        >
          Save Profile
        </button>
      </div>

      {/* Example: Track a blog read */}
      <button 
        onClick={() => trackBlogRead('sample-blog')}
        style={{ marginTop: '20px', padding: '10px' }}
      >
        Test Blog Read
      </button>
    </div>
  );
}