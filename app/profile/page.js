'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authController } from '@/app/controllers/AuthController';

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    const user = authController.getUser();
    if (user) {
        // Redirect to the user's profile page using their ID
        router.replace(`/profile/${user.id}`);
    } else {
        router.replace('/login');
    }
  }, []);

  return null; // Or a loading spinner
}
